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

    // TaskListenerlmpl taskListenerlmpl;

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
    public String createConsignProcess(String consignId, String clientId){
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ConsignID",consignId);
        variables.put("ClientID",clientId);
        ProcessInstance pi=processEngine.getRuntimeService().startProcessInstanceByKey("Consign",variables);
        return pi.getProcessInstanceId();
    }

    //通过流程实例的id查询流程实例的状态，参数为流程实例的id和委托的id
    public String getProcessState(String processInstanceId)
    {
        ProcessInstance pi=processEngine.getRuntimeService().createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(pi!=null)
        {
            if(!(processEngine.getTaskService()
                    .createTaskQuery().taskName("提交委托").processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待提交"+"\n";
            }
            else if(!(processEngine.getTaskService()
                    .createTaskQuery().taskName("审核委托").processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待审核"+"\n";
            }
            else
            {
                return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待新建"+"\n";
            }
        }
        else return "审核的ID为："+processInstanceId+" "+"目前的状态为：已结束"+"\n";
    }
    //根据用户的ID查询该用户的委托列表，参数为用户ID
    //注意：返回的是委托的流程ID
    //UserID包括clientId和WorkerID
    public String getUserTasks(String userId)
    {
        List<Task> tasks=processEngine.getTaskService()
                .createTaskQuery().taskAssignee(userId).list();
        String st = "";
        if(tasks.isEmpty())
            st="用户名为：" + userId+" Nothing need to completed!!"+"\n";
        else
        {
            for (Task task : tasks) {
                st+= "用户名为：" + task.getAssignee() + " 委托的流程ID为" + task.getProcessInstanceId() + " " + "目前的状态为:" + task.getName() + "\n";
            }}
        return st;
    }
    //提交委托，参数为流程实例id（由NewConsign返回）和用户ID
    public void submitConsign(String processInstanceId, String clientId)
    {
        Task task=processEngine.getTaskService()
                .createTaskQuery().taskAssignee(clientId).processInstanceId(processInstanceId).singleResult();
        if(task.getAssignee()!=null) {
            processEngine.getTaskService().complete(task.getId());
        }
        else
        {
            System.out.println("your clientId can not match your processInstanceId ");
        }
        // System.out.println("finished");
    }

    //s设置审核委托的工作人员Id，输入为委托流程的Id和工作人员Id
    public void setWorker(String processInstanceId, String workerId)
    {
        Task task1=processEngine.getTaskService().createTaskQuery().taskName("审核委托")
                .processInstanceId(processInstanceId).singleResult();
        processEngine.getTaskService().setAssignee(task1.getId(),workerId);
        // Task task=processEngine.getTaskService()
        //       .createTaskQuery().taskAssignee(workerId).processInstanceId(processInstanceId).singleResult();
        //System.out.println(task.getAssignee());
    }
    //委托评审
    //参数为Boolean类型的PassOrNot（同意为true，不同意为false），流程实例id（由startprocess返回）和用户ID
    public void checkConsign(Boolean passOrNot, String processInstanceId, String workerId)
    {
        Map<String,Object> variables=new HashMap<String, Object>();
        //variables.put("WorkerID",workerId);
        variables.put("Approval",passOrNot);
        Task task=processEngine.getTaskService()
                .createTaskQuery().taskAssignee(workerId).processInstanceId(processInstanceId).singleResult();
        if(task.getAssignee()!=null)
        {
            processEngine.getTaskService().complete(task.getId(),variables);
        }
        else
        {
            System.out.println("your workerId can not match your processInstanceId ");
        }
    }
    /********说明：因为每个流程实例自动结束，所以委托评审通过后，流程实例自动结束*******/
}
