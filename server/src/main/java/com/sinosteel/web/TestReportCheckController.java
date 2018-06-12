package com.sinosteel.web;


import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestReportCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LBW & Lumpy
 */

@RestController
public class TestReportCheckController extends BaseController{

    @Autowired
    private TestReportCheckService testReportCheckService;

    @RequestMapping(value = "/v1/testReportCheck",method = RequestMethod.GET)
    public Response queryTestReportCheck(Request request){
        Response response = new Response();

        try{
            response.data = testReportCheckService.queryTestReportChecks(request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }

        return  response;
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

    @RequestMapping(value = "/v1/testReportCheck",method = RequestMethod.POST)
    public Response addTestReportCheck(Request request) {
        Response response = new Response();
        try{
            response.data = testReportCheckService.addTestReportCheck(request.getParams(),request.getFiles(),request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }
        return response;
    }

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
    public Response deletetestReportCheck(Request request) {

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
