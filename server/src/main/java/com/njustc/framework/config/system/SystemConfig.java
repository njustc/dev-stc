package com.njustc.framework.config.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/*
获得系统的相关信息。如路径信息
 */
@Configuration
@PropertySource("config/system.properties")
@Component
public class SystemConfig
{
	@Autowired
	private Environment env;
	
	public String getProperty(String propertyName)
	{
		return env.getProperty(propertyName);
	}
}
