package com.sinosteel.service;

import com.sinosteel.domain.Entrust;
import com.sinosteel.repository.EntrustRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sinosteel.activiti.ActivitiController;
@Service
public class EntrustService extends BaseService<Entrust> {

    @Autowired
    private EntrustRepository entrustRepository;

    @Autowired
    private ActivitiController activitiController;

    String actid = new String();
    boolean initial = true;
    //为了使每次初始化时一个新的委托，暂时添加一个bool变量
    public Entrust queryEntrusts() {
        if(initial)
        {
            initial = false;
            activitiController.deploy();
            actid = activitiController.startProcess("entrust");
            Entrust entrust = new Entrust();
            entrust.setId(actid);
            entrustRepository.save(entrust);
            return entrust;
        }
        return entrustRepository.findById(actid);
    }

    public void updateEntrusts(Entrust entrust) throws Exception {
        entrustRepository.save(entrust);
    }

    public void passEntrust()
    {
        //activitiController.Check(true);
        activitiController.Check(true,actid);
    }

    public void rejectEntrust()
    {
        //activitiController.Check(false);
        activitiController.Check(false,actid);
    }

    public void submitEntrust()
    {
        activitiController.Submit(actid);
    }

    public String getEntrustState()
    {
        return activitiController.GetProcessState(actid);
    }

}
