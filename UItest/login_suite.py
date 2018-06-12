# -*- coding: utf-8 -*-
import unittest
from test_login import LoginCase


def loginSuite():
    tests = ["test_login_pwd_error", "test_login_user_error", "test_login_pwd_null",
             "test_login_user_null", "test_login_success", "test_logout"]
    return unittest.TestSuite(map(LoginCase, tests))


if __name__ == '__main__':
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(loginSuite())
