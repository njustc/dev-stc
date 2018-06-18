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

    componentDidMount() {
        this.props.getConsignList();
    }

    /*搜索框选项相关*/
    state={
        selectOption:'id',
    };

    onSelect = (value, option) => {
        this.setState({
            selectOption:value
        });
    };

    setPlaceholder = () => {
        switch (this.state.selectOption){
            case 'id':
                return '请输入委托ID';
            case 'createdUserId':
                return '请输入委托人ID';
            case 'name':
                return '请输入委托名称';
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

    /*table列设置*/
    columns = [{
        title:"委托ID",
        dataIndex:"id",
        //width: '25%',
        sorter:(a, b) => a.id - b.id,
    }, {
        title:"委托名称",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
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

    /*查看详情*/
    viewContent = (record) => () => {
        this.props.showContent(record);
    };

    /*取消委托提示框*/
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

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>委托列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索委托ID" onSelect={this.onSelect}>
                            <Option value="id">搜索委托ID</Option>
                            <Option value="createdUserId">搜索委托人ID</Option>
                            <Option value="name">搜索委托名称 </Option>
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