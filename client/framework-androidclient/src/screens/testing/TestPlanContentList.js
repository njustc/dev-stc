import React, { Component } from "react";
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
  ListItem
} from "native-base";


import styles from "./styles";

import { ToastAndroid,DeviceEventEmitter } from "react-native";

import TestPlanContentPage from './TestCaseContentPage'

import {getLocaluserName,getLocalclientDigest } from '../../login/Login'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";

let AllTestPlanContentList = [];//data from 后端

export const getTestPlanContentList = () =>{
  const contractBase = baseServiceAddress+'/v1/testPlan?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
  httpGet(contractBase,(result)=>{
    const{status,data}=result;
    if(status===STATUS.SUCCESS){
      AllTestPlanContentList=data;
    }
  });
};


export default  class TestPlanContentList extends Component{
  constructor(props){
    super(props);
    this.state={
      datas:[
        {
          route: "TestPlanContentPage",
          text: ""
        }
      ],
      currentdatas:[
        {
          route: "TestPlanContentPage",
          text: ""
        }
      ],
    };
  }

  onChanegeTextKeyword(text){
    //console.warn("yyy");
    this.timeA(text);
  }

  timeA(text){
    if(this.time){
      clearTimeout(this.time)
    }

    this.time = setTimeout(()=>{
      //console.warn(text);
      //this.setState({currentdatas:ConsignList});
      //console.warn(this.state.currentdatas);

      if (text=='') {
        this.setState({
          datas:AllTestPlanContentList,
        });//所有的

        this.setState({currentdatas:AllTestPlanContentList});
        //console.warn(this.state.datas);
        return;
      }else{
        this.setState({currentdatas:AllTestPlanContentList});
        //console.warn(this.state.currentdatas);
        //console.warn(this.state.currentdatas.length);
        //console.warn(this.state.currentdatas[1].id);
        for (var i = 0; i < this.state.currentdatas.length; i++)
        {
          // console.warn("now"+this.state.currentdatas[i].id);
          if (this.state.currentdatas[i].id==text) {
            this.setState({
              datas:[this.state.currentdatas[i]],
            });
            return;
          }
          else{
            this.setState({
              datas:[],
            });
            //console.warn(this.state.datas);
          }
        }
      }
    },500);

  }//搜索函数


  extraUniqueKey(item,index){
    return index+item;
  }

  componentWillMount(){
    getTestPlanContentList();
  }

  gotoTestPlanContentPage = (id) =>{
    httpGet(baseServiceAddress+'/v1/testPlan/'+id+'?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest(),(result)=> {
      const {status,data}=result;

      if(status===STATUS.SUCCESS){
        let testplancontentpage_content=JSON.parse(data.body);
        //console.warn(testplancontentpage_content);

        DeviceEventEmitter.emit('softwareName',{SOFTWARE_NAME : testplancontentpage_content.softwareName });
        DeviceEventEmitter.emit('projectName',{PROJECT_NAME : testplancontentpage_content.projectName });
        DeviceEventEmitter.emit('testPlanVer',{TEST_PLAN_VER : testplancontentpage_content.testPlanVer });
        DeviceEventEmitter.emit('establisher',{ESTABLISHER : testplancontentpage_content.establisher });
        DeviceEventEmitter.emit('reviewer',{REVIEWER : testplancontentpage_content.reviewer });
        DeviceEventEmitter.emit('approver',{APPROVER : testplancontentpage_content.approver });
        DeviceEventEmitter.emit('doRecord',{DORECORD : testplancontentpage_content.doRecord });

        DeviceEventEmitter.emit('documentID',{DOCUMENT_ID : testplancontentpage_content.documentID });
        DeviceEventEmitter.emit('baseline',{BASE_LINE : testplancontentpage_content.baseline });

        DeviceEventEmitter.emit('testMethods',{TEST_METHODS : testplancontentpage_content.testMethods });
        DeviceEventEmitter.emit('testType',{TEST_TYPE : testplancontentpage_content.testType });
        DeviceEventEmitter.emit('testLevel',{TEST_LEVEL : testplancontentpage_content.testLevel });
        DeviceEventEmitter.emit('testCategory',{TEST_CATEGORY : testplancontentpage_content.testCategory });
        DeviceEventEmitter.emit('testObject',{TEST_OBJECT : testplancontentpage_content.testObject });
        DeviceEventEmitter.emit('caseNum',{CASE_NUM : testplancontentpage_content.caseNum });

        DeviceEventEmitter.emit('costDay',{COST_DAY : testplancontentpage_content.costDay });
      }
    });
    this.props.navigation.navigate("TestPlanContentPage");
  }

  render(){
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>测试方案列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入测试方案书ID查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
            //dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoTestPlanContentPage(data.id)}
                keyExtractor = {this.extraUniqueKey}//去除警告
              >
                <Left>
                  <Text>
                    {data.id}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>

    );}

}
