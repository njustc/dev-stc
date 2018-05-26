package com.sinosteel.framework.core.listener;

import com.sinosteel.service.FunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;


public class ApplicationStartListener implements ApplicationListener<ContextRefreshedEvent>
{
	@Autowired
	private FunctionService functionService;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) 
	{
//		try
//		{
//			functionService.syncStructure();
//		}
//		catch (Exception e)
//		{
//			e.printStackTrace();
//			assert(false);
//		}
	}
}
