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

export default class TestReportCheckListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setCheckListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        deleteTestReportCheck: PropTypes.func,
        getTestReportCheckList: PropTypes.func,
        newTestReportCheck: PropTypes.func,
        enableNew: PropTypes.bool,
        showProject: PropTypes.func,
    };

    componentDidMount() {
        this.props.getTestReportCheckList();
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
                return '请输入报告检查ID';
            case 'checker':
                return '请输入检查人';
            case 'name':
                return '请输入项目名称';
            case 'code':
                return '请输入项目编号';
            default:break;
        }
    };

    /*状态列颜色渲染*/
    state2SColor(state) {
        // switch (state){
        //     case STATE.TO_SUBMIT: return "processing";
        //     case STATE.TO_CHECK: return "processing";
        //     case STATE.CANCELED: return "default";
        //     default: return "error";
        // }
        return "processing";
    }

    state2C(state) {
        // switch (state){/*TODO*/
        //     case STATE.TO_SUBMIT: return "待提交"/*(<a>待提交</a>)*/;
        //     case STATE.TO_CHECK: return "待评审"/*(<a>待提交</a>)*/;
        //     case STATE.CANCELED: return "已取消";
        //     default: return "未定义状态";
        // }
        return "可编写";
    }

    viewProject = (id) => () => {
        /*TODO:查看项目详情*/
        this.props.showProject(id);
    };

    /*table列设置*/
    columns = [{
        title:"项目编号",
        dataIndex:"code",
        key:"number",
        render:(code,record)=>{
            return (<a href="javascript:void(0);" onClick={this.viewProject(record.id)}>{code}</a>)
        }
        // sorter:(a, b) => a.pid - b.pid,
    }, {
        title:"委托单位",
        dataIndex:"consign",
        key:"id",
        render:(consign) => {
            let consignBody = consign.consignation?JSON.parse(consign.consignation):{};
            return consignBody.consignUnitC?consignBody.consignUnitC:"未填写";
        }
    }, {
        title:"项目名称",
        dataIndex:"consign",
        key:"name",
        render:(consign) => {
            let consignBody = consign.consignation?JSON.parse(consign.consignation):{};
            return consignBody.softwareName?consignBody.softwareName:"未填写";
        }
    }, {
        title:"检查人",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex:"testReportCheck.createdUserName",
        key:"createdUserName",
        render:(name) => name?name:"无"
    }, {
        title:"状态",
        dataIndex:"testReportCheck.state",
        key: "state",
        render: (state) =>{
            return (
                <span>
                    <Badge status={this.state2SColor(state)} text={this.state2C(state)} />
                </span>
            )
        },
    }, {
        title:"操作",
        // dataIndex:"testReportCheck.id",
        key:"operation",
        render: (project) => {
            /*TODO*/
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent({key:project.testReportCheck.id,id:project.id})}>查看详情</a>
                    {/*<Divider type="vertical"/>
                    <a href="javascript:void(0);" onClick={this.showDeleteConfirm(record)}>取消委托</a>*/}
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
            title: 'Are you sure to delete this consign?',
            //content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                //console.log(id);
                //debugger;
                //this.deleteConsign(id);
                /*TODO 取消委托的函数的参数需要优化*/
                this.props.deleteConsign(record);
            },
            onCancel() {},
        });
    };

    /*TODO 搜索功能*/
    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        switch (this.state.selectOption){
            case 'code':
                this.props.setListFilter((item)=>item.code.match(reg));break;
            case 'id':
                this.props.setListFilter((item)=>item.testReportCheck.id.match(reg));break;
            case 'checker':
                this.props.setListFilter((item)=>item.testReportCheck.createdUserName.match(reg));break;
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

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>报告检查表列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索报告检查ID" onSelect={this.onSelect}>
                            <Option value="id">搜索报告检查ID</Option>
                            <Option value="code">搜索项目编号</Option>
                            <Option value="checker">搜索检查人</Option>
                            <Option value="name">搜索项目名称 </Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder={this.setPlaceholder()} onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    {/*this.props.enableNew*/0 ?
                        <Col span={2}>
                            <Button type="primary" onClick={this.props.newConsign}><Icon type="plus-circle-o" />新建报告检查表</Button>
                        </Col>
                        : <Col span={2}></Col>}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}