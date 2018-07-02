package com.sinosteel.activiti;

import org.activiti.engine.*;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Paul 合同部分包括客户提交合同，工作人员审核合同，客户最终确认合同 以及查询流程实例进程，查询客户任务以及工作人员任务
 */

@Service
public class ContractActiviti {
    @Autowired
    protected RuntimeService runtimeService;

    @Autowired
    protected TaskService taskService;

    @Autowired
    protected HistoryService historyService;

    // 新建一个合同，返回这个流程实例的id
    // 目前的参数为合同ID，客户ID，市场部主任ID和质量部主任ID
    // 市场部主任和质量部主任应该是固定的吧？
    public String createContractProcess(String contractId, String clientId, String workerId) throws Exception {
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("ContractID", contractId);
        variables.put("ClientID", clientId);
        variables.put("WorkerIDs", workerId);
        ProcessInstance pi = runtimeService.startProcessInstanceByKey("contract", variables);
        return pi.getProcessInstanceId();
    }

    public void submit(String processInstanceId, String ClientId) throws Exception {
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
        if (task.getName().equals("TobeSubmit"))
            taskService.complete(task.getId());
        else
            throw new Exception("submit error");
    }

    // 工作人员评审合同，参数为工作人员ID（市场部主任ID或质量部主任ID，二选一），布尔型的passOrNot
    // 若通过，流程继续
    // 若不通过，跳转至提交合同状态
    public void reviewContract(String processInstanceId, String workerId, String judge) throws Exception {
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
        if (task.getName().equals("TobeReview")) {
            taskService.claim(task.getId(), workerId);
            Map<String, Object> variables = new HashMap<String, Object>();
            variables.put("approval", judge);
            taskService.complete(task.getId(), variables);
        } else {
            throw new Exception("review contract error");
        }
    }

    // 客户确认合同，参数为客户ID和布尔型的passOrNot
    // 若确认，则整个流程结束
    // 若否决，则流程跳转至提交合同状态
    public void confirmContract(String processInstanceId, String clientId, String judge) throws Exception {
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
        if (task.getName().equals("TobeConfirm")) {
            Map<String, Object> variables = new HashMap<String, Object>();
            variables.put("approval", judge);
            taskService.complete(task.getId(), variables);
        } else {
            throw new Exception("confirm contract error");
        }
    }
}
