import React, { Component } from "react";
import { StyleSheet,View,DeviceEventEmitter } from "react-native";
import { Table, TableWrapper, Row,Rows } from 'react-native-table-component';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Item,
  Input,
  Content,
  Text,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Accordion,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Tabs,
  Tab,
  ScrollableTab,
  Textarea
} from "native-base";
import styles from "./styles";

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
import { getLocalclientDigest, getLocaluserName } from "../../login/Login";

//let List = [];//data from 后端
/**
 * TestCaseContentPage
 * 实现类
 */
class TestCaseContentPage extends Component{
    /**
     * constructor
     * 其中包含了初始值和定义
     * @param props
     */
  constructor(props){
    super(props);
    this.state={
      ProjectID:"",
      datas : [
        {
          id: 1,
          classification: '',
          process: '',
          expectedResult: '',
          designer: '',
          time: '',
          action: '',
          designNotes: '',
          statute: '',
          accordance: ''
        },
      ],
      currentdatas:[
        {
          id: 1,
          classification: '',
          process: '',
          expectedResult: '',
          designer: '',
          time: '',
          action: '',
          designNotes: '',
          statute: '',
          accordance: ''
        },
      ],
    }
  }

    /**
     * componentDidmount
     * 在第一次渲染后调用，组件已经生成对应的DOM结构
     * @func
     */

  componentDidMount(){
    this.listener_id = DeviceEventEmitter.addListener('id',(events)=>{
      this.setState({ProjectID:events.ID});

      const contractBase = baseServiceAddress+'/v1/project/'+events.ID+'?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
      httpGet(contractBase,(result)=>{
        const{status,data}=result;
        if(status===STATUS.SUCCESS){
          this.state.datas = data.testCase.map(item => {
            const body = JSON.parse(item.body);
            return {
              ...item,
              ...body,
            }
          })
          //console.warn(this.state.datas);
          this.setState({datas: this.state.datas});
          //console.warn(data.testCase);
          //let dataContent=JSON.parse(data);
          //console.warn(dataContent.testCase);
        }
      });
    });
    //console.warn("ctmd");
    //console.warn();
    //console.warn(this.state.ProjectID);
  }
    /**
     * componentWillUnmount
     * 在组件从DOM中移除的时候立刻被调用
     * @func
     */
  componentWillUnmount(){
    this.listener_id.remove();

  }
    /**
     * render
     * 移动端绘制测试用例详情页面
     * @func
     * @returns {*}
     */
  render(){
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>测试用例详情</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{ marginTop: 0 }}>
          {/*<Text>TODO: change to a list</Text>*/}
          <Card style={styles.md}
                dataArray={this.state.datas}
                renderRow={data=>
                  <CardItem header bordered>
                    {/*<Text>测试用例序号：{data.id}</Text>*/}
                    {/*<Text>时间：{data.createdTime}</Text>*/}
                    <Body>
                    <Text>测试分类：{data.classification}</Text>
                    <Text>执行过程：{data.process}</Text>
                    <Text>预期结果：{data.expectedResult}</Text>
                    <Text>设计者：{data.designer}</Text>
                    <Text>时间：{data.createdTime}</Text>
                    <Text>设计说明：{data.designNotes}</Text>
                    <Text>有关的规约说明：{data.statute}</Text>
                    <Text>依据：{data.accordance}</Text>
                    </Body>
                  </CardItem>
                }
          />
      </Content>
      </Container>
    )
  }
}
export default TestCaseContentPage;
