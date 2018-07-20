package com.njustc.web;


import com.njustc.framework.core.web.Request;
import com.njustc.framework.core.web.Response;
import com.njustc.framework.core.web.ResponseType;
import com.njustc.service.TestWorkCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The {@code TestWorkCheckController} class 用来处理对测试工作检查表的各种请求 <br>
 * 包括按照用户查询、按照工程查询、按照id查询；添加测试工作检查表；删除测试工作检查表；修改测试工作检查表
 *
 * @author LBW
 * @author SQW
 *
 */

@RestController
public class TestWorkCheckController extends BaseController{

    @Autowired
    private TestWorkCheckService testWorkCheckService;

    /**
     * 按照用户或者工程查询测试工作检查表
     * @param request
     *        Request类型参数，里面包括username和clientDigest用于用户身份验证
     * @param projectID
     *        测试工作检查表绑定工程的id，required值为false <br>
     *        传入的参数中有该参数候按照工程查询，
     *        没有时按照request里的user查询
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试工作检查表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testWorkCheck",method = RequestMethod.GET)
    public Response queryTestWorkCheck(Request request, @RequestParam(value = "projectID", required = false) String projectID){

        //没有传projectID，从用户获取当前用户的所有testWorkCheck
        if (projectID == null) {
            return queryTestWorkCheck(request);
        }

        Response response = new Response();

        try{
            response.data = testWorkCheckService.queryTestWorkCheckByProject(projectID);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }

        return  response;
    }

    /**
     * 按照用户查询测试工作检查表，用于上面的函数调用
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试工作检查表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    //从用户获取用户的所有testWorkCheck
    private Response queryTestWorkCheck(Request request) {
        Response response = new Response();
        try {
            response.data = testWorkCheckService.queryTestWorkChecks(request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }

    /**
     * 根据测试工作检查表的具体id查询测试工作检查表
     * @param id String类型参数，测试工作检查表的id
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份，
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试工作检查表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testWorkCheck/{id}", method = RequestMethod.GET)
    public Response queryTestWorkByID(@PathVariable String id,Request request){

        Response response = new Response();

        try{
            response.data = testWorkCheckService.queryTestWorkCheckByID(id);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    /**
     * 添加测试工作检查表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括一个params，包括绑定工程的id以及测试工作检查表的具体内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         添加成功时有data和status两个内容，
     *         data为测试工作检查表具体内容，status值SUCCESS <br>
     *         添加失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testWorkCheck",method = RequestMethod.POST)
    public Response addTestWorkCheck(Request request, @RequestParam(value = "projectID") String projectID) {
        Response response = new Response();
        try{
            response.data = testWorkCheckService.addTestWorkCheck(projectID,request.getParams(),request.getFiles(),request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }
        return response;
    }

    /**
     * 修改测试工作检查表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要修改的测试工作检查表id以及修改之后的全新内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         修改成功时有data和status两个内容，
     *         data为测试工作检查表具体内容，status值SUCCESS <br>
     *         修改失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testWorkCheck", method = RequestMethod.PUT)
    public  Response editTestWorkCheck(Request request) {

        Response response = new Response();

        try {
            response.data = testWorkCheckService.editTestWorkCheck(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    /**
     * 删除测试工作检查表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要删除的测试工作检查表id
     * @return The {@code response}是返回的具体内容 <br>
     *         删除成功时status值SUCCESS <br>
     *         删除失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testWorkCheck", method = RequestMethod.DELETE)
    public Response deleteTestWorkCheck(Request request) {

        Response response = new Response();

        try {
            testWorkCheckService.deleteTestWorkCheck(request.getParams());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }
}
