package com.sinosteel.activiti;

import org.activiti.engine.*;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Paul
 */
@Service
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

    /**
     * the submit function when the client submit a consign or a contract
     * @param processInstanceId
     * @param ClientId
     */
    public void submit (String processInstanceId,String ClientId) throws  Exception
    {
        try {
            Task task=taskService.createTaskQuery().taskAssignee(ClientId)
                .processInstanceId(processInstanceId).singleResult();
            taskService.complete(task.getId());
        }
        catch (Exception e)
        {
            throw new Exception("Submit Failed");
        }
    }

    /**
     * 基类的评审，适用于需要提供判断的情况,不单独使用，需要子类调用
     * @param passOrNot pass:true reject:false
     * @param processInstanceId
     * @param workerId  the worker who check the processInstance
     * @param activitiVari the param in the bpmnmodel
     */
    public void check(Boolean passOrNot,String processInstanceId,String workerId,String activitiVari) throws Exception
    {
        try {
            Map<String,Object> variables=new HashMap<String, Object>();
        variables.put(activitiVari,passOrNot);
        Task task=taskService.createTaskQuery().taskAssignee(workerId)
                .processInstanceId(processInstanceId).singleResult();
        if(task!=null)
            { taskService.complete(task.getId(),variables);}

        }
        catch (Exception e)
        {
            //System.out.println("workerId can not match processInstanceId ");
            throw new Exception("workerId can not match processInstanceId");
        }

    }


    /**
     * 根据用户的ID查询该用户的任务列表
     * @param userId
     * @return return the task list need to finish
     */
    public List<Task> getUserTasks(String userId)
    {
        List<Task> tasks=taskService.createTaskQuery().taskAssignee(userId).list();
        return tasks;
    }

    /**
     * 根据流程实例的id查询流程实例当前的状态
     * @param processInstanceId
     * @return return the state of processInstance
     */
    public String getProcessState(String processInstanceId) throws Exception
    {
        ProcessInstance pi=runtimeService.createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        List<HistoricActivityInstance> pi1=historyService.createHistoricActivityInstanceQuery()
                .processInstanceId(processInstanceId).list();
        if(pi==null&&pi1.isEmpty()==false)
        {
            //return state.Finished.toString();
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
                    return hti.getName();
                }
            }
        }
        //return state.NotExist.toString();
        return "NotExist";
    }

    //查询某个流程实例的历史活动的详细信息
    public List<HistoricTaskInstance> queryHistoricTask(String processInstanceId) throws Exception
    {
        //String st="";
        List<HistoricTaskInstance> htiList=historyService.createHistoricTaskInstanceQuery()
                .processInstanceId(processInstanceId).orderByHistoricTaskInstanceStartTime().asc().list();
        return htiList;
    }

}
