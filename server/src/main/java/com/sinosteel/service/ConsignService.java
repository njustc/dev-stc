package com.sinosteel.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.domain.Consign;
import com.sinosteel.domain.User;
import com.sinosteel.repository.ConsignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sinosteel.activiti.ConsignActiviti;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
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

    public String id = "";
    private boolean initial = true;
    //为了使每次初始化时一个新的委托，暂时添加一个bool变量
    public Consign queryConsigns() {
        if(initial)
        {
            initial = false;

            String uid = UUID.randomUUID().toString();
            id = uid;

            consignActiviti.deploy();
            String pid = consignActiviti.createConsignProcess(id, "");

            Consign consign = new Consign();
            consign.setId(uid);
            consign.setProcessInstanceID(pid);
            consign.setConsignation("");

            consignRepository.save(consign);
            return consign;
        }
        return consignRepository.findById(id);
    }
    //更新委托
    public void updateConsigns(Consign consign) {
        consignRepository.save(consign);
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
