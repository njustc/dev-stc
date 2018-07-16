package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The {@code ConsignController} class 用来处理对工程的各种请求 <br>
 * 包括按照用户查询、按照id查询；添加工程；删除工程；修改工程
 *
 * @author LBW
 * @autuor SQW
 *
 */

@RestController
public class ProjectController extends BaseController{

    @Autowired
    private ProjectService projectService;

    /**
     * 按照用户查询工程
     * @param request
     *        Request类型参数，里面包括username和clientDigest用于用户身份验证
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为工程具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
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

    /**
     * 根据工程的具体id查询工程
     * @param id String类型参数，工程的id
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份，
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为工程具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
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

    /**
     * 添加工程
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括绑定委托的id
     * @return The {@code response}是返回的具体内容 <br>
     *         添加成功时有data和status两个内容，
     *         data为工程具体内容，status值SUCCESS <br>
     *         添加失败时status值为FAILURE
     */
    //添加
    @RequestMapping(value = "/v1/project", method = RequestMethod.POST)
    public Response addProject(Request request, @RequestParam(value = "consignID") String consignID) {
        Response response = new Response();
        try {
            response.data = projectService.addProject(consignID, request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    /**
     * 修改工程
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要修改的工程id以及修改之后的全新内容（如code）
     * @return The {@code response}是返回的具体内容 <br>
     *         修改成功时有data和status两个内容，
     *         data为工程具体内容，status值SUCCESS <br>
     *         修改失败时status值为FAILURE
     */
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

    /**
     * 删除工程
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要删除的工程id
     * @return The {@code response}是返回的具体内容 <br>
     *         删除成功时status值SUCCESS <br>
     *         删除失败时status值为FAILURE
     */
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
