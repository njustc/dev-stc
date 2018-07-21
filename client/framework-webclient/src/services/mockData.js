import {STATE} from "./common";

export const valueData = {
    id: 'happy_yj',
    consignation: {"testType":["软件确认测试","成果/技术鉴定测试"],"softwareName":"快乐星球小杨杰","version":"v1.9","developUnit":"小猪佩奇有限公司","unitProp":"外(合)资企业","softwareScale":{},"operateEnvironment":{"client":{},"service":{"hardware":{},"software":{}},"sampleQuantity":{"softwareMedia":{}}}}
};

export const customerData = {
    clientDigest: "dfcbbdfef1f8561cc04cf219736922c07af9be789ca53aa24af6594e89e81ccb",
    functions: [{
      object: "Consign",
      function: "creator",
    },{
      object: "Contract",
      function: "confirmer",
    },{
      object: "Report",
      function: "confirmer",
    }
    ],
};

export const marketingData = {
    clientDigest: "dfcbbdfef1f8561cc04cf219736922c07af9be789ca53aa24af6594e89e81ccb",
    functions: [{
        object: "Consign",
        function: "confirmer",
    },{
        object: "Contract",
        function: "creator",
    },{
        object: "Report",
        function: "creator",
    }
    ],
};

export  const mockConsignData = [{

}];

export const mockProjectData = [{
    id : "110",
    name : "快乐星球小杨杰",
    customerId : "151220140",
    status: STATE.CANCELED,
    state : {
        consign : STATE.FINISHED,
        contract : STATE.TO_CHECK,
        testPlan : STATE.TO_SUBMIT,
        testReport : STATE.TO_SUBMIT,
        endProject : STATE.TO_SUBMIT
    }
},{
    id : "120",
    name : "不快乐星球小杨杰",
    customerId : "151220140",
    status: STATE.CANCELED,
    state : {
        consign : STATE.FINISHED,
        contract : STATE.FINISHED,
        testPlan : STATE.TO_SUBMIT,
        testReport : STATE.TO_SUBMIT,
        endProject : STATE.TO_SUBMIT
    }
},{
    id : "119",
    name : "不快乐星球老杨杰",
    customerId : "151220140",
    status: STATE.CANCELED,
    state : {
        consign : STATE.FINISHED,
        contract : STATE.FINISHED,
        testPlan : STATE.FINISHED,
        testReport : STATE.TO_SUBMIT,
        endProject : STATE.TO_SUBMIT
    }
}];

export const mockSiderData = (isCustomer,isMarketing,isTesting,isQuality) => [{
    key : "1",
    disable : false,
    name : "项目列表",
},{
    key : "2",
    disable : !(isCustomer||isMarketing),
    name : "委托列表",
},{
    key : "3",
    disable : !(isCustomer||isMarketing),
    name : "测试合同列表",
},{
    key : "4",
    disable : !(isTesting||isQuality),
    name : "测试方案列表",
},{
    key : "5",
    disable : !(isTesting||isQuality),
    name : "测试用例列表",
},{
    key : "8",
    disable : false,
    name : "测试报告列表",
},{
    key : "9",
    disable : !(isQuality),
    name : "报告检查列表",
},{
    key : "10",
    disable : !(isQuality),
    name : "工作检查列表",
},{
    key : "11",
    disable : !(isCustomer||isMarketing),
    name : "满意度调查列表",
}];

export const mockFileData = (isCustomer) => [{
    key : 1,
    disable : false,
    name : "委托申请表",
},{
    key : 2,
    disable : false,
    name : "测试合同书",
},{
    key : 3,
    disable : isCustomer,
    name : "测试方案书",
},{
    key : 4,
    disable : isCustomer,
    name : "测试用例表",
},{
    key : 7,
    disable : false,
    name : "测试报告书",
},{
    key : 8,
    disable : isCustomer,
    name : "测试报告检查表",
},{
    key : 9,
    disable : isCustomer,
    name : "测试工作检查表",
},{
    key : 10,
    disable : false,
    name : "满意度调查表",
}];

export const mockMenuData = (isCustomer) => [{
    type : "SubMenu",
    key : "sub0",
    disable : false,
    name : "项目",
    icon : "pie-chart",
    menuItems : [{
        key : "1",
        disable : false,
        name : "项目列表",
    }]
},{
    type : "SubMenu",
    key : "sub1",
    disable : false,
    name : "委托",
    icon : "user",
    menuItems : [{
        key : "2",
        disable : false,
        name : "委托列表",
    }]
},{
    type : "SubMenu",
    key : "sub2",
    disable : false,
    name : "合同",
    icon : "team",
    menuItems : [{
        key : "3",
        disable : false,
        name : "测试合同列表",
    }]
},{
    type : "SubMenu",
    key : "sub3",
    disable : isCustomer,
    name : "测试",
    icon : "copy",
    menuItems : [{
        key : "4",
        disable : isCustomer,
        name : "测试方案列表",
    },{
        key : "5",
        disable : isCustomer,
        name : "测试用例列表",
    }]
},{
    type : "SubMenu",
    key : "sub4",
    disable : false,
    name : "报告",
    icon : "appstore-o",
    menuItems : [{
        key : "8",
        disable : false,
        name : "测试报告列表",
    },{
        key : "9",
        disable : isCustomer,
        name : "测试报告检查列表",
    }]
},{
    type : "SubMenu",
    key : "sub5",
    disable : false,
    name : "结项",
    icon : "smile-o",
    menuItems : [{
        key : "10",
        disable : isCustomer,
        name : "测试工作检查列表",
    },{
        key : "11",
        disable : false,
        name : "满意度调查列表",
    }]
}];
