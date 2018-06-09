package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW & SQW
 */

@RestController
public class TestCaseController extends BaseController {
    @Autowired
    private TestCaseService testCaseService;



    @RequestMapping(value = "/v1/testCase", method = RequestMethod.GET)
    public Response queryTestCases(Request request)
    {
        Response response = new Response();

        try
        {
            response.data = testCaseService.queryTestCases(request.getUser());
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

    //根据ID查询测试计划具体信息
    @RequestMapping(value = "/v1/testCase/{id}", method = RequestMethod.GET)
    public Response queryTestPlanByID(@PathVariable String id,  Request request) {
        Response response = new Response();

        try
        {
            response.data = testCaseService.queryTestCaseByID(id);
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

    @RequestMapping(value = "/v1/testCase",method = RequestMethod.PUT)
    public Response editTestPlan(Request request)
    {
        Response response = new Response();

        try {
            response.data = testCaseService.editTestCase(request.getParams(), request.getFiles(), request.getUser());
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
    @RequestMapping(value = "/v1/testCase",method=RequestMethod.POST)
    public Response addTestPlan(Request request)
    {
        Response response=new Response();

        try{
            response.data = testCaseService.addTestCase(request.getParams(),request.getFiles(),request.getUser());
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
    @RequestMapping(value = "/v1/testCase",method=RequestMethod.DELETE)
    public Response deleteTestPlan(Request request)
    {
        Response response=new Response();

        try{
            testCaseService.deleteTestCase(request.getParams());
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
