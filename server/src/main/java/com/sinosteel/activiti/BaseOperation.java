package com.sinosteel.activiti;

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

    enum state{TobeSubmit,TobeReview,TobeConfirm,TobeWrite,TobeImplement}

    /**
     * 没有gate的task,对应于所有流程图中的提交,编写，实施等
     * @param processInstanceId
     * @throws Exception
     */
    public void noGate (String processInstanceId) throws  Exception
    {
        Task task=taskService.createTaskQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(task.getName().equals(state.TobeSubmit.name())||task.getName().equals(state.TobeWrite.name())
                    ||task.getName().equals(state.TobeImplement.name()))
            taskService.complete(task.getId());
        else throw new Exception( task.getName()+"error");
    }

    /**
     * 对应于流程图中有gate，需要提供参数判断流程走向的操作
     * @param operation request中的operation
     * @param processInstanceId
     * @param workerId 分配给用户组中的成员ID
     * @throws Exception
     */
    public void containGate(String operation,String processInstanceId,String workerId ) throws Exception
    {
        Task task=taskService.createTaskQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(task.getName().equals(state.TobeReview.name())||task.getName().equals(state.TobeConfirm.name())){
            //taskService.claim(task.getId(),workerId);
            Map<String,Object> variables=new HashMap<String, Object>();
            variables.put("approval",operation);
            taskService.complete(task.getId(),variables);}
        else {
            throw new Exception(task.getProcessDefinitionId()+ "error");
        }
    }
}
