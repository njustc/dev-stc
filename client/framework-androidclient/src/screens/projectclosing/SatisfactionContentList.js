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

import SatisfactionContentPage from './SatisfactionContentPage'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
import { getLocalclientDigest, getLocaluserName } from "../../login/Login";

let AllSatisfactionContentList = [];//data from 后端

export const getSatisfactionContentList = () => {
  const contractBase = baseServiceAddress+'/v1/satisfactionSurvey?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
  httpGet(contractBase,(result)=>{
    const{status,data}=result;
    if(status===STATUS.SUCCESS){
      AllSatisfactionContentList=data;
    }
  });
};

export default class SatisfactionContentList extends Component{
  constructor(props){
    super(props);
    this.state={
      datas:[
        {
          route:"SatisfactionContentPage",
          text: ""
        }
      ],
      currentdatas:[
        {
          route: "SatisfactionContentPage",
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
          datas:AllSatisfactionContentList,
        });//所有的

        this.setState({currentdatas:AllSatisfactionContentList});
        //console.warn(this.state.datas);
        return;
      }else{
        this.setState({currentdatas:AllSatisfactionContentList});
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

  componentWillMount() {
    getSatisfactionContentList();

    //this.state.datas=ConsignList;
  }

  gotoSatisfactionContentPage = (id) =>{
    httpGet(baseServiceAddress+'/v1/satisfactionSurvey/'+id+'?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest(),(result)=>{
      const {status,data}=result;

      if(status===STATUS.SUCCESS){
        let satisfactioncontentpage_content=JSON.parse(data.body);
        //console.warn(satisfactioncontentpage_content);
        //DeviceEventEmitter.emit('consignUnitC',{CONSIGN_UNITC: consignationpage_content1.consignUnitC});
        DeviceEventEmitter.emit('consignUnit',{CONSIGN_UNIT:satisfactioncontentpage_content.consignUnit});
        DeviceEventEmitter.emit('softwareName',{SOFTWARE_NAME:satisfactioncontentpage_content.softwareName});
        DeviceEventEmitter.emit('contact',{CONTACT:satisfactioncontentpage_content.contact});
        DeviceEventEmitter.emit('contactNumber',{CONTACTNUMBER:satisfactioncontentpage_content.contactNumber});
        DeviceEventEmitter.emit('Email',{EMAIL:satisfactioncontentpage_content.Email});
        DeviceEventEmitter.emit('mobilePhone',{MOBILEPHONE:satisfactioncontentpage_content.mobilePhone});
        DeviceEventEmitter.emit('reflectTime',{REFLECTTIME:satisfactioncontentpage_content.reflectTime});
        DeviceEventEmitter.emit('charge',{CHARGE:satisfactioncontentpage_content.charge});
        DeviceEventEmitter.emit('standard',{STANDARD:satisfactioncontentpage_content.standard});
        DeviceEventEmitter.emit('capability',{CAPABILITY:satisfactioncontentpage_content.capability});
        DeviceEventEmitter.emit('understanding',{UNDERSTANDING:satisfactioncontentpage_content.understanding});
        DeviceEventEmitter.emit('communication',{COMMUNICATION:satisfactioncontentpage_content.communication});
        DeviceEventEmitter.emit('advice',{ADVICE:satisfactioncontentpage_content.advice});
        DeviceEventEmitter.emit('satisfactionDegree',{SATISFACTION_DEGREE:satisfactioncontentpage_content.satisfactionDegree});
        //console.warn(satisfactioncontentpage_content.satisfactionLevel);
        //DeviceEventEmitter.emit('satisfactionLevel',{SATISFACTION_LEVEL:satisfactioncontentpage_content.satisfactionLevel});
        switch (satisfactioncontentpage_content.satisfactionLevel){
          case 1:DeviceEventEmitter.emit('satisfactionLevel',{SATISFACTION_LEVEL:"很满意"});break;
          case 2:DeviceEventEmitter.emit('satisfactionLevel',{SATISFACTION_LEVEL:"较满意"});break;
          case 3:DeviceEventEmitter.emit('satisfactionLevel',{SATISFACTION_LEVEL:"一般"});break;
          case 4:DeviceEventEmitter.emit('satisfactionLevel',{SATISFACTION_LEVEL:"不满意"});break;
          case 5:DeviceEventEmitter.emit('satisfactionLevel',{SATISFACTION_LEVEL:"很不满意"});break;
        }
      }
    });
    this.props.navigation.navigate("SatisfactionContentPage");
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
          <Title>客户满意度调查表列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入测试满意度调查表ID查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
            //dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoSatisfactionContentPage(data.id)}
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

    );
  }

}
