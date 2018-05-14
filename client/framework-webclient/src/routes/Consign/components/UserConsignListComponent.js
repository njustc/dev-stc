import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider} from 'antd';
import UserConsignContentView from "./ConsignContentComponent";

const { Column } = Table;
const Search = Input.Search;

export default class UserConsignListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func.isRequired,
        dataSource: PropTypes.array.isRequired,
        panes: PropTypes.array.isRequired,
        // addTab: PropTypes.func.isRequired,
        showContent: PropTypes.func.isRequired,
        newConsign: PropTypes.func.isRequired,
    };

    columns = [{
        title:"委托ID",
        dataIndex:"ID",
        sorter:(a, b) => a.ID - b.ID,
    }, {
        title:"委托提交时间",
        dataIndex:"time",
        sorter:(a, b) => a.time - b.time,
    }, {
        title:"状态",
        dataIndex:"status",
        render: (stateNum) => {
            switch(stateNum) {
                case 0:
                    return '待评审';
                case 1:
                    return '已通过';
                case 2:
                    return '未通过';
                default:
                    return '未定义状态';
            }
        },
    }, {
        title:"操作",
        key:"action",
        render: (text) => {
            return (
                <span>
                <Button type="content" onClick={this.viewContent}><Icon type="plus-square-o" />查看详情</Button>
                <Divider type="vertical" />
                <Button type="cancel"><Icon type="plus-square-o" />取消委托</Button>
                </span>
            )
        }
    }
    ];

    onSearch = (value) => {
        const reg = new RegExp(value, 'gi');
        this.props.setListFilter((record) => record.ID.match(reg));
    };
    //
    viewContent = () => {
        // this.props.addTab(this.props.panes,'details','委托详情',UserConsignContentView);
        this.props.showContent(this.props.panes);
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
                <Button type="primary" onClick={this.props.newConsign}><Icon type="plus-square-o" />新建委托</Button>
                <br /><br />
                <Table dataSource={this.props.dataSource} columns={this.columns} />

            </div>
        );
    }
}
