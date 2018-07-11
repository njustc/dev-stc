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

import TestingReportCheckTablePage from './TestingReportCheckTablePage'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
import { getLocalclientDigest, getLocaluserName } from "../../login/Login";

//const contractBase = baseServiceAddress + '/contract?username=admin&clientDigest=qqq';

let AllTestingReportCheckTableList = [];//data from 后端

export const getTestingReportCheckTableList = () => {
  const contractBase = baseServiceAddress+'/v1/testReportCheck?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
  httpGet(contractBase,(result)=>{
    const{status,data}=result;
    if(status===STATUS.SUCCESS){
      AllTestingReportCheckTableList=data;
    }
  });
};

export default class TestingReportCheckTableList extends Component{
  constructor(props){
    super(props);
    this.state={
      datas:[
        {
          route:"TestingReportCheckTablePage",
          text: ""
        }
      ],
      currentdatas:[
        {
          route: "TestingReportCheckTablePage",
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
          datas:AllTestingReportCheckTableList,
        });//所有的

        this.setState({currentdatas:AllTestingReportCheckTableList});
        //console.warn(this.state.datas);
        return;
      }else{
        this.setState({currentdatas:AllTestingReportCheckTableList});
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
    getTestingReportCheckTableList();

    //this.state.datas=ConsignList;
  }

  gotoTestingReportCheckTablePage = (id) =>{
    httpGet(baseServiceAddress+'/v1/testReportCheck/'+id+'?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest(),(result)=>{
      const {status,data}=result;

      if(status===STATUS.SUCCESS){
        let testingreportchecktablepage_content=JSON.parse(data.body);
        //console.warn(contractpage_content);
        //DeviceEventEmitter.emit('consignUnitC',{CONSIGN_UNITC: consignationpage_content1.consignUnitC});
        DeviceEventEmitter.emit('softwareName',{SOFTWARE_NAME :testingreportchecktablepage_content.softwareName });
        DeviceEventEmitter.emit('consignUnit',{CONSIGN_UNIT :testingreportchecktablepage_content.consignUnit });
        DeviceEventEmitter.emit('checker',{CHECKER :testingreportchecktablepage_content.checker });
        DeviceEventEmitter.emit('date',{DATE :testingreportchecktablepage_content.date });

        switch (testingreportchecktablepage_content.item1){
          case true:DeviceEventEmitter.emit('reportNumber',{REPORT_NUMBER :"是"});break;
          default:DeviceEventEmitter.emit('reportNumber',{REPORT_NUMBER :"否"});break;
        }
        switch (testingreportchecktablepage_content.item2){
          case true:DeviceEventEmitter.emit('pageNumber',{PAGE_NUMBER :"是"});break;
          default:DeviceEventEmitter.emit('pageNumber',{PAGE_NUMBER :"否"});break;
        }
        switch (testingreportchecktablepage_content.item3){
          case true:DeviceEventEmitter.emit('softwareNameOrNot',{SOFRWARE_NAMEORNOT :"是"});break;
          default:DeviceEventEmitter.emit('softwareNameOrNot',{SOFRWARE_NAMEORNOT :"否"});break;
        }
        switch (testingreportchecktablepage_content.item4){
          case true:DeviceEventEmitter.emit('versionModel',{VERSION_MODEL :"是"});break;
          default:DeviceEventEmitter.emit('versionModel',{VERSION_MODEL :"否"});break;
        }
        switch (testingreportchecktablepage_content.item5){
          case true:DeviceEventEmitter.emit('consignUnitOrNot',{CONSIGN_UNITORNOT :"是"});break;
          default:DeviceEventEmitter.emit('consignUnitOrNot',{CONSIGN_UNITORNOT :"否"});break;
        }
        switch (testingreportchecktablepage_content.item6){
          case true:DeviceEventEmitter.emit('finishDate',{FINISH_DATE :"是"});break;
          default:DeviceEventEmitter.emit('finishDate',{FINISH_DATE :"否"});break;
        }
        switch (testingreportchecktablepage_content.item7){
          case true:DeviceEventEmitter.emit('consignUnitAddr',{CONSIGN_UNIT_ADDR :"是"});break;
          default:DeviceEventEmitter.emit('consignUnitAddr',{CONSIGN_UNIT_ADDR :"否"});break;
        }
        switch (testingreportchecktablepage_content.item8){
          case true:DeviceEventEmitter.emit('Number',{NUMBER :"是"});break;
          default:DeviceEventEmitter.emit('Number',{NUMBER :"否"});break;
        }
        switch (testingreportchecktablepage_content.item9){
          case true:DeviceEventEmitter.emit('testSample',{TEST_SAMPLE :"是"});break;
          default:DeviceEventEmitter.emit('testSample',{TEST_SAMPLE :"否"});break;
        }
        //console.warn(testingreportchecktablepage_content.item10)
        switch (testingreportchecktablepage_content.item10){
          case true:DeviceEventEmitter.emit('softwareHardwareList',{SOFRWARE_HARDWARE_LIST :"是"});break;
          default:DeviceEventEmitter.emit('softwareHardwareList',{SOFRWARE_HARDWARE_LIST :"否"});break;
        }
        switch (testingreportchecktablepage_content.item111){
          case true:DeviceEventEmitter.emit('wrongWords',{WRONG_WORDS :"是"});break;
          default:DeviceEventEmitter.emit('wrongWords',{WRONG_WORDS :"否"});break;
        }
        switch (testingreportchecktablepage_content.item112){
          case true:DeviceEventEmitter.emit('wrongSentences',{WRONG_SENTENCES :"是"});break;
          default:DeviceEventEmitter.emit('wrongSentences',{WRONG_SENTENCES :"否"});break;
        }
        switch (testingreportchecktablepage_content.item113){
          case true:DeviceEventEmitter.emit('wrongStyle',{WRONG_STYLE :"是"});break;
          default:DeviceEventEmitter.emit('wrongStyle',{WRONG_STYLE :"否"});break;
        }
        switch (testingreportchecktablepage_content.item12){
          case true:DeviceEventEmitter.emit('usersTestReport',{USERSTESTREPORT :"是"});break;
          default:DeviceEventEmitter.emit('usersTestReport',{USERSTESTREPORT :"否"});break;
        }

      }
    });
    this.props.navigation.navigate("TestingReportCheckTablePage");
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
          <Title>测试报告检查表列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入测试报告检查表ID查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
            //dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoTestingReportCheckTablePage(data.id)}
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
