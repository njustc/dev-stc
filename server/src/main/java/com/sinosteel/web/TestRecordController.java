package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.TestRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW
 */

@RestController
public class TestRecordController extends BaseController {
    @Autowired
    private TestRecordService testRecordService;


    @RequestMapping(value = "/v1/testRecord", method = RequestMethod.GET)
    public Response queryTestRecords(Request request)
    {
        Response response = new Response();

        try
        {
            response.data = testRecordService.queryTestRecords(request.getUser());
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
    @RequestMapping(value = "/v1/testRecord/{id}", method = RequestMethod.GET)
    public Response queryTestRecordByID(@PathVariable String id,  Request request) {
        Response response = new Response();

        try
        {
            response.data = testRecordService.queryTestRecordByID(id);
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

    @RequestMapping(value = "/v1/testRecord",method = RequestMethod.PUT)
    public Response editTestRecord(Request request)
    {
        Response response = new Response();

        try {
            response.data = testRecordService.editTestRecord(request.getParams(), request.getFiles(), request.getUser());
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
    @RequestMapping(value = "/v1/testRecord",method=RequestMethod.POST)
    public Response addTestRecord(Request request)
    {
        Response response=new Response();

        try{
            response.data = testRecordService.addTestRecord(request.getParams(),request.getFiles(),request.getUser());
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
    @RequestMapping(value = "/v1/testRecord",method=RequestMethod.DELETE)
    public Response deleteTestRecord(Request request)
    {
        Response response=new Response();

        try{
            testRecordService.deleteTestRecord(request.getParams());
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
