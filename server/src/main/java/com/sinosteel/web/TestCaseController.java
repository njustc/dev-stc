package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.smartcardio.CardTerminal;

/**
 * @author LBW & SQW
 */

@RestController
public class TestCaseController extends BaseController {
    @Autowired
    private TestCaseService testCaseService;





    //根据ID查询测试方案具体信息
    @RequestMapping(value = "/v1/testCase/{id}", method = RequestMethod.GET)
    public Response queryTestCaseByID(@PathVariable String id,  Request request) {
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
    @RequestMapping(value = "/v1/testCase", method = RequestMethod.GET)
    public Response queryTestCases(Request request, @RequestParam(value = "projectID", required = false) String projectID) {
        if (projectID == null) {
            return queryTestCases(request);
        }
        Response response = new Response();

        try {
            response.data = testCaseService.queryTestCasesByProject(projectID);
            response.status = ResponseType.SUCCESS;
        }
        catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }

    @RequestMapping(value = "/v1/testCase",method = RequestMethod.PUT)
    public Response editTestCase(Request request)
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
    public Response addTestCase(Request request, @RequestParam(value = "projectID") String projectID)
    {
        System.out.println(projectID);
        Response response=new Response();

        try{
            response.data = testCaseService.addTestCase(projectID, request.getParams(),request.getFiles(),request.getUser());
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
    public Response deleteTestCase(Request request)
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

    private Response queryTestCases(Request request)
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
}
