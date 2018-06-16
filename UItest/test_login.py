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


class LoginCase(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.dr = webdriver.Chrome()
        self.dr.maximize_window()
        # self.dr.get('localhost:3000')  # 登录页面

    @classmethod
    def tearDownClass(self):
        sleep(2)
        self.dr.quit()

    # 定义登录方法
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

    def test_login_success(self):
        ''' 用户名、密码正确 '''
        self.login('customer1', 'admin')
        index = self.dr.current_url
        self.assertEqual(index, "http://localhost:3000/index")

    def test_login_pwd_error(self):
        ''' 用户名正确、密码错误 '''
        self.login('customer1', 'aaa')
        error_message = self.dr.find_element_by_xpath("//div[@class='ant-message-notice-content']/div/span").text
        self.assertEqual(error_message, '登录失败，请重试')

    def test_login_user_error(self):
        ''' 用户名错误、密码正确 '''
        self.login('hhh', 'admin')
        error_message = self.dr.find_element_by_xpath("//div[@class='ant-message-notice-content']/div/span").text
        self.assertEqual(error_message, '登录失败，请重试')

    def test_login_pwd_null(self):
        ''' 用户名正确、密码为空 '''
        self.login('customer1', '')
        error_message = self.dr.find_element_by_class_name('ant-form-explain').text
        self.assertEqual(error_message, '请输入密码!')

    def test_login_user_null(self):
        ''' 用户名为空、密码正确 '''
        self.login('', 'admin')
        error_message = self.dr.find_element_by_class_name('ant-form-explain').text
        self.assertEqual(error_message, '请输入用户名!')

    def test_logout(self):
        ''' 登出 '''
        print(self.dr.current_url)
        self.dr.find_element_by_xpath("//div[@class='ant-layout-header']/div/button[2]").click()
        # user = self.dr.find_element_by_xpath("//div[@class='ant-layout-header']/span").text
        WebDriverWait(self.dr, 10).until(
            lambda the_driver:
            the_driver.find_element_by_xpath("//ul[contains(@class,'ant-dropdown-menu')]").is_displayed())
        menu = self.dr.find_element_by_xpath("//ul[contains(@class,'ant-dropdown-menu')]")
        menu.find_element_by_xpath("//li[@class='ant-dropdown-menu-item']").click()
        sleep(2)    # 等待页面跳转
        message = self.dr.find_element_by_xpath("//div[@class='ant-message-notice-content']/div/span").text
        self.assertEqual(message, '退出成功，正在跳转')


'''
class ConsignCase(unittest.TestCase):
    def setUp(self):
        self.dr = webdriver.Chrome()
        self.dr.maximize_window()

    def login(self):
        self.dr.get('localhost:3000')  # 登录页面
        self.dr.find_element_by_id('username').send_keys('customer1')
        self.dr.find_element_by_id('password').send_keys('admin')
        self.dr.find_element_by_id('login').click()
        sleep(2)    # 等待页面跳转
        print(self.dr.current_url)

    def test_select(self):
        self.login()
        self.dr.find_element_by_class_name("ant-select-selection-selected-value").click()
        sleep(2)
        WebDriverWait(self.dr, 10).until(
            lambda the_driver:
            the_driver.find_element_by_xpath("//ul[contains(@class,'ant-dropdown-menu')]").is_displayed())
        selectmenu = self.dr.find_element_by_xpath("//ul[contains(@class,'ant-dropdown-menu')]")
        selectmenu.find_element_by_xpath("//li[@class='ant-dropdown-menu-item']").click()
'''
