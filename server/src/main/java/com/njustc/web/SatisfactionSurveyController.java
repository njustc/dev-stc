package com.njustc.web;


import com.njustc.framework.core.web.Request;
import com.njustc.framework.core.web.Response;
import com.njustc.framework.core.web.ResponseType;
import com.njustc.service.SatisfactionSurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The {@code SatisfactionSurveyController} class 用来处理对满意度调查表的各种请求 <br>
 * 包括按照用户查询、按照工程查询、按照id查询；添加满意度调查表；删除满意度调查表；修改满意度调查表
 *
 * @author LBW
 * @author SQW
 *
 */

@RestController
public class SatisfactionSurveyController extends BaseController{

    @Autowired
    private SatisfactionSurveyService satisfactionSurveyService;

    /**
     * 按照用户或者工程查询满意度调查表
     * @param request
     *        Request类型参数，里面包括username和clientDigest用于用户身份验证
     * @param projectID
     *        满意度调查表绑定工程的id，required值为false <br>
     *        传入的参数中有该参数候按照工程查询，
     *        没有时按照request里的user查询
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为满意度调查表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/satisfactionSurvey",method = RequestMethod.GET)
    public Response querySatisfactionSurvey(Request request, @RequestParam(value = "projectID", required = false) String projectID){

        //没有传projectID，即从用户直接获取
        if (projectID == null) {
            return querySatisfactionSurvey(request);
        }

        Response response = new Response();

        try{
            response.data = satisfactionSurveyService.querySatisfactionSurveysByProject(projectID);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return  response;
    }
    /**
     * 按照用户查询满意度调查表，用于上面的函数调用
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为满意度调查表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    //从用户直接获取
    private Response querySatisfactionSurvey(Request request) {
        Response response = new Response();
        try {
            response.data = satisfactionSurveyService.querySatisfactionSurveys(request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }

    /**
     * 根据满意度调查表的具体id查询满意度调查表
     * @param id String类型参数，满意度调查表的id
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份，
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为满意度调查表具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/satisfactionSurvey/{id}", method = RequestMethod.GET)
    public Response querySatisfactionSurveyByID(@PathVariable String id,Request request){

        Response response = new Response();

        try{
            response.data = satisfactionSurveyService.querySatisfactionSurveyByID(id);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    /**
     * 添加满意度调查表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括一个params，包括绑定工程的id以及满意度调查表的具体内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         添加成功时有data和status两个内容，
     *         data为满意度调查表具体内容，status值SUCCESS <br>
     *         添加失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/satisfactionSurvey",method = RequestMethod.POST)
    public Response addSatisfactionSurvey(Request request, @RequestParam(value = "projectID") String projectID) {

        //System.out.println(projectID);
        Response response = new Response();
        try{
            response.data = satisfactionSurveyService.addSatisfactionSurvey(projectID, request.getParams(),request.getFiles(),request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }
        return response;
    }
    /**
     * 修改满意度调查表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要修改的满意度调查表id以及修改之后的全新内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         修改成功时有data和status两个内容，
     *         data为满意度调查表具体内容，status值SUCCESS <br>
     *         修改失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/satisfactionSurvey", method = RequestMethod.PUT)
    public  Response editSatisfactionSurvey(Request request) {

        Response response = new Response();

        try {
            response.data = satisfactionSurveyService.editSatisfactionSurvey(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    /**
     * 删除满意度调查表
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要删除的满意度调查表id
     * @return The {@code response}是返回的具体内容 <br>
     *         删除成功时status值SUCCESS <br>
     *         删除失败时status值为FAILURE
     */
    @RequestMapping(value = "/v1/satisfactionSurvey", method = RequestMethod.DELETE)
    public Response deleteSatisfactionSurvey(Request request) {

        Response response = new Response();

        try {
            satisfactionSurveyService.deleteSatisfactionSurvey(request.getParams());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }
}
