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