package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestFunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The {@code TestFunctionController} class 用来处理对测试功能表的各种请求 <br>
 * 包括按照用户查询、按照工程查询、按照id查询；添加测试功能表；删除测试功能表；修改测试功能表
 *
 * @author LBW
 * @author SQW
 *
 */

@RestController
public class TestFunctionController extends BaseController {
    @Autowired
    private TestFunctionService testFunctionService;

    /**
     * 按照用户或者工程查询测试功能表
     * @param request
     *        Request类型参数，里面包括username和clientDigest用于用户身份验证
     * @param projectID
     *        测试功能表绑定工程的id，required值为false <br>
     *        传入的参数中有该参数候按照工程查询，
     *        没有时按照request里的user查询
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试功能表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testFunction", method = RequestMethod.GET)
    public Response queryTestFunctions(Request request, @RequestParam(value = "projectID", required = false) String projectID) {

        if (projectID == null) {
            return queryTestFunctions(request);
        }
        Response response = new Response();

        try
        {
            response.data = testFunctionService.queryTestFUnctionByProject(projectID);
            response.status = ResponseType.SUCCESS;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }

        return response;
    }
    /**
     * 按照用户查询测试功能表，用于上面的函数调用
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试功能表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    //没有传入project的id（根据用户直接查询时）
    private Response queryTestFunctions(Request request) {
        Response response = new Response();
        try {
            response.data = testFunctionService.queryTestFunctions(request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }
    /**
     * 根据测试功能表的具体id查询测试功能表
     * @param id String类型参数，测试功能表的id
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份，
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试功能表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    //根据ID查询测试功能具体信息
    @RequestMapping(value = "/v1/testFunction/{id}", method = RequestMethod.GET)
    public Response queryTestFunctionByID(@PathVariable String id,  Request request) {
        Response response = new Response();

        try
        {
            response.data = testFunctionService.queryTestFunctionByID(id);
            response.status = ResponseType.SUCCESS;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }
    /**
     * 修改测试功能表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要修改的测试功能表id以及修改之后的全新内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         修改成功时有data和status两个内容，
     *         data为测试功能表具体内容，status值SUCCESS <br>
     *         修改失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testFunction",method = RequestMethod.PUT)
    public Response editTestFunction(Request request)
    {
        Response response = new Response();

        try {
            response.data = testFunctionService.editTestFunction(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;

    }
    /**
     * 添加测试功能表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括一个params，包括绑定工程的id以及测试功能表的具体内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         添加成功时有data和status两个内容，
     *         data为测试功能表具体内容，status值SUCCESS <br>
     *         添加失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testFunction",method=RequestMethod.POST)
    public Response addTestFunction(Request request, @RequestParam(value = "projectID") String projectID)
    {
        Response response=new Response();

        try{
            response.data = testFunctionService.addTestFunction(projectID,request.getParams(),request.getFiles(),request.getUser());
            response.status=ResponseType.SUCCESS;
        }
        catch(Exception e)
        {
            e.printStackTrace();

            response.status=ResponseType.FAILURE;
            response.message=e.getMessage();
        }
        return response;
    }
    /**
     * 删除测试功能表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要删除的测试功能表id
     * @return The {@code response}是返回的具体内容 <br>
     *         删除成功时status值SUCCESS <br>
     *         删除失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testFunction",method=RequestMethod.DELETE)
    public Response deleteTestCase(Request request)
    {
        Response response=new Response();

        try{
            testFunctionService.deleteTestFunction(request.getParams());
            response.status=ResponseType.SUCCESS;
        }
        catch(Exception e)
        {
            e.printStackTrace();
            response.status=ResponseType.FAILURE;
            response.message=e.getMessage();
        }
        return response;
    }
}
