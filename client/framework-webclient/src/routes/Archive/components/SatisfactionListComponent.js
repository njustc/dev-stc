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

/**
 * 满意度调查表列表类，负责渲染，展示满意度调查表的列表
 * @extends Component
 */
class SatisfactionListComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setListFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        //deleteConsign: PropTypes.func,
        getSatisfactionList: PropTypes.func,
        //newContract: PropTypes.func,
        //enableNew: PropTypes.bool,
        showProject: PropTypes.func,

    };

    /**
     * componentDidMount，（装载完成），在render之后调用
     */
    componentDidMount() {
        this.props.getSatisfactionList();
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
            // case 'id':
            //     return '请输入满意度调查表ID';
            case 'writer':
                return '请输入填写人';
            case 'name':
                return '请输入项目名称';
            case 'code':
                return '请输入项目编号';
            default:break;
        }
    };

    /**
     * 打开项目详情页面
     * @param id 被选择满意度调查表的标识
     * @returns {Function} 调用showProject
     */
    viewProject = (id) => () => {
        this.props.showProject(id);
    };

    /**
     * 根据满意度调查表状态选择状态点的颜色
     * @param state 满意度调查表状态
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
     * 根据满意度调查表状态选择显示的状态文字描述
     * @param state 满意度调查表状态
     * @returns {string} 状态的文字描述
     */
    state2C(state) {
        switch (state){/*TODO*/
            case STATE.TO_SUBMIT: return "待提交"/*(<a>待提交</a>)*/;
            case STATE.TO_REVIEW: return "待评审"/*(<a>待提交</a>)*/;
            case STATE.CANCELED: return "已取消";
            default: return "未定义状态";
        }
    }

    /**
     * 设置表格Table
     */
    columns = [{
        title:"项目编号",
        dataIndex: "code",
        render:(code,record)=>{
            return (<a href="javascript:void(0);" onClick={this.viewProject(record.id)}>{code}</a>)
        }
    }, {
        title:"项目名称",
        dataIndex:"consign",
        key:"name",
        render:(consign) => {
            let consignBody = consign.consignation?JSON.parse(consign.consignation):{};
            return consignBody.softwareName?consignBody.softwareName:"未填写";
        }
    }, {
        title:"填写人",
        dataIndex:"satisfaction.createdUserName",
    // }, {
    //     title:"状态",
    //     dataIndex:"satisfaction.state",
    //     render: (status) =>{
    //         return (
    //             <span>
    //                 <Badge status={this.state2SColor(status)} text={this.state2C(status)} />
    //             </span>
    //         )
    //     },
        /*
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
        // dataIndex:"id",
        key:"operation",
        render: (project) => {
            return (
                <div>
                    <a href="javascript:void(0);" onClick={this.viewContent({key:project.satisfaction.id,id:project.id,})}>查看详情</a>
                    {/*<Divider type="vertical"/>
                    <a href="javascript:void(0);" onClick={this.showDeleteConfirm(id)}>取消委托</a>*/}
                </div>
            )
        }
    }
    ];

    /**
     * 打开满意度调查表详情页面
     * @param id 被选择满意度调查表的标识
     * @returns {Function} 调用showContent
     */
    viewContent = (id) => () => {
        this.props.showContent(id);
    };

    /**
     * 显示取消满意度调查表提示框
     * @param record 被选择满意度调查表的标识
     * @returns {Function}
     */
    showDeleteConfirm = (record) => () => {
        confirm({
            title: 'Are you sure to delete this consign?',
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
            case 'code':
                this.props.setListFilter((item)=>item.code.match(reg));break;
            case 'writer':
                this.props.setListFilter((item)=>item.satisfaction.createdUserName.match(reg));break;
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
     * 绘制满意度调查表列表页面， 包括：页面标题、可以改变搜索选项的搜索框、满意度调查表表格
     */
    render() {
        return (
            <div>
                <h3 style={{ marginBottom: 16 }}>满意度调查列表</h3>
                <InputGroup>
                    <Col span={3}>
                        <Select defaultValue="搜索项目编号" onSelect={this.onSelect}>
                            {/*<Option value="id">搜索满意度调查表ID</Option>*/}
                            <Option value="code">搜索项目编号</Option>
                            <Option value="writer">搜索填写人</Option>
                            <Option value="name">搜索项目名称 </Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Search placeholder={this.setPlaceholder()} onSearch={this.onSearch} enterButton={true}/>
                    </Col>
                    <Col span={1}></Col>
                    {/*this.props.enableNew*/0 ?
                        <Col span={2}>
                            <Button type="primary" onClick={this.props.newConsign}><Icon type="plus-circle-o" />新建测试记录</Button>
                        </Col>
                        : <Col span={2}></Col>}
                </InputGroup>
                <br />
                <Table dataSource={this.props.dataSource} columns={this.columns} rowKey={'id'}/>
            </div>
        );
    }
}

export default SatisfactionListComponent;