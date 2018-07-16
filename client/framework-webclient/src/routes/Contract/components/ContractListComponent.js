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
 * @module ContractListComponent
 */
export default class ContractListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        showProject: PropTypes.func,
        deleteContract: PropTypes.func,
        getContractList: PropTypes.func,
        newContract: PropTypes.func,
        enableNew: PropTypes.bool,
    };

    /**
     * componentDidMount，（装载完成），在render之后调用
     */
    componentDidMount() {
        this.props.getContractList();
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
            // case 'id':
            //     return '请输入合同ID';
            case 'unit':
                return '请输入委托单位';
            case 'name':
                return '请输入合同名称';
            default:break;
        }
    };

    /**
     * 根据合同状态选择状态点的颜色
     * @param state 合同状态
     * @returns {string} Badge点的颜色
     */    state2SColor(state) {
        switch (state){
            case STATE.TO_SUBMIT: return "processing";
            case STATE.TO_REVIEW: return "processing";
            case STATE.TO_CONFIRM: return "processing";
            case STATE.CANCELED: return "default";
            default: return "error";
        }
    }

    /**
     * 根据合同状态选择显示的状态文字描述
     * @param state 合同状态
     * @returns {string} 状态的文字描述
     */
    state2C(state) {
        // debugger;
        switch (state){
            case STATE.TO_SUBMIT: return "待提交"/*(<a>待提交</a>)*/;
            case STATE.TO_REVIEW: return "待评审"/*(<a>待提交</a>)*/;
            case STATE.TO_CONFIRM: return "待确认";
            case STATE.CANCELED: return "已取消";
            case STATE.FINISHED: return "已确认";
            default: return "未定义状态";
        }
    }

    /**
     * 设置表格Table
     */
    columns = [{
        title:"项目编号",
        dataIndex:"code",
        //width: '25%',
        //sorter:(a, b) => a.processInstanceID - b.processInstanceID,
        render:(code,record)=>{
            return (<a href="javascript:void(0);" onClick={this.viewProject(record.id)}>{code}</a>)
        }
    },/*{
        title:"合同ID",
        dataIndex:"id",
        //width: '25%',
        sorter:(a, b) => a.id - b.id,
    },*/ {
        title:"合同名称",
        dataIndex:"consign.consignation",
        key:"name",
        render:(consignation) => {
            let consignBody = consignation?JSON.parse(consignation):{};
            return consignBody.softwareName?consignBody.softwareName+"测试项目合同":"未填写";
        },
    }, {
        title:"委托单位",
        dataIndex:"consign.consignation",
        key:"unit",
        render:(consignation) => {
            let consignBody = consignation?JSON.parse(consignation):{};
            return consignBody.consignUnitC?consignBody.consignUnitC:"未填写";
        }
    },{
        title:"合同金额",
        dataIndex:"contract.contractBody",
        key:"fee",
        render:(contractBodyString) => {
            let contractBody = contractBodyString?JSON.parse(contractBodyString):{};
            return contractBody.testFee?contractBody.testFee:"未填写";
        }
    }, {
        title:"状态",
        dataIndex:"contract.state",
        render: (state) =>{
            return (
                <span>
                    <Badge status={this.state2SColor(state)} text={this.state2C(state)} />
                </span>
            )
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
        // dataIndex:"id",
        key:"operation",
        //width: '12%',
        render: (project) => {
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent({key:project.contract.id,id:project.id,})}>查看详情</a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);"
                       //disabled={!this.props.enableNew}
                       onClick={this.showDeleteConfirm(project.id)}>取消合同</a>
                </div>
            )
        }
    }
    ];

    /**
     * 打开合同详情页面
     * @param id 被选择合同的标识
     * @returns {Function} 调用showContent
     */
    viewContent = (id) => () => {
        this.props.showContent(id);
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
     * 显示取消合同提示框
     * @param id 被选择合同的标识
     * @returns {Function}
     */
    showDeleteConfirm = (id) => () => {
        confirm({
            title: '您确定要取消当前合同吗?',
            //content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                //console.log(id);
                //debugger;
                //this.deleteContract(id);
                /*TODO 取消合同的函数的参数需要优化*/
                this.props.deleteContract(id);
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
            case 'unit':
                this.props.setListFilter((item)=>{
                    const consignBody = item.consign.consignation?JSON.parse(item.consign.consignation):{};
                    return consignBody!=={}&&consignBody.consignUnitC&&consignBody.consignUnitC.match(reg);
                });break;
            case 'code':
                this.props.setListFilter((item)=>item.code.match(reg));break;
            // case 'createdUserId':
            //     this.props.setListFilter((item)=>item.createdUserId.match(reg));break;
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
     * 绘制合同列表页面， 包括：页面标题、可以改变搜索选项的搜索框、合同表格
     */
    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>合同列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索项目编号" onSelect={this.onSelect}>
                            <Option value="code">搜索项目编号</Option>
                            {/*<Option value="id">搜索合同ID</Option>*/}
                            <Option value="unit">搜索委托单位</Option>
                            <Option value="name">搜索合同名称 </Option>
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
                                type="primary" onClick={this.props.newContract}><Icon type="plus-circle-o" />新建合同</Button>
                        </Col>
                        : <Col span={2}></Col>*/}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}