package com.sinosteel.web;


import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LBW & Lumpy
 */

@RestController
public class TestReportController extends BaseController{

    @Autowired
    private TestReportService testReportService;

    @RequestMapping(value = "/v1/testReport",method = RequestMethod.GET)
    public Response queryTestReport(Request request){
        Response response = new Response();

        try{
            response.data = testReportService.queryTestReport(request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }

        return  response;
    }

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

    @RequestMapping(value = "/v1/testReport",method = RequestMethod.POST)
    public Response addTestReport(Request request) {
        Response response = new Response();
        try{
            response.data = testReportService.addTestReport(request.getParams(),request.getFiles(),request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }
        return response;
    }

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

    @RequestMapping(value = "/v1git add ./testReport", method = RequestMethod.DELETE)
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
