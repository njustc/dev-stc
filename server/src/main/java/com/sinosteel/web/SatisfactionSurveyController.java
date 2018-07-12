package com.sinosteel.web;


import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.SatisfactionSurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author LBW & Lumpy
 */

@RestController
public class SatisfactionSurveyController extends BaseController{

    @Autowired
    private SatisfactionSurveyService satisfactionSurveyService;

    @RequestMapping(value = "/v1/satisfactionSurvey",method = RequestMethod.GET)
    public Response querySatisfactionSurvey(Request request, @RequestParam(value = "projectID", required = false) String projectID){

        //没有传projectID，即从用户直接获取
        if (projectID == null) {
            return querySatisfactionSurvey(request);
        }

        Response response = new Response();

        try{
            response.data = satisfactionSurveyService.querySatisfactionSurveysByProject(projectID);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return  response;
    }
    //从用户直接获取
    private Response querySatisfactionSurvey(Request request) {
        Response response = new Response();
        try {
            response.data = satisfactionSurveyService.querySatisfactionSurveys(request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.status = ResponseType.FAILURE;
            response.message = e.getMessage();
        }
        return response;
    }

    @RequestMapping(value = "/v1/satisfactionSurvey/{id}", method = RequestMethod.GET)
    public Response querySatisfactionSurveyByID(@PathVariable String id,Request request){

        Response response = new Response();

        try{
            response.data = satisfactionSurveyService.querySatisfactionSurveyByID(id);
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    //添加
    @RequestMapping(value = "/v1/satisfactionSurvey",method = RequestMethod.POST)
    public Response addSatisfactionSurvey(Request request, @RequestParam(value = "projectID") String projectID) {

        //System.out.println(projectID);
        Response response = new Response();
        try{
            response.data = satisfactionSurveyService.addSatisfactionSurvey(projectID, request.getParams(),request.getFiles(),request.getUser());
            response.status = ResponseType.SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }
        return response;
    }
    //修改
    @RequestMapping(value = "/v1/satisfactionSurvey", method = RequestMethod.PUT)
    public  Response editSatisfactionSurvey(Request request) {

        Response response = new Response();

        try {
            response.data = satisfactionSurveyService.editSatisfactionSurvey(request.getParams(), request.getFiles(), request.getUser());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }

    @RequestMapping(value = "/v1/satisfactionSurvey", method = RequestMethod.DELETE)
    public Response deleteSatisfactionSurvey(Request request) {

        Response response = new Response();

        try {
            satisfactionSurveyService.deleteSatisfactionSurvey(request.getParams());
            response.status = ResponseType.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            response.message = e.getMessage();
            response.status = ResponseType.FAILURE;
        }

        return response;
    }
}
