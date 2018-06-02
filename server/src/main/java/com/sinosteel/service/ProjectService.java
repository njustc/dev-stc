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
 * *@author SQW
 */

@Service
public class ProjectService extends BaseService<Project>{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


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

    //public JSON queryProjectById()

    //TODO:处理工程内容、状态信息
    private JSONArray processProjects(List<Project> projects) throws Exception{
        JSONArray resultArray = new JSONArray();
        //去掉工程内容，添加工程状态
        for (Project project: projects) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(project));
            //jsonObject.remove("")
            resultArray.add(jsonObject);
        }
        return resultArray;
    }
}
