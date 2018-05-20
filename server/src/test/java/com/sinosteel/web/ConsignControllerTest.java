package com.sinosteel.web;

import com.sinosteel.FrameworkApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



/**
 *  @author Lumpy
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignControllerTest{

    private MockMvc mockmvc;


    @Before
    public void setup() throws Exception {
        this.mockmvc = MockMvcBuilders.standaloneSetup(new ConsignController()).build();
    }

    @Test
    public void Test_queryConsigns() throws Exception{
        System.out.println("测试 委托查询");
        mockmvc.perform(MockMvcRequestBuilders.get("/services/consign"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void Test_queryConsignByID() throws Exception{
        System.out.println("测试 根据ID查询委托");
        mockmvc.perform(MockMvcRequestBuilders.get("/services/consign/1"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void Test_editConsign() throws Exception{
        System.out.println(("测试 委托更新"));
        mockmvc.perform(MockMvcRequestBuilders.put("/services/consign")
                .param("params","Hello World!")
                .param("files","FILELIST1")
                .param("users","1"))
                .andDo(MockMvcResultHandlers.print());
        mockmvc.perform(MockMvcRequestBuilders.get("/services/consign"))
                .andDo(MockMvcResultHandlers.print());
        // .andExpect(status().isOk());
    }

    @Test
    public void Test_addConsign() throws Exception{
        System.out.println(("测试 委托增加"));
        mockmvc.perform(MockMvcRequestBuilders.put("/services/consign")
                .param("params","Bye World!")
                .param("files","FILELIST2")
                .param("users","2"))
                .andDo(MockMvcResultHandlers.print());
        mockmvc.perform(MockMvcRequestBuilders.get("/services/consign"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
    }

    @Test
    public void Test_deleteConsign() throws Exception{
        System.out.println("测试 委托删除");
        mockmvc.perform(MockMvcRequestBuilders.delete("/services/consign"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isNoContent());
    }
}
