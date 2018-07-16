import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message, Badge} from 'antd';
import {STATE} from "../../../services/common"

const { Column } = Table;
const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;
const Option = Select.Option;
/**
 * TestListComponent
 */
export default class TestCaseListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        deleteTestCase: PropTypes.func,
        getTestCaseList: PropTypes.func,
        showProject: PropTypes.func,
        //newContract: PropTypes.func,
        //enableNew: PropTypes.bool,
    };

    componentDidMount() {
        this.props.getTestCaseList();
    }

    /*搜索框选项相关*/
    state={
        selectOption:'code',
    };
    /**
     * @func
     * @param value
     * @param option
     */
    onSelect = (value, option) => {
        this.setState({
            selectOption:value
        });
    }

    setPlaceholder = () => {
        switch (this.state.selectOption){
            // case 'id':
            //     return '请输入测试用例ID';
            case 'tester':
                return '请输入测试人';
            case 'name':
                return '请输入项目名称';
            case 'code':
                return '请输入项目编号';
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
        switch (state){/*TODO*/
            case STATE.TO_SUBMIT: return "待提交"/*(<a>待提交</a>)*/;
            case STATE.TO_REVIEW: return "待评审"/*(<a>待提交</a>)*/;
            case STATE.CANCELED: return "已取消";
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
    }, {
        title:"项目名称",
        dataIndex:"consign",
        key:"name",
        render:(consign) => {
            let consignBody = consign.consignation?JSON.parse(consign.consignation):{};
            return consignBody.softwareName?consignBody.softwareName:"未填写";
        }
    }, {
        title:"测试用例数",
        dataIndex:"testCase",
        render:(testCase) => testCase.length
        // sorter:(a, b) => a.id - b.id,
    },{
        title:"测试人",
        dataIndex:"testCase.createdUserName",
        render:(name) => name?name:"无"
    },{
        title:"操作",
        // dataIndex:"testCase.id",
        dataIndex: 'id',
        key:"operation",
        render: (record) => {
            /*TODO*/
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent(record)}>查看详情</a>
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
            title: 'Are you sure to delete this test case?',
            //content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                //console.log(id);
                //debugger;
                //this.deleteConsign(id);
                /*TODO 取消委托的函数的参数需要优化*/
                this.props.deleteTestCase(record);
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
            case 'tester':
                this.props.setListFilter((item)=>item.testCase.createdUserName.match(reg));break;
            case 'name':
                this.props.setListFilter((item)=>{
                    const consignBody = item.consign.consignation?JSON.parse(item.consign.consignation):{};
                    return consignBody!=={}&&consignBody.softwareName&&consignBody.softwareName.match(reg);
                });break;
                // case 'name':
                // this.props.setListFilter((item)=>item.name.match(reg));break;
            default:break;
        }
    };

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>测试用例列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索项目编号" onSelect={this.onSelect}>
                            {/*<Option value="id">搜索测试用例ID</Option>*/}
                            <Option value="code">搜索项目编号</Option>
                            {/*<Option value="tester">搜索测试人</Option>*/}
                            <Option value="name">搜索项目名称 </Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder={this.setPlaceholder()} onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    {/*this.props.enableNew0 ?
                        <Col span={2}>
                            <Button type="primary" onClick={this.props.newTestCase}><Icon type="plus-circle-o" />新建测试用例</Button>
                        </Col>
                        : <Col span={2}></Col>*/}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}