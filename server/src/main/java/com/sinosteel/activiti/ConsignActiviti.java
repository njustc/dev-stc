package com.sinosteel.activiti;


import com.sinosteel.domain.Consign;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertNotNull;
/**
 * @author Paul
 * activiti部分：实现整个流程的推进
 * 包括新建委托、提交委托、审核委托、根据委托ID查询、根据客户ID查询和查询工作人员待处理委托
 */
@Service
//enum bpmnVar{ConsignID,ClientID,Approval}
//enum bpmnTaskName{TobeSubmit,TobeCheck}
public class ConsignActiviti extends BaseActiviti{

    /*public void deply()
    {
        ProcessEngine processEngine= ProcessEngines.getDefaultProcessEngine();
        processEngine.getRepositoryService()
                .createDeployment().addClasspathResource("processes/Consign.bpmn20.xml")
                .deploy();
    }*/
    //新建一个委托，参数为委托的ID和客户的ID，返回这个流程实例的id
    public String createConsignProcess(String consignId, String clientId){
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ConsignID",consignId);
        variables.put("ClientID",clientId);
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("Consign",variables);
        return pi.getProcessInstanceId();
    }

    //提交委托，参数为流程实例id（由NewConsign返回）和用户ID
    /*public void submitConsign(String processInstanceId, String clientId) throws Exception
    {
        this.submit(processInstanceId,clientId);
    }*/

    //委托评审
    //参数为Boolean类型的PassOrNot（同意为true，不同意为false），流程实例id（由startprocess返回）和用户ID
    public void checkConsign(Boolean passOrNot, String processInstanceId, String workerId) throws Exception
    {
        Task task1=taskService.createTaskQuery().taskName("TobeCheck")
                .processInstanceId(processInstanceId).singleResult();
        if(task1!=null)
        {
            taskService.setAssignee(task1.getId(),workerId);
            this.check(passOrNot,processInstanceId,workerId,"Approval");
        }
    }

    //根据用户的ID查询该用户的委托列表，参数为用户ID
    //注意：返回的是委托的流程ID
    //UserID包括clientId和WorkerID
    public List<Task> getClientTasks(String ClientId)
    {
        return this.getUserTasks(ClientId);
    }

    //查询测试人员需处理的委托列表
    public List<Task> GetWorkerTasks()
    {
        List<Task> tasks=taskService.createTaskQuery().taskName("TobeCheck").list();
        return tasks;
    }
    /********说明：因为每个流程实例自动结束，所以委托评审通过后，流程实例自动结束*******/
}
