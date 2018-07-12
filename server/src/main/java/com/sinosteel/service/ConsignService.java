package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ConsignRepository;
import com.sinosteel.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * @author LBW & SQW
 */

@Service
public class ConsignService extends BaseService<Consign> {

    @Autowired
    private ConsignRepository consignRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    @Autowired
    private ProjectRepository projectRepository;



    public JSON queryConsigns(User user) throws Exception {
        if (user != null)
            System.out.println("queryConsigns--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Consign> consigns = user.getConsigns();
            //对委托列表进行处理，去掉委托具体内容,并且添加委托状态
            return processConsigns(consigns);

            //从工程里获取
            //List<Project> projects = user.getProjects();
            //List<Consign> consigns = new ArrayList<Consign>();
            //for(Project project: projects) {
                //Consign consign = project.getConsign();
                //consigns.add(consign);
            //}
            //return processConsigns(consigns);
        }
        else
        {
            List<Consign> consigns = consignRepository.findByAllConsigns();
            //对委托列表进行处理，去掉委托具体内容,并且添加委托状态
            return processConsigns(consigns);
        }
    }

    public JSON queryConsignsByProject(String projectID) throws Exception {
        Project project = projectRepository.findById(projectID);
        if (project == null) {
            throw new Exception("can't find project by id :" + projectID);
        }
        Consign consign = project.getConsign();
        if (consign == null)
            throw new Exception("can't find consign with project: " + projectID);
        return processConsign(consign);
    }

    public JSONObject queryConsignByID(String id) throws Exception{
        Consign consign = consignRepository.findById(id);
        if (consign == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(consign));
    }

    //更新委托
    public JSONObject editConsign(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        Consign tempConsign = JSONObject.toJavaObject(params, Consign.class);
        Consign consign;
        if ((consign = this.findEntityById(tempConsign.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑委托时只编辑内容
        consign.setConsignation(tempConsign.getConsignation());
        this.updateEntity(consign, user);

        //return the consign with STATE!
        consign = consignRepository.findById(tempConsign.getId());
        return processConsign(consign);
    }

    //增加委托
    public JSONObject addConsign(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        String uid=UUID.randomUUID().toString();

        Consign consign=JSONObject.toJavaObject(params,Consign.class);
        consign.setId(uid);
        consign.setUser(user);

        //start activiti process
        String procID = processInstanceService.createConsignProcess(params, user);
        consign.setProcessInstanceID(procID);
        this.saveEntity(consign, user);

        //return the consign with STATE!
        consign = consignRepository.findById(uid);
        return processConsign(consign);
    }

    //删除委托（不删除相关委托文件?）

    public void deleteConsign(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        Consign consign = consignRepository.findById(uid);
        if (consign == null)
            throw new Exception("Can't find consign with id: " + uid);

        this.deleteEntity(uid);
    }


    //增加委托状态
    JSONObject processConsign(Consign consign) throws Exception {
        JSONObject processState = processInstanceService.queryProcessState(consign.getProcessInstanceID());

        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(consign));
        jsonObject.putAll(processState);
        return jsonObject;

    }

    JSONArray processConsigns(List<Consign> consigns) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (Consign consign: consigns) {
            JSONObject jsonObject = processConsign(consign);
            //jsonObject.remove("consignation")
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
