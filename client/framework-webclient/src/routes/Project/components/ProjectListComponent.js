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
            case 'id':
                return '请输入流程ID';
            case 'createdUserId':
                return '请输入委托人ID';
            case 'name':
                return '请输入名称';
            default:break;
        }
    };

    /*状态列颜色渲染*/
    state2SColor(state) {
        switch (state){
            case STATE.TO_SUBMIT: return "processing";
            case STATE.TO_REVIEW: return "processing";
            case STATE.CANCELED: return "default";
            default: return "error";
        }
    }

    state2C(state) {
        // debugger;
        switch (state){
            case STATE.TO_SUBMIT: return "待提交"/*(<a>待提交</a>)*/;
            case STATE.TO_REVIEW: return "待评审"/*(<a>待提交</a>)*/;
            case STATE.CANCELED: return "已取消";
            case STATE.FINISHED: return "已通过";
            default: return "未定义状态";
        }
    }

    projectDetails(id){
        /*TODO:显示流程摘要信息*/
        return id;
    }

    /*table列设置*/
    columns = [{
        title:"项目编号",
        dataIndex:"No",
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
        dataIndex:"name",
    }, {
        title:"委托人ID",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex:"createdUserId",
    }, {
        title:"状态",
        dataIndex:"state",
        render: (/*status*/state) =>{
            return (
                <span>
                    <Badge status={this.state2SColor(state)} text={this.state2C(state)} />
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
                        //onClick={this.showDeleteConfirm(record)}
                    >取消</a>
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
            title: '您确定要取消当前流程吗?',
            //content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                //console.log(id);
                //debugger;
                //this.deleteProject(id);
                /*TODO 取消委托的函数的参数需要优化*/
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
            case 'createdUserId':
                this.props.setListFilter((item)=>item.createdUserId.match(reg));break;
            case 'name':
                this.props.setListFilter((item)=>item.name.match(reg));break;
            default:break;
        }
    };

    expandRow = (record) => {
        //console.log(record);//
        return (
            <div>
                <div>
                   流程ID： {record.id}
                </div>
                <div>
                    项目ID： {record.id}
                </div>
                <div>
                    委托人（用户名）：未定义{/*TODO*//*record.createdUserId*/}
                </div>
                <div>
                    流程创建时间：{record.createdTime}
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
                <h3 style={{ marginBottom: 16 }}>流程列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索流程ID" onSelect={this.onSelect}>
                            <Option value="id">搜索流程ID</Option>
                            <Option value="createdUserId">搜索委托人ID</Option>
                            <Option value="name">搜索名称 </Option>
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