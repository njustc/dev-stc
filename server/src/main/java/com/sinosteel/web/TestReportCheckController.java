package com.sinosteel.web;


import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestReportCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW & Lumpy
 */

@RestController
public class TestReportCheckController extends BaseController{

    @Autowired
    private TestReportCheckService testReportCheckService;

    @RequestMapping(value = "/v1/testReportCheck",method = RequestMethod.GET)
    public Response queryTestReportCheck(Request request, @RequestParam(value = "projectID", required = false) String projectID){

        //没有传projectID，即从用户直接获取
        if (projectID == null) {
            return queryTestReportCheck(request);
        }

        Response response = new Response();

        try{
            response.data = testReportCheckService.queryTestReportCheckByProject(projectID);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return  response;
    }
    //从用户直接获取
    private Response queryTestReportCheck(Request request) {
        Response response = new Response();
        try {
            response.data = testReportCheckService.queryTestReportChecks(request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }

    @RequestMapping(value = "/v1/testReportCheck/{id}", method = RequestMethod.GET)
    public Response queryTestReportByID(@PathVariable String id,Request request){

        Response response = new Response();

        try{
            response.data = testReportCheckService.queryTestReportCheckByID(id);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    //添加
    @RequestMapping(value = "/v1/testReportCheck",method = RequestMethod.POST)
    public Response addTestReportCheck(Request request) {

        //System.out.println(projectID);
        Response response = new Response();
        try{
            response.data = testReportCheckService.addTestReportCheck( request.getParams(),request.getFiles(),request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }
        return response;
    }
    //修改
    @RequestMapping(value = "/v1/testReportCheck", method = RequestMethod.PUT)
    public  Response editTestReportCheck(Request request) {

        Response response = new Response();

        try {
            response.data = testReportCheckService.editTestReportCheck(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    @RequestMapping(value = "/v1/testReportCheck", method = RequestMethod.DELETE)
    public Response deleteTestReportCheck(Request request) {

        Response response = new Response();

        try {
            testReportCheckService.deleteTestReportCheck(request.getParams());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }
}
