import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message, Steps, Badge} from 'antd';
const { Column } = Table;
const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;
const Option = Select.Option;
const Step = Steps.Step;

export default class ProjectComponent extends Component{
    constructor(props){
        super(props)
    }

    columns = [{
        title:"项目ID",
        dataIndex:"proID",
        width: '20%',
        sorter:(a, b) => a.proID - b.proID,/*TODO*//*比较的是字符串*/
    },{
        title:"项目名称",
        dataIndex:"proName",
    },{
        title:"委托人ID",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex:"userID",
    }, {
        title:"状态",/*TODO*//*有多少种状态、给状态增加一些渲染的花样*/
        dataIndex:"state",
        render: (state) => <span><Badge status={this.state2Status(state)} text={state} /></span>
        /*render: (stateCode) => {
            switch(stateCode) {
                case 'TobeSubmit':
                    return '待提交';
                case 'TobeCheck':
                    return '待审核';
                case 'Finished':
                    return '已通过';
                case 'Abolished':
                    return '已废止';
                default:
                    return '未定义状态';
            }
        },*/
        /*filters: [{
            text: '待提交',
            value: 'TobeSubmit',
        }, {
            text: '待审核',
            value: 'TobeCheck',
        },],*/
        //filterMultiple: false,/*单选filter*/
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        //onFilter: (value, record) => record.state.indexOf(value) === 0,/*过滤按钮需要做得更好看*/
    }, {
        title:"操作",
        dataIndex:"id",
        key:"operation",
        render: (id, record, index) => {
            /*TODO*/
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewDetails(record)}>查看详情</a>
                    <Divider type="vertical"/>
                    <a href="javascript:void(0);">更多</a>
            </div>
            )
        }
    }
    ];

    static propTypes = {

    };

    state2Status(state) {
        /*TODO*//*是否需要能让超级管理员可以添加新的状态？*/
        return "success";
    }

    viewDetails = (record) => () =>{
        /*TODO*/
    }

    viewContent = (record) => () => {
        this.props.showContent(record.proID);
    };

    consignView = (record) => {
        if(1/*TODO*/){
            return (
                <a href="javascript:void(0);" onClick={this.viewContent(record)}>委托</a>
            )
        }
        else{
            return (
                <text>委托</text>
            )
        }
    }

    viewContract = (record) => () => {
        //this.props.showContent(record.proID);
    };

    contractView = (record) => {
        if(1/*TODO*/){
            return (
                <a href="javascript:void(0);" onClick={this.viewContract(record)}>合同</a>
            )
        }
        else{
            return (
                <text>委托</text>
            )
        }
    }

    expandedRowRender = (record) =>{
        return (
            <Steps current={/*TODO*//*this.props.*/1} size="small">
                <Step title={this.consignView(record)} description='委托已通过 样品已接收' />{/*TODO*//*description要根据具体状态改变*/}
                <Step title={this.contractView(record)} description="合同待确认" />
                <Step title="测试方案" />
                <Step title="测试报告" />
                <Step title="归档结项" />
            </Steps>
        )
    }

    onSelect(value, option) {
        console.log(value);
        /*TODO*/
    }

    dataSource = [
        { key: 1, proID: '1', proName: 'XYZ', userID: '151220134', state: 'TobeSubmit' },
        { key: 2, proID: '2', proName: 'ZBJ', userID: '151220004', state: 'TobeCheck' },
    ];

    render(){
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>项目管理</h3>
                <InputGroup>
                    <Col span={3}>
                    <Select defaultValue="搜索委托ID" onSelect={this.onSelect}>{/*TODO*//*添加API来实现根据选择的option过滤*/}
                        <Option value="proID">搜索委托ID</Option>
                        <Option value="userID">搜索委托人ID</Option>
                        <Option value="proName">搜索项目名称 </Option>
                    </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder='请输入' enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2}>
                        <Button type="primary">新建委托</Button>
                    </Col>
                </InputGroup>
                <br />
                <Table dataSource={this./*props.*/dataSource} columns={this.columns}
                       expandedRowRender={this.expandedRowRender}
                       expandRowByClick={true}
                       //onExpandedRowsChange
                />
            </div>
        );
    }
}