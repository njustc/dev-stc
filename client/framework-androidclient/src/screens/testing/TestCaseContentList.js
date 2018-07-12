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

import TestCaseContentPage from './TestCaseContentPage'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
import { getLocalclientDigest, getLocaluserName } from "../../login/Login";

let AllTestCaseContentList = [];//data from 后端

export const getTestCaseContentList = () => {
  const contractBase = baseServiceAddress+'/v1/project?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
  httpGet(contractBase,(result)=>{
    const{status,data}=result;
    if(status===STATUS.SUCCESS){
      AllTestCaseContentList=data;
    }
  });
};

export default class TestCaseContentList extends Component{
  constructor(props){
    super(props);
    this.state={
      datas:[
        {
          route:"TestCaseContentPage",
          text: ""
        }
      ],
      currentdatas:[
        {
          route: "TestCaseContentPage",
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
          datas:AllTestCaseContentList,
        });//所有的

        this.setState({currentdatas:AllTestCaseContentList});
        //console.warn(this.state.datas);
        return;
      }else{
        this.setState({currentdatas:AllTestCaseContentList});
        //console.warn(this.state.currentdatas);
        //console.warn(this.state.currentdatas.length);
        //console.warn(this.state.currentdatas[1].id);
        for (var i = 0; i < this.state.currentdatas.length; i++)
        {
          // console.warn("now"+this.state.currentdatas[i].id);
          if (this.state.currentdatas[i].consignUnitC==text) {
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

  getTestCaseContentList = () => {
    const contractBase = baseServiceAddress+'/v1/project?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
    httpGet(contractBase,(result)=>{
      const{status,data}=result;
      if(status===STATUS.SUCCESS){
        AllTestCaseContentList=data.map(item=>{
          const consignUnitC = JSON.parse(item.consign.consignation).consignUnitC;
          const count = item.testCase.length;
          return {...item, consignUnitC, count};
        });

        this.setState({datas: AllTestCaseContentList});
      }
    });
  };

  componentWillMount() {
    this.getTestCaseContentList();

    //this.state.datas=ConsignList;
  }

  gotoTestCaseContentPage = (id) =>{
    httpGet(baseServiceAddress+'/v1/project/'+id+'?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest(),(result)=>{
      const {status,data}=result;

      if(status===STATUS.SUCCESS){
        //let contractpage_content=JSON.parse(data.contractBody);
        //console.warn(contractpage_content);
        //DeviceEventEmitter.emit('consignUnitC',{CONSIGN_UNITC: consignationpage_content1.consignUnitC});
        DeviceEventEmitter.emit('id',{ID: id});
      }
    });
    //console.warn(id);

    this.props.navigation.navigate("TestCaseContentPage");
  }

  render(){
    return(
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
          <Title>测试用例表列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入测试用例表ID查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
            //dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoTestCaseContentPage(data.id)}
                keyExtractor = {this.extraUniqueKey}//去除警告
              >
                <Left>
                  <Text>
                    {data.consignUnitC + '-测试用例数:' + data.count}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>

    );
  }

}
