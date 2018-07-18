package com.njustc.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.njustc.activiti.ProcessInstanceService;
import com.njustc.domain.Contract;
import com.njustc.domain.Project;
import com.njustc.domain.User;
import com.njustc.repository.ContractRepository;
import com.njustc.repository.ProjectRepository;
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
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有合同信息;
     *  如果User身份是工作人员,则调用user.getContracts返回所有的合同信息
     *</p>
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
     * 通过合同所属Project ID查询合同
     *
     * <p>查询合同需要传入工程ID project ID</p>
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该合同对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getContract 检查该工程是否有合同与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find contract with project:  projectID".
     * 否则调用processContract更新合同状态,并最终返回工程ID为projectID的工程对应的合同信息
     *</p>
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
     *<p>
     *  传入合同ID后,首先调用contractRepository.findById 对合同ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的合同信息.
     *</p>
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
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出合同id以调用this.findEntityById检测该合同是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该合同存在,则调用baseService类中的updateEntity函数修改合同内容Contractation
     * 之后调用contractRepository.findById获取该合同信息
     * 最终调用processContract更新合同状态,并返回编辑完成后的合同信息
     *</p>
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
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入contract中,
     * 将uid作为新合同的contract ID,传入的用户信息user作为新合同的持有者User
     * 调用processInstanceService.createContractProcess设置新合同的流程实例ID
     * 调用BaseService类中的saveEntity将该新合同存入数据库
     * 最后返回添加完成后的合同信息
     *
     *</p>
     * @param projectID 对应的工程ID
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
     * <p>首先提取出待删除合同的Contract ID,
     * 并调用contractRepository.findById检测该合同是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find contract with id: id"
     * 若返回值不为空,则调用project.setContract置为NULL,以删除该合同.
     * </p>
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
