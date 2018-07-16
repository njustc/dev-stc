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

/**
 * 测试工作检查表列表
 */
class TestingWorkCheckTableList extends Component{
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
    this.search(text);
  }

  /**
   * 测试工作检查表搜索函数
   * @func
   */
  search(text){
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
          if (this.state.currentdatas[i].softwareName==text) {
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

  /**
   * 从后端获取测试工作检查表列表
   * @func
   */
  getTestingWorkCheckTableList = () => {
    const contractBase = baseServiceAddress+'/v1/testWorkCheck?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
    httpGet(contractBase,(result)=>{
      const{status,data}=result;
      if(status===STATUS.SUCCESS){
        AllTestingWorkCheckTableList=data.map(item=>{
          const body = JSON.parse(item.body);
          return {...item, ...body};
        });
        this.setState({datas: AllTestingWorkCheckTableList});
      }
    });
  };

  /**
   * 获取测试工作检查表列表具体内容
   * @func
   */
  componentWillMount() {
    this.getTestingWorkCheckTableList();

    //this.state.datas=ConsignList;
  }

  /**
   * 测试工作检查表跳转函数，根据测试工作检查表id从后端获取测试工作检查表具体内容传给所跳转的界面
   * @param id
   * @func
   */
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
        //console.warn(testingworkchecktablepage_content.item1);
        //DeviceEventEmitter.emit('item1',{ITEM1 :testingworkchecktablepage_content.item1});
        switch (testingworkchecktablepage_content.item1) {
          case true:DeviceEventEmitter.emit('item1',{ITEM1:"是"});break;
          default:DeviceEventEmitter.emit('item1',{ITEM1:"否"});break;
        }
        switch (testingworkchecktablepage_content.item2) {
          case true:DeviceEventEmitter.emit('item2',{ITEM2:"是"});break;
          default:DeviceEventEmitter.emit('item2',{ITEM2:"否"});break;
        }
        switch (testingworkchecktablepage_content.item3) {
          case true:DeviceEventEmitter.emit('item3',{ITEM3:"是"});break;
          default:DeviceEventEmitter.emit('item3',{ITEM3:"否"});break;
        }
        switch (testingworkchecktablepage_content.item4) {
          case true:DeviceEventEmitter.emit('item4',{ITEM4:"是"});break;
          default:DeviceEventEmitter.emit('item4',{ITEM4:"否"});break;
        }
        switch (testingworkchecktablepage_content.item5) {
          case true:DeviceEventEmitter.emit('item5',{ITEM5:"是"});break;
          default:DeviceEventEmitter.emit('item5',{ITEM5:"否"});break;
        }
        switch (testingworkchecktablepage_content.item6) {
          case true:DeviceEventEmitter.emit('item6',{ITEM6:"是"});break;
          default:DeviceEventEmitter.emit('item6',{ITEM6:"否"});break;
        }

        switch (testingworkchecktablepage_content.item7) {
          case true:DeviceEventEmitter.emit('item7',{ITEM7:"是"});break;
          default:DeviceEventEmitter.emit('item7',{ITEM7:"否"});break;
        }
        switch (testingworkchecktablepage_content.item8) {
          case true:DeviceEventEmitter.emit('item8',{ITEM8:"是"});break;
          default:DeviceEventEmitter.emit('item8',{ITEM8:"否"});break;
        }
        switch (testingworkchecktablepage_content.item9) {
          case true:DeviceEventEmitter.emit('item9',{ITEM9:"是"});break;
          default:DeviceEventEmitter.emit('item9',{ITEM9:"否"});break;
        }
        switch (testingworkchecktablepage_content.item10) {
          case true:DeviceEventEmitter.emit('item10',{ITEM10:"是"});break;
          default:DeviceEventEmitter.emit('item10',{ITEM10:"否"});break;
        }
        switch (testingworkchecktablepage_content.item11) {
          case true:DeviceEventEmitter.emit('item11',{ITEM11:"是"});break;
          default:DeviceEventEmitter.emit('item11',{ITEM11:"否"});break;
        }
        switch (testingworkchecktablepage_content.item12) {
          case true:DeviceEventEmitter.emit('item12',{ITEM12:"是"});break;
          default:DeviceEventEmitter.emit('item12',{ITEM12:"否"});break;
        }

        switch (testingworkchecktablepage_content.item13) {
          case true:DeviceEventEmitter.emit('item13',{ITEM13:"是"});break;
          default:DeviceEventEmitter.emit('item13',{ITEM13:"否"});break;
        }
        switch (testingworkchecktablepage_content.item14) {
          case true:DeviceEventEmitter.emit('item14',{ITEM14:"是"});break;
          default:DeviceEventEmitter.emit('item14',{ITEM14:"否"});break;
        }
        switch (testingworkchecktablepage_content.item15) {
          case true:DeviceEventEmitter.emit('item15',{ITEM15:"是"});break;
          default:DeviceEventEmitter.emit('item15',{ITEM15:"否"});break;
        }
        switch (testingworkchecktablepage_content.item16) {
          case true:DeviceEventEmitter.emit('item16',{ITEM16:"是"});break;
          default:DeviceEventEmitter.emit('item16',{ITEM16:"否"});break;
        }
        switch (testingworkchecktablepage_content.item17) {
          case true:DeviceEventEmitter.emit('item17',{ITEM17:"是"});break;
          default:DeviceEventEmitter.emit('item17',{ITEM17:"否"});break;
        }
        switch (testingworkchecktablepage_content.item18) {
          case true:DeviceEventEmitter.emit('item18',{ITEM18:"是"});break;
          default:DeviceEventEmitter.emit('item18',{ITEM18:"否"});break;
        }

        switch (testingworkchecktablepage_content.item19) {
          case true:DeviceEventEmitter.emit('item19',{ITEM19:"是"});break;
          default:DeviceEventEmitter.emit('item19',{ITEM19:"否"});break;
        }
        switch (testingworkchecktablepage_content.item20) {
          case true:DeviceEventEmitter.emit('item20',{ITEM20:"是"});break;
          default:DeviceEventEmitter.emit('item20',{ITEM20:"否"});break;
        }
        switch (testingworkchecktablepage_content.item21) {
          case true:DeviceEventEmitter.emit('item21',{ITEM21:"是"});break;
          default:DeviceEventEmitter.emit('item21',{ITEM21:"否"});break;
        }
        switch (testingworkchecktablepage_content.item22) {
          case true:DeviceEventEmitter.emit('item22',{ITEM22:"是"});break;
          default:DeviceEventEmitter.emit('item22',{ITEM22:"否"});break;
        }
        switch (testingworkchecktablepage_content.item23) {
          case true:DeviceEventEmitter.emit('item23',{ITEM23:"是"});break;
          default:DeviceEventEmitter.emit('item23',{ITEM23:"否"});break;
        }
        switch (testingworkchecktablepage_content.item24) {
          case true:DeviceEventEmitter.emit('item24',{ITEM24:"是"});break;
          default:DeviceEventEmitter.emit('item24',{ITEM24:"否"});break;
        }
      }
    });
    this.props.navigation.navigate("TestingWorkCheckTablePage");
  }

  /**
   * 测试工作检查表界面渲染函数
   * @return {*}
   * @func
   */
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
                    {data.softwareName}
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

export default TestingWorkCheckTableList;
