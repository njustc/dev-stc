import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, Tabs, Select, Button, Icon, Table, Form, Input, Divider, Modal, message, Badge, Steps,Layout,Menu,List,Timeline} from 'antd';
import {STATE} from "../../../services/common"
const { Column } = Table;
const Search = Input.Search;
const confirm = Modal.confirm;
const InputGroup = Input.Group;
const Option = Select.Option;
const Step = Steps.Step;
const { SubMenu } = Menu;
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

/**
 * 项目详情类，负责渲染，展示项目的进度和详细信息
 * @extends Component
 */

class ProjectContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setContentFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
        fileData: PropTypes.array,
    };

    /**
     * componentWillMount会在组件render之前执行，并且永远都只执行一次。
     */
    componentWillMount() {
         this.props.getValues(this.props.projectData.id);
    };


    /**
     * 设置步骤条Steps
     */
    steps = [{
        title: '委托',
        //description: "委托已通过",
        //content: 'First-content',
    }, {
        title: '合同',
        // description: "合同已确认",
        //content: 'Second-content',
    }, {
        title: '测试',
        // description: "测试已完成",
        //content: 'Last-content',
    }, {
        title: '报告',
        // description: "测试报告已确认",
        //content: 'Last-content',
    }, {
        title: '结项',
        // description: "满意度调查表待提交",
        //content: 'Last-content',
    }/*,{
        title: '等待后台',
        description: "什么也展示不了",
        //status: "error"
        //content: 'Last-content',
    }*/];

    viewContent = (item) => () => {
        this.props.showContent({
            ...this.props.projectData,
            index: item.index,
        },this.props.id);
    };

    /**
     * 获取当前项目进度并转换为Steps的步骤数
     * @returns {number} 当前项目状态对应的步骤数
     */
    getCurrentStep(){
            if(this.props.projectData.contract.state===STATE.FINISHED){
                if(this.props.projectData.testPlan.state===STATE.FINISHED){
                    if(this.props.projectData.testReport.state===STATE.SATISFACTION) {
                        return 4;
                    }
                    else return 3;
                }
                else return 2;
            }
            else return 1;
    }

    /**
     * 获取委托状态
     * @returns {*}
     */
    getConsignState(){
        switch(this.props.projectData.consign.state){
            case STATE.TO_SUBMIT: return (
                <Timeline.Item color="blue">委托申请表待提交</Timeline.Item>
            );
            case STATE.TO_REVIEW: return (
                <Timeline.Item color="blue">委托申请表待评审</Timeline.Item>
            );
            case STATE.CANCELED: return (
                <Timeline.Item color="red">委托申请表已取消</Timeline.Item>
            );
            case STATE.FINISHED:return (
                <Timeline.Item color="green">委托申请表已通过</Timeline.Item>
            );
            default:return (
                {/*<Timeline.Item color="grey">委托申请表已通过</Timeline.Item>*/}
            );
        }
    }

    /**
     * 获取合同状态
     * @returns {*}
     */
    getContractState(){
        switch(this.props.projectData.contract.state){
            case STATE.TO_SUBMIT: return (
                <Timeline.Item color="blue">测试合同书待提交</Timeline.Item>
            );
            case STATE.TO_REVIEW: return (
                <Timeline.Item color="blue">测试合同书待评审</Timeline.Item>
            );
            case STATE.TO_CONFIRM: return (
                <Timeline.Item color="blue">测试合同书待确认</Timeline.Item>
            );
            case STATE.CANCELED: return (
                <Timeline.Item color="red">测试合同书已取消</Timeline.Item>
            );
            case STATE.FINISHED:return (
                <Timeline.Item color="green">测试合同书已通过</Timeline.Item>
            );
            default:return (
                {/*<Timeline.Item color="grey">测试合同书已通过</Timeline.Item>*/}
            );
        }
    }

    /**
     * 获取测试方案状态
     * @returns {*}
     */
    getTestPlanState(){
        switch(this.props.projectData.testPlan.state){
            case STATE.TO_WRITE: return (
                <Timeline.Item color="blue">测试方案书待编写</Timeline.Item>
            );
            case STATE.TO_REVIEW: return (
                <Timeline.Item color="blue">测试方案书待评审</Timeline.Item>
            );
            case STATE.TO_CONFIRM: return (
                <Timeline.Item color="blue">测试方案书待确认</Timeline.Item>
            );
            case STATE.CANCELED: return (
                <Timeline.Item color="red">测试方案书已取消</Timeline.Item>
            );
            case STATE.TO_IMPLEMENT: return (
                <Timeline.Item color="green">测试方案书待实施</Timeline.Item>
            );
            default: return (
                {/*<Timeline.Item color="grey">测试方案书已通过</Timeline.Item>*/}
            );
        }
    }

    /**
     * 获取测试用例状态
     * 目前系统中测试用例没有状态
     */
    getTestCaseState(){
        /*TODO*/
    }

    /**
     * 获取测试报告状态
     * @returns {*}
     */
    getTestReportState(){
        //console.log(this.props.projectData);
        switch(this.props.projectData.testReport.state){
            case STATE.TO_WRITE: return (
                <Timeline.Item color="blue">测试报告书待编写</Timeline.Item>
            );
            case STATE.TO_REVIEW: return (
                <Timeline.Item color="blue">测试报告书待评审</Timeline.Item>
            );
            case STATE.CANCELED: return (
                <Timeline.Item color="red">测试报告书已取消</Timeline.Item>
            );
            case STATE.TO_APPROVE: return (
                <Timeline.Item color="blue">测试报告书待批准</Timeline.Item>
            );
            case STATE.TO_SEND: return (
                <Timeline.Item color="blue">测试报告书待发放</Timeline.Item>
            );
            case STATE.TO_CONFIRM: return (
                <Timeline.Item color="blue">测试报告书待确认</Timeline.Item>
            );
            case STATE.SATISFACTION: return (
                <Timeline.Item color="green">测试报告书已完成</Timeline.Item>
            );
            default: return (
                {/*<Timeline.Item color="grey">测试报告书已通过</Timeline.Item>*/}
            );
        }
    }

    /**
     * 获取测试报告检查表状态
     * @returns {*}
     */
    getTestReportCheckState(){
        if(this.props.projectData.testReport.state===STATE.SATISFACTION){
            return (
                <Timeline.Item color="blue">测试报告检查表可填写</Timeline.Item>
            );
        }
    }

    /**
     * 获取测试工作检查表状态
     * @returns {*}
     */
    getTestWorkCheckState(){
        if(this.props.projectData.testReport.state===STATE.SATISFACTION){
            return (
                <Timeline.Item color="blue">测试工作检查表可填写</Timeline.Item>
            );
        }
    }

    /**
     * 获取满意度调查表状态
     * 目前系统中满意度调查表没有状态
     */
    getSatisfactionState(){
        /*TODO*/
    }

    /**
     * 获取项目价格并渲染
     */
    testFee(){
        console.log(this.props.projectData.contract.contractBody);//
        let contractBodyString=this.props.projectData.contract.contractBody;
        let contractBody = contractBodyString?JSON.parse(contractBodyString):{};
        return contractBody.testFee?"¥"+contractBody.testFee:"未填写";
    }

    /**
     * 绘制项目详情页面，包括：页面标题、项目进度Steps、文档List、项目摘要信息、项目进度Timeline
     */
    render() {
        return (
            <div>
                <Layout style={{ background: '#fff' }}>
                <h3>项目详情</h3>
                        <Card title="项目进度" hoverable>
                            <Steps current={this.getCurrentStep()}>
                                {this.steps.map(item => <Step key={item.title} title={item.title}
                                                              //description={item.description}
                                />)}
                            </Steps>
                        </Card>
                        <br />
                        <Content style={{ background: '#fff' }} >
                        <Row gutter={16}>
                            <Col span={5}>
                                <List
                                    size="small"
                                    header={<div>文档</div>}
                                    bordered
                                    dataSource={getFileList(this.props.fileData.filter((item)=>!item.disable))}
                                    renderItem={item => (<List.Item><a href="javascript:void(0);" onClick={this.viewContent(item)}>{item.name}</a></List.Item>)}
                                />
                            </Col>
                            <Col span={10}>
                               <Card title='项目摘要信息' hoverable >
                                    <div>项目编号：{this.props.projectData.code}</div>
                                    <br/>
                                    <div>项目ID：{this.props.projectData.id}</div>
                                    <br/>
                                    <div>项目名称：{this.props.projectData.consign.consignation.softwareName?this.props.projectData.consign.consignation.softwareName+"测试项目":"未填写"}</div>
                                    <br/>
                                    <div>委托人ID：{this.props.projectData.createdUserId}</div>
                                    <br/>
                                   <div>最后修改人用户名：{this.props.projectData.consign.alteredUserName}</div>
                                    <br/>
                                    <div>项目创建时间：{this.props.projectData.createdTime}</div>
                                    <br/>
                                    {/*<br/>*/}
                                    {/*<div>备注：感谢曹老板指导,给曹老板打call</div>*/}
                               </Card>
                            </Col>
                           <Col span={8}>
                                <Card title={"当前项目进展"}hoverable>
                                    {/*<div>当前项目进展*/}
                                    {/*</div>*/}
                                    {/*<Divider/>*/}
                                    <Timeline>
                                        {this.getConsignState()}
                                        {this.getContractState()}
                                        {this.getTestPlanState()}
                                        {this.getTestCaseState()}
                                        {this.getTestReportState()}
                                        {this.getTestReportCheckState()}
                                        {this.getTestWorkCheckState()}
                                        {this.getSatisfactionState()}
                                    </Timeline>
                                </Card>
                          </Col>

                      </Row>
                        </Content>
                </Layout>
                {/*<h3 style={{ marginBottom: 16 }}>项目进度</h3>
                <Table dataSource={this.data} columns={this.columns} bordered={true}
                    //rowKey={'id'}
                />*/}
            </div>

        );
    }
}

function getFileList(fileData) {
    let files = [];
    fileData.forEach((item)=>files.push({index:JSON.parse(item.key),name:item.name}));
    return files;
}

export default ProjectContentComponent;