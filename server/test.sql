INSERT INTO `tbl_sys_consign` ( `CONSIGNATION`,`PROCESS_INSTANCE_ID`, `ID`, `CODE`, `NAME`, `CREATED_TIME`, `CREATED_USER_ID`, `ALTERED_TIME`, `ALTERED_USER_ID`, `USER_ID`) VALUES
('consign1 belong to customer1','consign1','1',NULL,NULL,NULL,NULL,NULL,NULL,'2'),
('consign2 belong to customer1','consign2','2',NULL,NULL,NULL,NULL,NULL,NULL,'2'),
('consign3 belong to customer2','consign3','3',NULL,NULL,NULL,NULL,NULL,NULL,'3');

INSERT INTO `tbl_sys_contract` (`CONTRACTBODY`,`CONSIGN_ID`,`ID`,`CODE`,`NAME`,`CREATED_TIME`,`CREATED_USER_ID`,`ALTERED_TIME`,`ALTERED_USER_ID`) VALUES
('contract1 belong to consign1','1','contract1',NULL,NULL,NULL,NULL,NULL,NULL),
('contract2 belong to consign2','2','contract2',NULL,NULL,NULL,NULL,NULL,NULL),
('contract3 belong to consign3','3','contract3',NULL,NULL,NULL,NULL,NULL,NULL);