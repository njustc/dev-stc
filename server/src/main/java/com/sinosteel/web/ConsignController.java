package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ConsignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW & SQW
 */
@RestController
public class ConsignController extends BaseController
{
    @Autowired
    private ConsignService consignService;


    //对于客户，查询该客户的委托；对于工作人员，查询所有委托
    @RequestMapping(value = "/consign", method = RequestMethod.GET)
    public Response queryConsigns(Request request)
    {
        Response response = new Response();

        try
        {
            response.data = consignService.queryConsigns(request.getUser());
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

    //根据ID查询委托具体信息
    @RequestMapping(value = "/consign/{id}", method = RequestMethod.GET)
    public Response queryConsignByID(@PathVariable String id,  Request request) {
        Response response = new Response();

        try
        {
            response.data = consignService.queryConsignByID(id);
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

    @RequestMapping(value = "/consign",method = RequestMethod.PUT)
    public Response editConsign(Request request)
    {
        Response response = new Response();

        try {
            consignService.editConsign(request.getParams(), request.getFiles(), request.getUser());
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
    @RequestMapping(value="/consign",method=RequestMethod.POST)
    public Response addConsign(Request request)
    {
        Response response=new Response();

        try{
            consignService.addConsign(request.getParams(),request.getFiles(),request.getUser());
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
    @RequestMapping(value="/consign",method=RequestMethod.DELETE)
    public Response deleteConsign(Request request)
    {
        Response response=new Response();

        try{
            consignService.deleteConsign(request.getParams());
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
