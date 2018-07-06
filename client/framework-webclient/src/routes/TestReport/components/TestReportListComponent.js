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
    };

    componentDidMount() {
        this.props.getTestReportList();
    }

    /*搜索框选项相关*/
    state={
        selectOption:'id',
    };

    onSelect = (value, option) => {
        this.setState({
            selectOption:value
        });
    }

    setPlaceholder = () => {
        switch (this.state.selectOption){
            case 'id':
                return '请输入测试报告ID';
            case 'createdUserId':
                return '请输入委托人ID';
            case 'name':
                return '请输入测试报告名称';
            default:break;
        }
    };

    /*状态列颜色渲染*/
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
    }

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
    }

    /*table列设置*/
    columns = [{
        title:"项目编号",
        dataIndex:"code",
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
        /*TODO 给状态列加个过滤*/
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
        dataIndex:"testReport.id",
        key:"operation",
        //width: '12%',
        render: (record) => {
            /*TODO:操作应该由后台传过来*/
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent(record)}>查看详情</a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);"
                       //disabled={!this.props.enableNew}
                       onClick={this.showDeleteConfirm(record)}>取消测试报告</a>
                </div>
            )
        }
    }
    ];

    /*查看详情*/
    viewContent = (record) => () => {
        this.props.showContent(record);
    };

    /*取消委托提示框*/
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

    /*TODO:搜索功能*/
    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        switch (this.state.selectOption){
            case 'id':
                this.props.setListFilter((item)=>item.id.match(reg));break;
            case 'createdUserId':
                this.props.setListFilter((item)=>item.createdUserId.match(reg));break;
            case 'name':
                this.props.setListFilter((item)=>item.name.match(reg));break;
            default:break;
        }
    };

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>委托列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索测试报告ID" onSelect={this.onSelect}>
                            <Option value="id">搜索测试报告ID</Option>
                            <Option value="createdUserId">搜索委托人ID</Option>
                            <Option value="name">搜索测试报告名称 </Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder={this.setPlaceholder()} onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    {/*this.props.enableNew*/1 ?
                        <Col span={2}>
                            <Button
                                disabled={!this.props.enableNew}
                                type="primary" onClick={this.props.newTestReport}><Icon type="plus-circle-o" />新建测试报告</Button>
                        </Col>
                        : <Col span={2}></Col>}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}