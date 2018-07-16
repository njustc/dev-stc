package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.SatisfactionSurvey;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import com.sinosteel.repository.SatisfactionSurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * {@code SatisfactionSurveyService} It's a satisfactionSurveys service.
 *
 * Including functions:query satisfactionSurveys by user,
 * query satisfactionSurveys by project ID,query satisfactionSurveys by satisfactionSurveys ID,
 * edit satisfactionSurveys ,add satisfactionSurveys, delete satisfactionSurveys..
 *
 * @author LBW
 * @author SQW
 * @since 2018/7/15
 * @version 1.0
 *
 */

@Service
public class SatisfactionSurveyService extends BaseService<SatisfactionSurvey> {
    @Autowired
    private SatisfactionSurveyRepository satisfactionSurveyRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    @Autowired
    private ProjectRepository projectRepository;



    /**
     * 通过用户的工程来查询用户满意度调查表
     *
     * <p>查询用户满意度调查表需要传入用户身份信息User</p>
     * <p>
     *  根据传入User身份进行判断,如果User身份是普通客户,则返回客户名下的所有工程,再返回其各个工程名下用户满意度调查表信息;
     *  如果User身份是工作人员,则调用satisfactionSurveyRepository.findAllSatisfactionSurvey返回所有的用户满意度调查表信息
     *</p>
     * @param user 用户信息
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON querySatisfactionSurveys(User user) throws Exception {
        if (user != null)
            System.out.println("querySatisfactionSurveys--> query user role: " + user.getRoles().get(0).getRoleName());

        if (user.getRoles().get(0).getRoleName().equals("普通客户")) {
            List<Project> projects = user.getProjects();
            List<SatisfactionSurvey> satisfactionSurveys = new ArrayList<SatisfactionSurvey>();
            for (Project project : projects) {
                satisfactionSurveys.add(project.getSatisfactionSurvey());
            }
            return processSatisfactionSurveys(satisfactionSurveys);
        }
        else {
            List<SatisfactionSurvey> satisfactionSurveys = satisfactionSurveyRepository.findAllSatisfactionSurvey();
            //对测试计划进行处理，去掉具体内容,并且添加测试计划状态
            return processSatisfactionSurveys(satisfactionSurveys);
        }
    }
    
    /**
     * 通过用户满意度调查表所属Project ID查询用户满意度调查表
     *
     * <p>查询用户满意度调查表需要传入工程ID project ID</p>
     *<p>
     * 传入工程ID后会首先调用 projectRepository.findById 对该用户满意度调查表对应的工程project进行查找,
     * 若该工程ID不属于任何已存在的工程,则会抛出异常,返回字段"can't find project by id : projectID";
     * 若存在,则调用project.getSatisfactionSurvey 检查该工程是否有用户满意度调查表与其对应,
     * 若无法找到,则抛出异常,返回字段"can't find satisfactionSurveys with project:  projectID".
     * 否则调用processSatisfactionSurvey更新用户满意度调查表状态,并最终返回工程ID为projectID的工程对应的用户满意度调查表信息
     *</p>
     * @param projectID 以String形式传入工程ID
     * @return 以JSON形式返回查询结果
     * @throws Exception 抛出异常
     */
    public JSON querySatisfactionSurveysByProject(String projectID) throws Exception {
        Project project = projectRepository.findById(projectID);
        if(project == null) {
            throw new Exception("can't find project by id: " + projectID);
        }
        SatisfactionSurvey satisfactionSurvey = project.getSatisfactionSurvey();
        if (satisfactionSurvey == null)
            throw new Exception("can't find satisfactionSurvey with project: " + projectID);
        return processSatisfactionSurvey(satisfactionSurvey);
    }


    /**
     * 通过用户满意度调查表ID查询用户满意度调查表
     *
     * <p>通过用户满意度调查表ID查询用户满意度调查表需要传入用户满意度调查表ID</p>
     *<p>
     *  传入用户满意度调查表ID后,首先调用satisfactionSurveysRepository.findById 对用户满意度调查表ID进行查找,
     *  并对返回结果进行检查,若返回值为空,则抛出异常,并返回错误信息"Not Found",
     *  否则以JSONObject格式返回查询得到的用户满意度调查表信息.
     *</p>
     * @param id 以String形式传入用户满意度调查表ID
     * @return 以JSONObject形式返回用户满意度调查表ID
     * @throws Exception 抛出异常
     *
     */
    public JSONObject querySatisfactionSurveyByID(String id) throws Exception{
        SatisfactionSurvey satisfactionSurvey = satisfactionSurveyRepository.findById(id);
        if (satisfactionSurvey == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(satisfactionSurvey));
    }

    /**
     * 对用户满意度调查表内容进行编辑
     *
     * <p>编辑用户满意度调查表内容需要传入修改内容,上传的文件以及用户信息</p>
     *<p>传入参数后首先将JSONObject形式的params转换为JavaObject,
     * 并提取出用户满意度调查表id以调用this.findEntityById检测该用户满意度调查表是否存在,
     * 若不存在,则抛出异常,返回错误信息"Not found",
     * 若该用户满意度调查表存在,则调用baseService类中的updateEntity函数修改用户满意度调查表内容body
     * 之后调用satisfactionSurveyRepository.findById获取该用户满意度调查表信息
     * 最终调用processSatisfactionSurvey更新用户满意度调查表状态,并返回编辑完成后的用户满意度调查表信息
     *
     *</p>
     *
     * @param params 更新内容
     * @param files 文件上传
     * @param user 用户信息
     * @return 以JSONObject形式返回用户满意度调查表状态的更新以及更新后的用户满意度调查表
     * @throws Exception 抛出异常
     */
    public JSONObject editSatisfactionSurvey(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        SatisfactionSurvey tempSatisfactionSurvey = JSONObject.toJavaObject(params, SatisfactionSurvey.class);
        SatisfactionSurvey satisfactionSurvey;
        if ((satisfactionSurvey = this.findEntityById(tempSatisfactionSurvey.getId())) == null) {
            throw new Exception("Not found");
        }

        satisfactionSurvey.setBody(tempSatisfactionSurvey.getBody());
        this.updateEntity(satisfactionSurvey, user);

        satisfactionSurvey = satisfactionSurveyRepository.findById(tempSatisfactionSurvey.getId());
        return processSatisfactionSurvey(satisfactionSurvey);
    }

    /**
     * 新增一个用户满意度调查表
     *
     * <p>新增用户满意度调查表需要传入创建的对象,上传文件以及用户信息</p>
     *<p>首先通过随机数生成来生成uid,
     * 并调用projectRepository.findById 检测传入的工程ID是否存在,
     * 若不存在则抛出异常,返回错误信息"Can't find project with ID: project ID"
     * 若存在则将获取该ID对应的工程信息
     * 并将JSONObject形式的params转换为JavaObject,将params中的数据存入新对象satisfactionSurvey中,
     * 将uid作为新用户满意度调查表的satisfactionSurvey ID,传入的用户信息user作为新用户满意度调查表的持有者User
     * 调用processInstanceService.createSatisfactionSurveyProcess设置新用户满意度调查表的流程实例ID
     * 调用BaseService类中的saveEntity将该新用户满意度调查表存入数据库
     * 最后调用processSatisfactionSurvey更新用户满意度调查表状态,并返回添加完成后的用户满意度调查表信息
     *
     *</p>
     * @param projectID 对应的工程ID
     * @param params 新创建的对象
     * @param files 上传文件
     * @param user 用户信息
     * @return 以JSONObject形式返回新增的用户满意度调查表以及用户满意度调查表状态的更新
     * @throws Exception 抛出异常
     */
    public JSONObject addSatisfactionSurvey(String projectID, JSONObject params,List<MultipartFile> files,User user) throws Exception {

        //随机生成SatisfactionSurvey的id
        String uid= UUID.randomUUID().toString();
        //String uid = params.getString("id");
        //check project
        if (projectRepository.findById(projectID) == null)
            throw new Exception("Can't find project with ID: " + projectID);

        Project project = projectRepository.findById(projectID);
        SatisfactionSurvey satisfactionSurvey=JSONObject.toJavaObject(params,SatisfactionSurvey.class);
        satisfactionSurvey.setId(uid);

        //set SatisfactionSurvey in project
        project.setSatisfactionSurvey(satisfactionSurvey);
        projectRepository.save(project);

        //set project in SatisfactionSurvey,
        satisfactionSurvey.setProject(project);
        this.saveEntity(satisfactionSurvey, user);

        satisfactionSurvey = satisfactionSurveyRepository.findById(uid);
        return processSatisfactionSurvey(satisfactionSurvey);
    }


    /**
     * 对用户满意度调查表进行删除
     *
     * <p>删除用户满意度调查表需要传入相应的用户满意度调查表信息</p>
     * <p>首先提取出待删除用户满意度调查表的SatisfactionSurvey ID,
     * 并调用satisfactionSurveysRepository.findById检测该用户满意度调查表是否存在
     * 若返回值为NULL,则抛出异常,返回错误信息"Can't find satisfactionSurvey with id: id"
     * 若返回值不为空,则调用 project.setSatisfactionSurvey将其置为NULL以删除该用户满意度调查表
     * </p>
     *
     * @param params 待删除用户满意度调查表信息
     * @throws Exception 若传入的用户满意度调查表信息不存在则抛出异常
     */
    public void deleteSatisfactionSurvey(JSONObject params) throws Exception
    {
        String uid=params.getString("id");
        SatisfactionSurvey satisfactionSurvey = satisfactionSurveyRepository.findById(uid);
        if (satisfactionSurvey == null)
            throw new Exception("Can't find satisfactionSurvey with id: " + uid);
        //delete SatisfactionSurvey from project
        Project project = satisfactionSurvey.getProject();
        project.setSatisfactionSurvey(null);

        //delete SatisfactionSurvey
        this.deleteEntity(uid);
    }

    /**
     * 增加用户满意度调查表状态
     *
     * <p>增加用户满意度调查表状态应传入该用户满意度调查表信息</p>
     *
     * @param satisfactionSurvey 用户满意度调查表信息
     * @return 以JSONObject形式返回更新状态后用户满意度调查表信息以及用户满意度调查表信息
     * @throws Exception 抛出异常
     */
    JSONObject processSatisfactionSurvey(SatisfactionSurvey satisfactionSurvey) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(satisfactionSurvey));
        if (satisfactionSurvey != null && satisfactionSurvey.getProject() != null)
            jsonObject.put("projectID", satisfactionSurvey.getProject().getId());
        //jsonObject.put("state", processState);
        return jsonObject;

    }
    
    /**
     * <p>添加用户满意度调查表状态</p>
     *
     * @param satisfactionSurveys 用户满意度调查表信息
     * @return 以JSONArray状态返回状态更新后的用户满意度调查表
     * @throws Exception 抛出异常
     */
    private JSONArray processSatisfactionSurveys(List<SatisfactionSurvey> satisfactionSurveys) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (SatisfactionSurvey satisfactionSurvey: satisfactionSurveys) {
            JSONObject jsonObject = processSatisfactionSurvey(satisfactionSurvey);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
