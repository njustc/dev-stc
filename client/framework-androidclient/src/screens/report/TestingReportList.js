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

import TestingReportPage from './TestingReportPage'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
import { getLocalclientDigest, getLocaluserName } from "../../login/Login";

//const contractBase = baseServiceAddress + '/contract?username=admin&clientDigest=qqq';

let AllTestingReportList = [];//data from 后端

export const getTestingReportList = () => {
  const contractBase = baseServiceAddress+'/v1/testReport?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
  httpGet(contractBase,(result)=>{
    const{status,data}=result;
    if(status===STATUS.SUCCESS){
      AllTestingReportList=data;
    }
  });
};

/**
 * 测试报告列表
 * @class
 */
class TestingReportList extends Component{
  constructor(props){
    super(props);
    this.state={
      datas:[
        {
          route:"TestingReportPage",
          text: ""
        }
      ],
      currentdatas:[
        {
          route: "TestingReportPage",
          text: ""
        }
      ],
    };
  }


  onChanegeTextKeyword(text){
    //console.warn("yyy");
    this.timeA(text);
  }

  /**
   * 测试报告列表搜索函数
   * @function
   * @name timeA
   */
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
          datas:AllTestingReportList,
        });//所有的

        this.setState({currentdatas:AllTestingReportList});
        //console.warn(this.state.datas);
        return;
      }else{
        this.setState({currentdatas:AllTestingReportList});
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

  getTestingReportList = () => {
    const contractBase = baseServiceAddress+'/v1/testReport?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
    httpGet(contractBase,(result)=>{
      const{status,data}=result;
      if(status===STATUS.SUCCESS){
        AllTestingReportList=data.map(item=>{
          const body = JSON.parse(item.body);
          return {...item, ...body};
        });
        this.setState({datas: AllTestingReportList});
      }
    });
  };

  componentWillMount() {
    this.getTestingReportList();

    //this.state.datas=ConsignList;
  }

  gotoTestingReportPage = (id) =>{
    httpGet(baseServiceAddress+'/v1/testReport/'+id+'?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest(),(result)=>{
      const {status,data}=result;

      if(status===STATUS.SUCCESS){
        let testingreportpage_content=JSON.parse(data.body);
        //console.warn(testingreportpage_content);
        //DeviceEventEmitter.emit('consignUnitC',{CONSIGN_UNITC: consignationpage_content1.consignUnitC});
        DeviceEventEmitter.emit('consignUnitC' , {CONSIGN_UNITC : testingreportpage_content.consignUnitC });
        DeviceEventEmitter.emit('sampleName' , {SAMPLE_NAME : testingreportpage_content.sampleNumber });
        DeviceEventEmitter.emit('sampleNumber' , {SAMPLE_NUMBER : testingreportpage_content.sampleName });
        DeviceEventEmitter.emit('versionModel' , {VERSION_MODEL : testingreportpage_content.versionModel });
        DeviceEventEmitter.emit('receiveTime' , {RECEIVE_TIME : testingreportpage_content.receiveTime });
        DeviceEventEmitter.emit('testKind' , {TEST_KIND : testingreportpage_content.testKind });
        DeviceEventEmitter.emit('testTime' , {TEST_TIME : testingreportpage_content.testTime });
        DeviceEventEmitter.emit('testBasis' , {TEST_BASIS : testingreportpage_content.testBasis });
        DeviceEventEmitter.emit('softwareDoc' , {SOFT_WARE_DOC : testingreportpage_content.softwareDoc });
        DeviceEventEmitter.emit('testConclusion' , {TEST_CONCLUSION : testingreportpage_content.testConclusion });
        DeviceEventEmitter.emit('masterMeasuringMan' , {MASTER_MEASURING_MAN : testingreportpage_content.masterMeasuringMan });
        DeviceEventEmitter.emit('Auditor' , {AUDITOR : testingreportpage_content.Auditor });
        DeviceEventEmitter.emit('Approver' , {APPROVER : testingreportpage_content.Approver });
        DeviceEventEmitter.emit('testUnitContactMode' , {TEST_UNIT_CONTACT_MODE : testingreportpage_content.testUnitContactMode });
        DeviceEventEmitter.emit('consignUnittelephone' , {CONSIGN_UNIT_TELEPHONE : testingreportpage_content.consignUnittelephone });
        DeviceEventEmitter.emit('consignUnitFax' , {CONSIGN_UNIT_FAX : testingreportpage_content.consignUnitFax });
        DeviceEventEmitter.emit('consignUnitaddress' , {CONSIGN_UNIT_ADDRESS : testingreportpage_content.consignUnitaddress });
        DeviceEventEmitter.emit('consignUnitEmailnumber' , {CONSIGN_UNIT_EMAILNUMBER : testingreportpage_content.consignUnitEmailnumber });
        DeviceEventEmitter.emit('consignUnitpeople' , {CONSIGN_UNIT_PEOPLE : testingreportpage_content.consignUnitpeople });
        DeviceEventEmitter.emit('consignUnitEmail' , {CONSIGN_UNIT_EMAIL : testingreportpage_content.consignUnitEmail });
        DeviceEventEmitter.emit('testBasic' , {TEST_BASIC : testingreportpage_content.testBasic });
        DeviceEventEmitter.emit('referenceContent' , {REFERENCE_CONTENT : testingreportpage_content.referenceContent });


      }
    });
    this.props.navigation.navigate("TestingReportPage");
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
          <Title>测试报告书列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入测试报告书ID查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
            //dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoTestingReportPage(data.id)}
                keyExtractor = {this.extraUniqueKey}//去除警告
              >
                <Left>
                  <Text>
                    {data.consignUnitC}
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

export default TestingReportList;
