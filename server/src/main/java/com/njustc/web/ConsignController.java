package com.njustc.web;

import com.njustc.framework.core.web.Request;
import com.njustc.framework.core.web.Response;
import com.njustc.framework.core.web.ResponseType;
import com.njustc.service.ConsignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * The {@code ConsignController} class 用来处理对委托的各种请求 <br>
 * 包括按照用户查询、按照工程查询、按照id查询；添加委托；删除委托；修改委托
 *
 * @author LBW
 * @author SQW
 *
 */

@RestController
public class ConsignController extends BaseController
{
    @Autowired
    private ConsignService consignService;

    /**
     * 按照用户或者工程查询委托
     * @param request
     *        Request类型参数，里面包括username和clientDigest用于用户身份验证
     * @param projectID
     *        委托绑定工程的id，required值为false <br>
     *        传入的参数中有该参数候按照工程查询，
     *        没有时按照request里的user查询
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为委托具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    //对于客户，查询该客户的委托；对于工作人员，查询所有委托
    @RequestMapping(value = "/consign", method = RequestMethod.GET)
    public Response queryConsigns(Request request, @RequestParam(value = "projectID", required = false) String projectID)
    {

        if(projectID == null)
            return queryConsigns(request);

        Response response = new Response();

        try
        {
            response.data = consignService.queryConsignsByProject(projectID);
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
     * 按照用户查询委托，用于上面的函数调用
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
        *         data为委托具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
    //当前端给的query里没有projectID时
    private Response queryConsigns(Request request) {
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

    /**
     * 根据委托的具体id查询委托
     * @param id String类型参数，委托的id
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份，
     * @return The {@code response}是返回的具体内容 <br>
     *         查询成功时有data和status两个内容，
     *         data为委托具体内容，status值SUCCESS <br>
     *         查询失败时status值为FAILURE
     */
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

    /**
     * 修改委托
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要修改的委托id以及修改之后的全新内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         修改成功时有data和status两个内容，
     *         data为委托具体内容，status值SUCCESS <br>
     *         修改失败时status值为FAILURE
     */
    @RequestMapping(value = "/consign",method = RequestMethod.PUT)
    public Response editConsign(Request request)
    {
        Response response = new Response();

        try {
            response.data = consignService.editConsign(request.getParams(), request.getFiles(), request.getUser());
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
     * 添加委托
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括委托的具体内容（body）
     * @return The {@code response}是返回的具体内容 <br>
     *         添加成功时有data和status两个内容，
     *         data为委托具体内容，status值SUCCESS <br>
     *         添加失败时status值为FAILURE
     */
    @RequestMapping(value="/consign",method=RequestMethod.POST)
    public Response addConsign(Request request)
    {
        Response response=new Response();

        try{
            response.data = consignService.addConsign(request.getParams(),request.getFiles(),request.getUser());
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

    /**
     * 删除委托
     * @param request Request类型参数 <br>
     *                包含username和clientDigest传递用户信息并且验证身份 <br>
     *                还包括需要删除的委托id
     * @return The {@code response}是返回的具体内容 <br>
     *         删除成功时status值SUCCESS <br>
     *         删除失败时status值为FAILURE
     */
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
