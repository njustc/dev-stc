package com.sinosteel.activiti;

import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Paul
 * 合同部分包括客户提交合同，工作人员审核合同，客户最终确认合同
 * 以及查询流程实例进程，查询客户任务以及工作人员任务
 */

@Service
public class ContractActiviti extends BaseActiviti{
    //新建一个合同，返回这个流程实例的id
    //目前的参数为合同ID，客户ID，市场部主任ID和质量部主任ID
    //市场部主任和质量部主任应该是固定的吧？
    public String createContractProcess(String contractId, String clientId,
                                         String  workerId )throws Exception{
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ContractID",contractId);
        variables.put("ClientID",clientId);
        variables.put("WorkerID",workerId);
        //variables.put("marketEmployerId",marketEmployerId);
        //variables.put("qualityEmployerId",qualityEmployerId);
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("contract",variables);
        return pi.getProcessInstanceId();
    }

    //客户提交合同，参数为流程ID和客户ID
    /* public void submitContract(String processInstanceId,String clientId) throws Exception
    {
        this.submit(processInstanceId,clientId);
    }*/

    //工作人员评审合同，参数为工作人员ID（市场部主任ID或质量部主任ID，二选一），布尔型的passOrNot
    //若通过，流程继续
    //若不通过，跳转至提交合同状态
    public void checkContract(String processInstanceId,String workerId,Boolean passOrNot) throws Exception
    {
        Task task1=taskService.createTaskQuery().taskName("TobeCheck")
                .processInstanceId(processInstanceId).singleResult();
        taskService.claim(task1.getId(),workerId);
        this.check(passOrNot,processInstanceId,workerId,"Approval");
    }

    //客户确认合同，参数为客户ID和布尔型的passOrNot
    //若确认，则整个流程结束
    //若否决，则流程跳转至提交合同状态
    public void confirmContract(String processInstanceId,String clientId,Boolean passOrNot)throws Exception
    {
        this.check(passOrNot,processInstanceId,clientId,"Confirm");
    }

    //查询市场部主任的任务列表
    public List<Task> getMarketEmployerTasks(String marketEmployerId)
    {
        return this.getUserTasks(marketEmployerId);
    }

    //查询质量部主任的任务列表
    public List<Task> getQualityEmployerTasks(String qualityEmployerId)
    {
        return this.getUserTasks(qualityEmployerId);
    }

}
