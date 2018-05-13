package com.sinosteel.service;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ConsignActiviti;
import com.sinosteel.framework.config.system.SystemConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author LBW
 */
@Service
public class ConsignActivitiService
{
    @Autowired
    private SystemConfig systemConfig;

    @Autowired
    private ConsignActiviti consignActiviti;

    public JSONObject queryConsignState(String processInstanceID)
    {
        String state = consignActiviti.getProcessState(processInstanceID);

        JSONObject queryResultJson = new JSONObject();
        queryResultJson.put("processInstanceID",  processInstanceID);
        queryResultJson.put("state", state);

        return queryResultJson;
    }
}
