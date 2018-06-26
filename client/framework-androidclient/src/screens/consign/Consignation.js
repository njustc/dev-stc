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
// import {getConsignList} from "./ConsignService";
import { ToastAndroid,DeviceEventEmitter } from "react-native";

import ConsignationPage from './ConsignationPage'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
// import {ConsignListData} from "./Consignation"
// import { ToastAndroid } from "react-native";

const consignBase = baseServiceAddress + '/consign?username=admin&clientDigest=qqq';
// const consignActivitiBase = baseServiceAddress + '/processInstance';

let ConsignList;//get data from 后端
//let CurrentConsignList;
let if_get=false;

export let consignationpage_content1;
//let consignationpage_content2;
// export let CONSIGNATIONPAGE_CONTENT = {
//   consignUnitC:"",
//   consignUnitE:""
// };

export const getConsignList = () => {
  httpGet(consignBase,(result) => {
    const {status, data} = result;
    if (status === STATUS.SUCCESS) {
      ConsignList = data;
      //CurrentConsignList=data;
      // let toastMsg2 = 'emmmm';
      // ToastAndroid.showWithGravity(toastMsg2, 1000, ToastAndroid.CENTER);
    }
    // callback && callback(status);
  });
};

export  default class Consignation extends Component {
  constructor(props){
    super(props);
    this.state= {
      datas:[
        {
          route: "ConsignPage",
          text: ""
        },
      ],
      currentdatas:[
        {
          route: "ConsignPage",
          text: ""
        },
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
          datas:ConsignList,
        });//所有的

        this.setState({currentdatas:ConsignList});
        //console.warn(this.state.datas);
        return;
      }else{
        this.setState({currentdatas:ConsignList});
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
    getConsignList();

    //this.state.datas=ConsignList;
  }

  gotoConsignationPage = (id) => {
      httpGet(baseServiceAddress + '/consign/' + id + '?username=admin&clientDigest=qqq', (result) => {
        const {status, data} = result;
        //console.warn(status);
        if (status === STATUS.SUCCESS) {
          //const {consignation} = data;

          let consignationpage_content0 = JSON.parse(data.consignation);
          consignationpage_content1 = JSON.parse(consignationpage_content0.fieldsValue);
          //console.warn(consignationpage_content0);
          //console.warn(consignationpage_content1.softwareScale);
          //consignationpage_content2 = JSON.parse(consignationpage_content1.softwareScale);
          //console.warn(consignationpage_content2);
          DeviceEventEmitter.emit('id',{ID: id});
          DeviceEventEmitter.emit('consignUnitC',{CONSIGN_UNITC: consignationpage_content1.consignUnitC});
          DeviceEventEmitter.emit('consignUnitE',{CONSIGN_UNITE: consignationpage_content1.consignUnitE});
          DeviceEventEmitter.emit('developUnit',{DEVELOP_UNIT: consignationpage_content1.developUnit});
          DeviceEventEmitter.emit('unitProp',{UNIT_PROP:consignationpage_content1.unitProp});
          DeviceEventEmitter.emit('consignUnitTelephone',{CONSIGN_UNIT_TELEPHONE:consignationpage_content1.consignUnitTelephone});
          DeviceEventEmitter.emit('consignUnitFax',{CONSIGN_UNIT_FAX:consignationpage_content1.consignUnitFax});
          DeviceEventEmitter.emit('consignUnitAddress',{CONSIGN_UNIT_ADDRESS:consignationpage_content1.consignUnitAddress});
          DeviceEventEmitter.emit('consignUnitEmailNumber',{CONSIGN_UNIT_EMAILNUMBER:consignationpage_content1.consignUnitEmailNumber});
          DeviceEventEmitter.emit('consignUnitPeople',{CONSIGN_UNIT_PEOPLE:consignationpage_content1.consignUnitPeople});
          DeviceEventEmitter.emit('consignUnitCellPhoneNumber',{CONSIGN_UNIT_CELLPHONE_NUMBER:consignationpage_content1.consignUnitCellPhoneNumber});
          DeviceEventEmitter.emit('consignUnitEmail',{CONSIGN_UNIT_EMAIL:consignationpage_content1.consignUnitEmail});
          DeviceEventEmitter.emit('consignUnitUrl',{CONSIGN_UNIT_URL:consignationpage_content1.consignUnitUrl});
          //tabOne

          DeviceEventEmitter.emit('softwareName' ,{SOFTWARE_NAME :consignationpage_content1.softwareName});
          DeviceEventEmitter.emit('version' ,{VERSION :consignationpage_content1.version});
          DeviceEventEmitter.emit('softwareType' ,{SOFTWARE_TYPE :consignationpage_content1.softwareType});
          DeviceEventEmitter.emit('funcNum' ,{FUNC_NUM :consignationpage_content1.softwareScale.funcNum});
          DeviceEventEmitter.emit('funcPoint' ,{FUNC_POINT :consignationpage_content1.softwareScale.funcPoint});
          DeviceEventEmitter.emit('codeLine' ,{CODE_LINE :consignationpage_content1.softwareScale.codeLine});
          DeviceEventEmitter.emit('objDesc' ,{OBJ_DESC :consignationpage_content1.objDesc});
          DeviceEventEmitter.emit('funcDesc' ,{FUNC_DESC :consignationpage_content1.funcDesc});
          //tabTwo

          DeviceEventEmitter.emit('client_os',{CLIENT_OS : consignationpage_content1.operateEnvironment.client.os });
          DeviceEventEmitter.emit('client_memoryReq',{CLIENT_MEMORYREQ : consignationpage_content1.operateEnvironment.client.memoryReq });
          DeviceEventEmitter.emit('client_hardDiskReq',{CLIENT_HARDDISKREQ : consignationpage_content1.operateEnvironment.client.hardDiskReq });
          DeviceEventEmitter.emit('hardware_arch',{HARDWARE_ARCH : consignationpage_content1.operateEnvironment.service.hardware.arch });
          DeviceEventEmitter.emit('hardware_memoryReq',{HARDWARE_MEMORYREQ : consignationpage_content1.operateEnvironment.service.hardware.memoryReq });
          DeviceEventEmitter.emit('hardware_hardDiskReq',{HARDWARE_HARDDISKREQ : consignationpage_content1.operateEnvironment.service.hardware.hardDiskReq });
          DeviceEventEmitter.emit('hardware_otherReq',{HARDWARE_OTHERREQ : consignationpage_content1.operateEnvironment.service.hardware.otherReq });
          DeviceEventEmitter.emit('software_os',{SOFTWARE_OS : consignationpage_content1.operateEnvironment.service.software.os });
          DeviceEventEmitter.emit('software_version',{SOFTWARE_VERSION : consignationpage_content1.operateEnvironment.service.soft.version });
          DeviceEventEmitter.emit('software_language',{SOFTWARE_LANGUAGE : consignationpage_content1.operateEnvironment.service.soft.language });
          DeviceEventEmitter.emit('software_arch',{SOFTWARE_ARCH : consignationpage_content1.operateEnvironment.service.soft.arch });
          DeviceEventEmitter.emit('software_dateBase',{SOFTWARE_DATEBASE : consignationpage_content1.operateEnvironment.service.soft.dateBase });
          DeviceEventEmitter.emit('software_midWare',{SOFTWARE_MIDWARE : consignationpage_content1.operateEnvironment.service.soft.midWare });
          DeviceEventEmitter.emit('software_otherSupp',{SOFTWARE_OTHERSUPP : consignationpage_content1.operateEnvironment.service.soft.otherSupp });
          DeviceEventEmitter.emit('netEnvironment',{NETENVIRONMENT : consignationpage_content1.operateEnvironment.netEnvironment });
          //tabThree

          DeviceEventEmitter.emit('testType',{TEST_TYPE:consignationpage_content1.testType});
          DeviceEventEmitter.emit('testBasis',{TEST_BASIS:consignationpage_content1.testBasis});
          DeviceEventEmitter.emit('testIndicator',{TEST_INDICATOR:consignationpage_content1.testIndicator});
          DeviceEventEmitter.emit('cd',{CD:consignationpage_content1.sampleQuantity.softwareMedia.cd});
          DeviceEventEmitter.emit('U',{U:consignationpage_content1.sampleQuantity.softwareMedia.U});
          DeviceEventEmitter.emit('other',{OTHER:consignationpage_content1.sampleQuantity.softwareMedia.other});
          DeviceEventEmitter.emit('Documentation',{DOCUMENTATION:consignationpage_content1.sampleQuantity.Documentation});
          DeviceEventEmitter.emit('toHandle',{TOHANDLE:consignationpage_content1.sampleQuantity.toHandle});
          DeviceEventEmitter.emit('comTimeWish',{COM_TIME_WISH:consignationpage_content1.sampleQuantity.comTimeWish});
          DeviceEventEmitter.emit('securityLevel',{SECURITY_LEVEL:consignationpage_content1.securityLevel});
          DeviceEventEmitter.emit('killingVirus',{KILLING_VIRUS:consignationpage_content1.killingVirus});
          DeviceEventEmitter.emit('requirementsDocument',{REQUIREMENTS_DOCUMENT:consignationpage_content1.requirementsDocument});
          DeviceEventEmitter.emit('userDocument',{USER_DOCUMENT:consignationpage_content1.userDocument});
          DeviceEventEmitter.emit('operationDocument',{OPERATION_DOCUMENT:consignationpage_content1.operationDocument});
          DeviceEventEmitter.emit('elseA',{ELSEA:consignationpage_content1.elseA});
          DeviceEventEmitter.emit('confirmationE',{CONFIRMATIONE:consignationpage_content1.confirmationE});
          DeviceEventEmitter.emit('admissiBility',{ADMISSIBILITY:consignationpage_content1.admissiBility});
          DeviceEventEmitter.emit('testingNumber',{TESTING_NUMBER:consignationpage_content1.testingNumber});
          DeviceEventEmitter.emit('remarksE',{REMARKSE:consignationpage_content1.remarksE});
          //tabFour

          //ToastAndroid.showWithGravity(consignationpage_content1.softwareScale.funcNum, 1000, ToastAndroid.CENTER);
        }

      });//TODO: only get ID from 后端 and the second one cannot get ID
    this.props.navigation.navigate("ConsignPage");
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>委托列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入委托名查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
            //dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoConsignationPage(data.id)}
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

