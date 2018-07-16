package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestBugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW
 */

@RestController
public class TestBugController extends BaseController {
    @Autowired
    private TestBugService testBugService;



    @RequestMapping(value = "/v1/testBug", method = RequestMethod.GET)
    public Response queryTestBugs(Request request)
    {
        Response response = new Response();

        try
        {
            response.data = testBugService.queryTestBugs(request.getUser());
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

    //根据ID查询测试bug具体信息
    @RequestMapping(value = "/v1/testBug/{id}", method = RequestMethod.GET)
    public Response queryTestBugByID(@PathVariable String id,  Request request) {
        Response response = new Response();

        try
        {
            response.data = testBugService.queryTestBugByID(id);
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

    @RequestMapping(value = "/v1/testBug",method = RequestMethod.PUT)
    public Response editTestCase(Request request)
    {
        Response response = new Response();

        try {
            response.data = testBugService.editTestBug(request.getParams(), request.getFiles(), request.getUser());
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
    @RequestMapping(value = "/v1/testBug",method=RequestMethod.POST)
    public Response addTestBug(Request request)
    {
        Response response=new Response();

        try{
            response.data = testBugService.addTestBug(request.getParams(),request.getFiles(),request.getUser());
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
    @RequestMapping(value = "/v1/testBug",method=RequestMethod.DELETE)
    public Response deleteTestCase(Request request)
    {
        Response response=new Response();

        try{
            testBugService.deleteTestBug(request.getParams());
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
