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
export  default class TestingReportCheckTablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softwareName:"",
      consignUnit:"",
      checker:"",
      date:"",
      reportNumber:"",
      pageNumber:"",
      softwareNameOrNot:"",
      versionModel:"",
      consignUnitOrNot:"",
      finishDate:"",
      consignUnitAddr:"",
      Number:"",
      testSample:"",
      softwareHardwareList:"",
      wrongWords:"",
      wrongSentences:"",
      wrongStyle:"",
      usersTestReport:""
    };
  }

  componentDidMount(){
    this.listener_softwareName = DeviceEventEmitter.addListener('softwareName',(events)=>{
      this.setState({softwareName : events.SOFTWARE_NAME });
    });

    this.listener_consignUnit = DeviceEventEmitter.addListener('consignUnit',(events)=>{
      this.setState({consignUnit : events.CONSIGN_UNIT });
    });

    this.listener_checker = DeviceEventEmitter.addListener('checker',(events)=>{
      this.setState({checker : events.CHECKER });
    });

    this.listener_date = DeviceEventEmitter.addListener('date',(events)=>{
      this.setState({date : events.DATE });
    });

    this.listener_reportNumber = DeviceEventEmitter.addListener('reportNumber',(events)=>{
      this.setState({reportNumber : events.REPORT_NUMBER });
    });

    this.listener_pageNumber = DeviceEventEmitter.addListener('pageNumber',(events)=>{
      this.setState({pageNumber : events.PAGE_NUMBER });
    });

    this.listener_softwareNameOrNot = DeviceEventEmitter.addListener('softwareNameOrNot',(events)=>{
      this.setState({softwareNameOrNot : events.SOFRWARE_NAMEORNOT });
    });

    this.listener_versionModel = DeviceEventEmitter.addListener('versionModel',(events)=>{
      this.setState({versionModel : events.VERSION_MODEL });
    });

    this.listener_consignUnitOrNot = DeviceEventEmitter.addListener('consignUnitOrNot',(events)=>{
      this.setState({consignUnitOrNot : events.CONSIGN_UNITORNOT });
    });

    this.listener_finishDate = DeviceEventEmitter.addListener('finishDate',(events)=>{
      this.setState({finishDate : events.FINISH_DATE });
    });

    this.listener_consignUnitAddr = DeviceEventEmitter.addListener('consignUnitAddr',(events)=>{
      this.setState({consignUnitAddr : events.CONSIGN_UNIT_ADDR });
    });

    this.listener_Number = DeviceEventEmitter.addListener('Number',(events)=>{
      this.setState({Number : events.NUMBER });
    });

    this.listener_testSample = DeviceEventEmitter.addListener('testSample',(events)=>{
      //console.warn(events.TEST_SAMPLE);
      this.setState({testSample : events.TEST_SAMPLE });
    });

    this.listener_softwareHardwareList = DeviceEventEmitter.addListener('softwareHardwareList',(events)=>{
      //console.warn(events.SOFRWARE_HARDWARE_LIST);
      this.setState({softwareHardwareList : events.SOFRWARE_HARDWARE_LIST });
    });

    this.listener_wrongWords = DeviceEventEmitter.addListener('wrongWords',(events)=>{
      this.setState({wrongWords : events.WRONG_WORDS });
    });

    this.listener_wrongSentences = DeviceEventEmitter.addListener('wrongSentences',(events)=>{
      this.setState({wrongSentences : events.WRONG_SENTENCES });
    });

    this.listener_wrongStyle = DeviceEventEmitter.addListener('wrongStyle',(events)=>{
      this.setState({wrongStyle : events.WRONG_STYLE });
    });

    this.listener_usersTestReport = DeviceEventEmitter.addListener('usersTestReport',(events)=>{
      this.setState({usersTestReport : events.USERSTESTREPORT });
    });


  }

  componentWillUnmount(){
    this.listener_softwareName.remove();
    this.listener_consignUnit.remove();
    this.listener_checker.remove();
    this.listener_date.remove();
    this.listener_reportNumber.remove();
    this.listener_pageNumber.remove();
    this.listener_softwareNameOrNot.remove();
    this.listener_versionModel.remove();
    this.listener_consignUnitOrNot.remove();
    this.listener_finishDate.remove();
    this.listener_consignUnitAddr.remove();
    this.listener_Number.remove();
    this.listener_testSample.remove();
    this.listener_softwareHardwareList.remove();
    this.listener_wrongWords.remove();
    this.listener_wrongSentences.remove();
    this.listener_wrongStyle.remove();
    this.listener_usersTestReport.remove();


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
        <Title>测试报告检查表详情</Title>
        </Body>
        <Right />
      </Header>

        <Tabs renderTabBar={() => <ScrollableTab />}>

          <Tab heading="基本信息">
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
              委托单位：{this.state.consignUnit}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              检查人：{this.state.checker}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              日期：{this.state.date}
            </Text>
            </Body>
          </CardItem>
        </Card>

          </Tab>

          <Tab heading="检查实现">
            <Content padder style={{ marginTop: 0 }}>
              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                    <Text>
                      1. 报告编号：检查报告编号的正确性（是否符合编码规则）与前后的一致性（报告首页与每页页眉):{this.state.reportNumber}
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                    <Text>
                      2. 页码：检查页码与总页数是否正确（报告首页与每页页眉）:{this.state.pageNumber}
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                    <Text>
                      3. 软件名称：是否和确认单一致，是否前后一致（共三处，包括首页、报告页、附件三）:{this.state.softwareNameOrNot}
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                    <Text>
                      4. 版本号：是否和确认单一致，是否前后一致（共二处，包括首页、报告页）:{this.state.versionModel}
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                    <Text>
                      5. 委托单位：是否和确认单一致，是否前后一致（共二处，包括首页、报告页）:{this.state.consignUnitOrNot}
                    </Text>
                  </Body>
                </CardItem>
              </Card>

              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                    <Text>
                      6. 完成日期：是否前后一致（共二处，包括首页、报告页页末）:{this.state.finishDate}
                    </Text>
                  </Body>
                </CardItem>
              </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              7. 委托单位地址：是否和确认单一致（共一处，报告页）:{this.state.consignUnitAddr}
            </Text>
            </Body>
          </CardItem>
        </Card>


        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              8. 序号：附件二、附件三中的序号是否正确、连续:{this.state.Number}
            </Text>
            </Body>
          </CardItem>
        </Card>


        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              9. 测试样品：样品名称是否正确，数量是否正确:{this.state.testSample}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              10. 软、硬件列表：列表是否完整（如打印机），用途描述是否合理正确:{this.state.softwareHardwareList}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              11. 文字、内容、格式:错别字：报告中是否还有错别字。{this.state.wrongWords}
            </Text>

            <Text>
              语句：报告的语句是否通顺合理；每个功能描述结束后是否都有句号。{this.state.wrongSentences}
            </Text>

            <Text>
              格式：报告的格式是否美观，字体是否一致，表格大小是否一致（如无特殊情况尽量不要将报告页中的表格分为2页）:{this.state.wrongStyle}
            </Text>

            </Body>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem>
            <Body>
            <Text>
              12 用户文档测试报告：语句是否通顺，是否准确描述用户的文档:{this.state.usersTestReport}
            </Text>
            </Body>
          </CardItem>
        </Card>
            </Content>
          </Tab>

        </Tabs>
      </Container>




    );
  }
}


