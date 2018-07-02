package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Contract;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ContractRepository;
import com.sinosteel.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * @author LBW
 */
@Service
public class ContractService extends BaseService<Contract> {

    @Autowired
    private ContractRepository contractRepository;
    @Autowired
    private ProjectRepository projectRepository;


    @Autowired
    private ProcessInstanceService processInstanceService;


    public JSON queryContracts(User user) throws Exception{
        if (user != null) {
            System.out.println("queryContracts--> query user role: " + user.getRoles().get(0).getRoleName());
        }
        if (user.getRoles().get(0).getRoleName().equals("普通客户")) {
            //返回该用户的合同
            List<Contract> contracts = user.getContracts();
            return processContracts(contracts);
        }
        else {
            List<Contract> contracts = contractRepository.findByAllContracts();
            return processContracts(contracts);
        }
    }

    public JSON queryContractsByProject(String projectID) throws Exception {
        Project project = projectRepository.findById(projectID);
        if (project == null) {
            throw new Exception("can't find project by id :" + projectID);
        }
        Contract contract = project.getContract();
        if (contract == null)
            throw new Exception("can't find contract with project: " + projectID);
        return processContract(contract);
    }


    public JSONObject queryContractByID(String id) throws Exception{
        Contract contract = contractRepository.findById(id);
        if (contract == null) {
            throw new Exception("Not found");
        }
        return processContract(contract);
    }


    public JSONObject editContract(JSONObject params, List<MultipartFile> files, User user) throws Exception{
        Contract tempContract = JSONObject.toJavaObject(params, Contract.class);
        Contract contract;
        if ((contract = contractRepository.findById(tempContract.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑合同时只编辑内容
        contract.setContractBody(tempContract.getContractBody());
        this.updateEntity(contract, user);

        contract = contractRepository.findById(tempContract.getId());
        return processContract(contract);
    }

    public JSONObject addContract(String projectID,JSONObject params, List<MultipartFile> files, User user) throws Exception{

        String uid = UUID.randomUUID().toString(); //随机生成contract的id
        //check project
        if (projectRepository.findById(projectID) == null)
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);
        Contract contract = JSONObject.toJavaObject(params, Contract.class);
        contract.setId(uid);
        contract.setUser(project.getUser());


        //TODO:问一下是否是当前user还是要获取project的user
        String processInstanceID = processInstanceService.createContractProcess(params, user);
        contract.setProcessInstanceID(processInstanceID);

        //set contract in project
        project.setContract(contract);
        projectRepository.save(project);

        //set project in contract
        contract.setProject(project);
        this.saveEntity(contract, project.getUser());

        contract = contractRepository.findById(uid);
        return processContract(contract);
    }



    public void deleteContract(JSONObject params) throws Exception{
        String uid = params.getString("id");
        //delete contract from project
        Contract contract = contractRepository.findById(uid);
        if (contract == null)
            throw new Exception("Can't find contract with id: " + uid);
        Project project = contract.getProject();
        project.setContract(null);

        //delete contract
        this.deleteEntity(uid);
    }

    private JSONArray processContracts(List<Contract> contracts) throws Exception{
        JSONArray resultArray = new JSONArray();
        //去掉合同内容,添加状态
        for (Contract contract: contracts) {
            JSONObject jsonObject = processContract(contract);
            //jsonObject.remove("contractBody");
            resultArray.add(jsonObject);
        }

        return resultArray;
    }

    JSONObject processContract(Contract contract) throws Exception{
        JSONObject processState = processInstanceService.queryProcessState(contract.getProcessInstanceID());

        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(contract));
        jsonObject.putAll(processState);
        if (contract.getProject() != null)
            jsonObject.put("projectID", contract.getProject().getId());
        return jsonObject;
    }
}
