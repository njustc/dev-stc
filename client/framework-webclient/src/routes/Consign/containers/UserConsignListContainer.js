import React, {Component} from 'react';
import UserConsignListComponent from "../components/UserConsignListComponent";
import {Divider} from "antd";
import {connect} from "react-redux";

class UserConsignListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.data,
        }
    }

    data = [{
        key: '1',
        ID: '151220134',
        time: '20180527',
        status: 0,
    }, {
        key: '2',
        ID: '151220078',
        time: '20180716',
        status: 1,
    }, {
        key: '3',
        ID: '151220004',
        time: '20181017',
        status: 2,
    }];

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
            <a href="javascript:;">查看详情</a>
            <Divider type="vertical" />
            <a href="javascript:;">取消委托</a>
            </span>
            )
        }
    }
    ];

    onSearch = (value) => {
        //this.setState({ searchText: value });
        // const { searchText } = this.state;
        const reg = new RegExp(value, 'gi');
        this.setState({
            dataSource: this.data.map((record) => {
                const match = record.ID.match(reg);
                if (!match) {
                    return null;
                }
                return record;
            }).filter(record => !!record),
        });
    };


    render() {
        return (
            <UserConsignListComponent
                {...this.props}
                columns={this.columns}
                onSearch={this.onSearch}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataSource: state.Consign.list,
    }
};

export default connect(mapStateToProps, null)(UserConsignListContainer);