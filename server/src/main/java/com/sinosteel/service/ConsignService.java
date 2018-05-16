package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ConsignActiviti;
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
    private ConsignActivitiService consignActivitiService;



    public JSON queryConsigns(User user)
    {

        if (user != null)
            System.out.println("queryConsigns--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
//            Consign consign = new Consign();
//            consign.setId(UUID.randomUUID().toString());
//            consign.setConsignation("这是普通用户应该返回的委托");
            List<Consign> consigns = user.getConsigns();
            return JSON.parseArray(JSONArray.toJSONString(consigns));
        }
        else
        {
//            Consign consign = new Consign();
//            consign.setId(UUID.randomUUID().toString());
//            consign.setConsignation("这是工作人员应该返回的所有委托");
            List<Consign> consigns = consignRepository.findByAllConsigns();
            return JSON.parseArray(JSONArray.toJSONString(consigns));
        }
    }

    public JSONObject queryConsignByID(String id) {
        Consign consign = consignRepository.findById(id);
        return JSON.parseObject(JSONObject.toJSONString(consign));
    }

    //更新委托
    public void editConsign(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        Consign tempconsign = JSONObject.toJavaObject(params, Consign.class);
        Consign consign;
        if ((consign = this.findEntityById(tempconsign.getId())) == null) {
            throw new Exception("Can't find id: " + tempconsign.getId());
        }
        //编辑委托时只编辑内容
        consign.setConsignation(tempconsign.getConsignation());

        this.updateEntity(consign, user);
    }

    //增加委托
    public void addConsign(JSONObject params,List<MultipartFile> files,User user) throws Exception
    {

        String uid=UUID.randomUUID().toString();

        Consign consign=JSONObject.toJavaObject(params,Consign.class);
        consign.setId(uid);
        consign.setUser(user);

        //start activiti process
        String procID = consignActivitiService.createConsignProcess(params, user);
        consign.setProcessInstanceID(procID);
        this.saveEntity(consign, user);
    }
    //删除委托（不删除相关委托文件?）

    public void deleteConsign(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


}
