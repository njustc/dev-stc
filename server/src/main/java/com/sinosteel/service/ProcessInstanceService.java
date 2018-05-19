package com.sinosteel.service;

import com.alibaba.fastjson.JSONObject;
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
    private ConsignActiviti consignActiviti;



    public JSONObject queryProcessState(String processInstanceID) throws Exception {
        String state = consignActiviti.getProcessState(processInstanceID);

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
        String operation = params.getString("operation");

        if (operation.equals("submit")) {
            consignActiviti.submitConsign(processInstanceID, request.getUser().getId());
        }
        else if (operation.equals("pass"))
            consignActiviti.checkConsign(true, processInstanceID, request.getUser().getId());
        else if (operation.equals("reject"))
            consignActiviti.checkConsign(false, processInstanceID, request.getUser().getId());

        return queryProcessState(processInstanceID);
    }
}
