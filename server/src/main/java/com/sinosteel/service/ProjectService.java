package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.Project;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * *@author LBW&SQW
 */

@Service
public class ProjectService extends BaseService<Project>{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;

    //根据用户查询工程
    public JSON queryProjects(User user) throws Exception{
        if(user!=null)
            System.out.println("queryProjects-->query user role:"+user.getRoles().get(0).getRoleName());
        if(user.getRoles().get(0).getRoleName().equals("普通客户")){
            //返回该用户的工程
            List<Project> projects = user.getProjects();
            return processProjects(projects);
        }
        else {
            List<Project> projects = projectRepository.findByName(user.getUsername());
            return processProjects(projects);
        }
    }

    //根据工程id查询工程
    public JSON queryProjectById(String id) throws Exception{
        Project project = projectRepository.findById(id);
        if(project == null) {
            throw new Exception("Not found");
        }
        return JSON.parseObject(JSON.toJSONString(project));
    }

    //添加工程
    public JSONObject addProject(JSONObject params, List<MultipartFile> files,User user) throws Exception{
        String uid = UUID.randomUUID().toString();

        Project project = JSONObject.toJavaObject(params, Project.class);
        project.setId(uid);
        project.setUser(user);

        //TODO:start process Instance
        /*String processInstanceID = processInstanceService.createProjectProcess(params, user);
          project.setProcessInstanceID(processInstanceID);
         */

        this.saveEntity(project, user);
        project = projectRepository.findById(uid);
        return processProject(project);
    }

    //更新工程
    public JSONObject editProject(JSONObject params, List<MultipartFile> files, User user) throws Exception{
        Project tempProject = JSONObject.toJavaObject(params, Project.class);
        Project project;
        if((project = projectRepository.findById(tempProject.getId())) == null) {
            throw new Exception("Not Found");
        }
        //TODO:编辑具体的工程内容

        project = projectRepository.findById(tempProject.getId());
        return processProject(project);
    }

    //删除工程
    public void deleteProject(JSONObject params) {
        String uid = params.getString("id");
        this.deleteEntity(uid);
    }

    //TODO:处理工程内容、状态信息
    private JSONArray processProjects(List<Project> projects) throws Exception{
        JSONArray resultArray = new JSONArray();
        //去掉工程内容，添加工程状态
        for (Project project: projects) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(project));
            //jsonObject.remove("");
            //String processState = (String) processInstanceService.queryProcessState(project.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }
        return resultArray;
    }

    //TODO:增加状态
    private JSONObject processProject(Project project) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(project.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(project));
        //jsonObject.put("state",processState);
        return jsonObject;
    }
}
