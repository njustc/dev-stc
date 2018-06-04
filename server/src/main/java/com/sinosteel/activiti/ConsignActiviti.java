package com.sinosteel.activiti;


import com.sinosteel.domain.Consign;
import org.activiti.engine.*;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * @author Paul
 * activiti部分：实现整个流程的推进
 * 包括新建委托、提交委托、审核委托、根据委托ID查询、根据客户ID查询和查询工作人员待处理委托
 */
@Service
public class ConsignActiviti {
    @Autowired
    protected RuntimeService runtimeService;

    @Autowired
    protected TaskService taskService;

    @Autowired
    protected HistoryService historyService;

    //新建一个委托，参数为委托的ID和客户的ID，返回这个流程实例的id
    public String createConsignProcess(String consignId, String clientId){
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ConsignID",consignId);
        variables.put("ClientID",clientId);
        variables.put("WorkerIDs","W0");
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("Consign",variables);
        return pi.getProcessInstanceId();
    }

    public void submit (String processInstanceId,String ClientId) throws  Exception
    {
        Task task=taskService.createTaskQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(task.getName().equals("TobeSubmit"))
            taskService.complete(task.getId());
        else throw new Exception("submit error");
    }

    //委托评审
    //参数为Boolean类型的PassOrNot（同意为true，不同意为false），流程实例id（由startprocess返回）和用户ID
    public void reviewConsign(String judge, String processInstanceId, String workerId) throws Exception
    {
        Task task=taskService.createTaskQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(task.getName().equals("TobeReview")) {
            taskService.setAssignee(task.getId(),workerId);
            Map<String,Object> variables=new HashMap<String, Object>();
            variables.put("approval",judge);
            //taskService.co
            taskService.complete(task.getId(),variables);
            }
         else{
             throw new Exception("review consign error");
            }
    }
}
