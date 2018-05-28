package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Contract;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ContractRepository;
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


    public JSONObject queryContractByID(String id) throws Exception{
        Contract contract = contractRepository.findById(id);
        if (contract == null) {
            throw new Exception("Not found");
        }
        return JSON.parseObject(JSON.toJSONString(contract));
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

    public JSONObject addContract(JSONObject params, List<MultipartFile> files, User user) throws Exception{
        String uid = UUID.randomUUID().toString();

        Contract contract = JSONObject.toJavaObject(params, Contract.class);
        contract.setId(uid);
        contract.setUser(user);

        //TODO: start process Instance
        String processInstanceID = processInstanceService.createContractProcess(params, user);
        contract.setProcessInstanceID(processInstanceID);

        this.saveEntity(contract, user);

        contract = contractRepository.findById(uid);
        return processContract(contract);
    }



    public void deleteContract(JSONObject params) {
        String uid = params.getString("id");
        this.deleteEntity(uid);
    }

    //TODO: 添加状态
    private JSONArray processContracts(List<Contract> contracts) throws Exception{
        JSONArray resultArray = new JSONArray();
        //去掉合同内容,添加状态
        for (Contract contract: contracts) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(contract));
            jsonObject.remove("contractBody");
           // String processState = (String) processInstanceService.queryProcessState(contract.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }

    //TODO: 增加状态
    private JSONObject processContract(Contract contract) throws Exception{
        String processState = (String) processInstanceService.queryProcessState(contract.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(contract));
        jsonObject.put("state", processState);
        return jsonObject;
    }
}
