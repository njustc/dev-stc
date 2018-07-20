package com.njustc.framework.config.listener;

import com.njustc.framework.core.listener.ApplicationStartListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ListenerConfig 
{
	//当容器初始化完成之后，需要处理一些操作，比如一些数据的加载、初始化缓存、特定任务的注册等等。这个时候我们就可以使用Spring提供的ApplicationListener来进行操作。
	//在ApplicationStartListener中实现了onApplicationEvent方法，加载structure.json文件。容器启动的时候，该方法自动被调用
	@Bean
	public ApplicationStartListener applicationStartListener()
	{
		return new ApplicationStartListener();
	}
}
