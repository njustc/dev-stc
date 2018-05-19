package com.sinosteel.activiti;

import org.activiti.engine.*;
import org.activiti.engine.history.HistoricActivityInstance;
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
public class ContractActiviti extends BaseActiviti{
    //部署整个引擎
    /*@Autowired
    public void deploy() {
        processEngine= ProcessEngines.getDefaultProcessEngine();
        // System.out.println(processEngine);
        repositoryService = processEngine.getRepositoryService();
        repositoryService.createDeployment()
                .addClasspathResource("processes/contract.bpmn20.xml")
                .deploy();
    }*/

    //新建一个合同，返回这个流程实例的id
    //目前的参数为合同ID，客户ID，市场部主任ID和质量部主任ID
    //市场部主任和质量部主任应该是固定的吧？
    public String createContractProcess(String contractId, String clientId,
                                        String marketEmployerId,String qualityEmployerId)throws Exception{
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ContractID",contractId);
        variables.put("ClientID",clientId);
        variables.put("marketEmployerId",marketEmployerId);
        variables.put("qualityEmployerId",qualityEmployerId);
        //ProcessInstance pi=processEngine.getRuntimeService().startProcessInstanceByKey("Consign",variables);
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("contract",variables);
        //this.submit(pi.getProcessInstanceId(),clientId);
        return pi.getProcessInstanceId();
    }

    //客户提交合同，参数为流程ID和客户ID
    public void submitContract(String processInstanceId,String clientId) throws Exception
    {
        this.submit(processInstanceId,clientId);
        //System.out.println("合同已提交");
    }

    //工作人员评审合同，参数为工作人员ID（市场部主任ID或质量部主任ID，二选一），布尔型的passOrNot
    //若通过，流程继续
    //若不通过，跳转至提交合同状态
    public void checkContract(String processInstanceId,String workerId,Boolean passOrNot) throws Exception
    {
        Task task1=taskService.createTaskQuery().taskName("评审合同")
                .processInstanceId(processInstanceId).singleResult();
        taskService.claim(task1.getId(),workerId);
        this.check(passOrNot,processInstanceId,workerId,"Approval");
        //System.out.println("合同已审核");
    }

    //客户确认合同，参数为客户ID和布尔型的passOrNot
    //若确认，则整个流程结束
    //若否决，则流程跳转至提交合同状态
    public void confirmContract(String processInstanceId,String clientId,Boolean passOrNot)throws Exception
    {
        this.check(passOrNot,processInstanceId,clientId,"Confirm");
        //System.out.println("合同已确认");
    }

    //查询市场部主任的任务列表
    public String getMarketEmployerTasks(String marketEmployerId)
    {
        return this.getUserTasks(marketEmployerId);
    }

    //查询质量部主任的任务列表
    public String getQualityEmployerTasks(String qualityEmployerId)
    {
        return this.getUserTasks(qualityEmployerId);
    }

    //查询合同状态，参数为合同流程ID
    /*public String getContractProcessState(String processInstanceId)
    {
        ProcessInstance pi=runtimeService.createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(pi!=null)
        {
            if(!(taskService.createTaskQuery().taskName("提交合同")
                    .processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "TobeSubmit";
                //return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待提交"+"\n";
            }
            else if(!(taskService.createTaskQuery().taskName("评审合同")
                    .processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "TobeCheck";
                //return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待审核"+"\n";
            }
            else if(!(taskService.createTaskQuery().taskName("确认合同")
                    .processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "TobeConfirm";
                //return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待新建"+"\n";
            }
            else
            {
                return "TobeCreate";
            }
        }
        else
        {
            List<HistoricActivityInstance> historicActivityInstanceList=historyService.createHistoricActivityInstanceQuery()
                    .processInstanceId(processInstanceId).list();
            if(historicActivityInstanceList.isEmpty()==false)
                return "End";
        }
        return "Not Exist";
    }*/
}
