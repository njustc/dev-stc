import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message, Badge, Popover} from 'antd';
import {STATE} from "../../../services/common"

const { Column } = Table;
const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;
const Option = Select.Option;

/**
 * @module Project/ListComponent
 */
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

    componentWillMount() {
        this.props.getProjectList();
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
            case 'unit':
                return '请输入委托单位';
            case 'name':
                return '请输入项目名称';
            default:break;
        }
    };

    /**
     * 根据项目状态选择状态点的颜色
     * @param state 项目的文档状态
     * @returns {string} Badge点的颜色
     */
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

    /**
     * 根据项目状态选择显示的状态文字描述
     * @param state 项目的文档状态
     * @returns {string} 状态的文字描述
     */
    state2C(state) {
        // debugger;
        switch (state){
            case STATE.TO_WRITE: return "待编写";
            case STATE.TO_SUBMIT: return "待提交"/*(<a>待提交</a>)*/;
            case STATE.TO_REVIEW: return "待评审"/*(<a>待提交</a>)*/;
            case STATE.TO_CONFIRM: return "待确认";
            case STATE.CANCELED: return "已取消";
            case STATE.FINISHED: return "已完成";
            case STATE.TO_IMPLEMENT: return "待实施";
            case STATE.TO_APPROVE: return "待批准";
            case STATE.TO_SEND: return "待发放";
            case STATE.SATISFACTION: return "已完成";
            default: return "未定义状态";
        }
    }

    /**
     * 获取并渲染项目状态
     * @param record 被选择项目的记录
     * @returns {*} 渲染项目状态
     */
    getCurrentState(record){
        if(record.testReport&&record.testReport.state===STATE.SATISFACTION)
            return ( <span><Badge status={this.state2SColor(record.testReport.state)} text={"测试报告"+this.state2C(record.testReport.state)} /></span>);
        else if(record.testPlan&&record.testPlan.state===STATE.FINISHED)
            return ( <span><Badge status={this.state2SColor(record.testPlan.state)} text={"测试方案"+this.state2C(record.testReport.state)} /></span>);
        else if(record.contract&&record.contract.state===STATE.FINISHED)
            return ( <span><Badge status={this.state2SColor(record.contract.state)} text={"测试报告"+this.state2C(record.testReport.state)} /></span>);
        else
            return ( <span><Badge status="processing" text={"测试合同待编写"} /></span>);
    }

    // projectDetails(id){
    //     /*TODO:显示项目摘要信息*/
    //     return id;
    // }

    /**
     * 设置表格Table的表头
     */
    columns = [{
        title:"项目编号",
        dataIndex:"code",
        //width: '25%',
        //sorter:(a, b) => a.id - b.id,
    }, {
        title:"项目名称",
        dataIndex:"consign",
        key:"name",
        render: (consign) => {
            let consignBody = consign.consignation?JSON.parse(consign.consignation):{};
            return consignBody.softwareName?consignBody.softwareName+"测试项目":"未填写";
        }
    }, {
        title:"委托单位",
        dataIndex:"consign",
        key:"unit",
        render: (consign) => {
            let consignBody = consign.consignation?JSON.parse(consign.consignation):{};
            return consignBody.consignUnitC?consignBody.consignUnitC:"未填写";
        },
    }, {
        title:"创建日期",
        dataIndex:"createdTime",
    }, {
        title:"状态",
        //dataIndex:"id",
        render: (record) =>{
            return(this.getCurrentState(record));
            // return (
            //     <span>
            //         <Badge status={this.state2SColor(state.State)} text={this.state2C(state)} />
            //     </span>
            // )
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


    /**
     * 打开项目详情页面
     * @param record 被选择项目的记录
     * @returns {Function} 调用showContent
     */
    viewContent = (record) => () => {
        this.props.showContent(record);
    };

    /**
     * 显示取消项目提示框
     * @param record 被选择项目的记录
     * @returns {Function}
     */
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

    /**
     * 搜索框功能
     * @param value 在搜索框中输入的值
     */
    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        switch (this.state.selectOption){
            case 'code':
                this.props.setListFilter((item)=>item.code.match(reg));break;
            // case 'unit':
            //     this.props.setListFilter((item)=>item.username.match(reg));break;
            case 'unit':
                this.props.setListFilter((item)=>{
                    const consignBody = item.consign.consignation?JSON.parse(item.consign.consignation):{};
                    return consignBody!=={}&&consignBody.consignUnitC&&consignBody.consignUnitC.match(reg);
                });break;
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
     * 行展开渲染
     * @param record 被选择项目的记录
     */
    expandRow = (record) => {
        // console.log(record);//
        return (
            <div>
                <div>
                   项目编号： {record.code}
                </div>
                {/*<div>*/}
                    {/*项目编号： {record.id}*/}
                {/*</div>*/}
                <div>
                    项目创建人：{record.createdUserName}
                </div>
                <div>
                    项目创建时间：{record.createdTime}
                </div>
                <div>
                    测试用例个数：{record.testCase.length}
                </div>
                <div>
                    项目价格：{this.testFee(record)}
                </div>
            </div>
        );
    };

    /**
     * 获取项目价格并渲染
     */
    testFee(record){
        let contractBodyString=record.contract.contractBody;
        let contractBody = contractBodyString?JSON.parse(contractBodyString):{};
        return contractBody.testFee?"¥"+contractBody.testFee:"未填写";
    }

    /**
     * 绘制项目List页面，包括：页面标题、可以改变搜索选项的搜索框、项目表格
     */
    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>项目列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索项目编号" onSelect={this.onSelect}>
                            <Option value="code">搜索项目编号</Option>
                            <Option value="unit">搜索委托单位</Option>
                            <Option value="name">搜索项目名称</Option>
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