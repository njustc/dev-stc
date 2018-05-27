package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.BaseActiviti;
import com.sinosteel.activiti.ConsignActiviti;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.User;
import com.sinosteel.framework.core.web.Request;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.activiti.spring.integration.Activiti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcessInstanceService {
    @Autowired
    private BaseActiviti baseActiviti;
    @Autowired
    private ConsignActiviti consignActiviti;
    //@Autowired
    //private ContractActiviti contractActiviti;
    /*开启一个委托实例*/
    public String createConsignProcess(JSONObject params, User user)
    {
        Consign consign = JSONObject.toJavaObject(params, Consign.class);
        return consignActiviti.createConsignProcess(consign.getId(), user.getId());
    }
    /*更新具体流程实例状态*/
    public JSONObject updateProcessState(String processInstanceID, Request request) throws Exception {
        JSONObject params = request.getParams();
        String object = params.getString("object");
        String operation = params.getString("operation");
        if (operation.compareTo("submit")==0)
        {
            //System.out.println("submit");
            baseActiviti.submit(processInstanceID, request.getUser().getId());
        }
         else if (object == null) {
            throw new Exception("object is null");
        }
        else if(object.equals("consign")) {
             //if (object.equals("review")) {
             if (operation.equals("pass"))
                 consignActiviti.checkConsign(true, processInstanceID, request.getUser().getId());
             else if (operation.equals("reject"))
                 consignActiviti.checkConsign(false, processInstanceID, request.getUser().getId());
             //}
         }
         else if(object.equals("contract"))
        {

        }
        else {
            throw new Exception("can't recognize object");
        }
        return queryProcessState(processInstanceID);
    }
    /*查询具体流程实例状态*/
    public JSONObject queryProcessState(String processInstanceID) throws Exception {
        String state = baseActiviti.getProcessState(processInstanceID);
        JSONObject queryResultJson = new JSONObject();
        queryResultJson.put("processInstanceID",  processInstanceID);
        queryResultJson.put("state", state);
        return queryResultJson;
    }
}
