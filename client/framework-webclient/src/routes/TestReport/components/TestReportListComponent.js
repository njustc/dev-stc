import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message, Badge} from 'antd';
//import UserConsignContentView from "./ConsignContentComponent";
import {STATE} from "../../../services/common"

const { Column } = Table;
const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;
const Option = Select.Option;
/**
 * @module TestReportListComponent
 */
export default class TestReportListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        deleteTestReport: PropTypes.func,
        getTestReportList: PropTypes.func,
        newTestReport: PropTypes.func,
        enableNew: PropTypes.bool,
        showProject: PropTypes.func,
    };

    /**
     * componentDidMount，（装载完成），在render之后调用
     */
    componentDidMount() {
        this.props.getTestReportList();
    }

    /**
     * 记录搜索框当前选项，默认项是项目编号
     */
    state={
        selectOption:'code',
    };

    /**
     * 用户的选择操作触发改变搜索框当前选项的记录
     * @param value 被选择的选项名称
     * @param option 暂时没用
     */
    onSelect = (value, option) => {
        this.setState({
            selectOption:value
        });
    };

    /**
     * 根据搜索框选项选择搜索输入框中显示的文字
     * @returns {string} 搜索输入框中的提示文字
     */
    setPlaceholder = () => {
        switch (this.state.selectOption){
            case 'code':
                return '请输入项目编号';
            case 'reporter':
                return '请输入报告人';
            case 'name':
                return '请输入项目名称';
            default:break;
        }
    };

    /**
     * 根据测试报告状态选择状态点的颜色
     * @param state 测试报告状态
     * @returns {string} Badge点的颜色
     */
    state2SColor(state) {
        switch (state){
            case STATE.TO_WRITE: return "processing";
            case STATE.TO_REVIEW: return "processing";
            case STATE.TO_APPROVE: return "processing";
            case STATE.TO_SEND: return "processing";
            case STATE.TO_CONFIRM: return "processing";
            case STATE.CANCELED: return "default";
            default: return "error";
        }
    };

    /**
     * 根据测试煲噶状态选择显示的状态文字描述
     * @param state 测试报告状态
     * @returns {string} 状态的文字描述
     */
    state2C(state) {
        // debugger;
        switch (state){
            case STATE.TO_WRITE: return "待编写"/*(<a>待提交</a>)*/;
            case STATE.TO_REVIEW: return "待评审"/*(<a>待提交</a>)*/;
            case STATE.CANCELED: return "已取消";
            case STATE.TO_APPROVE: return "待批准";
            case STATE.TO_SEND: return "待发放";
            case STATE.TO_CONFIRM: return "待确认";
            case STATE.SATISFACTION: return "已完成";
            default: return "未定义状态";
        }
    };

    /**
     * 打开项目详情页面
     * @param id 被选择合同的标识
     * @returns {Function} 调用showProject
     */
    viewProject = (id) => () => {
        this.props.showProject(id);
    };

    /**
     * 设置表格Table
     */
    columns = [{
        title:"项目编号",
        dataIndex:"code",
        render:(code,record)=>{
            return (<a href="javascript:void(0);" onClick={this.viewProject(record.id)}>{code}</a>)
        }
        // sorter:(a, b) => a.pid - b.pid,
    }, {
    //     title:"测试报告ID",
    //     dataIndex:"testReport",
    //     key:"id",
    //     //width: '25%',
    //     render:(testReport) => {
    //         return testReport.id?testReport.id:"未填写";
    //     }
    // }, {
        title:"项目名称",
        dataIndex:"consign",
        key:"name",
        render:(consign) => {
            let consignBody = consign.consignation?JSON.parse(consign.consignation):{};
            return consignBody.softwareName?consignBody.softwareName:"未填写";
        }
    }, {
        title: "报告人", /*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex: "testReport.createdUserName",
        key: "createdUserName",
        render: (name) => name ? name : "无"
    }, {
        title:"状态",
        dataIndex:"testReport",
        key:"state",
        render: (testReport) =>{
            return (
                <span>
                    <Badge status={this.state2SColor(testReport.state)} text={this.state2C(testReport.state)} />
                </span>
            )
            /*return (
                <span>
                    <Badge status={this.state2SColor(status)} text={this.state2C(status)} />
                </span>
            )*/
        },
        /*filters: [{
            text: '待提交',
            value: 'TobeSubmit',
        }, {
            text: '待审核',
            value: 'TobeCheck',
        }, {
            text: '已通过',
            value: 'Finished',
        }],
        filterMultiple: false,*/
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        //onFilter: (value, record) => record.state.indexOf(value) === 0,
    }, {
        title:"操作",
        // dataIndex:"testReport.id",
        key:"operation",
        //width: '12%',
        render: (project) => {
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent({key:project.testReport.id,id:project.id,})}>查看详情</a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);"
                       //disabled={!this.props.enableNew}
                       onClick={this.showDeleteConfirm(project.id)}>取消测试报告</a>
                </div>
            )
        }
    }
    ];

    /**
     * 打开测试报告详情页面
     * @param record 被选择测试报告的标识
     * @returns {Function} 调用showContent
     */
    viewContent = (record) => () => {
        this.props.showContent(record);
    };

    /**
     * 显示取消测试报告提示框
     * @param record 被选择测试报告的标识
     * @returns {Function}
     */
    showDeleteConfirm = (record) => () => {
        confirm({
            title: '您确定要取消当前测试报告吗?',
            //content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                //console.log(id);
                //debugger;
                //this.deleteTestReportn(id);
                /*TODO 取消委托的函数的参数需要优化*/
                this.props.deleteTestReport(record);
            },
            onCancel() {},
        });
    };

    /**
     * 搜索框功能
     * @param value 在搜索框中输入的值
     */
    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        switch (this.state.selectOption){
            case 'code':
                this.props.setListFilter((item)=>item.code.match(reg));break;
            case 'reporter':
                this.props.setListFilter((item)=>item.testReport.createdUserName.match(reg));break;
            // case 'name':
            //     this.props.setListFilter((item)=>item.name.match(reg));break;
            case 'name':
                this.props.setListFilter((item)=>{
                    const consignBody = item.consign.consignation?JSON.parse(item.consign.consignation):{};
                    return consignBody!=={}&&consignBody.softwareName&&consignBody.softwareName.match(reg);
                });break;
            default:break;
        }
    };

    /**
     * 绘制测试报告列表页面， 包括：页面标题、可以改变搜索选项的搜索框、测试报告表格
     */
    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>测试报告列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索项目编号" onSelect={this.onSelect}>
                            <Option value="code">搜索项目编号</Option>
                            <Option value="reporter">搜索报告人</Option>
                            <Option value="name">搜索项目名称 </Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder={this.setPlaceholder()} onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>

                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}