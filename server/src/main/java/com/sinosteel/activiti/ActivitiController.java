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
public class ActivitiController {
    private static final Logger logger = LoggerFactory.getLogger(com.sinosteel.activiti.ActivitiController.class);

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

    private HistoryService historyService;
    ProcessEngine processEngine;
    RepositoryService repositoryService;
    String ProcessInstanceId;
    //deploy the dpmn

    public void deploy() {
        processEngine = ProcessEngines.getDefaultProcessEngine();
        repositoryService = processEngine.getRepositoryService();
        repositoryService.createDeployment()
                .addClasspathResource("processes/entrust.bpmn20.xml")
                .deploy();
        System.out.println("deploy success, processEngine name: " + processEngine.getName());
    }
    //开启一个流程实例，因为默认只有一个合同，所以参数为entrust，返回这个流程实例的id
    public String startProcess(String id){
        ProcessInstance pi=processEngine.getRuntimeService().startProcessInstanceByKey(id);
        String processInstanceId = new String(pi.getProcessInstanceId());
        return processInstanceId;
    }
    //查询任务
    public String GetTaskState(String name)
    {
        List<Task> tasks=processEngine.getTaskService()
                .createTaskQuery().taskAssignee(name).list();
        String st = new String();
        for (Task task : tasks) {
            st+=new String(task.getId() + " " + task.getName() + " " + task.getAssignee()+"\n");
        }
        return st;
    }
    //通过流程实例的id查询流程实例的状态，参数为流程实例的id
    public String GetProcessState(String processInstanceId)
    {
        ProcessInstance pi=processEngine.getRuntimeService().createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        //ProcessInstance pi = pis.get(0);
        if(pi!=null)
        {
            //return "running";//
            return pi.getActivityId();
        }
        else return "finished";
    }
    //因为目前没有客户表，所以默认只有一个用户，通过流程实例的id和客户名（默认为客户）提交审核
    //参数为流程实例id（由startprocess返回）
    public void Submit(String processInstanceId)
    {
        List<ProcessInstance> pis=processEngine.getRuntimeService().createProcessInstanceQuery()
                .processInstanceId(processInstanceId).list();
        ProcessInstance pi = pis.get(0);
        List<Task> tasks=processEngine.getTaskService()
                .createTaskQuery().taskAssignee("客户").processInstanceId(processInstanceId).list();
        Task task = tasks.get(0);
        processEngine.getTaskService().complete(task.getId());
        // System.out.println("finished");
    }
    //评审审核
    //因为目前没有客户表，所以默认只有一个用户，通过流程实例的id和工作人员名（默认为"市场部工作人员"）评审审核
    //参数为Boolean类型的pass（同意为true，不同意为false），流程实例id（由startprocess返回）
    public void Check(Boolean pass,String processInstanceId)
    {
        Map<String,Object> variables1=new HashMap<String, Object>();
        variables1.put("Approval",pass);
        List<Task> tasks=processEngine.getTaskService()
                .createTaskQuery().taskAssignee("市场部工作人员").processInstanceId(processInstanceId).list();
        Task task = tasks.get(0);
        processEngine.getTaskService().complete(task.getId(),variables1);
        // System.out.println("finished");
    }
    //停止引擎
    public void suspendTask()
    {
        RuntimeService runtimeService = processEngine.getRuntimeService();
        repositoryService.suspendProcessDefinitionByKey("entrust");
    }
}
