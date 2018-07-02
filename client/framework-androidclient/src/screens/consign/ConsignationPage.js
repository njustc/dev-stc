import React, { Component } from "react";
import { View,DeviceEventEmitter,StyleSheet } from "react-native";
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
  ScrollableTab
} from "native-base";
import { Table, TableWrapper, Row,Rows } from 'react-native-table-component';

//import styles from "./styles";


export  default class ConsignationPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,

            state1: false,
            state2: false,

            disable1: false,
            disable2: false,

          //tabone
          consignUnitC:"",
          consignUnitE:"",
          developUnit:"",
          unitProp:"",
          consignUnitTelephone:"",
          consignUnitFax:"",
          consignUnitAddress:"",
          consignUnitEmailNumber:"",
          consignUnitPeople:"",
          consignUnitCellPhoneNumber:"",
          consignUnitEmail:"",
          consignUnitUrl:"",

          //tabtwo
          softwareName:"",
          version:"",
          softwareType:"",
          funcNum:"",
          funcPoint:"",
          codeLine:"",
          objDesc:"",
          funcDesc:"",

          //tabthree
          client_os:"",
          client_memoryReq:"",
          client_hardDiskReq:"",
          hardware_arch:"",
          hardware_memoryReq:"",
          hardware_hardDiskReq:"",
          hardware_otherReq:"",
          software_os:"",
          software_version:"",
          software_language:"",
          software_arch:"",
          software_dateBase:"",
          software_midWare:"",
          software_otherSupp:"",
          netEnvironment:"",


          //tabfour
          testType:"",
          testBasis:"",
          testIndicator:"",
          cd:"",
          U:"",
          other:"",
          Documentation:"",
          toHandle:"",
          comTimeWish:"",
          securityLevel:"",
          killingVirus:"",
          requirementsDocument:"",
          userDocument:"",
          oprationDocument:"",
          elseA:"",
          confirmationE:"",
          admissiBility:"",
          testingNumber:"",
          remarksE:"",

          tableHead: ['模块编号', '模块名称', '功能简述'],
          tableData: [
            ['M1', '', ''],
            ['M2', '', ''],
            ['M3', '', ''],
          ],
          //以数组形式从后台读入
            PageID:""
        };
    }
    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,

            state1: true,
            state2: false
        });

        //TODO：在这里写通过后向后台传输状态改变
    }
    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,

            state1: false,
            state2: true
        });

      //TODO：在这里写否决后向后台传输状态改变
    }

    // componentWillMount(){
    //   this.listener=DeviceEventEmitter.addListener('id',(events)=>{
    //     this.setState({ PageID: events.ID});
    //   });
    // }
  componentDidMount() {
      //tabone
    this.listener_consignUnitC=DeviceEventEmitter.addListener('consignUnitC',(events)=>{
      this.setState({consignUnitC: events.CONSIGN_UNITC});

    });

    this.listener_consignUnitE=DeviceEventEmitter.addListener('consignUnitE',(events)=>{

      this.setState({consignUnitE: events.CONSIGN_UNITE});
    });

    this.listener_developUnit=DeviceEventEmitter.addListener('developUnit',(events)=>{

      this.setState({developUnit: events.DEVELOP_UNIT});
    });

    this.listener_unitProp = DeviceEventEmitter.addListener('unitProp',(events)=>
    {

      this.setState({unitProp : events.UNIT_PROP });
    });

    this.listener_consignUnitTelephone = DeviceEventEmitter.addListener('consignUnitTelephone',(events)=>
    {

      this.setState({consignUnitTelephone : events.CONSIGN_UNIT_TELEPHONE });
    });

    this.listener_consignUnitFax = DeviceEventEmitter.addListener('consignUnitFax',(events)=>
    {

      this.setState({consignUnitFax : events.CONSIGN_UNIT_FAX });
    });

    this.listener_consignUnitAddress = DeviceEventEmitter.addListener('consignUnitAddress',(events)=>
    {

      this.setState({consignUnitAddress : events.CONSIGN_UNIT_ADDRESS });
    });

    this.listener_consignUnitEmailNumber = DeviceEventEmitter.addListener('consignUnitEmailNumber',(events)=>
    {

      this.setState({consignUnitEmailNumber : events.CONSIGN_UNIT_EMAILNUMBER });
    });

    this.listener_consignUnitPeople = DeviceEventEmitter.addListener('consignUnitPeople',(events)=>
    {

      this.setState({consignUnitPeople : events.CONSIGN_UNIT_PEOPLE });
    });

    this.listener_consignUnitCellPhoneNumber = DeviceEventEmitter.addListener('consignUnitCellPhoneNumber',(events)=>
    {

      this.setState({consignUnitCellPhoneNumber : events.CONSIGN_UNIT_CELLPHONE_NUMBER });
    });

    this.listener_consignUnitEmail = DeviceEventEmitter.addListener('consignUnitEmail',(events)=>
    {

      this.setState({consignUnitEmail : events.CONSIGN_UNIT_EMAIL });
    });

    this.listener_consignUnitUrl = DeviceEventEmitter.addListener('consignUnitUrl',(events)=>
    {
      this.setState({consignUnitUrl : events.CONSIGN_UNIT_URL });
    });

    //tabtwo
    this.listener = DeviceEventEmitter.addListener('id',(events)=>{
      this.setState({ PageID: events.ID});
    });

    this.listener_softwareName = DeviceEventEmitter.addListener('softwareName',(events)=>{
      this.setState({softwareName: events.SOFTWARE_NAME});
      //console.warn("md");
    });

    this.listener_version = DeviceEventEmitter.addListener('version',(events)=>{
      this.setState({version:events.VERSION});
    });

    this.listener_softwareType = DeviceEventEmitter.addListener('softwareType',(events)=>{
      this.setState({softwareType:events.SOFTWARE_TYPE });
    });

    this.listener_funcNum = DeviceEventEmitter.addListener('funcNum',(events)=>{
      this.setState({funcNum : events.FUNC_NUM });
    });

    this.listener_funcPoint = DeviceEventEmitter.addListener('funcPoint',(events)=>{
      this.setState({funcPoint : events.FUNC_POINT });
    });

    this.listener_codeLine = DeviceEventEmitter.addListener('codeLine',(events)=>{
      this.setState({codeLine : events.CODE_LINE });
    });

    this.listener_objDesc = DeviceEventEmitter.addListener('objDesc',(events)=>{
      this.setState({objDesc : events.OBJ_DESC });
    });

    this.listener_funcDesc = DeviceEventEmitter.addListener('funcDesc',(events)=>{
      this.setState({funcDesc : events.FUNC_DESC });
    });

    //tabthree
    this.listener_client_os = DeviceEventEmitter.addListener('client_os',(events)=>{
      this.setState({client_os : events.CLIENT_OS });
    });

    this.listener_client_memoryReq = DeviceEventEmitter.addListener('client_memoryReq',(events)=>{
      this.setState({client_memoryReq : events.CLIENT_MEMORYREQ });
    });
    this.listener_client_hardDiskReq = DeviceEventEmitter.addListener('client_hardDiskReq',(events)=>{
      this.setState({client_hardDiskReq : events.CLIENT_HARDDISKREQ });
    });
    this.listener_hardware_arch = DeviceEventEmitter.addListener('hardware_arch',(events)=>{
      this.setState({hardware_arch : events.HARDWARE_ARCH });
    });
    this.listener_hardware_memoryReq = DeviceEventEmitter.addListener('hardware_memoryReq',(events)=>{
      this.setState({hardware_memoryReq : events.HARDWARE_MEMORYREQ });
    });
    this.listener_hardware_hardDiskReq = DeviceEventEmitter.addListener('hardware_hardDiskReq',(events)=>{
      this.setState({hardware_hardDiskReq : events.HARDWARE_HARDDISKREQ });
    });
    this.listener_hardware_otherReq = DeviceEventEmitter.addListener('hardware_otherReq',(events)=>{
      this.setState({hardware_otherReq : events.HARDWARE_OTHERREQ });
    });
    this.listener_software_os = DeviceEventEmitter.addListener('software_os',(events)=>{
      this.setState({software_os : events.SOFTWARE_OS });
    });
    this.listener_software_version = DeviceEventEmitter.addListener('software_version',(events)=>{
      this.setState({software_version : events.SOFTWARE_VERSION });
    });
    this.listener_software_language = DeviceEventEmitter.addListener('software_language',(events)=>{
      this.setState({software_language : events.SOFTWARE_LANGUAGE });
    });
    this.listener_software_arch = DeviceEventEmitter.addListener('software_arch',(events)=>{
      this.setState({software_arch : events.SOFTWARE_ARCH });
    });
    this.listener_software_dateBase = DeviceEventEmitter.addListener('software_dateBase',(events)=>{
      this.setState({software_dateBase : events.SOFTWARE_DATEBASE });
    });
    this.listener_software_midWare = DeviceEventEmitter.addListener('software_midWare',(events)=>{
      this.setState({software_midWare : events.SOFTWARE_MIDWARE });
    });
    this.listener_software_otherSupp = DeviceEventEmitter.addListener('software_otherSupp',(events)=>{
      this.setState({software_otherSupp : events.SOFTWARE_OTHERSUPP });
    });
    this.listener_netEnvironment = DeviceEventEmitter.addListener('netEnvironment',(events)=>{
      this.setState({netEnvironment : events.NETENVIRONMENT });
    });

    //tabfour
    this.listener_testType=DeviceEventEmitter.addListener('testType',(events)=> {
      this.setState({testType: events.TEST_TYPE});
    });
    this.listener_testBasis=DeviceEventEmitter.addListener('testBasis',(events)=>{
      this.setState({testBasis : events.TEST_BASIS });
    });
    this.listener_testIndicator=DeviceEventEmitter.addListener('testIndicator',(events)=>{
      this.setState({testIndicator : events.TEST_INDICATOR });
    });
    this.listener_cd=DeviceEventEmitter.addListener('cd',(events)=>{
      this.setState({cd : events.CD });
    });
    this.listener_U=DeviceEventEmitter.addListener('U',(events)=>{
      this.setState({U : events.U });
    });
    this.listener_other=DeviceEventEmitter.addListener('other',(events)=>{
      this.setState({other : events.OTHER });
    });
    this.listener_Documentation=DeviceEventEmitter.addListener('Documentation',(events)=>{
      this.setState({Documentation : events.DOCUMENTATION });
    });
    this.listener_toHandle=DeviceEventEmitter.addListener('toHandle',(events)=>{
      this.setState({toHandle : events.TOHANDLE });
    });
    this.listener_comTimeWish=DeviceEventEmitter.addListener('comTimeWish',(events)=>{
      this.setState({comTimeWish : events.COM_TIME_WISH });
    });
    this.listener_securityLevel=DeviceEventEmitter.addListener('securityLevel',(events)=>{
      this.setState({securityLevel : events.SECURITY_LEVEL });
    });
    this.listener_killingVirus=DeviceEventEmitter.addListener('killingVirus',(events)=>{
      this.setState({killingVirus : events.KILLING_VIRUS });
    });
    this.listener_requirementsDocument=DeviceEventEmitter.addListener('requirementsDocument',(events)=>{
      this.setState({requirementsDocument : events.REQUIREMENTS_DOCUMENT });
    });
    this.listener_userDocument=DeviceEventEmitter.addListener('userDocument',(events)=>{
      this.setState({userDocument : events.USER_DOCUMENT });
    });
    this.listener_operationDocument=DeviceEventEmitter.addListener('operationDocument',(events)=>{
      this.setState({operationDocument : events.OPERATION_DOCUMENT });
    });
    this.listener_elseA=DeviceEventEmitter.addListener('elseA',(events)=>{
      this.setState({elseA : events.ELSEA });
    });
    this.listener_confirmationE=DeviceEventEmitter.addListener('confirmationE',(events)=>{
      this.setState({confirmationE : events.CONFIRMATIONE });
    });
    this.listener_admissiBility=DeviceEventEmitter.addListener('admissiBility',(events)=>{
      this.setState({admissiBility : events.ADMISSIBILITY });
    });
    this.listener_testingNumber=DeviceEventEmitter.addListener('testingNumber',(events)=>{
      this.setState({testingNumber : events.TESTING_NUMBER });
    });
    this.listener_remarksE=DeviceEventEmitter.addListener('remarksE',(events)=>{
      this.setState({remarksE : events.REMARKSE });
    });



  }
//在组件销毁的时候要将其移除
  componentWillUnmount(){
    //this.listener.remove();

    //tabone
    this.listener_consignUnitC.remove();
    this.listener_consignUnitE.remove();
    this.listener_developUnit.remove();
    this.listener_unitProp.remove();
    this.listener_consignUnitTelephone.remove();
    this.listener_consignUnitFax.remove();
    this.listener_consignUnitAddress.remove();
    this.listener_consignUnitEmailNumber.remove();
    this.listener_consignUnitPeople.remove();
    this.listener_consignUnitPeople.remove();
    this.listener_consignUnitCellPhoneNumber.remove();
    this.listener_consignUnitEmail.remove();
    this.listener_consignUnitUrl.remove();

    //tabtwo
    this.listener.remove();
    this.listener_softwareName.remove();
    this.listener_version.remove();
    this.listener_softwareType.remove();
    this.listener_funcNum.remove();
    this.listener_funcPoint.remove();
    this.listener_codeLine.remove();
    this.listener_objDesc.remove();
    this.listener_funcDesc.remove();

    //tabthree
    this.listener_client_os.remove();
    this.listener_client_memoryReq.remove();
    this.listener_client_hardDiskReq.remove();
    this.listener_hardware_arch.remove();
    this.listener_hardware_memoryReq.remove();
    this.listener_hardware_hardDiskReq.remove();
    this.listener_hardware_otherReq.remove();
    this.listener_software_os.remove();
    this.listener_software_version.remove();
    this.listener_software_language.remove();
    this.listener_software_arch.remove();
    this.listener_software_dateBase.remove();
    this.listener_software_midWare.remove();
    this.listener_software_otherSupp.remove();
    this.listener_netEnvironment.remove();


    //tabfour
    this.listener_testType.remove();
    this.listener_testBasis.remove();
    this.listener_testIndicator.remove();
    this.listener_cd.remove();
    this.listener_U.remove();
    this.listener_other.remove();
    this.listener_Documentation.remove();
    this.listener_toHandle.remove();
    this.listener_comTimeWish.remove();
    this.listener_securityLevel.remove();
    this.listener_killingVirus.remove();
    this.listener_requirementsDocument.remove();
    this.listener_userDocument.remove();
    this.listener_operationDocument.remove();
    this.listener_elseA.remove();
    this.listener_confirmationE.remove();
    this.listener_admissiBility.remove();
    this.listener_testingNumber.remove();
    this.listener_remarksE.remove();

  }

    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>委托详情</Title>
                    </Body>
                    <Right />
                </Header>

                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="单位信息">
                        {/*<TabOne />*/}
                      <Content padder style={{ marginTop: 0 }}>
                        {/*<Text>{this.state.PageID}</Text>*/}
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              委托单位（中文）：{this.state.consignUnitC}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              委托单位（英文）：{this.state.consignUnitE}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              开发单位：{this.state.developUnit}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              单位性质：{this.state.unitProp}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>委托单位信息</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              电话：{this.state.consignUnitTelephone}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              传真：{this.state.consignUnitFax}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              地址：{this.state.consignUnitAddress}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              邮编：{this.state.consignUnitEmailNumber}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              联系人：{this.state.consignUnitPeople}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              手机：{this.state.consignUnitCellPhoneNumber}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              E-mail：{this.state.consignUnitEmail}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              网址：{this.state.consignUnitUrl}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>国家重点实验室联系方式</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              单位地址：南京市栖霞区仙林大道163号
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              邮政编码 ：210046
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              电话 ：86-25-89683467, 86-25-89683670
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              传真 ：86-25-89686596
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              网址 ：http://keysoftlab.nju.edu.cn
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              Email ：keysoftlab@nju.edu.cn
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                      </Content>
                    </Tab>
                    <Tab heading="软件基本信息">
                      {/*<TabTwo />*/}

                      <Content padder style={{ marginTop: 0 }}>
                        {/*<Text>{this.state.PageID}</Text>*/}
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              软件名称：{this.state.softwareName}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              版本号：{this.state.version}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              软件类型：{this.state.softwareType}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>软件规模</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              功能数：{this.state.funcNum}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              功能点数：{this.state.funcPoint}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              代码行数：{this.state.codeLine}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>软件用户对象描述</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              {this.state.objDesc}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>主要功能及用途简介</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              {this.state.funcDesc}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                      </Content>
                    </Tab>

                    <Tab heading="软件运行环境">
                        {/*<TabThree />*/}
                      <Content padder style={{ marginTop: 0 }}>
                        {/*<Text>{this.state.PageID}</Text>*/}
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>客户端</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              操作系统：{this.state.client_os}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              内存要求：{this.state.client_memoryReq}MB
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              硬盘要求：{this.state.client_hardDiskReq}MB
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>服务器端——硬件</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              构架：{this.state.hardware_arch}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              内存要求：{this.state.hardware_memoryReq}MB
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              硬盘要求：{this.state.hardware_hardDiskReq}MB
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              其他要求：{this.state.hardware_otherReq}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>服务器端——软件</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              操作系统：{this.state.software_os}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              版本：{this.state.software_version}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              编程语言：{this.state.software_language}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              构架：{this.state.software_arch}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              数据库：{this.state.software_dateBase}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              中间件：{this.state.software_midWare}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              其他支撑软件：{this.state.software_otherSupp}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>网络环境</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              {this.state.netEnvironment}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                      </Content>
                    </Tab>
                    <Tab heading="委托测试信息">
                        {/*<TabFour />*/}
                      <Content padder style={{ marginTop: 0 }}>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              测试类型：{this.state.testType}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              测试依据：{this.state.testBasis}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              需要测试的技术指标：{this.state.testIndicator}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>软件介质</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              光盘数量：{this.state.cd}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              U盘数量：{this.state.U}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              其他数量：{this.state.other}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              文档资料：{this.state.Documentation}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              样品处理：提交的样品（硬拷贝资料、硬件）五年保存期满{this.state.toHandle}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              希望测试完成的时间：{this.state.comTimeWish}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              密级：{this.state.securityLevel}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              查杀病毒：{this.state.killingVirus}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={styles.mb}>
                          <CardItem header bordered>
                            <Text>材料检查</Text>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              需求文档：{this.state.requirementsDocument}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              用户文档：{this.state.userDocument}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              操作文档：{this.state.oprationDocument}
                            </Text>
                            </Body>
                          </CardItem>
                          <CardItem bordered>
                            <Body>
                            <Text>
                              其他：{this.state.elseA}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              确认意见：{this.state.confirmationE}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              受理意见：{this.state.admissiBility}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              测试项目编号：{this.state.testingNumber}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Body>
                            <Text>
                              备注：{this.state.remarksE}
                            </Text>
                            </Body>
                          </CardItem>
                        </Card>
                      </Content>
                    </Tab>

                    <Tab heading="委托测试软件功能列表">
                      <Content padder style={{ marginTop: 0 }}>
                        <View style={styles.container}>
                          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={this.state.tableData} textStyle={styles.text}/>
                          </Table>
                        </View>
                      </Content>
                    </Tab>

                </Tabs>

                <Footer>
                    <FooterTab>
                        <Button disabled={this.state.disable1} active={this.state.tab1} onPress={() => this.toggleTab1()}>
                            <Icon active={this.state.tab1} name= "briefcase"/>
                            <Text>通过</Text>
                        </Button>
                        <Button  disabled={this.state.disable2} active={this.state.tab2} onPress={() => this.toggleTab2()}>
                            <Icon active={this.state.tab2} name="trash" />
                            <Text>否决</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
