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

export default class TestPlanListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        deleteTestPlan: PropTypes.func,
        getTestPlanList: PropTypes.func,
        showProject: PropTypes.func,
        //newContract: PropTypes.func,
        //enableNew: PropTypes.bool,
    };

    componentDidMount() {
        this.props.getTestPlanList();
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
                return '请输入测试方案ID';
            case 'customerId':
                return '请输入委托人ID';
            case 'name':
                return '请输入项目名称';
            case 'pid':
                return '请输入项目ID';
            default:break;
        }
    };

    /*状态列颜色渲染*/
    state2SColor(state) {
        switch (state){
            case STATE.TO_WRITE: return "processing";
            case STATE.TO_REVIEW: return "processing";
            case STATE.TO_CONFIRM: return "processing";
            case STATE.CANCELED: return "default";
            default: return "error";
        }
    }

    state2C(state) {
        switch (state){/*TODO*/
            case STATE.TO_WRITE: return "待编写"/*(<a>待提交</a>)*/;
            case STATE.TO_REVIEW: return "待评审"/*(<a>待提交</a>)*/;
            case STATE.TO_CONFIRM: return "待确认";
            case STATE.CANCELED: return "已取消";
            case STATE.TO_IMPLEMENT: return "待实施";
            default: return "未定义状态";
        }
    }

    viewProject = (id) => () => {
        /*TODO:查看项目详情*/
        this.props.showProject(id);
    };

    /*table列设置*/
    columns = [{
        title:"项目编号",
        dataIndex:"code",
        render:(code,record)=>{
            return (<a href="javascript:void(0);" onClick={this.viewProject(record.id)}>{code}</a>)
        }
        // sorter:(a, b) => a.pid - b.pid,
    }/*, {
        title:"测试方案ID",
        dataIndex:"id",
        sorter:(a, b) => a.id - b.id,
    }*/, {
        title:"项目名称",
        dataIndex:"consign.consignation",
        key:"name",
        render:(consignation) => {
            let consignBody = consignation?JSON.parse(consignation):{};
            return consignBody.softwareName?consignBody.softwareName+"测试项目合同":"未填写";
        },
    }, {
        title: "编制人", /*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex: "testPlan.createdUserName",
        key: "writer",
        render: (name) => name ? name : "无"
    }, {
        title:"状态",
        dataIndex:"testPlan.state",
        key: "state",
        render: (status) =>{
            return (
                <span>
                    <Badge status={this.state2SColor(status)} text={this.state2C(status)} />
                </span>
            )
        },
        /*TODO 给状态列加个过滤*/
        /*
        filters: [{
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
        dataIndex:"testPlan.id",
        key:"operation",
        render: (id) => {
            /*TODO*/
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent(id)}>查看详情</a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);"
                       onClick={this.showDeleteConfirm(id)}>删除测试方案</a>
                </div>
            )
        }
    }
    ];

    /*查看详情*/
    viewContent = (record) => () => {
        //console.log(record);
        this.props.showContent(record);
    };

    /*取消委托提示框*/
    showDeleteConfirm = (record) => () => {
        confirm({
            title: 'Are you sure to delete this testCase?',
            //content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                //console.log(id);
                //debugger;
                //this.deleteConsign(id);
                /*TODO 取消委托的函数的参数需要优化*/
                this.props.deleteTestPlan(record);
            },
            onCancel() {},
        });
    };

    /*TODO 搜索功能*/
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
                <h3 style={{ marginBottom: 16 }}>测试方案列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索测试方案ID" onSelect={this.onSelect}>
                            <Option value="id">搜索测试方案ID</Option>
                            <Option value="pid">搜索项目ID</Option>
                            <Option value="customerId">搜索委托人ID</Option>
                            <Option value="name">搜索项目名称 </Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder={this.setPlaceholder()} onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    {/*this.props.enableNew*/1 ?
                        <Col span={2}>
                            <Button type="primary" onClick={this.props.newTestPlan}><Icon type="plus-circle-o" />新建测试方案</Button>
                        </Col>
                        : <Col span={2}></Col>}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}