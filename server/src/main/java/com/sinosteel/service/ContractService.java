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
 * {@code ContractService} It's a contract service.
 * 
 * Including functions:query contracts by user, 
 * query contracts by project ID,query contracts by contract ID,
 * edit contracts ,add contracts, delete contracts..
 * 
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
 * 
 */
@Service
public class ContractService extends BaseService<Contract> {

    @Autowired
    private ContractRepository contractRepository;
    @Autowired
    private ProjectRepository projectRepository;


    @Autowired
    private ProcessInstanceService processInstanceService;

    /**
     * 通过用户查询合同
     * 
     * <p>查询合同需要传入用户身份信息User</p>
     * 
     * 
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
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

    /**
     * 通过合同所属Poject ID查询合同
     * 
     * <p>查询合同需要传入工程ID project ID</p>
     * 
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
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

    /**
     * 通过合同ID查询合同
     * 
     * <p>通过合同ID查询合同需要传入合同ID</p>
     * 
     * @param id 以String形式传入合同ID
     * @return 以JSONObject形式返回合同ID
     * @throws Exception 抛出异常
     * 
     */
    public JSONObject queryContractByID(String id) throws Exception{
        Contract contract = contractRepository.findById(id);
        if (contract == null) {
            throw new Exception("Not found");
        }
        return processContract(contract);
    }

    /**
     * 对合同内容进行编辑
     *
     * <p>编辑合同内容需要传入修改内容,上传的文件以及用户信息</p>
     *
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回合同状态的更新以及更新后的合同
     * @throws Exception 抛出异常
     */
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


    /**
     * 新增一个合同
     *
     * <p>新增合同需要传入创建的对象,上传文件以及用户信息</p>
     *
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的合同以及合同状态的更新
     * @throws Exception 抛出异常
     */
    public JSONObject addContract(String projectID,JSONObject params, List<MultipartFile> files, User user) throws Exception{

        String uid = UUID.randomUUID().toString(); //随机生成contract的id
        //check project
        if (projectRepository.findById(projectID) == null)
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);
        Contract contract = JSONObject.toJavaObject(params, Contract.class);
        contract.setId(uid);
        contract.setUser(project.getUser());


        String processInstanceID = processInstanceService.createContractProcess(params, user);
        contract.setProcessInstanceID(processInstanceID);

        //set contract in project
        project.setContract(contract);
        projectRepository.save(project);

        //set project in contract
        contract.setProject(project);
        this.saveEntity(contract,user);

        contract = contractRepository.findById(uid);
        return processContract(contract);
    }


    /**
     * 对合同进行删除
     *
     * <p>删除合同需要传入相应的合同信息</p>
     *
     *
     * @param params 待删除合同信息
     * @throws Exception 若传入的合同信息不存在则抛出异常
     */
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

    /**
     * 增加合同状态
     *
     * <p>增加合同状态应传入该合同信息</p>
     *
     * @param contracts 合同信息
     * @return 以JSONObject形式返回更新状态后合同信息以及合同信息
     * @throws Exception 抛出异常
     */
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

    /**
     * <p>添加合同状态</p>
     *
     * @param contract 合同信息
     * @return 以JSONArray状态返回状态更新后的合同
     * @throws Exception 抛出异常
     */
    JSONObject processContract(Contract contract) throws Exception{
        JSONObject processState = processInstanceService.queryProcessState(contract.getProcessInstanceID());

        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(contract));
        jsonObject.putAll(processState);
        if (contract != null && contract.getProject() != null)
            jsonObject.put("projectID", contract.getProject().getId());
        return jsonObject;
    }
}
