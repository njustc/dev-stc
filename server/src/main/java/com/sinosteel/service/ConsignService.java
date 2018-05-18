package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ConsignRepository;
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



    public JSON queryConsigns(User user)
    {

        if (user != null)
            System.out.println("queryConsigns--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Consign> consigns = user.getConsigns();
            //对委托列表进行处理，去掉委托具体内容,并且添加委托状态
            return processConsigns(consigns);
        }
        else
        {
            List<Consign> consigns = consignRepository.findByAllConsigns();
            //对委托列表进行处理，去掉委托具体内容,并且添加委托状态
            return processConsigns(consigns);
        }
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
        Consign tempconsign = JSONObject.toJavaObject(params, Consign.class);
        Consign consign;
        if ((consign = this.findEntityById(tempconsign.getId())) == null) {
            throw new Exception("Can't find id: " + tempconsign.getId());
        }
        //编辑委托时只编辑内容
        consign.setConsignation(tempconsign.getConsignation());
        this.updateEntity(consign, user);

        //return the consign with STATE!
        consign = consignRepository.findById(tempconsign.getId());
        return processConsign(consign);
    }

    //增加委托
    public JSONObject addConsign(JSONObject params,List<MultipartFile> files,User user) throws Exception
    {

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

    public void deleteConsign(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    private JSONObject processConsign(Consign consign) {
        //增加委托状态
        String processState = (String)processInstanceService.queryProcessState(consign.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(consign));
        jsonObject.put("state", processState);
        return jsonObject;

    }

    private  JSONArray processConsigns(List<Consign> consigns) {
        JSONArray resultArray = new JSONArray();
        //去掉委托内容,添加状态
        for (Consign consign: consigns) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(consign));
            jsonObject.remove("consignation");
            String processState = (String)processInstanceService.queryProcessState(consign.getProcessInstanceID()).get("state");
            jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
