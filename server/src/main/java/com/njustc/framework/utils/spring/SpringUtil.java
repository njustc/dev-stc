package com.njustc.framework.utils.spring;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * @author LBW
 */
public class SpringUtil implements ApplicationContextAware {

    public static ApplicationContext applicationContext = null;
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

        if (applicationContext == null) {
            applicationContext = applicationContext;
        }
    }
}
