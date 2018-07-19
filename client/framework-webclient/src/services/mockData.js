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

export const mockMenuData = (isCustomer,isMarketing,isTesting,isQuality) => [{
    key : "12",
    disable : !(isCustomer||isMarketing),
    name : "委托",
},{
    key : "13",
    disable : !(isCustomer||isMarketing),
    name : "合同",
},{
    key : "14",
    disable : !(isTesting||isQuality),
    name : "测试"
},{
    key : "15",
    disable : !(isCustomer||isQuality),
    name : "结项"
}
];