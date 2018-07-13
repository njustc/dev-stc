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
  `USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,


  `TESTTYPE` text COLLATE utf8_bin DEFAULT NULL,
  `SOFTWARENAME` text COLLATE utf8_bin DEFAULT NULL,
  `VERSION` text COLLATE utf8_bin DEFAULT NULL,
  `COMPANY_EN` text COLLATE utf8_bin DEFAULT NULL,
  `COMPANY_CH` text COLLATE utf8_bin DEFAULT NULL,
  `DEVELOPER` text COLLATE utf8_bin DEFAULT NULL,
  `UNITPROPERTY` text COLLATE utf8_bin DEFAULT NULL,
  `USER_DESCRIPTION` text COLLATE utf8_bin DEFAULT NULL,
  `FUNC_DESCRIPTION` text COLLATE utf8_bin DEFAULT NULL,
  `TEST_BASIS` text COLLATE utf8_bin DEFAULT NULL,
  `TEST_SPECIFICATION` text COLLATE utf8_bin DEFAULT NULL,

  `FUNC_NUM` text COLLATE utf8_bin DEFAULT NULL,
  `FP_NUM` text COLLATE utf8_bin DEFAULT NULL,
  `CODELINE` text COLLATE utf8_bin DEFAULT NULL,

  `SOFT_SYS` text COLLATE utf8_bin DEFAULT NULL,
  `SOFT_SUPPORT` text COLLATE utf8_bin DEFAULT NULL,
  `SOFT_APP` text COLLATE utf8_bin DEFAULT NULL,
  `SOFT_OTHER` text COLLATE utf8_bin DEFAULT NULL,

  `CLIENT_SYS` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENT_INSTORAGE` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENT_EXSTORAGE` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENT_OTHER` varchar(255) COLLATE utf8_bin DEFAULT NULL,

  `SERVER_FRAME` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_INSTORAGE` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_EXSTORAGE` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_OTHER` text COLLATE utf8_bin DEFAULT NULL,

  `SERVER_SYS` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_LAN` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_DATA` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_SUPPORT` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_SOFT_VERSION` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_SOFT_FRAME` text COLLATE utf8_bin DEFAULT NULL,
  `SERVER_SOFT_MIDW` text COLLATE utf8_bin DEFAULT NULL,
  `WEBENV` text COLLATE utf8_bin DEFAULT NULL,

  `SAMPLE_TYPE` text COLLATE utf8_bin DEFAULT NULL,
  `SAMPLE_FILE` text COLLATE utf8_bin DEFAULT NULL,
  `SAMPLE_CHOICE` text COLLATE utf8_bin DEFAULT NULL,
  `SAMPLE_TIME` text COLLATE utf8_bin DEFAULT NULL,

  `CONSIGN_TEL` text COLLATE utf8_bin DEFAULT NULL,
  `CONSIGN_FAX` text COLLATE utf8_bin DEFAULT NULL,
  `CONSIGN_ADDR` text COLLATE utf8_bin DEFAULT NULL,
  `CONSIGN_CODE` text COLLATE utf8_bin DEFAULT NULL,
  `CONSIGN_NAME` text COLLATE utf8_bin DEFAULT NULL,
  `CONSIGN_PHONE` text COLLATE utf8_bin DEFAULT NULL,
  `CONSIGN_EMAIL` text COLLATE utf8_bin DEFAULT NULL,
  `CONSIGN_WEB` text COLLATE utf8_bin DEFAULT NULL,


  `OTHER_ENCRYPT` text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_VIRUS` text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_SAMPLE` text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_REDOC` text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_USERDOC` text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_OPDOC` text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_OTHER`  text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_CHECK` text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_DEAL` text COLLATE utf8_bin DEFAULT NULL,
  `OTHER_PROJECTID` text COLLATE utf8_bin DEFAULT NULL

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
--  表的结构 `tbl_sys_contract`
--

CREATE TABLE `tbl_sys_contracts`(

  `CLIENT` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEE` text COLLATE utf8_bin DEFAULT NULL,
  `SIGNPLACE` text COLLATE utf8_bin DEFAULT NULL,
  `SIGNDATA` text COLLATE utf8_bin DEFAULT NULL,
  `QUALITY` text COLLATE utf8_bin DEFAULT NULL,
  `PRICE` text COLLATE utf8_bin DEFAULT NULL,
  `FINISHTIME` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTCOMPANYNAME` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTAUTHPEPRE` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTSIGNDATA` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTCONTACT` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTADDR` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTTEL` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTFAX` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTBANK` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTUSERNAME` text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTPOSTCODE` text COLLATE utf8_bin DEFAULT NULL,

  `ASSIGNEECOMPANYNAME` text COLLATE utf8_bin DEFAULT NULL,
  `ASSGINEEAUTHREPRE` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEESIGNDATA` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEECONTACT` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEEADDR` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEETEL` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEEFAX` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEEBANK` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEEBANKNAME` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEEUSERNAME` text COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEEPOSTCODE` text COLLATE utf8_bin DEFAULT NULL,


  `CONTRACTBODY` text COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL
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
  `TESTPLAN_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SATISFACTIONSURVEY_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



--
-- 表的结构 `tbl_sys_testreports`
--

CREATE TABLE `tbl_sys_testreports`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin NOT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,

  `VERSION`text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTCOMPANY` text COLLATE utf8_bin DEFAULT NULL,
  `TESTTYPE` text COLLATE utf8_bin DEFAULT NULL,
  `REPORTDATA`text COLLATE utf8_bin DEFAULT NULL,
   `CODEID`text COLLATE utf8_bin DEFAULT NULL,
   `SAMPLENAME`text COLLATE utf8_bin DEFAULT NULL,
   `SAMPLEDATA`text COLLATE utf8_bin DEFAULT NULL,
  `TESTDATA`text COLLATE utf8_bin DEFAULT NULL,
  `TESTBASIS`text COLLATE utf8_bin DEFAULT NULL,
  `TESTMENUSAMPLE`text COLLATE utf8_bin DEFAULT NULL,
  `TESTMENUDOC`text COLLATE utf8_bin DEFAULT NULL,
  `TESTCONCLUSION`text COLLATE utf8_bin DEFAULT NULL,
  `TESTER`text COLLATE utf8_bin DEFAULT NULL,
  `TESTERTIME`text COLLATE utf8_bin DEFAULT NULL,

  `AUDITOR`text COLLATE utf8_bin DEFAULT NULL,
  `AUDITORDATA`text COLLATE utf8_bin DEFAULT NULL,
  `APPROVER`text COLLATE utf8_bin DEFAULT NULL,
  `APPROVERDATA`text COLLATE utf8_bin DEFAULT NULL,

  `CLIENTTEL`text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTFAX`text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTADDR`text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTPOSTCODE`text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTCONTACT`text COLLATE utf8_bin DEFAULT NULL,
  `CLIENTEMAIL`text COLLATE utf8_bin DEFAULT NULL


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
  `TESTCASE_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL
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
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `TESTTYPE` text COLLATE utf8_bin DEFAULT NULL,
  `TESTORDER` text COLLATE utf8_bin DEFAULT NULL,
  `DESIGNNOTE` text COLLATE utf8_bin DEFAULT NULL,
  `AGREEMENTNOTE` text COLLATE utf8_bin DEFAULT NULl,
  `IMPLEMENTATION` text COLLATE utf8_bin DEFAULT NULL,
  `PRERESULT` text COLLATE utf8_bin DEFAULT NULL,
  `DESIGNERNAME` text COLLATE  utf8_bin DEFAULT NULL,
  `TIME1` text COLLATE utf8_bin DEFAULT NULL,
  `BASIS` text COLLATE utf8_bin DEFAULT NULL,
  `TESTCONDITION` text COLLATE utf8_bin DEFAULT NULL,
  `ACRESULT` text COLLATE utf8_bin DEFAULT NULL,
  `SAMERESULT` text COLLATE utf8_bin DEFAULT NULL,
  `CASEEXECUTOR` text COLLATE utf8_bin DEFAULT NULL,
  `TIME2` text COLLATE utf8_bin DEFAULT NULL,
  `COMFIRMER` text COLLATE utf8_bin DEFAULT NULL,
  `BUGDESC` text COLLATE utf8_bin DEFAULT NULL,
  `DEMAND` text COLLATE utf8_bin DEFAULT NULL,
  `BUGCONDITION` text COLLATE utf8_bin DEFAULT NULL,
  `BUGPATH` text COLLATE utf8_bin DEFAULT NULL,
  `TIME3` text COLLATE utf8_bin DEFAULT NULL,
  `REVSUG` text COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL
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
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL
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
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL
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
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `AUTHOR`text COLLATE utf8_bin DEFAULT NULL,
  `AUDITOR` text COLLATE utf8_bin DEFAULT NULL,
  `APPROVER` text COLLATE utf8_bin DEFAULT NULL,
  `HARDWARE` text COLLATE utf8_bin DEFAULT NULL,
  `SOFTWARE`text COLLATE utf8_bin DEFAULT NULL,
  `STAFF` text COLLATE utf8_bin DEFAULT NULL,
  `PROGRESSTABLE` text COLLATE utf8_bin DEFAULT NULL
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
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL
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
  `ACENDTIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TABLE `tbl_sys_satisfactionsurveys`(
  `ID` varchar(255) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_TIME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_ID` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID` varchar(255) COLLATE  utf8_bin DEFAULT NULL,
  `BODY` text COLLATE utf8_bin DEFAULT NULL,
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `tbl_sys_organization` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `organization_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `parent_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

ALTER TABLE `tbl_sys_organization`
  ADD PRIMARY KEY (`id`);

CREATE TABLE `tbl_sys_organization_user` (
  `organization_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `is_principal` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `tbl_sys_delete_authorization` (
  `organization_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `tbl_sys_edit_authorization` (
  `organization_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `tbl_sys_query_authorization` (
  `organization_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
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
('5-0',NULL,'TestFunctionAdd',NULL,NULL,NULL,NULL,'ADD','TestFunction'),
('5-1',NULL,'TestFunctionDelete',NULL,NULL,NULL,NULL,'DELETE','TestFunction'),
('5-2',NULL,'TestFunctionEdit',NULL,NULL,NULL,NULL,'EDIT','TestFunction'),
('5-3',NULL,'TestFunctionView',NULL,NULL,NULL,NULL,'VIEW','TestFunction'),
('6-0',NULL,'TestReportAdd',NULL,NULL,NULL,NULL,'ADD','TestReport'),
('6-1',NULL,'TestReportDelete',NULL,NULL,NULL,NULL,'DELETE','TestReport'),
('6-2',NULL,'TestReportEdit',NULL,NULL,NULL,NULL,'EDIT','TestReport'),
('6-3',NULL,'TestReportView',NULL,NULL,NULL,NULL,'VIEW','TestReport'),
('7-0',NULL,'TestReportCheckAdd',NULL,NULL,NULL,NULL,'ADD','TestReportCheck'),
('7-1',NULL,'TestReportCheckDelete',NULL,NULL,NULL,NULL,'DELETE','TestReportCheck'),
('7-2',NULL,'TestReportCheckEdit',NULL,NULL,NULL,NULL,'EDIT','TestReportCheck'),
('7-3',NULL,'TestReportCheckView',NULL,NULL,NULL,NULL,'VIEW','TestReportCheck'),
('8-0',NULL,'TestWorkCheckAdd',NULL,NULL,NULL,NULL,'ADD','TestWorkCheck'),
('8-1',NULL,'TestWorkCheckDelete',NULL,NULL,NULL,NULL,'DELETE','TestWorkCheck'),
('8-2',NULL,'TestWorkCheckEdit',NULL,NULL,NULL,NULL,'EDIT','TestWorkCheck'),
('8-3',NULL,'TestWorkCheckView',NULL,NULL,NULL,NULL,'VIEW','TestWorkCheck');




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
  `CREATED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ALTERED_USER_NAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
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
('3',NULL,'3','3',NULL,'3','测试部工作人员',NULL,NULL,'testing_user'),
('4',NULL,'4','4',NULL,'4','市场部主任',NULL,NULL,'marketing_manager'),
('5',NULL,'5','5',NULL,'5','测试部主任',NULL,NULL,'testing_manager'),
('6',NULL,'6','6',NULL,'6','质量部人员',NULL,NULL,'quality_user');
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
('1-3','1'),
('3-0','3'),
('3-1','3'),
('3-2','3'),
('3-3','3'),
('4-0','3'),
('4-1','3'),
('4-2','3'),
('4-3','3'),
('6-0','3'),
('6-1','3'),
('6-2','3'),
('6-3','3');

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
('4','3'),
('5','6');
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
  `created_user_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
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
('4','4','testing','21232F297A57A5A743894A0E4A801FC3',NULL,NULL,NULL,'4','Testing',NULL),
('5','5','quality','21232F297A57A5A743894A0E4A801FC3',NULL,NULL,NULL,'6','Quality',NULL);
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

ALTER TABLE `tbl_sys_organization_user`
  ADD KEY `FK_1xf5y20elkka13pumi8r2f8r4` (`organization_id`),
  ADD KEY `FK_syj426syoggn9kae85kspa0se` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
