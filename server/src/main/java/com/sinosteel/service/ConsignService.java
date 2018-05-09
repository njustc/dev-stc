package com.sinosteel.service;

import com.sinosteel.domain.Consign;
import com.sinosteel.repository.ConsignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sinosteel.activiti.ActivitiController;

import java.util.UUID;

/**
 * @author SongJunju
 */

@Service
public class ConsignService extends BaseService<Consign> {

    @Autowired
    private ConsignRepository consignRepository;

    @Autowired
    private ActivitiController activitiController;

    public String actid = new String();
    boolean initial = true;
    //为了使每次初始化时一个新的委托，暂时添加一个bool变量
    public Consign queryConsigns() {
        if(initial)
        {
            initial = false;
            activitiController.deploy();
            actid = activitiController.startProcess("entrust");
            String uid = UUID.randomUUID().toString();
            Consign consign = new Consign();
            consign.setConsignid(actid);
            consign.setId(uid);
            consign.setConsignation("");
            consignRepository.save(consign);
            return consign;
        }
        return consignRepository.findByConsignid(actid);
    }
    //更新委托
    public void updateConsigns(Consign consign) {
        consignRepository.save(consign);
    }
    //委托审核通过
    public void passConsigns()
    {
        //activitiController.Check(true);
        activitiController.Check(true,actid);
    }
    //委托审核未通过
    public void rejectConsign()
    {
        //activitiController.Check(false);
        activitiController.Check(false,actid);
    }
    //提交委托
    public void submitConsign()
    {
        activitiController.Submit(actid);
    }
    //获取委托状态
    public String getConsignState()
    {
        return activitiController.GetProcessState(actid);
    }

}
