import React, {Component, PropTypes} from 'react';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message} from 'antd';
const { Column } = Table;
const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;
const Option = Select.Option;

export default class ProjectComponent extends Component{
    constructor(props){
        super(props)
    }

    columns = [{
        title:"项目ID",
        dataIndex:"proID",
        sorter:(a, b) => a.proID - b.proID,/*TODO*//*比较的是字符串*/
    },{
        title:"项目名称",
        dataIndex:"proName",
    },{
        title:"委托人ID",
        dataIndex:"userID",
    }, {
        title:"状态",/*TODO*//*有多少种状态、给状态增加一些渲染的花样*/
        dataIndex:"state",
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
        }
    }
    ];

    static propTypes = {
        setListFilter: PropTypes.func.isRequired,
        dataSource: PropTypes.array.isRequired,
        showContent: PropTypes.func.isRequired,
        deleteConsign: PropTypes.func.isRequired,
        getConsignList: PropTypes.func.isRequired,
        newConsign: PropTypes.func,
        enableNew: PropTypes.bool.isRequired,
        //showDeleteConfirm: PropTypes.func.isRequired,
    };



    render(){
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>项目管理</h3>
                <InputGroup>
                    <Select defaultValue="搜索委托ID" style={{ width: '10%' }}>{/*TODO*//*添加API来实现根据选择的option过滤*/}
                        <Option value="proID">搜索委托ID</Option>
                        <Option value="userID">搜索委托人ID</Option>
                    </Select>
                    <Search placeholder='请输入' style={{ width: '20%' }}/>
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'} />
            </div>
        );
    }
}