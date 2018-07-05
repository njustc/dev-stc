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

import TestingWorkCheckTablePage from './TestingWorkCheckTablePage'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
import { getLocalclientDigest, getLocaluserName } from "../../login/Login";

//const contractBase = baseServiceAddress + '/contract?username=admin&clientDigest=qqq';

let AllTestingWorkCheckTableList = [];//data from 后端

export const getTestingWorkCheckTableList = () => {
  const contractBase = baseServiceAddress+'/v1/testWorkCheck?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
  httpGet(contractBase,(result)=>{
    const{status,data}=result;
    if(status===STATUS.SUCCESS){
      AllTestingWorkCheckTableList=data;
    }
  });
};

export default class TestingWorkCheckTableList extends Component{
  constructor(props){
    super(props);
    this.state={
      datas:[
        {
          route:"TestingWorkCheckTablePage",
          text: ""
        }
      ],
      currentdatas:[
        {
          route: "TestingWorkCheckTablePage",
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
          datas:AllTestingWorkCheckTableList,
        });//所有的

        this.setState({currentdatas:AllTestingWorkCheckTableList});
        //console.warn(this.state.datas);
        return;
      }else{
        this.setState({currentdatas:AllTestingWorkCheckTableList});
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
    getTestingWorkCheckTableList();

    //this.state.datas=ConsignList;
  }

  gotoTestingWorkCheckTablePage = (id) =>{
    httpGet(baseServiceAddress+'/v1/testWorkCheck/'+id+'?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest(),(result)=>{
      const {status,data}=result;

      if(status===STATUS.SUCCESS){
        let testingworkchecktablepage_content=JSON.parse(data.body);
        //console.warn(testingworkchecktablepage_content);
        //DeviceEventEmitter.emit('consignUnitC',{CONSIGN_UNITC: consignationpage_content1.consignUnitC});
        DeviceEventEmitter.emit('softwareName',{SOFTWARE_NAME : testingworkchecktablepage_content.softwareName});
        DeviceEventEmitter.emit('versionModel',{VERSION_MODEL : testingworkchecktablepage_content.version});
        DeviceEventEmitter.emit('consignUnit',{CONSIGN_UNIT : testingworkchecktablepage_content.consignUnit});
        DeviceEventEmitter.emit('masterTestPerson',{MASTER_TEST_PERSON : testingworkchecktablepage_content.masterTestPerson});
        DeviceEventEmitter.emit('checker',{CHECKER : testingworkchecktablepage_content.checker});
        DeviceEventEmitter.emit('startingDate',{START_TIME : testingworkchecktablepage_content.startingDate});
        DeviceEventEmitter.emit('estimatedFinishTime',{ESTIMATED_FINISH_TIME : testingworkchecktablepage_content.estimatedFinishTime});
        DeviceEventEmitter.emit('actualFinishTime',{ACTUAL_FINISH_TIME : testingworkchecktablepage_content.actualFinishTime});

      }
    });
    this.props.navigation.navigate("TestingWorkCheckTablePage");
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
          <Title>测试工作检查表列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入测试工作检查表ID查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
            //dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoTestingWorkCheckTablePage(data.id)}
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


