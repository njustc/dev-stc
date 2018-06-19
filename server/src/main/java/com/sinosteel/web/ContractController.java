package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW
 */
@RestController
public class ContractController extends BaseController{

    @Autowired
    private ContractService contractService;

    @RequestMapping(value = "/contract", method = RequestMethod.GET)
    public Response queryContracts(Request request, @RequestParam(value = "projectID", required = false) String projectID) {

        //查询用户所有，没有传projectID
        if(projectID == null) {
            return queryContracts(request);
        }

        //查询project里所有
        Response response = new Response();

        try {
            response.data = contractService.queryContractsByProject(projectID);
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }

        return response;
    }
    //当前端给的query里没有projectID时
    private Response queryContracts(Request request) {
        Response response = new Response();
        try
        {
            response.data = contractService.queryContracts(request.getUser());
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

    @RequestMapping(value = "/contract/{id}", method = RequestMethod.GET)
    public Response queryContractByID(@PathVariable String id, Request request) {

        Response response = new Response();

        try {
            response.data = contractService.queryContractByID(id);
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    @RequestMapping(value = "/contract", method = RequestMethod.PUT)
    public Response editContract(Request request) {

        Response response = new Response();

        try {
            response.data = contractService.editContract(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    @RequestMapping(value = "/contract", method = RequestMethod.POST)
    public Response addContract(Request request, @RequestParam(value = "projectID") String projectID) {

        Response response = new Response();

        try {
            response.data = contractService.addContract(projectID,request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    @RequestMapping(value = "/contract", method = RequestMethod.DELETE)
    public Response deleteContract(Request request) {

        Response response = new Response();

        try {
            contractService.deleteContract(request.getParams());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }
}
