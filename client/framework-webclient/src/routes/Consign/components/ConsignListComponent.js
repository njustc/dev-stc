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

export default class ConsignListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        deleteConsign: PropTypes.func,
        getConsignList: PropTypes.func,
        newConsign: PropTypes.func,
        enableNew: PropTypes.bool,
    };

    /**
     * componentDidMount，（装载完成），在render之后调用
     */
    componentDidMount() {
        this.props.getConsignList();
    }

    /**
     * 记录搜索框当前选项，默认项是委托名称
     */
    state={
        selectOption:'name',
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
            case 'unit':
                return '请输入委托单位';
            // case 'createdUserId':
            //     return '请输入委托人ID';
            case 'name':
                return '请输入委托名称';
            default:break;
        }
    };

    /**
     * 根据委托状态选择状态点的颜色
     * @param state 委托状态
     * @returns {string} Badge点的颜色
     */
    state2SColor(state) {
        switch (state){
            case STATE.TO_SUBMIT: return "processing";
            case STATE.TO_REVIEW: return "processing";
            case STATE.CANCELED: return "default";
            default: return "error";
        }
    }

    /**
     * 根据委托状态选择显示的状态文字描述
     * @param state 委托状态
     * @returns {string} 状态的文字描述
     */
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

    /**
     * 设置表格Table
     */
    columns = [/*{
        title:"委托ID",
        dataIndex:"id",
        //width: '25%',
        sorter:(a, b) => a.id - b.id,
    }, */{
        title:"委托名称",
        dataIndex:"consignation",
        key:"name",
        render:(consignation) => {
            let consignBody = consignation?JSON.parse(consignation):{};
            return consignBody.softwareName?consignBody.softwareName:"未填写";
        },
    }, {
        title:"委托单位",
        dataIndex:"consignation",
        key:"unit",
        render:(consignation) => {
            let consignBody = consignation?JSON.parse(consignation):{};
            return consignBody.consignUnitC?consignBody.consignUnitC:"未填写";
        }
    },{
        title:"委托创建日期",
        dataIndex:"createdTime",
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
            //console.log(record);
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent(record)}>查看详情</a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);" disabled={!this.props.enableNew} onClick={this.showDeleteConfirm(record)}>取消委托</a>
                </div>
            )
        }
    }
    ];

    /**
     * 打开委托详情页面
     * @param record 被选择委托的标识
     * @returns {Function} 调用showContent
     */
    viewContent = (record) => () => {
        this.props.showContent(record);
    };

    /**
     * 显示取消委托提示框
     * @param record 被选择委托的标识
     * @returns {Function}
     */
    showDeleteConfirm = (record) => () => {
        confirm({
            title: '您确定要取消当前委托吗?',
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

    /**
     * 搜索框功能
     * @param value 在搜索框中输入的值
     */
    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        switch (this.state.selectOption){
            case 'unit':
                this.props.setListFilter((item)=>{
                    const consignBody = item.consignation?JSON.parse(item.consignation):{};
                    return consignBody!=={}&&consignBody.consignUnitC&&consignBody.consignUnitC.match(reg);
                });break;            // case 'createdUserId':
            //     this.props.setListFilter((item)=>item.createdUserId.match(reg));break;
            case 'name':
                this.props.setListFilter((item)=>{
                    const consignBody = item.consignation?JSON.parse(item.consignation):{};
                    return consignBody!=={}&&consignBody.softwareName&&consignBody.softwareName.match(reg);
                });break;
            default:break;
        }
    };

    /**
     * 绘制委托列表页面， 包括：页面标题、可以改变搜索选项的搜索框、委托表格
     */
    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>委托列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索委托名称" onSelect={this.onSelect}>
                            {/*<Option value="createdUserId">搜索委托人ID</Option>*/}
                            <Option value="name">搜索委托名称 </Option>
                            <Option value="unit">搜索委托单位</Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder={this.setPlaceholder()} onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    {this.props.enableNew ?
                        <Col span={2}>
                            <Button
                                //disabled={!this.props.enableNew}
                                type="primary" onClick={this.props.newConsign}><Icon type="plus-circle-o" />新建委托</Button>
                        </Col>
                        : <Col span={2}></Col>}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}