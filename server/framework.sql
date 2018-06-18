-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-07-10 10:34:05
-- 服务器版本： 10.1.16-MariaDB
-- PHP Version: 7.0.9

drop database stc;
create database stc;
use stc;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `framework`
--

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_consign`
--

CREATE TABLE `tbl_sys_consigns`(
  `CONSIGNATION` text COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL

--  `TESTTYPE` text COLLATE utf8_bin DEFAULT NULL,
--   `SOFTWARENAME` text COLLATE utf8_bin DEFAULT NULL,
--   `COMPANY_EN` text COLLATE utf8_bin DEFAULT NULL,
--   `COMPANY_CH` text COLLATE utf8_bin DEFAULT NULL,
--   `DEVELOPER` text COLLATE utf8_bin DEFAULT NULL,
--   `UNITPROPERTY` text COLLATE utf8_bin DEFAULT NULL,
--   `USER_DESCRIPTION` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNC_DESCRIPTION` text COLLATE utf8_bin DEFAULT NULL,
--   `TEST_BASIS` text COLLATE utf8_bin DEFAULT NULL,
--   `TEST_SPECIFICATION` text COLLATE utf8_bin DEFAULT NULL,
--
--   `FUNC_NUM` text COLLATE utf8_bin DEFAULT NULL,
--   `FP_NUM` text COLLATE utf8_bin DEFAULT NULL,
--   `CODELINE` text COLLATE utf8_bin DEFAULT NULL,
--
--   `SOFT_SYS` text COLLATE utf8_bin DEFAULT NULL,
--   `SOFT_SUPPORT` text COLLATE utf8_bin DEFAULT NULL,
--   `SOFT_APP` text COLLATE utf8_bin DEFAULT NULL,
--   `SOFT_OTHER` varchar(255) COLLATE utf8_bin DEFAULT NULL,
--
--   `CLIENT_SYS` text COLLATE utf8_bin DEFAULT NULL,
--   `CLIENT_INSTORAGE` text COLLATE utf8_bin DEFAULT NULL,
--   `CLIENT_EXSTORAGE` text COLLATE utf8_bin DEFAULT NULL,
--   `CLIENT_OTHER` text COLLATE utf8_bin DEFAULT NULL,
--
--   `SERVER_FRAME` text COLLATE utf8_bin DEFAULT NULL,
--   `SERVER_INSTORAGE` text COLLATE utf8_bin DEFAULT NULL,
--   `SERVER_EXSTORAGE` text COLLATE utf8_bin DEFAULT NULL,
--   `SERVER_OTHER` text COLLATE utf8_bin DEFAULT NULL,
--
--   `SERVER_SYS` text COLLATE utf8_bin DEFAULT NULL,
--   `SERVER_LAN` text COLLATE utf8_bin DEFAULT NULL,
--   `SERVER_DATA` text COLLATE utf8_bin DEFAULT NULL,
--   `SERVER_SUPPORT` text COLLATE utf8_bin DEFAULT NULL,
--   `WEBENV` text COLLATE utf8_bin DEFAULT NULL,
--
--   `SAMPLE_TYPE` text COLLATE utf8_bin DEFAULT NULL,
--   `SAMPLE_FILE` text COLLATE utf8_bin DEFAULT NULL,
--   `SAMPLE_CHOICE` text COLLATE utf8_bin DEFAULT NULL,
--   `SAMPLE_TIME` text COLLATE utf8_bin DEFAULT NULL,
--
--   `CONSIGN_TEL` text COLLATE utf8_bin DEFAULT NULL,
--   `CONSIGN_FAX` text COLLATE utf8_bin DEFAULT NULL,
--   `CONSIGN_ADDR` text COLLATE utf8_bin DEFAULT NULL,
--   `CONSIGN_CODE` text COLLATE utf8_bin DEFAULT NULL,
--   `CONSIGN_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `CONSIGN_PHONE` text COLLATE utf8_bin DEFAULT NULL,
--   `CONSIGN_EMAIL` text COLLATE utf8_bin DEFAULT NULL,
--   `CONSIGN_WEB` text COLLATE utf8_bin DEFAULT NULL,
--
--
--   `OTHER_ENCRYPT` text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_VIRUS` text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_SAMPLE` text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_REDOC` text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_USERDOC` text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_OPDOC` text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_INFO`  text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_CHECK` text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_DEAL` text COLLATE utf8_bin DEFAULT NULL,
--   `OTHER_PROJECTID` text COLLATE utf8_bin DEFAULT NULL,

--
--   `FUNCTEST_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_ID` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M1_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M1_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M2_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M2_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M3_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M3_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M4_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M4_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M5_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M5_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M6_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M6_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M7_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M7_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M8_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M8_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M9_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M9_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M10_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M10_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M11_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M11_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M12_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M12_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M13_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M13_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M14_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M14_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M15_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M15_INFO` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M16_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `FUNCTEST_M16_INFO` text COLLATE utf8_bin DEFAULT NULL,
--
--   `TESTREPO_COMPANY` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_ID` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_VERSION` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_COMETIME` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_TESTTIME` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_RELY` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_SAMPLE` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_SAMPLEDOC` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_CONCLUDE` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_EXECUTOR` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_EXECUTOR_TIME` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_AUDITOR` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_AUDITOR_TIME` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_APPROVER` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_APPROVER_TIMER` text COLLATE utf8_bin DEFAULT NULL,
--
--   `TESTREPO_CLIENT_PHONE` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_CLIENT_FAX` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_CLIENT_ADDR` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_CLIENT_CODE` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_CLIENT_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_CLIENT_EMAIL` text COLLATE utf8_bin DEFAULT NULL,
--
--   `TESTREPO_SERVER_PHONE` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_SERVER_FAX` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_SERVER_ADDR` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_SERVER_CODE` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_SERVER_NAME` text COLLATE utf8_bin DEFAULT NULL,
--   `TESTREPO_SERVER_EMAIL` text COLLATE utf8_bin DEFAULT NULL

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
--  表的结构 `tbl_sys_contract`
--

CREATE TABLE `tbl_sys_contracts`(
  `CONTRACTBODY` text COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_project`
--

CREATE TABLE `tbl_sys_projects` (
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CONSIGN_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CONTRACT_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TESTREPORT_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TESTREPORTCHECK_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TESTWORKCHECK_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TESTPLAN_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_testreports`
--

CREATE TABLE `tbl_sys_testreports`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_testrecords`
--

CREATE TABLE `tbl_sys_testrecords`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `PROJECT_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `TESTCASE_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


--
-- 表的结构 `tbl_sys_testcases`
--

CREATE TABLE `tbl_sys_testcases`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `PROJECT_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_testbugs`
--

CREATE TABLE `tbl_sys_testbugs`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `PROJECT_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_testfunctions`
--

CREATE TABLE `tbl_sys_testfunctions`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `PROJECT_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_testplans`
--

CREATE TABLE `tbl_sys_testplans`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_testreportchecks`
--

CREATE TABLE `tbl_sys_testreportchecks`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_testworkchecks`
--

CREATE TABLE `tbl_sys_testworkchecks`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `SOFTWARENAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `VERSION` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CLIENT` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `STARTTIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `FCENDTIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TESTWORKER` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `ACENDTIME` varchar(255) COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 表的结构 `tbl_sys_file`
--

-- --------------------------------------------------------


CREATE TABLE `tbl_sys_functions` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `FUNCTION_TYPE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `FUNCTION_OBJECT` varchar(255) COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_function`
--

INSERT INTO `tbl_sys_functions` (`id`,`code`,`name`,`created_time`,`created_user_id`,`altered_time`,`altered_user_id`,`FUNCTION_TYPE`,`FUNCTION_OBJECT`) VALUES
('0-0',NULL,'ConsignAdd',NULL,NULL,NULL,NULL,'ADD','Consign'),
('0-1',NULL,'ConsignDelete',NULL,NULL,NULL,NULL,'DELETE','Consign'),
('0-2',NULL,'ConsignEdit',NULL,NULL,NULL,NULL,'EDIT','Consign'),
('0-3',NULL,'ConsignView',NULL,NULL,NULL,NULL,'VIEW','Consign'),
('1-0',NULL,'ContractAdd',NULL,NULL,NULL,NULL,'ADD','Contract'),
('1-1',NULL,'ContractDelete',NULL,NULL,NULL,NULL,'DELETE','Contract'),
('1-2',NULL,'ContractEdit',NULL,NULL,NULL,NULL,'EDIT','Contract'),
('1-3',NULL,'ContractView',NULL,NULL,NULL,NULL,'VIEW','Contract'),
('2-0',NULL,'ProjectAdd',NULL,NULL,NULL,NULL,'ADD','Project'),
('2-1',NULL,'ProjectDelete',NULL,NULL,NULL,NULL,'DELETE','Project'),
('2-2',NULL,'ProjectEdit',NULL,NULL,NULL,NULL,'DELETE','Project'),
('2-3',NULL,'ProjectView',NULL,NULL,NULL,NULL,'VIEW','Project'),
('3-0',NULL,'TestPlanAdd',NULL,NULL,NULL,NULL,'ADD','TestPlan'),
('3-1',NULL,'TestPlanDelete',NULL,NULL,NULL,NULL,'DELETE','TestPlan'),
('3-2',NULL,'TestPlanEdit',NULL,NULL,NULL,NULL,'EDIT','TestPlan'),
('3-3',NULL,'TestPlanView',NULL,NULL,NULL,NULL,'VIEW','TestPlan'),
('4-0',NULL,'TestCaseAdd',NULL,NULL,NULL,NULL,'ADD','TestCase'),
('4-1',NULL,'TestCaseDelete',NULL,NULL,NULL,NULL,'DELETE','TestCase'),
('4-2',NULL,'TestCaseEdit',NULL,NULL,NULL,NULL,'EDIT','TestCase'),
('4-3',NULL,'TestCaseView',NULL,NULL,NULL,NULL,'VIEW','TestCase'),
('5-0',NULL,'TestRecordAdd',NULL,NULL,NULL,NULL,'ADD','TestRecord'),
('5-1',NULL,'TestRecordDelete',NULL,NULL,NULL,NULL,'DELETE','TestRecord');




--
-- 表的结构 `tbl_sys_operation_log`
--



--
-- 表的结构 `tbl_sys_role`
--

CREATE TABLE `tbl_sys_roles` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_string` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_role`
--

INSERT INTO `tbl_sys_roles` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `role_name`, `name`, `description`, `role_string`) VALUES
('0', '11:28:46', '0', '0', NULL, '0', '超级管理员', NULL, NULL, 'super_admin'),
-- ('1fb22ed9-2261-4cac-9884-d5dc2a895648', NULL, NULL, NULL, '2017-05-18 09:21:30', '0', '普通用户', NULL, NULL, 'normal_user');
('1',NULL,'1','1',NULL,'1','市场部工作人员',NULL,NULL,'marketing_user'),
('2',NULL,'2','2',NULL,'2','普通客户',NULL,NULL,'normal_customer'),
('3',NULL,NULL,NULL,NULL,NULL,'测试部工作人员',NULL,NULL,'testing_user');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_role_function`
--

CREATE TABLE `tbl_sys_role_functions` (
  `function_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_role_function`
--

INSERT INTO `tbl_sys_role_functions` (`function_id`, `role_id`) VALUES
('0-0','2'),
('0-1','2'),
('0-2','2'),
('0-3','2'),
('1-0','1'),
('1-1','1'),
('1-2','1'),
('1-3','1');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_role_user`
--

CREATE TABLE `tbl_sys_role_users` (
  `user_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `role_id` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_role_user`
--

INSERT INTO `tbl_sys_role_users` (`user_id`, `role_id`) VALUES
('0', '0'),
-- ('22e37288-112e-4c82-a2a5-a1b9eb6f019c', '1fb22ed9-2261-4cac-9884-d5dc2a895648');
('1','1'),
('2','2'),
('3','2'),
('4','3');
-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_user`
--

CREATE TABLE `tbl_sys_users` (
  `ID` varchar(100) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `USERNAME` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `PASSWORD` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `salt` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_user`
--

INSERT INTO `tbl_sys_users` (`ID`, `CODE`, `USERNAME`, `PASSWORD`, `altered_time`, `altered_user_id`, `created_time`, `created_user_id`, `name`, `salt`) VALUES
('0', '0', 'admin', '21232F297A57A5A743894A0E4A801FC3', NULL, NULL, NULL, '0', 'DimitriZhao', NULL),
-- ('22e37288-112e-4c82-a2a5-a1b9eb6f019c', NULL, 'test', 'E10ADC3949BA59ABBE56E057F20F883E', '09:37:05', '0', '2017-06-14 09:36:39', '0', 'TEST', NULL);
('1','1','marketing','21232F297A57A5A743894A0E4A801FC3',NULL,NULL,NULL,'1','Marketing',NULL),
('2','2','customer1','21232F297A57A5A743894A0E4A801FC3',NULL,NULL,NULL,'2','Customer1',NULL),
('3','3','customer2','21232F297A57A5A743894A0E4A801FC3',NULL,NULL,NULL,'3','Customer2',NULL),
('4','4','testing','21232F297A57A5A743894A0E4A801FC3',NULL,NULL,NULL,'4','Testing',NULL);
-- --------------------------------------------------------


ALTER TABLE `tbl_sys_functions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sys_operation_log`
--

--
-- Indexes for table `tbl_sys_organization`
--

--
-- Indexes for table `tbl_sys_organization_user`
--


--
-- Indexes for table `tbl_sys_role`
--
ALTER TABLE `tbl_sys_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sys_role_function`
--
ALTER TABLE `tbl_sys_role_functions`
  ADD KEY `FK_tgfnmsm51p1heid7qd9wcghxj` (`function_id`),
  ADD KEY `FK_2r3mx5cv4q1eu6i7oex4a7y65` (`role_id`);
--

--
-- Indexes for table `tbl_sys_role_user`
--
ALTER TABLE `tbl_sys_role_users`
  ADD KEY `FK_4rbt5lhjoqj0r268ur0gcurf2` (`role_id`),
  ADD KEY `FK_44m1qqntwycmydgmmdcmagdn3` (`user_id`);

--
-- Indexes for table `tbl_sys_user`
--
ALTER TABLE `tbl_sys_users`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_topic`
--
ALTER TABLE `tbl_sys_projects`
  ADD PRIMARY KEY (`ID`);
--




--
-- 限制表 `tbl_standard_resource`
--
--
-- 限制表 `tbl_sys_role_user`
--
ALTER TABLE `tbl_sys_role_users`
  ADD CONSTRAINT `FK_44m1qqntwycmydgmmdcmagdn3` FOREIGN KEY (`user_id`) REFERENCES `tbl_sys_users` (`ID`),
  ADD CONSTRAINT `FK_4rbt5lhjoqj0r268ur0gcurf2` FOREIGN KEY (`role_id`) REFERENCES `tbl_sys_roles` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
