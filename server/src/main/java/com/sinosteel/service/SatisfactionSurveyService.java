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
 *
 *
 * @author LBW
 * @author SQW
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


    //以工程为来源查询SatisfactionSurvey
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

    public JSONObject querySatisfactionSurveyByID(String id) throws Exception{
        SatisfactionSurvey satisfactionSurvey = satisfactionSurveyRepository.findById(id);
        if (satisfactionSurvey == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(satisfactionSurvey));
    }

    //改动
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

    //增加
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


    JSONObject processSatisfactionSurvey(SatisfactionSurvey satisfactionSurvey) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(satisfactionSurvey));
        if (satisfactionSurvey != null && satisfactionSurvey.getProject() != null)
            jsonObject.put("projectID", satisfactionSurvey.getProject().getId());
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    private JSONArray processSatisfactionSurveys(List<SatisfactionSurvey> satisfactionSurveys) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (SatisfactionSurvey satisfactionSurvey: satisfactionSurveys) {
            JSONObject jsonObject = processSatisfactionSurvey(satisfactionSurvey);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}
