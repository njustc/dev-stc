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

export default class ProjectContentComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        setContentFilter: PropTypes.func,
        dataSource: PropTypes.array,
        showContent: PropTypes.func,
    };

    componentWillMount() {
         this.props.getValues(this.props.projectData.id);
    };


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

    data = [
        {index:1,name:'委托申请表'},
        {index:2,name:'测试合同书'},
        {index:3,name:'测试方案书'},
        {index:4,name:'测试用例表'},
        {index:7,name:'测试报告书'},
        {index:8,name:'测试报告检查表'},
        {index:9,name:'测试工作检查表'},
        {index:10,name:'满意度调查表'}
    ];

    onTitle() {
        /*TODO 完善各种状态*/
        switch (this.props.consignState)  {
          case 'Finish': return (
              <div>流程当前状态为：委托申请表已通过</div>
          );
      }

    };
    /*查看详情*/
    viewContent = (item) => () => {
        //console.log(this.props.id);
        this.props.showContent({
            index: item.index,
            ...this.props.projectData,
        },this.props.id);
    };

    consignOperation = (state) => () => {
        switch (state){
            case 'Submit' : this.props.showContent({index:1,name:'委托申请表'},this.props.id);break;
            case 'Finish' : this.props.showContent({index:1,name:'委托申请表'},this.props.id);break;
            case 'Undefined' : break;
            default: break;
        }
    };

    contractOperation = () => () => {
        this.props.showContent({index:2,name:'测试合同书'},this.props.id);
        /*switch (state){
            case 'Submit' : this.props.showContent({index:2,name:'测试合同书'},this.props.id);break;
            case 'Finish' : this.props.showContent({index:2,name:'测试合同书'},this.props.id);break;
            case 'Undefined' : break;
            default: break;
        }*/
    };

    getCurrentStep(){
        //console.log(this.props);
        //return 0;
        // if(this.props.projectData.consign.state===STATE.FINISHED){
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
        //}
        // else return 0;
    }

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

    getTestCaseState(){
        /*TODO*/
    }

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

    getTestReportCheckState(){
        if(this.props.projectData.testReport.state===STATE.SATISFACTION){
            return (
                <Timeline.Item color="blue">测试报告检查表可填写</Timeline.Item>
            );
        }
    }

    getTestWorkCheckState(){
        if(this.props.projectData.testReport.state===STATE.SATISFACTION){
            return (
                <Timeline.Item color="blue">测试工作检查表可填写</Timeline.Item>
            );
        }
    }

    getSatisfactionState(){
        /*TODO*/
    }

    testFee(){
        console.log(this.props.projectData.contract.contractBody);//
        let contractBodyString=this.props.projectData.contract.contractBody;
        let contractBody = contractBodyString?JSON.parse(contractBodyString):{};
        return contractBody.testFee?"¥"+contractBody.testFee:"未填写";
    }

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
                                    dataSource={this.data}
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
                                   <div>委托人用户名：{this.props.projectData.createdUserName}</div>
                                    <br/>
                                    <div>流程创建时间：{this.props.projectData.createdTime}</div>
                                    <br/>
                                    <div>项目价格：{this.testFee()}</div>
                                    {/*<br/>*/}
                                    {/*<div>备注：感谢曹老板指导,给曹老板打call</div>*/}
                               </Card>
                            </Col>
                           <Col span={8}>
                                <Card hoverable>
                                    <div>您现在可以：
                                    </div>
                                    <Divider/>
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