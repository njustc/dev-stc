import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Table, Form, Input, Divider} from 'antd';

const { Column } = Table;
const Search = Input.Search;

export default class UserConsignListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        dataSource: PropTypes.array.isRequired,
        columns: PropTypes.array.isRequired,
        onSearch: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>客户委托列表</h3>
                <Card>
                    <Search
                        placeholder="搜索委托ID"
                        onSearch={this.props.onSearch}
                        style={{ width: 200 }}
                        enterButton={true}
                    />
                </Card>
                <br /><br />
                <Table dataSource={this.props.dataSource} columns={this.props.columns} />

            </div>
        );
    }
}
