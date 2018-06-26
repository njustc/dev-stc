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
    private TestPlanService testPlanService;



    @RequestMapping(value = "/v1/testPlan", method = RequestMethod.GET)
    public Response queryTestPlans(Request request, @RequestParam(value = "projectID", required = false) String projectID)
    {
        if(projectID == null) {
            return queryTestPlans(request);
        }

        Response response = new Response();

        try
        {
            response.data = testPlanService.queryTestPlansByProject(projectID);
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

    private Response queryTestPlans(Request request) {
        Response response = new Response();

        try
        {
            response.data = testPlanService.queryTestPlans(request.getUser());
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
    @RequestMapping(value = "/v1/testPlan/{id}", method = RequestMethod.GET)
    public Response queryTestPlanByID(@PathVariable String id, Request request) {
        Response response = new Response();

        try
        {
            response.data = testPlanService.queryTestPlanByID(id);
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

    @RequestMapping(value = "/v1/testPlan",method = RequestMethod.PUT)
    public Response editTestPlan(Request request)
    {
        Response response = new Response();

        try {
            response.data = testPlanService.editTestPlan(request.getParams(), request.getFiles(), request.getUser());
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
    @RequestMapping(value = "/v1/testPlan",method=RequestMethod.POST)
    public Response addTestPlan(Request request, @RequestParam(value = "projectID") String projectID)
    {
        Response response=new Response();

        try{
            response.data = testPlanService.addTestPlan(projectID, request.getParams(),request.getFiles(),request.getUser());
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
    @RequestMapping(value = "/v1/testPlan",method=RequestMethod.DELETE)
    public Response deleteTestPlan(Request request)
    {
        Response response=new Response();

        try{
            testPlanService.deleteTestPlan(request.getParams());
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

