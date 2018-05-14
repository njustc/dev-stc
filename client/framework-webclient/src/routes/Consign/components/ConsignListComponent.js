import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider} from 'antd';
import UserConsignContentView from "./ConsignContentComponent";

const { Column } = Table;
const Search = Input.Search;

export default class ConsignListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func.isRequired,
        dataSource: PropTypes.array.isRequired,
        showContent: PropTypes.func.isRequired,
        deleteConsign: PropTypes.func.isRequired,
        getConsignList: PropTypes.func.isRequired,
        newConsign: PropTypes.func,
        enableNew: PropTypes.bool.isRequired,
    };

    componentDidMount() {
        this.props.getConsignList();
    }

    columns = [{
        title:"委托ID",
        dataIndex:"id",
        sorter:(a, b) => a.id - b.id,
    }, {
        title:"状态",
        dataIndex:"status",
        render: (stateCode) => {
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
    }, {
        title:"操作",
        dataIndex:"id",
        key:"operation",
        render: (id, record, index) => {
            return (
                <span>
                <Button type="content" onClick={this.viewContent(index)}><Icon type="plus-square-o" />查看详情</Button>
                <Divider type="vertical" />
                <Button type="cancel" onClick={this.deleteConsign(id)}><Icon type="plus-square-o" />取消委托</Button>
                </span>
            )
        }
    }
    ];

    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        this.props.setListFilter((record) => record.id.match(reg));
    };
    //
    viewContent = (index) => () => {
        this.props.showContent(index);
    };
    deleteConsign = (id) => () => {
        this.props.deleteConsign(id);
    };

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>客户委托列表</h3>
                <Card>
                    <Search
                        placeholder="搜索委托ID"
                        onSearch={this.onSearch}
                        style={{ width: 200 }}
                        enterButton={true}
                    />
                </Card>
                <br />
                {this.props.enableNew ?
                <Button type="primary" onClick={this.props.newConsign}><Icon type="plus-square-o" />新建委托</Button>
                    : <br/>}
                <br /><br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'} />

            </div>
        );
    }
}
