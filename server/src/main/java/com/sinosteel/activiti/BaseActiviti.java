package com.sinosteel.activiti;

import org.activiti.engine.*;
import org.activiti.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Paul
 */

public class BaseActiviti {
    private static final Logger logger = LoggerFactory.getLogger(com.sinosteel.activiti.ConsignActiviti.class);

    @Autowired
    protected RuntimeService runtimeService;

    @Autowired
    protected TaskService taskService;

    @Autowired
    protected HistoryService historyService;

    @Autowired
    protected ProcessEngine processEngine;

    @Autowired
    protected RepositoryService repositoryService;

    /*@Autowired
    public void deploy(String bpmnPath) {
        processEngine=ProcessEngines.getDefaultProcessEngine();
        // System.out.println(processEngine);
        repositoryService = processEngine.getRepositoryService();
        repositoryService.createDeployment()
                .addClasspathResource(bpmnPath)
                .deploy();
    }*/

    //基类的提交，供具体流程调用，参数为processInstanceId和用户的Id
    public void submit(String processInstanceId,String id)
    {
        Task task=taskService.createTaskQuery().taskAssignee(id)
                .processInstanceId(processInstanceId).singleResult();
        if(task.getAssignee()!=null) {
            taskService.complete(task.getId());
        }
        else
        {
            System.out.println("Submit Failed");
        }
    }

    //基类的评审，适用于需要提供判断的情况
    public void check(Boolean passOrNot,String processInstanceId,String workerId,String activitiVari)
    {
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put(activitiVari,passOrNot);
        Task task=taskService.createTaskQuery().taskAssignee(workerId)
                .processInstanceId(processInstanceId).singleResult();
        if(task.getAssignee()!=null)
        {
            taskService.complete(task.getId(),variables);
        }
        else
        {
            System.out.println("workerId can not match processInstanceId ");
        }
    }

    //根据客户的ID查询该用户的任务列表，参数为用户ID
    //查询客户的任务列表可直接使用此函数
    //注意：返回的是流程ID
    public String getUserTasks(String userId)
    {
        List<Task> tasks=taskService.createTaskQuery().taskAssignee(userId).list();
        String st = "";
        if(tasks.isEmpty())
            st="用户名为：" + userId+" have nothing to settle!!"+"\n";
        else
        {
            for (Task task : tasks) {
                st+= "用户名为：" + task.getAssignee() + " 流程ID为" + task.getProcessInstanceId() + " " + "目前的状态为:" + task.getName() + "\n";
            }}
        return st;
    }
}
