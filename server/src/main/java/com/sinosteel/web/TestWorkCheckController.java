package com.sinosteel.web;


import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestWorkCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW & Lumpy
 */

@RestController
public class TestWorkCheckController extends BaseController{

    @Autowired
    private TestWorkCheckService testWorkCheckService;

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

    //从用户获取用户的所有testWorkCheck
    private Response queryTestWorkCheck(Request request) {
        Response response = new Response();
        try {
            response.data = testWorkCheckService.queryTestWorkChecks(request.getUser());
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }

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

    @RequestMapping(value = "/v1/testWorkCheck",method = RequestMethod.POST)
    public Response addTestWorkCheck(Request request) {
        Response response = new Response();
        try{
            response.data = testWorkCheckService.addTestWorkCheck(request.getParams(),request.getFiles(),request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }
        return response;
    }

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
