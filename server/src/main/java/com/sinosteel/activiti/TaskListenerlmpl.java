package com.sinosteel.activiti;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;

public class TaskListenerlmpl implements TaskListener {
    @Override
    public void notify(DelegateTask delegateTask)
    {
        String userId="NeedToSet";//给一个默认值，在SetWorker()中设置
        delegateTask.setAssignee(userId);
    }
}
