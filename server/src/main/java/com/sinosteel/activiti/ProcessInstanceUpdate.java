package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.User;
import com.sinosteel.framework.core.web.Request;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class ProcessInstanceUpdate {
    @Autowired
    RuntimeService runtimeService;

    @Autowired
    TaskService taskService;

    @Autowired
    HistoryService historyService;

    @Autowired
    private BaseOperation baseOperation;

    enum TaskOperation{submit,review,confirm,write,implement}

    /**
     * TODO 将用户组传入流程实例
     *  新建一个新的委托实例
     * @param consignId 委托ID
     * @param clientId 客户ID
     *
     */
    public String createConsignProcess(String consignId, String clientId){
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ConsignID",consignId);
        variables.put("ClientID",clientId);
/*        variables.put("WorkerIDs","W0");
        variables.put("WorkerIDs","W1");*/
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("Consign",variables);
        return pi.getProcessInstanceId();
    }

    /**
     *  TODO 将用户组传入流程实例
     * 新建一个新的合同实例
     * @param contractId 委托ID
     * @param clientId 客户ID
     *
     */
    public String createContractProcess(String contractId, String clientId)throws Exception{
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ContractID",contractId);
        variables.put("ClientID",clientId);
/*        variables.put("WorkerIDs","W0");
        variables.put("WorkerIDs","W1");*/
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("contract",variables);
        return pi.getProcessInstanceId();
    }

    /**
     * 根据具体流程实例的ID，更新其状态
     * @param processInstanceId 流程实例ID
     * @param request
     * @throws Exception
     */
    public void updateProcess(String processInstanceId,Request request) throws Exception
    {
        JSONObject params = request.getParams();
        String object = params.getString("object");
        String operation = params.getString("operation");
        if (object == null) {
            throw new Exception("object is null");
        }
        if(operation.contains(TaskOperation.submit.name())||operation.contains(TaskOperation.write.name())
                ||operation.contains(TaskOperation.implement.name()))
            baseOperation.noGate(processInstanceId);
        else if(operation.contains(TaskOperation.review.name())||operation.contains(TaskOperation.confirm.name()))
            baseOperation.containGate(operation,processInstanceId,request.getUser().getId());
        else
            throw new Exception("Operation match failed");

    }

    /**
     * 根据具体流程实例的ID获取其在流程中的状态
     * @param processInstanceId
     * @return 返回所在task的Name，若结束则返回Finisned，若不存在则返回NotExist
     * @throws Exception
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
}