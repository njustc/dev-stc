package com.njustc.web;


import com.njustc.framework.core.web.Request;
import com.njustc.framework.core.web.Response;
import com.njustc.framework.core.web.ResponseType;
import com.njustc.service.TestReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The {@code TestReportController} class 用来处理对测试报告的各种请求 <br>
 * 包括按照用户查询、按照工程查询、按照id查询；添加测试报告；删除测试报告；修改测试报告
 *
 * @author LBW
 * @author Lumpy
 * @author SQW
 *
 */

@RestController
public class TestReportController extends BaseController{

    @Autowired
    private TestReportService testReportService;

    /**
     * 按照用户或者工程查询测试报告
     * @param request
     *        Request类型参数，里面包括username和clientDigest用于用户身份验证
     * @param projectID
     *        测试报告绑定工程的id，required值为false <br>
     *        传入的参数中有该参数候按照工程查询，
     *        没有时按照request里的user查询
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试报告具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testReport",method = RequestMethod.GET)
    public Response queryTestReport(Request request, @RequestParam(value = "projectID", required = false) String projectID){
        if(projectID == null) {
            return queryTestReport(request);
        }

        Response response = new Response();

        try{
            response.data = testReportService.queryTestReportByProject(projectID);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }

        return  response;
    }

    /**
     * 按照用户查询测试报告，用于上面的函数调用
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试报告具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    private Response queryTestReport(Request request) {
        Response response = new Response();
        try {
            response.data = testReportService.queryTestReport(request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }

    /**
     * 根据测试报告的具体id查询测试报告
     * @param id String类型参数，测试报告的id
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份，
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为测试报告具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testReport/{id}", method = RequestMethod.GET)
    public Response queryTestReportByID(@PathVariable String id,Request request){

        Response response = new Response();

        try{
            response.data = testReportService.queryTestReportByID(id);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    /**
     * 添加测试报告
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括一个params，包括绑定工程的id以及测试报告的具体内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         添加成功时有data和status两个内容，
     *         data为测试报告具体内容，status值SUCCESS <br>
     *         添加失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testReport",method = RequestMethod.POST)
    public Response addTestReport(Request request, @RequestParam(value = "projectID") String projectID) {
        Response response = new Response();
        try{
            response.data = testReportService.addTestReport(projectID, request.getParams(),request.getFiles(),request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }
        return response;
    }

    /**
     * 修改测试报告
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要修改的测试报告id以及修改之后的全新内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         修改成功时有data和status两个内容，
     *         data为测试报告具体内容，status值SUCCESS <br>
     *         修改失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testReport", method = RequestMethod.PUT)
    public  Response editProject(Request request) {

        Response response = new Response();

        try {
            response.data = testReportService.editTestReport(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    /**
     * 删除测试报告
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要删除的测试报告id
     * @return The {@code response}是返回的具体内容 <br>
     *         删除成功时status值SUCCESS <br>
     *         删除失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/testReport", method = RequestMethod.DELETE)
    public Response deleteProject(Request request) {

        Response response = new Response();

        try {
            testReportService.deleteTestReport(request.getParams());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }
}

