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
 * @module TestWorkCheckListComponent
 */
export default class TestWorkCheckListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        //setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        //deleteConsign: PropTypes.func,
        getTestWorkCheckList: PropTypes.func,
        //newContract: PropTypes.func,
        //enableNew: PropTypes.bool,
        showProject: PropTypes.func,
    };

    /**
     * componentDidMount，（装载完成），在render之后调用
     */
    componentDidMount() {
        this.props.getTestWorkCheckList();
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
            // case 'id':
            //     return '请输入测试工作检查表ID';
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
        render:(code,record)=>{
            return (<a href="javascript:void(0);" onClick={this.viewProject(record.id)}>{code}</a>)
        }
        // sorter:(a, b) => a.pid - b.pid,
    },{
        title:"项目名称",
        dataIndex:"consign",
        key:"name",
        render:(consign) => {
            let consignBody = consign.consignation?JSON.parse(consign.consignation):{};
            return consignBody.softwareName?consignBody.softwareName:"未填写";
        }
    }, {
        title:"检查人",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex:"testWorkCheck.createdUserName",
        key:"createdUserName",
        render:(name) => name?name:"无"
        // dataIndex:"customerId",
    }, {
        title:"状态",
        dataIndex:"testWorkCheck.state",
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
        // dataIndex:"testWorkCheck.id",
        key:"operation",
        render: (project) => {
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent({key:project.testWorkCheck.id,id:project.id})}>查看详情</a>
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
            case 'checker':
                this.props.setListFilter((item)=>item.testWorkCheck.createdUserName.match(reg));break;
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
                <h3 style={{ marginBottom: 16 }}>测试工作检查列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索项目编号" onSelect={this.onSelect}>
                            {/*<Option value="id">搜索测试工作检查ID</Option>*/}
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
                            <Button type="primary" onClick={this.props.newConsign}><Icon type="plus-circle-o" />新建测试记录</Button>
                        </Col>
                        : <Col span={2}></Col>}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}