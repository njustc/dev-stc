package com.njustc.web;

import com.njustc.activiti.ProcessInstanceService;
import com.njustc.framework.core.web.Request;
import com.njustc.framework.core.web.Response;
import com.njustc.framework.core.web.ResponseType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

//import com.njustc.service.ProcessInstanceService;

/**
 * @author LBW
 */
@RestController
public class ProcessInstanceController extends BaseController
{
    @Autowired
    private ProcessInstanceService processInstanceService;

    @RequestMapping(value = "/processInstance/{processInstanceID}", method = RequestMethod.GET)
    public Response queryConsignState(@PathVariable String processInstanceID,  Request request)
    {
        Response response = new Response();

        try {
            response.data = processInstanceService.queryProcessState(processInstanceID);
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
    //params中需要两个参数：object：操作对象  operation: 操作方法
    @RequestMapping(value = "/processInstance/{processInstanceID}", method = RequestMethod.PUT)
    public Response updateConsignState(@PathVariable String processInstanceID, Request request)
    {
        Response response = new Response();

        try
        {
            response.data = processInstanceService.updateProcessState(processInstanceID, request);
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
