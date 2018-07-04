# testcase说明 
> 这里将测试用例，测试记录，测试问题集中到一个类中

|序号|变量名|名称|属于大类|状态|
|--|--|--|--|--|
|1|testType|测试分类|测试用例 & 测试记录|已定义|
|2|testOrder|序号|测试用例&测试记录|已定义|
|3|designNote|测试用例设计说明|测试用例&测试记录|已定义|
|4|agreementNote|与本测试用例有关的规约说明|测试用例&测试记录|已定义|
|5|implementation|测试用例执行过程|测试用例&测试记录|已定义|
|6|preResult|预期结果|测试用例&测试记录|已定义|
|7|designerName|测试用例设计者|测试用例|已定义|
|8|time1|测试用例设计时间|测试用例|已定义|
|9|basis|测试依据|测试用例&测试记录|已定义|
|10|condition|前提条件|测试记录|已定义|
|11|acResult|实际结果|测试记录|已定义|``
|12|sameResult|是否与预期结果一致|测试记录|已定义
|13|caseExecutor|用例执行者|测试记录&测试问题|已定义
|14|time2|执行测试时间|测试记录|已定义
|15|comfirmer|确认人|测试记录&测试问题|已定义
|16|bugDesc|问题（缺陷）简要描述|测试问题|已定义
|17|demand|对应需求条目|测试问题|已定义
|18|bugCondition|发现缺陷的初始条件|测试问题|已定义
|19|bugPath|发现缺陷的用例及具体操作路径|测试问题|已定义
|20|time3|问题发现时间|测试问题|已定义
|21|revSug|修改建议|测试问题|已定义

# Consign说明

变量名|名称|状态
--|--|--
testType|测试类型|已定义
softwareName|软件名称||已定义
version|版本号|已定义
company_En|委托单位(英文)|已定义
company_Ch|委托单位(中文)|已定义
developer|开发单位|已定义
unitProperty|单位性质|已定义
user_Description|软件用户对象|已定义
func_Description|主要功能及用途简介|已定义
testBasis|测试依据|已定义
test_Specification|需要测试的技术指标|已定义
func_num|软件规模 - 功能数|已定义
fp_num|软件规模 - 功能点数|已定义
codeLine|软件规模 - 代码行数|已定义
softSys|软件类型 - 系统软件|已定义
softSupport|软件类型 - 支持软件|已定义
softApp|软件类型 - 应用软件|已定义
softOther|软件类型 - 其他|已定义
client_Sys|运行环境 - 客户端 - 操作系统|已定义
client_inStorage|运行环境 - 客户端 - 内存要求|已定义
client_exStorage|运行环境 - 客户端 - 硬盘要求|已定义
client_other|运行环境 - 客户端 - 其它要求|已定义
server_Frame|运行环境 - 服务器端 - 硬件 - 架构|已定义
server_inStorage|运行环境 - 服务器端 - 硬件 - 内存要求|已定义
server_exStorage|运行环境 - 服务器端 - 硬件 - 硬盘要求|已定义
server_other|运行环境 - 服务器端 - 硬件 - 其它要求|已定义
server_Sys|运行环境 - 服务器端 - 软件 - 操作系统|已定义
server_lan|运行环境 - 服务器端 - 软件 - 编程语言|已定义
server_Data|运行环境 - 服务器端 - 软件 - 数据库|已定义
server_support|运行环境 - 服务器端 - 软件 - 其它支撑软件|已定义
server_soft_version|运行环境 - 服务器端 - 软件 - 版本|已定义
server_soft_Frame|运行环境 - 服务器端 - 软件 - 架构|已定义
server_soft_MidW|运行环境 - 服务器端 - 软件 - 中间件|已定义
webEnv|运行环境 - 网络环境|已定义
sampleType|样品和数量 - 软件介质|已定义
sampleFile|样品和数量 - 文档资料|已定义
sampleChoice|提交的样品(硬拷贝资料、硬件)五年保存期满：由本实验室销毁还是退还|已定义
sampleTime|希望测试完成时间|已定义
consignTEL|委托单位信息 - 电话|已定义
consignFAX|委托单位信息 - 传真|已定义
consignAddr|委托单位信息 - 地址|已定义
consignCODE|委托单位信息 - 邮编|已定义
consignName|委托单位信息 - 联系人|已定义
consignPhone|委托单位信息 - 手机|已定义
consignEmail|委托单位信息 - E-mail|已定义
consignWEB|委托单位信息 - 网址|已定义
otherEncrypt|密级|已定义
otherVirus|查杀病毒|已定义
otherSample|材料检查 - 测试样品|已定义
otherREDOC|材料检查 - 需求文档|已定义
otherUSERDOC|材料检查 - 用户文档|已定义
otherOPDOC|材料检查 - 操作文档|已定义
otherOther|材料检查 - 其它|已定义
otherCheck|确认意见|已定义
otherDeal|受理意见|已定义
otherrojectId|测试项目编号|已定义
processInstanceID|流程ID|已定义

# Contract 合同

名称|变量名|状态
--|--|--
项目名称|name|已定义 - 使用BaseEntity中的name
委托方(甲方)|client|未定义
受托方(乙方)|assignee|未定义
签订地点|signPlace|未定义
签订日期|signData|未定义
质量特性|quality|未定义
合同价款|price|未定义
履行期限|finishTime|未定义
委托方-单位全称|clientCompanyName|未定义
委托方-授权代表|clientAuthRepre|未定义
委托方-签章日期|clientSignData|未定义
委托方-联系人|clientContact|未定义
委托方-通讯地址|clientAddr|未定义
委托方-电话|clientTel|未定义
委托方-传真|clientFax|未定义
委托方-开户银行|clientBank|未定义
委托方-账号|clientUserName|未定义
委托方-邮编|clientPostCode|未定义
受托方-单位全称|assigneeCompanyName|未定义
受托方-授权代表|assigneeAuthRepre|未定义
受托方-签章日期|assigneeSignData|未定义
受托方-联系人|assigneeContact|未定义
受托方-通讯地址|assigneeAddr|未定义
受托方-电话|assigneeTel|未定义
受托方-传真|assigneeFax|未定义
受托方-邮编|assigneePostCode|未定义
受托方-开户银行|assigneeBank|未定义
受托方-户名|assigneeBankName|未定义
受托方-账号|assigneeUserName|未定义

# 委托测试软件功能列表 TestFunctions

名称|变量名|状态
--|--|--
模块编号|已有 BaseEntity中的code
模块名称|已有 BaseEntity中的name
功能简述|已有 直接用body吧


# 测试方案 TestPlan

名称|变量名|状态
--|--|--
编制人|author|未定义
审核人|auditor|未定义
批准人|approver|未定义
测试环境 - 硬件|hardware|未定义 - 这里这整个表作为一个字符串，交给前端处理。
测试环境 - 软件|software|未定义 - 这里整个表作为一个字符串，交给前端处理。
测试环境 - 人员|staff|未定义 - 同上
测试进度表|progressTable|未定义 - 同上

# 测试报告 TestReport

名称|变量名|状态
--|--|--
软件名称|name|已定义 - BaseEntity
版本号|version|未定义
委托单位|clientCompany|未定义
测试类别|testType|未定义
报告日期|reportData|未定义
项目编号|code|已定义 - BaseEntity
样品名称|sampleName|未定义
来样日期|sampleData|未定义
测试时间|testData|未定义
测试依据|testBasis|未定义
样品清单 - 软件样本|testMenuSample|未定义
样品清单 - 软件文档|testMenuDoc|未定义
测试结论|testConclusion|未定义
主测人|tester|未定义
主测人日期|testerTime|未定义
审核人|auditor|未定义
审核人日期|auditorData|未定义
批准人|approver|未定义
批准人日期|approverData|未定义
委托单位电话|clientTel|未定义
委托单位传真|clientFax|未定义
委托单位地址|clientAddr|未定义
委托单位邮编|clientPostCode|未定义
委托单位联系人|clientContact|未定义
委托单位Email|clientEmail|未定义


# 测试报告检查表 TestReportCheck

名称|变量名|状态
--|--|--
软件名称|softwareName|未定义
委托单位|clientCompany|未定义
检查内容（下面的表）|checkBody|未定义
检查人|checkMan|未定义
检查日期|checkData|未定义

# 测试工作检查表 TestWorkCheck

名称|变量名|状态
--|--|--
软件名称|softwareName|未定义
版本号|version|未定义
委托单位|clientCompany|未定义
起始时间|startData|未定义
预计完成时间|preData|未定义
主测人|checkMan|未定义
实际完成时间|relData|未定义
检查内容（下面的表）|checkBody|未定义