package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestFunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW & SQW
 */

@RestController
public class TestFunctionController extends BaseController {
    @Autowired
    private TestFunctionService testFunctionService;


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
