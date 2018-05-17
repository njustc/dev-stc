package com.sinosteel.activiti;

import org.activiti.engine.*;
import org.activiti.engine.runtime.ProcessInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ContractActiviti {
    private static final Logger logger = LoggerFactory.getLogger(com.sinosteel.activiti.ConsignActiviti.class);

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ProcessEngine processEngine;

    @Autowired
    private RepositoryService repositoryService;

    //部署整个引擎
    @Autowired
    public void deploy() {
        processEngine= ProcessEngines.getDefaultProcessEngine();
        // System.out.println(processEngine);
        repositoryService = processEngine.getRepositoryService();
        repositoryService.createDeployment()
                .addClasspathResource("processes/contract.bpmn20.xml")
                .deploy();
    }

    //新建一个委托，参数为委托的ID，返回这个流程实例的id
    public String createContractProcess(String contractId, String clientId){
        Map<String,Object> variables=new HashMap<String, Object>();
        variables.put("ContractID",contractId);
        variables.put("ClientID",clientId);
        //ProcessInstance pi=processEngine.getRuntimeService().startProcessInstanceByKey("Consign",variables);
        ProcessInstance pi=runtimeService.startProcessInstanceByKey("contract",variables);

        return pi.getProcessInstanceId();
    }

}
