package com.sinosteel.activiti;

import org.activiti.engine.*;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConsignActiviti {
    private static final Logger logger = LoggerFactory.getLogger(com.sinosteel.activiti.ConsignActiviti.class);

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private HistoryService historyService;

    private ProcessEngine processEngine;

    private RepositoryService repositoryService;

    //部署整个引擎
    public void deploy() {
        processEngine = ProcessEngines.getDefaultProcessEngine();
        repositoryService = processEngine.getRepositoryService();
        repositoryService.createDeployment()
                .addClasspathResource("processes/Consign.bpmn20.xml")
                .deploy();
       // System.out.println(processEngine.getName());
    }

    //新建一个委托，参数为委托的ID，返回这个流程实例的id
    public String NewConsign(String ConsignId,String UserId,String WorkerId){
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ConsignID",ConsignId);
        variables.put("UserID",UserId);
        variables.put("WorkerID",WorkerId);
        //variables.put("UserID","TC");
        ProcessInstance pi=processEngine.getRuntimeService().startProcessInstanceByKey("Consign",variables);
        return pi.getProcessInstanceId();
    }

    //通过流程实例的id和委托的id查询流程实例的状态，参数为流程实例的id和委托的id
   public String GetProcessState(String processInstanceId,String ConsignId)
    {
        ProcessInstance pi=processEngine.getRuntimeService().createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(pi!=null)
        {
            if(!(processEngine.getTaskService()
                    .createTaskQuery().taskName("提交委托").processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "审核的ID为："+ConsignId+" "+"目前的状态为：委托待提交"+"\n";
            }
            else if(!(processEngine.getTaskService()
                    .createTaskQuery().taskName("审核委托").processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "审核的ID为："+ConsignId+" "+"目前的状态为：委托待审核"+"\n";
            }
            else
            {
                return "审核的ID为："+ConsignId+" "+"目前的状态为：委托待新建"+"\n";
            }
        }
        else return "审核的ID为："+ConsignId+" "+"目前的状态为：已结束"+"\n";
    }
    //根据用户的ID查询该用户的委托列表，参数为用户ID
    //注意：返回的是委托的流程ID
    public String GetUserTasks(String UserID)
    {
        List<Task> tasks=processEngine.getTaskService()
                .createTaskQuery().taskAssignee(UserID).list();
        String st = "";
        if(tasks.isEmpty())
            st="客户名为：" + UserID+" Nothing need to completed!!"+"\n";
        else
        {
        for (Task task : tasks) {
            st+= "客户名为：" + task.getAssignee() + "委托的流程ID为" + task.getProcessInstanceId() + " " + "目前的状态为:" + task.getName() + "\n";
        }}
        return st;
    }
    //提交委托，参数为流程实例id（由NewConsign返回）和用户ID
    public void SubmitConsign(String processInstanceId,String UserId)
    {
       Task task=processEngine.getTaskService()
                .createTaskQuery().taskAssignee(UserId).processInstanceId(processInstanceId).singleResult();
        processEngine.getTaskService().complete(task.getId());
       // System.out.println("finished");
    }
    //委托评审
    //参数为Boolean类型的PassOrNot（同意为true，不同意为false），流程实例id（由startprocess返回）和用户ID
    public void CheckConsign(Boolean PassOrNot,String processInstanceId,String UserId)
    {
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("Approval",PassOrNot);
        Task task=processEngine.getTaskService()
                .createTaskQuery().taskAssignee(UserId).processInstanceId(processInstanceId).singleResult();
        processEngine.getTaskService().complete(task.getId(),variables);
    }
    /********说明：因为每个流程实例自动结束，所以委托评审通过后，流程实例自动结束*******/
}
