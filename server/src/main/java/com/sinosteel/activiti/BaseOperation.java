package com.sinosteel.activiti;

import com.sinosteel.framework.mybatis.UserMapper;
import org.activiti.engine.FormService;
import org.activiti.engine.TaskService;
import org.activiti.engine.form.FormProperty;
import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BaseOperation {

    @Autowired
    TaskService taskService;
    @Autowired
    FormService formService;
    @Autowired
    private UserMapper userMapper;

    enum state{TobeSubmit,TobeReview,TobeConfirm,TobeWrite,TobeImplement,
                TobeApprove,TobeSend,TobeDone,TobeFiling,Satisfaction}

    /**
     * 没有gate的task,对应于所有流程图中的提交,编写，实施等
     * @param processInstanceId
     * @throws Exception
     */
    public void noGate (String processInstanceId,String workerId) throws  Exception
    {
        List<String> userids = userMapper.getUserIdsByRoleId("1");
        Task task=taskService.createTaskQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(task.getName().equals(state.TobeSubmit.name())||task.getName().equals(state.TobeWrite.name())
                ||task.getName().equals(state.TobeImplement.name())||task.getName().equals(state.TobeDone.name())
                ||task.getName().equals(state.Satisfaction.name())||task.getName().equals(state.TobeFiling.name())
                ||task.getName().equals(state.TobeSend.name())){
            if(userids.contains(workerId))
                taskService.claim(task.getId(),workerId);
            taskService.complete(task.getId());
        }
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
        List<String> userids = userMapper.getUserIdsByRoleId("1");
        Task task=taskService.createTaskQuery()
                .processInstanceId(processInstanceId).singleResult();
        TaskFormData taskFormData=formService.getTaskFormData(task.getId());
        List<FormProperty> formProperties=taskFormData.getFormProperties();
        List<String> varies=new ArrayList<String>() ;
        for(FormProperty formProperty:formProperties) {
            if("enum".equals(formProperty.getType().getName())) {
                //System.out.print(formProperty.getId()+"  +"+formProperty.getName()+" +"+formProperty.getValue());
                varies.add(formProperty.getId());
            }
        }
        if(task.getName().equals(state.TobeReview.name())||task.getName().equals(state.TobeConfirm.name())
                ||task.getName().equals(state.TobeApprove.name())){
            if(userids.contains(workerId))
                taskService.claim(task.getId(),workerId);
            Map<String,Object> variables=new HashMap<String, Object>();
            for(String tmp:varies) {
                variables.put(tmp,operation);
            }
            taskService.complete(task.getId(),variables);}
        else {
            throw new Exception(task.getProcessDefinitionId()+ "error");
        }
    }
}
