package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LBW&SQW
 */

@RestController
public class ProjectController extends BaseController{

    @Autowired
    private ProjectService projectService;

    //根据用户查询
    @RequestMapping(value = "/v1/project", method = RequestMethod.GET)
    public Response queryProjects(Request request) {
        Response response = new Response();

        try{
            response.data = projectService.queryProjects(request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }

        return response;
    }

    //根据id查询工程
    @RequestMapping(value = "/v1/project/{id}", method = RequestMethod.GET)
    public Response queryProjectByID(@PathVariable String id, Request request) {

        Response response = new Response();

        try {
            response.data = projectService.queryProjectById(id);
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    //添加
    @RequestMapping(value = "/v1/project", method = RequestMethod.POST)
    public Response addProject(Request request) {
        Response response = new Response();
        try {
            response.data = projectService.addProject(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    //更新
    @RequestMapping(value = "/v1/project", method = RequestMethod.PUT)
    public Response editProject(Request request) {

        Response response = new Response();

        try {
            response.data = projectService.editProject(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    //删除
    @RequestMapping(value = "/v1/project", method = RequestMethod.DELETE)
    public Response deleteProject(Request request) {

        Response response = new Response();

        try {
            projectService.deleteProject(request.getParams());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }
}
