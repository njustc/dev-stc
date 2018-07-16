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

import {getLocaluserName,getLocalclientDigest } from '../../login/Login'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
// import {ConsignListData} from "./Consignation"
// import { ToastAndroid } from "react-native";

//const consignBase = baseServiceAddress + '/consign?username=admin&clientDigest=qqq';
//const consignBase;
// const consignActivitiBase = baseServiceAddress + '/processInstance';

let ConsignList = [];//get data from 后端

let userName ;
let clientDigest;
//let CurrentConsignList;
let if_get=false;

//export let consignationpage_content1;
//let consignationpage_content2;
// export let CONSIGNATIONPAGE_CONTENT = {
//   consignUnitC:"",
//   consignUnitE:""
// };

export const getConsignList = () => {
  //let toastMsg2 = 'emmmm';
  //ToastAndroid.showWithGravity(toastMsg2, 1000, ToastAndroid.CENTER);
  const consignBase = baseServiceAddress+'/consign?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
  httpGet(consignBase,(result) => {
    const {status, data} = result;
    if (status === STATUS.SUCCESS) {
      ConsignList = data;
      //CurrentConsignList=data;

    }
    // callback && callback(status);
  });
};

/**
 * 委托列表
 */
class Consignation extends Component {
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
    this.search(text);
  }

  /**
   * 委托列表搜索函数
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

  /**
   * 从后端获取委托列表
   * @func
   */
  getConsignList = () => {
    //let toastMsg2 = 'emmmm';
    //ToastAndroid.showWithGravity(toastMsg2, 1000, ToastAndroid.CENTER);
    const consignBase = baseServiceAddress+'/consign?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
    httpGet(consignBase,(result) => {
      const {status, data} = result;
      if (status === STATUS.SUCCESS) {
        ConsignList = data.map(item => {
          const body = JSON.parse(item.consignation);
          return {...item, ...body};
        });
        //CurrentConsignList=data;
        this.setState({datas: ConsignList});
        //console.warn(ConsignList);

      }
      // callback && callback(status);
    });
  };

  /**
   * 获取委托列表内容
   * @func
   */
  componentWillMount() {
    userName=getLocaluserName();
    clientDigest=getLocalclientDigest();
    // console.warn(msg);
    // console.warn(msg2);
    this.getConsignList();

    //this.state.datas=ConsignList;
  }

  /**
   * 委托列表跳转到委托单函数，根据委托单id，将委托单具体内容传递给跳转界面
   * @param id
   * @func
   */
  gotoConsignationPage = (id) => {
      //httpGet(baseServiceAddress + '/consign/' + id + '?username=admin&clientDigest=qqq', (result) => {
      httpGet(baseServiceAddress+'/consign/' + id + '?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest(),(result)=>{
        const {status, data} = result;
        //console.warn(status);
        if (status === STATUS.SUCCESS) {
          //const {consignation} = data;
          //console.warn(data);

          let consignationpage_content1 = JSON.parse(data.consignation);
          // console.warn(consignationpage_content0);
          // consignationpage_content1 = JSON.parse(consignationpage_content0.fieldsValue);
          //console.warn(consignationpage_content0);
          //console.warn(consignationpage_content1.consignUnitC);
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
          DeviceEventEmitter.emit('funcNum' ,{FUNC_NUM :consignationpage_content1.softwareScaleFuncNum});
          DeviceEventEmitter.emit('funcPoint' ,{FUNC_POINT :consignationpage_content1.softwareScaleFuncPoint});
          DeviceEventEmitter.emit('codeLine' ,{CODE_LINE :consignationpage_content1.softwareScaleCodeLine});
          DeviceEventEmitter.emit('objDesc' ,{OBJ_DESC :consignationpage_content1.objDesc});
          DeviceEventEmitter.emit('funcDesc' ,{FUNC_DESC :consignationpage_content1.funcDesc});
          //tabTwo

          DeviceEventEmitter.emit('client_os',{CLIENT_OS : consignationpage_content1.operateEnvironmentClientOs });
          DeviceEventEmitter.emit('client_memoryReq',{CLIENT_MEMORYREQ : consignationpage_content1.operateEnvironmentClientMemoryReq });
          DeviceEventEmitter.emit('client_hardDiskReq',{CLIENT_HARDDISKREQ : consignationpage_content1.operateEnvironmentCientHardDiskReq });
          DeviceEventEmitter.emit('hardware_arch',{HARDWARE_ARCH : consignationpage_content1.operateEnvironmentServiceHardwareArch });
          DeviceEventEmitter.emit('hardware_memoryReq',{HARDWARE_MEMORYREQ : consignationpage_content1.operateEnvironmentServiceHardwareMemoryReq });
          DeviceEventEmitter.emit('hardware_hardDiskReq',{HARDWARE_HARDDISKREQ : consignationpage_content1.operateEnvironmentServiceHardwareHardDiskReq });
          DeviceEventEmitter.emit('hardware_otherReq',{HARDWARE_OTHERREQ : consignationpage_content1.operateEnvironmentServiceHardwareOtherReq });
          DeviceEventEmitter.emit('software_os',{SOFTWARE_OS : consignationpage_content1.operateEnvironmentServiceSoftwareOs });
          DeviceEventEmitter.emit('software_version',{SOFTWARE_VERSION : consignationpage_content1.operateEnvironmentServiceSoftVersion });
          DeviceEventEmitter.emit('software_language',{SOFTWARE_LANGUAGE : consignationpage_content1.operateEnvironmentServiceSoftLanguage });
          DeviceEventEmitter.emit('software_arch',{SOFTWARE_ARCH : consignationpage_content1.operateEnvironmentServiceSoftArch });
          DeviceEventEmitter.emit('software_dateBase',{SOFTWARE_DATEBASE : consignationpage_content1.operateEnvironmentServiceSoftDateBase });
          DeviceEventEmitter.emit('software_midWare',{SOFTWARE_MIDWARE : consignationpage_content1.operateEnvironmentServiceSoftMidWare });
          DeviceEventEmitter.emit('software_otherSupp',{SOFTWARE_OTHERSUPP : consignationpage_content1.operateEnvironmentServiceSoftOtherSupp });
          DeviceEventEmitter.emit('netEnvironment',{NETENVIRONMENT : consignationpage_content1.operateEnvironmentNetEnvironment });
          //tabThree

          DeviceEventEmitter.emit('testType',{TEST_TYPE:consignationpage_content1.testType});
          DeviceEventEmitter.emit('testBasis',{TEST_BASIS:consignationpage_content1.testBasis});
          DeviceEventEmitter.emit('testIndicator',{TEST_INDICATOR:consignationpage_content1.testIndicator});
          DeviceEventEmitter.emit('cd',{CD:consignationpage_content1.sampleQuantitySoftwareMediaCd});
          DeviceEventEmitter.emit('U',{U:consignationpage_content1.sampleQuantitySoftwareMediaU});
          DeviceEventEmitter.emit('other',{OTHER:consignationpage_content1.sampleQuantitySoftwareMediaOther});
          DeviceEventEmitter.emit('Documentation',{DOCUMENTATION:consignationpage_content1.sampleQuantityDocumentation});
          DeviceEventEmitter.emit('toHandle',{TOHANDLE:consignationpage_content1.sampleQuantityToHandle});
          DeviceEventEmitter.emit('comTimeWish',{COM_TIME_WISH:consignationpage_content1.sampleQuantityComTimeWish});
          //DeviceEventEmitter.emit('securityLevel',{SECURITY_LEVEL:consignationpage_content1.securityLevel});
          switch(consignationpage_content1.securityLevel){
            case 'a' :DeviceEventEmitter.emit('securityLevel',{SECURITY_LEVEL:"无密级"});break;
            case 'b' :DeviceEventEmitter.emit('securityLevel',{SECURITY_LEVEL:"秘密"});break;
            case 'c' :DeviceEventEmitter.emit('securityLevel',{SECURITY_LEVEL:"机密"});break;
          }
          // DeviceEventEmitter.emit('killingVirus',{KILLING_VIRUS:consignationpage_content1.killingVirus});
          switch (consignationpage_content1.killingVirus) {
            case 'a':DeviceEventEmitter.emit('killingVirus',{KILLING_VIRUS:"已完成"});;break;
            case 'b':DeviceEventEmitter.emit('killingVirus',{KILLING_VIRUS:"无法完成"});;break;
          }
          //TODO：所用查杀工具
          DeviceEventEmitter.emit('requirementsDocument',{REQUIREMENTS_DOCUMENT:consignationpage_content1.requirementsDocument});
          DeviceEventEmitter.emit('userDocument',{USER_DOCUMENT:consignationpage_content1.userDocument});
          DeviceEventEmitter.emit('operationDocument',{OPERATION_DOCUMENT:consignationpage_content1.oprationDocument});
          // console.warn(consignationpage_content1.oprationDocument);
          DeviceEventEmitter.emit('elseA',{ELSEA:consignationpage_content1.elseA});
          // DeviceEventEmitter.emit('confirmationE',{CONFIRMATIONE:consignationpage_content1.confirmationE});
          switch (consignationpage_content1.confirmationE){
            case 'a':DeviceEventEmitter.emit('confirmationE',{CONFIRMATIONE:"测试所需材料不全，未达到受理条件。"});break;
            case 'b':DeviceEventEmitter.emit('confirmationE',{CONFIRMATIONE:"属依据国家标准或自编非标规范进行的常规检测，有资质、能力和资源满足委托方要求。"});break;
            case 'c':DeviceEventEmitter.emit('confirmationE',{CONFIRMATIONE: "无国家标准和规范依据，或实验室缺乏检测设备和工具，无法完成检测。"});break;
            case 'd':DeviceEventEmitter.emit('confirmationE',{CONFIRMATIONE:"超出实验室能力和资质范围，无法完成检测。"});break;
          }

          //DeviceEventEmitter.emit('admissiBility',{ADMISSIBILITY:consignationpage_content1.admissiBility});
          switch (consignationpage_content1.admissiBility) {
            case 'a': DeviceEventEmitter.emit('admissiBility',{ADMISSIBILITY:"受理-进入项目立项和合同评审流程。"});;break;
            case 'b': DeviceEventEmitter.emit('admissiBility',{ADMISSIBILITY:"不受理"});;break;
            case 'c': DeviceEventEmitter.emit('admissiBility',{ADMISSIBILITY:"进一步联系"});;break;
          }
          DeviceEventEmitter.emit('testingNumber',{TESTING_NUMBER:consignationpage_content1.testingNumber});
          DeviceEventEmitter.emit('remarksE',{REMARKSE:consignationpage_content1.remarksE});
          //tabFour

          //ToastAndroid.showWithGravity(consignationpage_content1.softwareScale.funcNum, 1000, ToastAndroid.CENTER);
        }

      });//TODO: only get ID from 后端 and the second one cannot get ID
    this.props.navigation.navigate("ConsignPage");
  }

  /**
   * 委托列表渲染函数
   * @returns {*}
   * @func
   */
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
            <Input placeholder="输入委托ID查询"
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
                    {/*{data.id}*/}
                    {data.consignUnitC + '-' + data.softwareName}
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

export  default Consignation;
