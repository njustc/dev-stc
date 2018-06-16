# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from time import sleep
import unittest
import sys
import os
if 'HTTP_PROXY'in os.environ:
    del os.environ['HTTP_PROXY']
reload(sys)
sys.setdefaultencoding('utf8')


class ConsignCase(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.dr = webdriver.Chrome()
        self.dr.maximize_window()
        # self.dr.get('localhost:3000')  # 登录页面

    @classmethod
    def tearDownClass(self):
        sleep(2)
        self.dr.quit()

    def login(self, username, password):
        self.dr.get('localhost:3000')  # 登录页面
        user = self.dr.find_element_by_id('username')
        user.clear()
        user.send_keys(username)
        pwd = self.dr.find_element_by_id('password')
        pwd.clear()
        pwd.send_keys(password)
        self.dr.find_element_by_id('login').click()
        sleep(2)  # 等待页面跳转

    def test_a_consignList(self):
        '''打开委托列表标签页'''
        self.login('customer1', 'admin')
        consign = self.dr.find_element_by_xpath("//div[@class='ant-layout-sider-children']/ul/li[2]/div/span/span")
        self.assertEqual(consign.text, '委托')
        # print(consign.text)
        consign.click()
        WebDriverWait(self.dr, 10).until(
            lambda the_driver:
            the_driver.find_element_by_xpath("//ul[@id='sub1$Menu']").is_displayed())
        consignList = self.dr.find_element_by_xpath("//ul[@id='sub1$Menu']/li[1]")
        self.assertEqual(consignList.text, '委托列表')
        consignList.click()
        tab = self.dr.find_element_by_xpath \
            ("//div[contains(@class,'ant-tabs-nav-animated')]/div[contains(@class,'ant-tabs-tab-active')]/div")
        self.assertEqual(tab.text, '委托列表')

    def test_b_create_consign(self):
        '''新建委托'''
        consigns = self.dr.find_elements_by_xpath("//tbody[@class='ant-table-tbody']/tr")
        # print(consigns.text)
        before = len(consigns)
        print(before)
        create = self.dr.find_element_by_xpath("//span[@class='ant-input-group']/div/button")
        text = create.find_element_by_xpath(".//span")
        print(text.text)
        create.click()
        sleep(2)
        consigns = self.dr.find_elements_by_xpath("//tbody[@class='ant-table-tbody']/tr")
        after = len(consigns)
        print(after)
        self.assertEqual(before+1, after)
        newConsign = self.dr.find_element_by_xpath("//tbody[@class='ant-table-tbody']/tr[last()]")
        state = newConsign.find_element_by_xpath(".//td[4]/span/span/span[2]")
        print(state.text)
        self.assertEqual(state.text, '待提交')

    def test_c_view_consign(self):
        '''查看委托'''
        consign = self.dr.find_element_by_xpath("//tbody[@class='ant-table-tbody']/tr[last()]")
        view = consign.find_element_by_link_text('查看详情')
        view.click()
        sleep(2)
        tab = self.dr.find_element_by_xpath\
            ("//div[contains(@class,'ant-tabs-nav-animated')]/div[contains(@class,'ant-tabs-tab-active')]/div")
        self.assertEqual(tab.text, '委托详情')

    def nextStep(self):
        next = self.dr.find_element_by_xpath("//div[@role='tabpanel']/form/div[@class='steps-action']/button")
        # self.assertEqual(next.find_element_by_xpath(".//span").text, '下一页')
        next.click()
        sleep(2)

    def test_d_fillin_consign(self):
        '''填写委托'''
        # TODO 填写委托表单具体内容
        self.nextStep()
        process = self.dr.find_element_by_xpath\
            ("//div[contains(@class,'ant-steps-item-process')]/div[@class='ant-steps-item-content']/div")
        self.assertEqual(process.text, '软件基本信息')
        self.nextStep()
        process = self.dr.find_element_by_xpath \
            ("//div[contains(@class,'ant-steps-item-process')]/div[@class='ant-steps-item-content']/div")
        self.assertEqual(process.text, '软件运行环境')
        self.nextStep()
        process = self.dr.find_element_by_xpath \
            ("//div[contains(@class,'ant-steps-item-process')]/div[@class='ant-steps-item-content']/div")
        self.assertEqual(process.text, '委托测试信息')

    def test_e_save_consign(self):
        '''保存委托'''
        # TODO 保存委托的测试（目前只做了保存按钮点击的提示）
        save = self.dr.find_element_by_xpath("//div[@class='ant-form-item-control-wrapper']/div/span/button")
        self.assertEqual(save.find_element_by_xpath("./span").text, '保 存')
        save.click()
        sleep(1)
        message = self.dr.find_element_by_xpath("//div[contains(@class,'ant-message-success')]/span").text
        self.assertEqual(message, '保存成功')
        sleep(5)

    def test_f_submit_consign(self):
        '''提交委托'''
        submit = self.dr.find_element_by_xpath("//div[@class='ant-form-item-control-wrapper']/div/span/button[2]")
        self.assertEqual(submit.find_element_by_xpath("./span").text, '提 交')
        submit.click()
        sleep(1)
        message = self.dr.find_element_by_xpath("//div[contains(@class,'ant-message-success')]/span").text
        self.assertEqual(message, '提交成功')
        sleep(5)
        # list = self.dr.find_element_by_xpath\
        #    ("//div[contains(@class,'ant-tabs-nav-animated') and contains(@aria-selected,'false')]/div")
        list = self.dr.find_element_by_xpath \
            ("//div[contains(@class,'ant-tabs-nav-animated')]/div[2]")
        self.assertEqual(list.find_element_by_xpath("./div").text, '委托列表')
        # list.click()
        list.send_keys('\n')
        tab = self.dr.find_element_by_xpath \
            ("//div[contains(@class,'ant-tabs-nav-animated')]/div[contains(@class,'ant-tabs-tab-active')]/div")
        print(tab.text)
        close = self.dr.find_element_by_xpath \
            ("//div[contains(@class,'ant-tabs-nav-animated')]/div[contains(@class,'ant-tabs-tab-active')]/div/i")
        # close.click()
        close.send_keys('\n')
        # self.assertEqual(tab.text, '委托详情')
        sleep(2)
        tab = self.dr.find_element_by_xpath \
            ("//div[contains(@class,'ant-tabs-nav-animated')]/div[contains(@class,'ant-tabs-tab-active')]/div")
        self.assertEqual(tab.text, '委托列表')