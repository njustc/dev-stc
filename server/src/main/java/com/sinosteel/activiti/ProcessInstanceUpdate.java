package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.User;
import com.sinosteel.framework.core.web.Request;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class ProcessInstanceUpdate {
    @Autowired
    RuntimeService runtimeService;
    @Autowired
    TaskService taskService;
    @Autowired
    HistoryService historyService;

    @Autowired
    private BaseOperation baseOperation;

    public String createConsignProcess(String consignId, String clientId){
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ConsignID",consignId);
        variables.put("ClientID",clientId);
        variables.put("WorkerIDs","W0");
        variables.put("WorkerIDs","W1");
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("Consign",variables);
        return pi.getProcessInstanceId();
    }

    public String createContractProcess(String contractId, String clientId)throws Exception{
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ContractID",contractId);
        variables.put("ClientID",clientId);
        variables.put("WorkerIDs","W0");
        variables.put("WorkerIDs","W1");
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("contract",variables);
        return pi.getProcessInstanceId();
    }

    public void updateProcess(String processInstanceId,Request request) throws Exception
    {
        JSONObject params = request.getParams();
        String object = params.getString("object");
        String operation = params.getString("operation");
        if (object == null) {
            throw new Exception("object is null");
        }
        if(operation.equals("submit"))
            baseOperation.submit(processInstanceId);
        else
            baseOperation.reviewOrConfirm(operation,processInstanceId,request.getUser().getId());

    }
    public String getProcessState(String processInstanceId) throws Exception
    {
        ProcessInstance pi=runtimeService.createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        List<HistoricActivityInstance> pi1=historyService.createHistoricActivityInstanceQuery()
                .processInstanceId(processInstanceId).list();
        if(pi==null&&pi1.isEmpty()==false) {
            return "Finished";
        }
        else if(pi!=null) {
            Task task=taskService.createTaskQuery()
                    .processInstanceId(processInstanceId).singleResult();
            return task.getName();
            }
        else{
            return "NotExist";}
    }
}