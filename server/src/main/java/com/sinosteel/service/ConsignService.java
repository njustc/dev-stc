package com.sinosteel.service;

import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ConsignActiviti;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ConsignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * @author SongJunju
 */

@Service
public class ConsignService extends BaseService<Consign> {

    @Autowired
    private ConsignRepository consignRepository;

    @Autowired
    private ConsignActiviti consignActiviti;

    //为了初始化流程引擎，暂时添加一个bool变量
    //TODO: 需要改进，自动化部署activiti
    private boolean initial = true;
    public JSONObject queryConsigns(User user)
    {
        if(initial)
        {
            initial = false;
            consignActiviti.deploy();
        }

        System.out.println("queryConsigns--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            //TODO: 返回该用户的委托
            Consign consign = new Consign();
            consign.setId(UUID.randomUUID().toString());
            consign.setConsignation("这是普通用户应该返回的委托");
            return JSONObject.parseObject(JSONObject.toJSONString(consign));
        }
        else
        {
            //TODO: 返回所有委托
            Consign consign = new Consign();
            consign.setId(UUID.randomUUID().toString());
            consign.setConsignation("这是工作人员应该返回的所有委托");
            return JSONObject.parseObject(JSONObject.toJSONString(consign));
        }
    }

    //更新委托
    public void editConsign(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        Consign consign = JSONObject.toJavaObject(params, Consign.class);
        this.updateEntity(consign, user);
    }

    //增加委托
    public void addConsign(JSONObject params,List<MultipartFile> files,User user) throws Exception
    {

        String uid=UUID.randomUUID().toString();

        Consign consign=JSONObject.toJavaObject(params,Consign.class);
        consign.setId(uid);
        this.consignRepository.save(consign);
    }
    //删除委托（不删除相关委托文件?）

    public void deleteConsign(JSONObject params)
    {
        String uid=params.getString("id");
        consignRepository.delete(uid);
    }

}
