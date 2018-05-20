package com.sinosteel.service;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.BaseActiviti;
import com.sinosteel.activiti.ConsignActiviti;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.User;
import com.sinosteel.framework.core.web.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author LBW
 */
@Service
public class ProcessInstanceService
{
    //TODO: needs to deal with different kinds of entities.

    @Autowired
    private BaseActiviti baseActiviti;
    @Autowired
    private ConsignActiviti consignActiviti;



    public JSONObject queryProcessState(String processInstanceID) throws Exception {
        String state = getProcessState(processInstanceID);

        JSONObject queryResultJson = new JSONObject();
        queryResultJson.put("processInstanceID",  processInstanceID);
        queryResultJson.put("state", state);

        return queryResultJson;
    }

    public String createConsignProcess(JSONObject params, User user)
    {
        Consign consign = JSONObject.toJavaObject(params, Consign.class);

        return consignActiviti.createConsignProcess(consign.getId(), user.getId());
    }



    public JSONObject updateProcessState(String processInstanceID, Request request) throws Exception {
        JSONObject params = request.getParams();
        String object = params.getString("object");
        String operation = params.getString("operation");

        //submit类型的操作可以不管具体实体， 直接执行
        if (operation.equals("submit")) {
            baseActiviti.submit(processInstanceID, request.getUser().getId());
        }
        //其余操作需要根据具体实体做决定
        else if (object == null) {
            throw new Exception("object is null");
        }
        else if(object.equals("consign")) {
            if (operation.equals("pass"))
                consignActiviti.checkConsign(true, processInstanceID, request.getUser().getId());
            else if (operation.equals("reject"))
                consignActiviti.checkConsign(false, processInstanceID, request.getUser().getId());
        }
        else {
            throw new Exception("can't recognize object");
        }
        return queryProcessState(processInstanceID);
    }
    //Make other service convenient to get process state
    private String getProcessState(String processInstanceID) throws Exception {
        return baseActiviti.getProcessState(processInstanceID);
    }
}
