package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ConsignRepository;
import com.sinosteel.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * {@code ConsignService} class It's a Consign Service
 *
 *
 * <p> Including functions: query consigns by users , query consigns by Project ID,
 * query consign by Consign ID, edit  consign , add consigns, delete consigns</p>
 *
 *
 * @author LBW
 * @author SQW
 * @since 2018/7/14
 * @version 1.0
 *
 *
 */

@Service
public class ConsignService extends BaseService<Consign> {

    /**
     * 自动注入consignRepository
     */
    @Autowired
    private ConsignRepository consignRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    @Autowired
    private ProjectRepository projectRepository;

    /**
     *通过用户查询订委托
     *
     * <p>查询委托需要传入用户身份User</p>
     *
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有委托信息;
     *  如果User身份是工作人员,则调用user.getConsigns返回所有的委托信息
     *</p>
     *
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     *
     *
     */

    public JSON queryConsigns(User user) throws Exception {
        if (user != null)
            System.out.println("queryConsigns--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<Consign> consigns = user.getConsigns();
            //对委托列表进行处理，去掉委托具体内容,并且添加委托状态
            return processConsigns(consigns);

            //从工程里获取
            //List<Project> projects = user.getProjects();
            //List<Consign> consigns = new ArrayList<Consign>();
            //for(Project project: projects) {
                //Consign consign = project.getConsign();
                //consigns.add(consign);
            //}
            //return processConsigns(consigns);
        }
        else
        {
            List<Consign> consigns = consignRepository.findByAllConsigns();
            //对委托列表进行处理，去掉委托具体内容,并且添加委托状态
            return processConsigns(consigns);
        }
    }

    /**
     * 通过委托所属projectID查询委托
     *
     *<p>查询委托需要传入工程ID projectID</p>
     *
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该委托对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getConsign 检查该工程是否有委托与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find consign with project:  projectID".
     * 否则返回工程ID为projectID的工程对应的委托信息
     *</p>
     *
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */

    public JSON queryConsignsByProject(String projectID) throws Exception {
        Project project = projectRepository.findById(projectID);
        if (project == null) {
            throw new Exception("can't find project by id :" + projectID);
        }
        Consign consign = project.getConsign();
        if (consign == null)
            throw new Exception("can't find consign with project: " + projectID);
        return processConsign(consign);
    }

    /**
     * 通过委托ID查询委托
     *
     * <p>通过委托ID查询委托需要传入委托ID</p>
     *<p>
     *  传入委托ID后,首先调用consignRepository.findById 对委托ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的委托信息.
     *</p>
     *
     * @param id 以String形式传入委托ID
     * @return 以JSONObject形式返回委托ID
     * @throws Exception 抛出异常
     */
    public JSONObject queryConsignByID(String id) throws Exception{
        Consign consign = consignRepository.findById(id);
        if (consign == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(consign));
    }

    /**
     * 对委托内容进行编辑
     *
     * <p>编辑委托内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出委托id以调用this.findEntityById检测该委托是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该委托存在,则调用baseService类中的updateEntity函数修改委托内容Consignation
     * 之后调用consignRepository.findById获取该委托信息
     * 最终返回编辑完成后的委托信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回委托状态的更新以及更新后的委托
     * @throws Exception 若委托ID不存在则抛出异常
     */
    public JSONObject editConsign(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        Consign tempConsign = JSONObject.toJavaObject(params, Consign.class);
        Consign consign;
        if ((consign = this.findEntityById(tempConsign.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑委托时只编辑内容
        consign.setConsignation(tempConsign.getConsignation());
        this.updateEntity(consign, user);

        //return the consign with STATE!
        consign = consignRepository.findById(tempConsign.getId());
        return processConsign(consign);
    }

    /**
     * 新增一个委托
     *
     * <p>新增委托需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入consign中,
     * 将uid作为新委托的consign ID,传入的用户信息user作为新委托的持有者User
     * 调用processInstanceService.createConsignProcess设置新委托的流程实例ID
     * 调用BaseService类中的saveEntity将该新委托存入数据库
     * 最后返回添加完成后的委托信息
     *
     *</p>
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的委托以及委托状态的更新
     * @throws Exception 抛出异常
     */
    public JSONObject addConsign(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        String uid=UUID.randomUUID().toString();

        Consign consign=JSONObject.toJavaObject(params,Consign.class);
        consign.setId(uid);
        consign.setUser(user);

        //start activiti process
        String procID = processInstanceService.createConsignProcess(params, user);
        consign.setProcessInstanceID(procID);
        this.saveEntity(consign, user);

        //return the consign with STATE!
        consign = consignRepository.findById(uid);
        return processConsign(consign);
    }

    /**
     * 对委托进行删除
     *
     * <p>删除委托需要传入相应的委托信息</p>
     * <p>首先提取出待删除委托的Consign ID,
     * 并调用consignRepository.findById检测该委托是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find consign with id: id"
     * 若返回值不为空,则调用BaseService类中的deleteEntity删除该委托
     * </p>
     *
     *
     * @param params 待删除委托信息
     * @throws Exception 若传入的委托信息不存在则抛出异常
     */
    public void deleteConsign(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        Consign consign = consignRepository.findById(uid);
        if (consign == null)
            throw new Exception("Can't find consign with id: " + uid);

        this.deleteEntity(uid);
    }


    /**
     * 增加委托状态
     *
     * <p>增加委托状态应传入该委托信息</p>
     *
     * @param consign 委托信息
     * @return 以JSONObject形式返回更新状态后委托信息以及委托信息
     * @throws Exception
     */
    JSONObject processConsign(Consign consign) throws Exception {
        JSONObject processState = processInstanceService.queryProcessState(consign.getProcessInstanceID());

        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(consign));
        jsonObject.putAll(processState);
        return jsonObject;

    }

    /**
     * <p>添加委托状态</p>
     *
     * @param consigns 委托信息
     * @return 以JSONArray状态返回状态更新后的委托
     * @throws Exception 抛出异常
     */
    JSONArray processConsigns(List<Consign> consigns) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (Consign consign: consigns) {
            JSONObject jsonObject = processConsign(consign);
            //jsonObject.remove("consignation")
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
