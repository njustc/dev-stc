package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LBW
 */
@RestController
public class ContractController extends BaseController{

    @Autowired
    private ContractService contractService;

    @RequestMapping(value = "/contract", method = RequestMethod.GET)
    public Response queryContracts(Request request) {

        Response response = new Response();

        try {
            response.data = contractService.queryContracts(request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
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
    public Response addContract(Request request) {

        Response response = new Response();

        try {
            response.data = contractService.addContract(request.getParams(), request.getFiles(), request.getUser());
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
