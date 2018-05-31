/*package com.sinosteel.web;


import com.alibaba.fastjson.JSONObject;
import com.sinosteel.FrameworkApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;*/



/**
 *  @author Lumpy&SQW
 */

/*@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:spring-config.xml"})
@WebAppConfiguration
@SpringApplicationConfiguration(FrameworkApplication.class)

@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@Transactional*/

/*public class ConsignControllerTest{
    @Autowired
    protected WebApplicationContext wac;
    protected MockMvc mockmvc;

    @Before
    public void setup() throws Exception {
        this.mockmvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Test
    public void Test_queryConsigns() throws Exception{
        System.out.println("测试 委托查询");
        String mvcResult=this.mockmvc.perform(
                get("/services/consign")
                .param("username","admin")  //传入参数"username"
                .param("clientDigest","admin") //传入参数"clientDigest"
        ).andExpect(MockMvcResultMatchers.status().isOk()) //返回的状态是200
                .andDo(MockMvcResultHandlers.print())   //打印出请求和相应的内容
                .andReturn().getResponse().getContentAsString();
        System.out.println("-----返回的json=" + mvcResult);
                //.andExpect(MockMvcResultMatchers.content().string(Matchers.containsString("SUCCESS")));
    }

    @Test
    public void Test_queryConsignByID() throws Exception{
        System.out.println("测试 根据ID查询委托");
        mockmvc.perform(MockMvcRequestBuilders.get("/services/consign/{id}","1")
                .accept(MediaType.APPLICATION_JSON))
                //.param("id","0433ce93-4118-46e0-b55c-1c54a458ed67"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
                //.andExpect(MockMvcResultMatchers.content().string(Matchers.containsString("SUCCESS")));
    }

    @Test
    public void Test_editConsign() throws Exception{
        System.out.println(("测试 委托更新"));
        mockmvc.perform(MockMvcRequestBuilders.put("/services/consign")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("username","admin")
                .param("clientDigest","admin"))
                .andDo(MockMvcResultHandlers.print());

        mockmvc.perform(MockMvcRequestBuilders.get("/services/consign")
                .accept(MediaType.APPLICATION_JSON)
                .param("username","admin")
                .param("clientDigest","admin"))
                .andExpect(status().isOk())
                //.andExpect(model().hasErrors()) //验证模型有错误
                //.andExpect(model().attributeDoesNotExist("username")) //验证存在错误的属性
                .andDo(MockMvcResultHandlers.print());
                //.andExpect(MockMvcResultMatchers.content().string(Matchers.containsString("SUCCESS")));
    }

    @Test
    public void Test_addConsign() throws Exception{
        String user_name="admin";
        String Client_Digest="admin";
        JSONObject cosign =new JSONObject();
        System.out.println(("测试 委托增加"));
        mockmvc.perform(MockMvcRequestBuilders.put("/services/consign")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("username",user_name)
                .param("clientDigest",Client_Digest))
                .andDo(MockMvcResultHandlers.print());

        mockmvc.perform(MockMvcRequestBuilders.get("/services/consign")   //检查添加是否成功
                .accept(MediaType.APPLICATION_JSON)
                .param("username","admin")
                .param("clientDigest","admin"))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    public void Test_deleteConsign() throws Exception{
        System.out.println("测试 委托删除");
        mockmvc.perform(MockMvcRequestBuilders.delete("/services/consign")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .param("username","admin")
                .param("clientDigest","admin"))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
                //.andExpect(status().isNoContent());
    }
}*/