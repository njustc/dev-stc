package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW & SQW
 */

@RestController
public class TestPlanController extends BaseController {
    @Autowired
    private TestPlanService testplanService;


    //TODO:搞清楚到底如何查询
    /*@RequestMapping(value = "/testplan", method = RequestMethod.GET)
    public Response queryTestplans(Request request)
    {
        Response response = new Response();

        try
        {
            response.data = testplanService.queryTestPlans(request.getUser());
            response.status = ResponseType.SUCCESS;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }

        return response;
    }*/

    //根据ID查询测试计划具体信息
    @RequestMapping(value = "/testplan/{id}", method = RequestMethod.GET)
    public Response queryTestPlanByID(@PathVariable String id,  Request request) {
        Response response = new Response();

        try
        {
            response.data = testplanService.queryTestPlanByID(id);
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

    @RequestMapping(value = "/testplan",method = RequestMethod.PUT)
    public Response editTestPlan(Request request)
    {
        Response response = new Response();

        try {
            response.data = testplanService.editTestPlan(request.getParams(), request.getFiles(), request.getUser());
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
    @RequestMapping(value="/testplan",method=RequestMethod.POST)
    public Response addTestPlan(Request request)
    {
        Response response=new Response();

        try{
            response.data = testplanService.addTestPlan(request.getParams(),request.getFiles(),request.getUser());
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
    @RequestMapping(value="/testplan",method=RequestMethod.DELETE)
    public Response deleteTestPlan(Request request)
    {
        Response response=new Response();

        try{
            testplanService.deleteTestPlan(request.getParams());
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
