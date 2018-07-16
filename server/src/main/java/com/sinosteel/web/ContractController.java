package com.sinosteel.web;

import com.sinosteel.framework.core.web.Request;
import com.sinosteel.framework.core.web.Response;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The {@code ContractController} class 用来处理对合同的各种请求 <br>
 * 包括按照用户查询、按照工程查询、按照id查询；添加合同；删除合同；修改合同
 *
 * @author LBW
 * @autuor SQW
 *
 */
@RestController
public class ContractController extends BaseController{

    @Autowired
    private ContractService contractService;

    /**
     * 按照用户或者工程查询合同
     * @param request
     *        Request类型参数，里面包括username和clientDigest用于用户身份验证
     * @param projectID
     *        合同绑定工程的id，required值为false <br>
     *        传入的参数中有该参数候按照工程查询，
     *        没有时按照request里的user查询
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为合同具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
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
    /**
     * 按照用户查询合同，用于上面的函数调用
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为合同具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
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
    /**
     * 根据合同的具体id查询合同
     * @param id String类型参数，合同的id
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份，
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为合同具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
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
    /**
     * 修改合同
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要修改的合同id以及修改之后的全新内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         修改成功时有data和status两个内容，
     *         data为合同具体内容，status值SUCCESS <br>
     *         修改失败时status值为FAILURE
     */
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
    /**
     * 添加合同
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括合同的具体内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         添加成功时有data和status两个内容，
     *         data为合同具体内容，status值SUCCESS <br>
     *         添加失败时status值为FAILURE
     */
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
    /**
     * 删除合同
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要删除的合同id
     * @return The {@code response}是返回的具体内容 <br>
     *         删除成功时status值SUCCESS <br>
     *         删除失败时status值为FAILURE
     */
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
