package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.web.Request;
import org.activiti.engine.*;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    protected ConsignActiviti consignActiviti;

    @Autowired
    protected ContractActiviti contractActiviti;


    public void updateProcessInstanceState(String processInstanceID, Request request)throws Exception
    {
        JSONObject params = request.getParams();
        String object = params.getString("object");
        String operation = params.getString("operation");
        if (object == null) {
            throw new Exception("object is null");
        }
        else if(object.equals("consign")) {
            if (operation.equals("submit")) {
                consignActiviti.submit(processInstanceID, request.getUser().getId());
            }
            else {
                consignActiviti.reviewConsign(operation, processInstanceID, request.getUser().getId());
            }
        }
        else if(object.equals("contract")) {
            if(operation.equals("submit")) {
                contractActiviti.submit(processInstanceID, request.getUser().getId());
            }
            else if(operation.contains("review")) {
                contractActiviti.reviewContract(processInstanceID,request.getUser().getId(),operation);
            }
            else if(operation.contains("confirm")) {
                contractActiviti.confirmContract(processInstanceID,request.getUser().getId(),operation);
            }
        }
        else {
            throw new Exception("can't recognize object");
        }
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

    //查询某个流程实例的历史活动的详细信息
    public List<String> queryHistoricTask(String processInstanceId) throws Exception
    {
        List<HistoricTaskInstance> hti=historyService.createHistoricTaskInstanceQuery()
                .processInstanceId(processInstanceId).orderByHistoricTaskInstanceStartTime().asc().list();
        List<String> htiList=new ArrayList<String>();
        if(hti.isEmpty()==false) {
            for(HistoricTaskInstance temp:hti){
                htiList.add(temp.getId()+" "+temp.getAssignee()+" "+temp.getName()+" "+temp.getEndTime()+'\n');
            }
            return htiList;
        }
        else throw new Exception("historicList is null");
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
}
