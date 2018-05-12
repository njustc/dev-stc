package com.sinosteel.web;

import com.sinosteel.domain.Consign;
import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ConsignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LBW
 */
@RestController
public class ConsignController extends BaseController
{
    @Autowired
    private ConsignService consignService;

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
