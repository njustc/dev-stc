import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message} from 'antd';
import UserConsignContentView from "./ConsignContentComponent";

const { Column } = Table;
const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;

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

    columns = [{
        title:"委托ID",
        dataIndex:"id",
        sorter:(a, b) => a.id - b.id,
    }, {
        title:"委托人ID",/*TODO*//*用filter在客户页面上把这一列过滤掉*/
        dataIndex:"customerId",
    }, {
        title:"状态",
        dataIndex:"status",
        render: (status) =>{
            return (
                <span>
                    <Badge status={this.state2SColor(status)} text={status} />
                </span>
            )
        },
        /*render: (stateCode) => {
            switch(stateCode) {
                case 'TobeSubmit':
                    return '待提交';
                case 'TobeCheck':
                    return '待审核';
                case 'Finished':
                    return '已通过';
                default:
                    return '未定义状态';
            }
        },
        filters: [{
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
        render: (id, record, index) => {
            return (
                <span>
                <Button type="default" onClick={this.viewContent(index, id)}><Icon type="eye-o" />查看详情</Button>
                <Divider type="vertical" />
                <Button type="danger" onClick={this.showDeleteConfirm(id)} ghost><Icon type="close-circle-o" />取消委托</Button>
                </span>
            )
        }
    }
    ];

    state2SColor(state) {
        /*TODO*/
        return "success";
    }
    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        this.props.setListFilter((record) => record.id.match(reg));
    };
    viewContent = (index, id) => () => {
        this.props.showContent(id);
    };
    deleteConsign = (id) => () => {
        this.props.deleteConsign(id);
    };
    showDeleteConfirm = (id) => () => {
        const ID=id;
        confirm({
            title: 'Are you sure delete this consign?',
            //content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                //console.log(id);
                //debugger;
                //this.deleteConsign(id);
                this.props.deleteConsign(id);
                },
            onCancel() {},
        });
    };

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>委托列表</h3>
                <InputGroup>
                    <Col span={8}>
                        <Search placeholder="搜索委托ID" onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    {this.props.enableNew ?
                        <Col span={2}>
                            <Button type="primary" onClick={this.props.newConsign}><Icon type="plus-circle-o" />新建委托</Button>
                        </Col>
                        : <Col span={2}></Col>}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'} />

            </div>
        );
    }
}
