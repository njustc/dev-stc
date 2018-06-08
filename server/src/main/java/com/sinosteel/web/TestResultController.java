package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW & SQW
 */

@RestController
public class TestResultController extends BaseController {
    @Autowired
    private TestResultService testResultService;


    //TODO:搞清楚到底如何查询
    @RequestMapping(value = "/v1/testResult", method = RequestMethod.GET)
    public Response queryTestResults(Request request)
    {
        Response response = new Response();

        /*try
        {
            response.data = testResultService.queryTestResults(request.getUser());
            response.status = ResponseType.SUCCESS;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }*/

        return response;
    }

    //根据ID查询测试计划具体信息
    @RequestMapping(value = "/v1/testResult/{id}", method = RequestMethod.GET)
    public Response queryTestResultByID(@PathVariable String id,  Request request) {
        Response response = new Response();

        try
        {
            response.data = testResultService.queryTestResultByID(id);
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

    @RequestMapping(value = "/v1/testResult",method = RequestMethod.PUT)
    public Response editTestResult(Request request)
    {
        Response response = new Response();

        try {
            response.data = testResultService.editTestResult(request.getParams(), request.getFiles(), request.getUser());
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
    @RequestMapping(value = "/v1/testResult",method=RequestMethod.POST)
    public Response addTestResult(Request request)
    {
        Response response=new Response();

        try{
            response.data = testResultService.addTestResult(request.getParams(),request.getFiles(),request.getUser());
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
    @RequestMapping(value = "/v1/testResult",method=RequestMethod.DELETE)
    public Response deleteTestResult(Request request)
    {
        Response response=new Response();

        try{
            testResultService.deleteTestResult(request.getParams());
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
