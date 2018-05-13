package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ConsignActivitiService;
import javafx.geometry.Pos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LBW
 */
@RestController
public class ConsignActivitiController extends BaseController
{
    @Autowired
    private ConsignActivitiService consignActivitiService;

    @RequestMapping(value = "/consignActiviti/{processInstanceID}", method = RequestMethod.GET)
    public Response queryConsignState(@PathVariable String processInstanceID,  Request request)
    {
        Response response = new Response();

        try {
            response.data = consignActivitiService.queryConsignState(processInstanceID);
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

    @RequestMapping(value = "consignActiviti/{processInstanceID}", method = RequestMethod.PUT)
    public Response updateConsignState(@PathVariable String processInstanceID, Request request)
    {
        Response response = new Response();

        try
        {
            response.data = consignActivitiService.updateConsignState(processInstanceID, request);
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
