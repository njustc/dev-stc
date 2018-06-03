package com.sinosteel.activiti;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BaseOperation {

    @Autowired
    TaskService taskService;

    public void submit (String processInstanceId) throws  Exception
    {
        Task task=taskService.createTaskQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(task.getName().equals("TobeSubmit"))
            taskService.complete(task.getId());
        else throw new Exception("submit error");
    }

    public void reviewOrConfirm(String judge,String processInstanceId,String workerId ) throws Exception
    {
        Task task=taskService.createTaskQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(task.getName().equals("TobeReview")||task.getName().equals("TobeConfirm")){
            //taskService.claim(task.getId(),workerId);
            Map<String,Object> variables=new HashMap<String, Object>();
            variables.put("approval",judge);
            taskService.complete(task.getId(),variables);}
        else {
            throw new Exception("review contract error");
        }
    }
}
