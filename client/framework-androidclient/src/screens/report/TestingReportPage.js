import React, { Component } from "react";
import { View,DeviceEventEmitter } from "react-native";
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

import styles from "./styles";

export  default class TestingReportPage extends Component {
  constructor(props){
    super(props);
    this.state={
      consignUnitC:"",
      sampleName:"",
      sampleNumber:"",
      versionModel:"",
      receiveTime:"",
      testKind:"",
      testTime:"",
      testBasis:"",
      softwareDoc:"",
      testConclusion:"",
      masterMeasuringMan:"",
      Auditor:"",
      Approver:"",
      testUnitContactMode:"",
      consignUnittelephone:"",
      consignUnitFax:"",
      consignUnitaddress:"" ,
      consignUnitEmailnumber:"",
      consignUnitpeople:"",
      consignUnitEmail:"",
      testBasic:"",
      referenceContent:""

    };
  }

  componentDidMount(){
    this.listener_consignUnitC = DeviceEventEmitter.addListener('consignUnitC',(events)=>{
      this.setState({consignUnitC :events.CONSIGN_UNITC });
    });

    this.listener_sampleName = DeviceEventEmitter.addListener('sampleName',(events)=>{
      this.setState({sampleName :events.SAMPLE_NAME });
    });

    this.listener_sampleNumber = DeviceEventEmitter.addListener('sampleNumber',(events)=>{
      this.setState({sampleNumber :events.SAMPLE_NUMBER });
    });

    this.listener_versionModel = DeviceEventEmitter.addListener('versionModel',(events)=>{
      this.setState({versionModel :events.VERSION_MODEL });
    });

    this.listener_receiveTime = DeviceEventEmitter.addListener('receiveTime',(events)=>{
      this.setState({receiveTime :events.RECEIVE_TIME });
    });

    this.listener_testKind = DeviceEventEmitter.addListener('testKind',(events)=>{
      this.setState({testKind :events.TEST_KIND });
    });

    this.listener_testTime = DeviceEventEmitter.addListener('testTime',(events)=>{
      this.setState({testTime :events.TEST_TIME });
    });

    this.listener_testBasis = DeviceEventEmitter.addListener('testBasis',(events)=>{
      this.setState({testBasis :events.TEST_BASIS });
    });

    this.listener_softwareDoc = DeviceEventEmitter.addListener('softwareDoc',(events)=>{
      this.setState({softwareDoc :events.SOFT_WARE_DOC });
    });

    this.listener_testConclusion = DeviceEventEmitter.addListener('testConclusion',(events)=>{
      this.setState({testConclusion :events.TEST_CONCLUSION });
    });

    this.listener_masterMeasuringMan = DeviceEventEmitter.addListener('masterMeasuringMan',(events)=>{
      this.setState({masterMeasuringMan :events.MASTER_MEASURING_MAN });
    });

    this.listener_Auditor = DeviceEventEmitter.addListener('Auditor',(events)=>{
      this.setState({Auditor :events.AUDITOR });
    });

    this.listener_Approver = DeviceEventEmitter.addListener('Approver',(events)=>{
      this.setState({Approver :events.APPROVER });
    });

    this.listener_testUnitContractMode = DeviceEventEmitter.addListener('testUnitContractMode',(events)=>{
      this.setState({testUnitContractMode :events.TEST_UNIT_CONTACT_MODE });
    });

    this.listener_consignUnittelephone = DeviceEventEmitter.addListener('consignUnittelephone',(events)=>{
      this.setState({consignUnittelephone :events.CONSIGN_UNIT_TELEPHONE });
    });

    this.listener_consignUnitFax = DeviceEventEmitter.addListener('consignUnitFax',(events)=>{
      this.setState({consignUnitFax :events.CONSIGN_UNIT_FAX });
    });

    this.listener_consignUnitaddress = DeviceEventEmitter.addListener('consignUnitaddress',(events)=>{
      this.setState({consignUnitaddress :events.CONSIGN_UNIT_ADDRESS });
    });

    this.listener_consignUnitEmailnumber = DeviceEventEmitter.addListener('consignUnitEmailnumber',(events)=>{
      this.setState({consignUnitEmailnumber :events.CONSIGN_UNIT_EMAILNUMBER });
    });

    this.listener_consignUnitpeople = DeviceEventEmitter.addListener('consignUnitpeople',(events)=>{
      this.setState({consignUnitpeople :events.CONSIGN_UNIT_PEOPLE });
    });

    this.listener_consignUnitEmail = DeviceEventEmitter.addListener('consignUnitEmail',(events)=>{
      this.setState({consignUnitEmail :events.CONSIGN_UNIT_EMAIL });
    });

    this.listener_testBasic = DeviceEventEmitter.addListener('testBasic',(events)=>{
      this.setState({testBasic :events.TEST_BASIC });
    });

    this.listener_referenceContent = DeviceEventEmitter.addListener('referenceContent',(events)=>{
      this.setState({referenceContent :events.REFERENCE_CONTENT });
    });

  }

  componentWillUnmount(){
    this.listener_consignUnitC.remove();
    this.listener_sampleName.remove();
    this.listener_sampleNumber.remove();
    this.listener_versionModel.remove();
    this.listener_receiveTime.remove();
    this.listener_testKind.remove();
    this.listener_testTime.remove();
    this.listener_testBasis.remove();
    this.listener_softwareDoc.remove();
    this.listener_testConclusion.remove();
    this.listener_masterMeasuringMan.remove();
    this.listener_Auditor.remove();
    this.listener_Approver.remove();
    this.listener_testUnitContractMode.remove();
    this.listener_consignUnittelephone.remove();
    this.listener_consignUnitFax.remove();
    this.listener_consignUnitaddress.remove();
    this.listener_consignUnitEmailnumber.remove();
    this.listener_consignUnitpeople.remove();
    this.listener_consignUnitEmail.remove();
    this.listener_testBasic.remove();
    this.listener_referenceContent.remove();
  }

  render(){
    return(
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>测试报告详情</Title>
          </Body>
          <Right />
        </Header>

        <Tabs renderTabBar={() => <ScrollableTab />}>

          <Tab heading="基本信息">
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
                    项目编号：{this.state.sampleNumber}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    样品名称：{this.state.sampleName}
                  </Text>
                  </Body>
                </CardItem>
              </Card>


              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    版本/型号：{this.state.versionModel}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    来样日期：{this.state.receiveTime}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    测试类型：{this.state.testKind}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    测试时间：{this.state.testTime}
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
                    样品清单：
                  </Text>
                  </Body>
                </CardItem>
              </Card>


              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    软件文档：{this.state.softwareDoc}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    测试结论：{this.state.testConclusion}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    主测人：{this.state.masterMeasuringMan}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    审核人：{this.state.Auditor}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    批准人：{this.state.Approver}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    测试单位联系方式：{this.state.testUnitContactMode}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    电话：{this.state.consignUnittelephone}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    传真：{this.state.consignUnitFax}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    地址：{this.state.consignUnitaddress}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    邮编：{this.state.consignUnitEmailnumber}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    联系人：{this.state.consignUnitpeople}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    E-mail：{this.state.consignUnitEmail}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

            </Content>
          </Tab>

          <Tab heading="测试环境">
              {/*<TabTwo />*/}
              <Content padder style={{ marginTop: 0 }}>
                {/*<Text>{this.state.PageID}</Text>*/}
                <Text>
                  硬件环境
                </Text>

                <Text>
                  软件环境
                </Text>

              </Content>
          </Tab>

          <Tab heading="测试依据和参考资料">
            {/*<TabTwo />*/}
            <Content padder style={{ marginTop: 0 }}>
              {/*<Text>{this.state.PageID}</Text>*/}
              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    测试依据：{this.state.testBasic}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    参考资料：{this.state.referenceContent}
                  </Text>
                  </Body>
                </CardItem>
              </Card>

            </Content>
          </Tab>


          <Tab heading="测试环境">
            {/*<TabTwo />*/}
            <Content padder style={{ marginTop: 0 }}>
              {/*<Text>{this.state.PageID}</Text>*/}
              <Text>
                功能性测试
              </Text>

              <Text>
                效率测试
              </Text>

              <Text>
                可移植性测试
              </Text>

              <Text>
                易用性测试
              </Text>

              <Text>
                可靠性测试
              </Text>

              <Text>
                可维护测试
              </Text>
            </Content>
          </Tab>


        </Tabs>
      </Container>
    );
  }
}
