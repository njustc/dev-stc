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
 * 测试方案列表类，负责渲染，展示测试方案的列表
 * @extends Component
 */
class TestPlanListComponent extends Component {
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

    /**
     * componentDidMount，（装载完成），在render之后调用
     */
    componentDidMount() {
        this.props.getTestPlanList();
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
            //     return '请输入测试方案ID';
            case 'writer':
                return '请输入编制人';
            case 'name':
                return '请输入项目名称';
            case 'code':
                return '请输入项目编号';
            default:break;
        }
    };

    /**
     * 根据测试方案状态选择显示的状态文字描述
     * @param state 测试方案文档状态
     * @returns {string} 状态的文字描述
     */
    state2SColor(state) {
        switch (state){
            case STATE.TO_WRITE: return "processing";
            case STATE.TO_REVIEW: return "processing";
            case STATE.TO_CONFIRM: return "processing";
            case STATE.CANCELED: return "default";
            default: return "error";
        }
    }

    /**
     * 获取并渲染测试方案状态
     * @param record 被选择测试方案的标识
     * @returns {*} 渲染测试方案状态
     */
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

    /**
     * 打开项目详情页面
     * @param id 被选择测试方案的标识
     * @returns {Function} 调用showProject
     */
    viewProject = (id) => () => {
        /*TODO:查看项目详情*/
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
        title: "编制人",
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
    }, {
        title:"操作",
        // dataIndex:"id",
        key:"operation",
        render: (project) => {
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent({key:project.testPlan.id,id:project.id,})}>查看详情</a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);"
                       onClick={this.showDeleteConfirm(project.testPlan.id)}>删除测试方案</a>
                </div>
            )
        }
    }
    ];

    /**
     * 打开测试方案详情页面
     * @param id 被选择测试方案的标识
     * @returns {Function} 调用showContent
     */
    viewContent = (record) => () => {
        //console.log(record);
        this.props.showContent(record);
    };

    /**
     * 显示取消测试方案提示框
     * @param id 被选择测试方案的标识
     * @returns {Function}
     */
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

    /**
     * 搜索框功能
     * @param value 在搜索框中输入的值
     */
    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        switch (this.state.selectOption){
            case 'code':
                this.props.setListFilter((item)=>item.code.match(reg));break;
            case 'writer':
                this.props.setListFilter((item)=>item.testPlan.createdUserName.match(reg));break;
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
     * 绘制测试方案列表页面， 包括：页面标题、可以改变搜索选项的搜索框、测试方案表格
     */
    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>测试方案列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索项目编号" onSelect={this.onSelect}>
                            {/*<Option value="id">搜索测试方案ID</Option>*/}
                            <Option value="code">搜索项目编号</Option>
                            <Option value="writer">搜索编制人</Option>
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

export default TestPlanListComponent;