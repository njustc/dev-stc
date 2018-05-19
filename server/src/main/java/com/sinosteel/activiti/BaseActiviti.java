package com.sinosteel.activiti;

import org.activiti.engine.*;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.runtime.ProcessInstance;
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

    //基类的提交，供具体流程调用，参数为processInstanceId和用户的Id
    public void submit (String processInstanceId,String id) throws  Exception
    {
        try
        {Task task=taskService.createTaskQuery().taskAssignee(id)
                .processInstanceId(processInstanceId).singleResult();
        //if(task.getAssignee()!=null) {
            taskService.complete(task.getId());
          //  }
        }
        catch (Exception e)
        {
            System.out.println("Submit Failed");
            throw e;
        }

    }

    //基类的评审，适用于需要提供判断的情况
    public void check(Boolean passOrNot,String processInstanceId,String workerId,String activitiVari) throws Exception
    {
        try {
            Map<String,Object> variables=new HashMap<String, Object>();
        variables.put(activitiVari,passOrNot);
        Task task=taskService.createTaskQuery().taskAssignee(workerId)
                .processInstanceId(processInstanceId).singleResult();
        //if(task.getAssignee()!=null)
        //{
            taskService.complete(task.getId(),variables);
        //}
        }
        catch (Exception e)
        {
            System.out.println("workerId can not match processInstanceId ");
            throw e;
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

    //根据流程实例的id查询流程实例当前的状态
    public String getProcessState(String processInstanceId) throws Exception
    {
        ProcessInstance pi=runtimeService.createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        List<HistoricActivityInstance> pi1=historyService.createHistoricActivityInstanceQuery()
                .processInstanceId(processInstanceId).list();
        if(pi==null&&pi1.isEmpty()==false)
        {
            return "Finished";
        }
        else if(pi!=null)
        {
            List<HistoricTaskInstance> htiList=historyService.createHistoricTaskInstanceQuery()
                    .processInstanceId(processInstanceId).orderByHistoricTaskInstanceStartTime().desc().list();
            if(htiList.isEmpty()==false)
            {
                for (HistoricTaskInstance hti:htiList.subList(0,1))
                {
                    return "State："+hti.getName()+" From: "+hti.getProcessDefinitionId();
                }
            }
        }
        return "Not Exist";
    }


}
