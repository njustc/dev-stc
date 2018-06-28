package com.sinosteel.activiti;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.mybatis.UserMapper;
import org.activiti.engine.*;
import org.activiti.engine.form.FormProperty;
import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TCProcessEngine {

    @Autowired
    RuntimeService runtimeService;

    @Autowired
    TaskService taskService;

    @Autowired
    HistoryService historyService;

    @Autowired
    FormService formService;

    @Autowired
    private BaseOperation baseOperation;

    enum TaskOperation {
        Submit, Review, Confirm, Write, Implement, Approve, Send, Done, Fil, Satisfact
    }

    /*
     * enum TaskNoGate{submit,write,implement,send,done,file,satisfact} enum
     * TaskContainGate{review,confirm,approve}
     */
    @Autowired
    private UserMapper userMapper;

    public List<String> getWorkersList() {
        List<String> userids = userMapper.getUserIdsByRoleId("1");
        return userids;
    }

    /**
     * TODO 将用户组传入流程实例 新建一个新的委托实例
     * 
     * @param consignId 委托ID
     * @param clientId  客户ID
     *
     */
    public String createConsignProcess(String consignId, String clientId) throws Exception {
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("ConsignID", consignId);
        variables.put("ClientID", clientId);
        List<String> userids = this.getWorkersList();
        if (!userids.isEmpty()) {
            for (String userid : userids) {
                variables.put("WorkerIDs", userid);
            }
        } else
            throw new Exception("EMPTY");
        ProcessInstance pi = runtimeService.startProcessInstanceByKey("Consign", variables);
        return pi.getProcessInstanceId();
    }

    /**
     * 新建一个新的合同实例
     * 
     * @param contractId 委托ID
     * @param clientId   客户ID
     *
     */
    public String createContractProcess(String contractId, String clientId) throws Exception {
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("ContractID", contractId);
        variables.put("ClientID", clientId);
        List<String> userids = this.getWorkersList();
        if (!userids.isEmpty()) {
            for (String userid : userids) {
                variables.put("WorkerIDs", userid);
            }
        } else
            throw new Exception("EMPTY");
        ProcessInstance pi = runtimeService.startProcessInstanceByKey("contract", variables);
        return pi.getProcessInstanceId();
    }

    /* 新建测试方案 */
    public String createTestplanProcess() throws Exception {
        Map<String, Object> variables = new HashMap<String, Object>();
        List<String> userids = this.getWorkersList();
        if (!userids.isEmpty()) {
            for (String userid : userids) {
                variables.put("WorkerId", userid);
            }
        } else
            throw new Exception("EMPTY");
        ProcessInstance pi = runtimeService.startProcessInstanceByKey("testplan", variables);
        return pi.getProcessInstanceId();
    }

    /* 新建测试报告 */
    public String createTestreportProcess(String clientId) throws Exception {
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("ClientID", clientId);
        List<String> userids = this.getWorkersList();
        if (!userids.isEmpty()) {
            for (String userid : userids) {
                variables.put("WorkerId", userid);
            }
        } else
            throw new Exception("EMPTY");
        ProcessInstance pi = runtimeService.startProcessInstanceByKey("testreport", variables);
        return pi.getProcessInstanceId();
    }

    /**
     * 根据具体流程实例的ID，更新其状态
     * 
     * @param processInstanceId 流程实例ID
     * @param request
     * @throws Exception
     */
    public void updateProcess(String processInstanceId, Request request) throws Exception {
        JSONObject params = request.getParams();
        String object = params.getString("object");
        String operation = params.getString("operation");
        // String comments=params.getString("comments");
        if (object == null) {
            throw new Exception("object is null");
        }
        if (operation.contains(TaskOperation.Submit.name()) || operation.contains(TaskOperation.Write.name())
                || operation.contains(TaskOperation.Implement.name()) || operation.contains(TaskOperation.Send.name())
                || operation.contains(TaskOperation.Done.name()) || operation.contains(TaskOperation.Fil.name())
                || operation.contains(TaskOperation.Satisfact.name())) {
            baseOperation.noGate(processInstanceId, request.getUser().getId());
        } else if (operation.contains(TaskOperation.Review.name()) || operation.contains(TaskOperation.Confirm.name())
                || operation.contains(TaskOperation.Approve.name())) {
            baseOperation.containGate(operation, processInstanceId, request.getUser().getId());
        } else {
            throw new Exception("Operation match failed");
        }
    }

    /* 根据具体流程实例的ID获取其在流程中的状态 */
    public String getProcessState(String processInstanceId) throws Exception {
        ProcessInstance pi = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId)
                .singleResult();
        List<HistoricActivityInstance> pi1 = historyService.createHistoricActivityInstanceQuery()
                .processInstanceId(processInstanceId).list();
        if (pi == null && !pi1.isEmpty()) {
            return "Finished";
        } else if (pi != null) {
            Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
            return task.getName();
        } else {
            return "NotExist";
        }
    }

    /* 当前task用户可执行的权限 */
    public List<String> getUserOperation(String processInstanceId) throws Exception {
        List<String> varies = new ArrayList<String>();
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
        String S = this.getProcessState(processInstanceId);
        if (S.equals("Finished")) {
            varies.add("Finish");
            return varies;
        }
        TaskFormData taskFormData = formService.getTaskFormData(task.getId());
        List<FormProperty> formProperties = taskFormData.getFormProperties();
        if (formProperties.size() == 1) {
            for (TaskOperation s : TaskOperation.values()) {
                if (task.getName().contains(s.name())) {
                    varies.add(s.name());
                    break;
                }
            }
            return varies;
        } else if (formProperties.size() > 1) {
            for (TaskOperation s : TaskOperation.values()) {
                if (task.getName().contains(s.name())) {
                    String s1 = s.name() + "Pass";
                    varies.add(s1);
                    String s2 = s.name() + "Reject";
                    varies.add(s2);
                    // System.out.println(task.getProcessDefinitionId());
                    if (s.name().equals("Confirm") && task.getProcessDefinitionId().contains("testreport")) {
                        String s3 = s.name() + "Abort";
                        varies.add(s3);
                    }
                    break;
                }
            }
            return varies;
        }
        return varies;
    }

    /* 获取当前task的用户类型，若流程结束，返回nouser */
    public String getTaskAssignee(String processInstanceId) throws Exception {
        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
        String S = this.getProcessState(processInstanceId);
        String user = "";
        if (S.equals("Finished")) {
            user = "NoUser";
            return user;
        }
        TaskFormData taskFormData = formService.getTaskFormData(task.getId());
        List<FormProperty> formProperties = taskFormData.getFormProperties();
        if (formProperties.isEmpty() == false) {
            for (FormProperty formProperty : formProperties) {
                if ("user".equals(formProperty.getId().toString()))
                    user = formProperty.getName();
            }
        } else
            throw new Exception("empty error");
        return user;
    }

    /* 查询某个流程实例的历史活动的详细信息 */
    public List<String> queryHistoricTask(String processInstanceId) throws Exception {
        List<HistoricTaskInstance> hti = historyService.createHistoricTaskInstanceQuery()
                .processInstanceId(processInstanceId).orderByHistoricTaskInstanceStartTime().asc().list();
        List<String> htiList = new ArrayList<String>();
        if (hti.isEmpty() == false) {
            for (HistoricTaskInstance temp : hti) {
                htiList.add(temp.getId() + " " + temp.getAssignee() + " " + temp.getName() + " " + temp.getEndTime()
                        + '\n');
            }
            return htiList;
        } else
            throw new Exception("historicList is null");
    }

    public List<String> getTaskData(String processInstanceId) throws Exception {
        List<HistoricVariableInstance> hti = historyService.createHistoricVariableInstanceQuery()
                .processInstanceId(processInstanceId).list();
        List<String> htiList = new ArrayList<String>();
        if (hti.isEmpty() == false) {
            for (HistoricVariableInstance temp : hti) {
                htiList.add(temp.getVariableName() + "   " + temp.getValue());
                // System.out.println(temp.getVariableName()+" "+temp.getValue());
            }
        }
        return htiList;
    }
}