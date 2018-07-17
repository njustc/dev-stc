package com.njustc.framework.config.http;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/*
只要协议、域名、端口有任何一个不同，都被当作是不同的域，之间的请求就是跨域操作
使用Filter 处理跨域请求，即CORS（跨来源资源共享）。
 */
@Configuration
public class CorsConfig 
{
    private CorsConfiguration buildConfig() 
    {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // 1 允许跨域访问的域名
        corsConfiguration.addAllowedHeader("*"); // 2 请求header
        corsConfiguration.addAllowedMethod("*"); // 3 请求方法
        return corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter()
    {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", buildConfig()); // 4
        return new CorsFilter(source);
    }
}