package com.sinosteel.activiti;

import com.sinosteel.FrameworkApplication;
import org.activiti.engine.*;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertNotNull;
/**
 * @author Paul
 * activiti部分：实现整个流程的推进
 * 包括新建委托、提交委托、审核委托、根据委托ID查询、根据客户ID查询和查询工作人员待处理委托
 */
@Service
public class ConsignActiviti {
    private static final Logger logger = LoggerFactory.getLogger(com.sinosteel.activiti.ConsignActiviti.class);

   @Autowired
   private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

   // @Autowired
    //private HistoryService historyService;

    @Autowired
    private ProcessEngine processEngine;

    @Autowired
    private RepositoryService repositoryService;

    //部署整个引擎
    @Autowired
    public void deploy() {
        processEngine=ProcessEngines.getDefaultProcessEngine();
       // System.out.println(processEngine);
        repositoryService = processEngine.getRepositoryService();
        repositoryService.createDeployment()
                .addClasspathResource("processes/Consign.bpmn20.xml")
                .deploy();
    }

    //新建一个委托，参数为委托的ID，返回这个流程实例的id
    public String createConsignProcess(String consignId, String clientId){
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ConsignID",consignId);
        variables.put("ClientID",clientId);
       //ProcessInstance pi=processEngine.getRuntimeService().startProcessInstanceByKey("Consign",variables);
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("Consign",variables);
        return pi.getProcessInstanceId();
    }

    //通过流程实例的id查询流程实例的状态，参数为流程实例的id和委托的id
    public String getProcessState(String processInstanceId)
    {
        ProcessInstance pi=runtimeService.createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        if(pi!=null)
        {
            if(!(taskService.createTaskQuery().taskName("提交委托")
                    .processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待提交"+"\n";
            }
            else if(!(taskService.createTaskQuery().taskName("审核委托")
                    .processInstanceId(processInstanceId).list()).isEmpty())
            {
                return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待审核"+"\n";
            }
            else
            {
                return "审核的ID为："+processInstanceId+" "+"目前的状态为：委托待新建"+"\n";
            }
        }
        else return "审核的ID为："+processInstanceId+" "+"目前的状态为：已结束"+"\n";
    }
    //根据用户的ID查询该用户的委托列表，参数为用户ID
    //注意：返回的是委托的流程ID
    //UserID包括clientId和WorkerID
    public String getClientTasks(String ClientId)
    {
        List<Task> tasks=taskService.createTaskQuery().taskAssignee(ClientId).list();
        String st = "";
        if(tasks.isEmpty())
            st="用户名为：" + ClientId+" have nothing to settle!!"+"\n";
        else
        {
            for (Task task : tasks) {
                st+= "用户名为：" + task.getAssignee() + " 委托的流程ID为" + task.getProcessInstanceId() + " " + "目前的状态为:" + task.getName() + "\n";
            }}
        return st;
    }
    //查询测试人员需处理的委托列表
    public String GetWorkerTasks()
    {
        List<Task> tasks=taskService.createTaskQuery().taskName("审核委托").list();
        String st = "";
        if(tasks.isEmpty())
            st=" have nothing to settle!!"+"\n";
        else
        {
            for (Task task : tasks) {
                st+= "委托的流程ID为" + task.getProcessInstanceId() + " " + "目前的状态为:" + task.getName() + "\n";
            }}
        return st;
    }
    //提交委托，参数为流程实例id（由NewConsign返回）和用户ID
    public void submitConsign(String processInstanceId, String clientId)
    {
        Task task=taskService.createTaskQuery().taskAssignee(clientId)
                .processInstanceId(processInstanceId).singleResult();
        if(task.getAssignee()!=null) {
           taskService.complete(task.getId());
        }
        else
        {
            System.out.println(" clientId can not match processInstanceId ");
        }
    }

    //委托评审
    //参数为Boolean类型的PassOrNot（同意为true，不同意为false），流程实例id（由startprocess返回）和用户ID
    public void checkConsign(Boolean passOrNot, String processInstanceId, String workerId)
    {
        Task task1=taskService.createTaskQuery().taskName("审核委托")
                .processInstanceId(processInstanceId).singleResult();
        taskService.setAssignee(task1.getId(),workerId);
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("Approval",passOrNot);
        Task task=taskService.createTaskQuery().taskAssignee(workerId)
                .processInstanceId(processInstanceId).singleResult();
        if(task.getAssignee()!=null)
        {
           taskService.complete(task.getId(),variables);
        }
        else
        {
            System.out.println("workerId can not match processInstanceId ");
        }
    }
    /********说明：因为每个流程实例自动结束，所以委托评审通过后，流程实例自动结束*******/
}
