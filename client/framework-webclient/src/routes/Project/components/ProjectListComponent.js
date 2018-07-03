import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message, Badge, Popover} from 'antd';
import {STATE} from "../../../services/common"

const { Column } = Table;
const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;
const Option = Select.Option;

export default class ProjectListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        deleteProject: PropTypes.func,
        getProjectList: PropTypes.func,
        getProjectState: PropTypes.func,
    };

    componentDidMount() {
        this.props.getProjectList();
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
            case 'code':
                return '请输入项目编号';
            case 'username':
                return '请输入委托单位名称';
            // case 'name':
            //     return '请输入名称';
            default:break;
        }
    };

    /*状态列颜色渲染*/
    /*TODO*/
    state2SColor(state) {
        switch (state){
            case STATE.TO_WRITE: return "processing";
            case STATE.TO_SUBMIT: return "processing";
            case STATE.TO_REVIEW: return "processing";
            case STATE.TO_CONFIRM: return "processing";
            case STATE.CANCELED: return "default";
            case STATE.FINISHED: return "success";
            case STATE.TO_IMPLEMENT: return "processing";
            case STATE.TO_APPROVE: return "processing";
            case STATE.TO_SEND: return "processing";
            case STATE.SATISFACTION: return "success";
            default: return "error";
        }
    }

    state2C(state) {
        // debugger;
        switch (state.State){
            case STATE.TO_WRITE: return state.Process+"待编写";
            case STATE.TO_SUBMIT: return state.Process+"待提交"/*(<a>待提交</a>)*/;
            case STATE.TO_REVIEW: return state.Process+"待评审"/*(<a>待提交</a>)*/;
            case STATE.TO_CONFIRM: return state.Process+"待确认";
            case STATE.CANCELED: return state.Process+"已取消";
            case STATE.FINISHED: return state.Process+"已完成";
            case STATE.TO_IMPLEMENT: return state.Process+"待实施";
            case STATE.TO_APPROVE: return state.Process+"待批准";
            case STATE.TO_SEND: return state.Process+"待发放";
            case STATE.SATISFACTION: return state.Process+"已完成";
            default: return "未定义状态";
        }
    }

    projectDetails(id){
        /*TODO:显示项目摘要信息*/
        return id;
    }

    /*table列设置*/
    columns = [{
        title:"项目编号",
        dataIndex:"code",
        //width: '25%',
        //sorter:(a, b) => a.id - b.id,
    }/*, {
        title:"流程ID",
        dataIndex:"processInstanceID",
        //width: '25%',
        //sorter:(a, b) => a.id - b.id,
    }, {
        title:"项目ID",
        dataIndex:"id",
        //width: '25%',
        //sorter:(a, b) => a.id - b.id,
    }*/, {
        title:"项目名称",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex:"id",//"name",
    }, {
        title:"委托单位",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex:"username",
    }, {
        title:"创建日期",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex:"createdTime",
    }, {
        title:"状态",
        //dataIndex:"id",
        render: (record) =>{
            const state={
                Process:"Contract",
                State: STATE.CANCELED
            }
            this.props.getProjectState(record.id,this.getState(record.id));
            console.log(record.id);
            return (
                <span>
                    <Badge status={this.state2SColor(state.State)} text={this.state2C(state)} />
                </span>
            )
        },
    }, {
        title:"操作",
        dataIndex:"id",
        key:"operation",
        //width: '12%',
        render: (record) => {
            /*TODO:操作应该由后台传过来*/
            // console.log(record);//
            return (
                <div>
                    {/*<Popover placement="bottom" trigger="click" content={this.projectDetails(record)}><a>查看摘要</a></Popover>*/}
                    {/*<Divider type="vertical"/>*/}
                    <a href="javascript:void(0);" onClick={this.viewContent(record)}>查看详情</a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);"
                        //disabled={!this.props.enableNew}
                        onClick={this.showDeleteConfirm(record)}
                    >取消</a>
                </div>
            )
        }
    }
    ];

    getState(id){

    }

    /*查看详情*/
    viewContent = (record) => () => {
        this.props.showContent(record);
    };

    /*取消委托提示框*/
    showDeleteConfirm = (record) => () => {
        confirm({
            title: '您确定要取消当前项目吗?',
            //content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                //console.log(id);
                //debugger;
                //this.props.deleteProject(id);
                /*TODO 取消委托的函数的参数需要优化*/
                console.log(record);
                this.props.deleteProject(record);
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
            case 'username':
                this.props.setListFilter((item)=>item.username.match(reg));break;
            // case 'name':
            //     this.props.setListFilter((item)=>item.name.match(reg));break;
            default:break;
        }
    };

    expandRow = (record) => {
        //console.log(record);//
        return (
            <div>
                <div>
                   ID： {record.id}
                </div>
                {/*<div>*/}
                    {/*项目编号： {record.id}*/}
                {/*</div>*/}
                <div>
                    项目创建人ID：{record.createdUserId}
                </div>
                <div>
                    项目创建时间：{record.createdTime}
                </div>
                <div>
                    测试用例个数：{record.testCase}
                </div>
                <div>
                    项目价格：¥2333
                </div>
            </div>
        );
    };

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>项目列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索项目ID" onSelect={this.onSelect}>
                            <Option value="id">搜索项目ID</Option>
                            <Option value="username">搜索委托单位</Option>
                            {/*<Option value="name">搜索名称 </Option>*/}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder={this.setPlaceholder()} onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    {/*this.props.enableNew ?
                        <Col span={2}>
                            <Button
                                //disabled={!this.props.enableNew}
                                type="primary" onClick={this.props.newConsign}><Icon type="plus-circle-o" />新建委托</Button>
                        </Col>
                        : <Col span={2}></Col>*/}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}
                       expandedRowRender={this.expandRow}
                       expandRowByClick={true}
                />
            </div>
        );
    }
}