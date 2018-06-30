import React, { Component } from "react";
import { StyleSheet,View,DeviceEventEmitter } from "react-native";
import { Table, TableWrapper, Row,Rows } from 'react-native-table-component';
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
  ScrollableTab,
  Textarea
} from "native-base";


export default class TestPlanContentPage extends Component{
  constructor(props){
    super(props);
    this.state={
      softwareName:"",
      projectName:"",
      testPlanVer:"",
      establisher:"",
      reviewer:"",
      approver:"",
      doRecord:"",

      documentID:"",
      baseline:"",

      testMethods:"",
      testType:"",
      testLevel:"",
      testCategory:"",
      testObject:"",
      caseNum:"",

      costDay:"",

      tableHead: ['岗位', '人数', '职责'],
      tableData: [
        ['项目负责人', '1人', '负责项目整体组织、工作分配、测试人员管理、项目具体协调等工作。项目经理同时承担测试执行的部分分工作。'],
        ['测试工程师', '1人', '实施测试工作，同时担任配置管理员。'],
        ['项目督导', '1人', '监督指导测试小组工作，对项目进行中遇到的问题提供支持。'],
        ]
    }
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
          <Title>测试方案详情</Title>
          </Body>
          <Right />
        </Header>

        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="0.基本信息">
            <Content padder style={{ marginTop: 0 }}>
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
                    项目名称：{this.state.projectName}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    测试方案版本号：{this.state.testPlanVer}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    编制人：{this.state.establisher}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    审核人：{this.state.reviewer}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Body>
                  <Text>
                    批准人：{this.state.approver}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>文档修改记录</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    {this.state.doRecord}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Tab>

          <Tab heading="1.引言">
            <Content padder style={{ marginTop: 0 }}>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>1.1标识</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    文档标识：{this.state.documentID}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    软件名称：{this.state.softwareName}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>1.2系统概述</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>1.3文档概述</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    本文档作为“{this.state.projectName}”
                    测试的基本依据，供本实验室测试相关人员阅读。提供该文档有助于实现以下目标：{"\n"}
                    1. 确定现有项目的信息、应测试的软件构件及测试环境；{"\n"}
                    2. 确定了基本的测试方法；{"\n"}
                    3. 确定所需资源，并对测试的工作量进行估计；{"\n"}
                    4. 确定测试工作最终应达到的目的；{"\n"}
                    本文档按GB/T 8567-2006规范的要求编写，删减了不涉及的内容。
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>1.4基线</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    本文档的基线为：{this.state.baseline}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Tab>

          <Tab heading="2.引用文件">
            <Content padder style={{ marginTop: 0 }}>

            </Content>
          </Tab>

          <Tab heading="3.软件测试环境">
            <Content padder style={{ marginTop: 0 }}>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>3.1硬件</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    /*TODO 表格*/
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>3.2软件环境</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    本次测试中使用到的软件环境如下：{"\n"}
                    /*TODO 表格*/
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>3.3参与组织</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>

                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>3.4人员</Text>
                </CardItem>
                <CardItem >
                  <View style={styles.container}>
                    <Text>初步定为1名测试人员，1名项目督导，1名项目负责人。各类人员具体职责如下：</Text>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                      <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                      <Rows data={this.state.tableData} textStyle={styles.text}/>
                    </Table>
                  </View>
                </CardItem>
              </Card>
            </Content>
          </Tab>

          <Tab heading="4.计划">
            <Content padder style={{ marginTop: 0 }}>
              <Text>{"\n"}本章描述了计划测试的总范围并且描述了本测试计划适用的每个测试，包括对相关文档的审查。{"\n"}</Text>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>4.1总体设计</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    测试方法：{this.state.testMethods}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    测试类型：{this.state.testType}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>4.1.1测试级别</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    本测试的级别为{this.state.testLevel}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>4.1.2测试类别</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    本测试的级别为{this.state.testCategory}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>4.1.3 一般测试条件</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    测试应满足时序逻辑，测试使用的数据要符合实际情况，测试应当完全覆盖所有需求。
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>4.2 计划执行的测试</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    测试对象：{this.state.testObject}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    测试级别：{this.state.testLevel}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    测试类型：{this.state.testType}
                  </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    测试方法：{this.state.testMethods}
                  </Text>
                  </Body>
                </CardItem>
              </Card>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>4.3测试用例</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    本次测试共设计了{this.state.caseNum}个测试用例，覆盖了测试类别中指明的各个方面。具体用例见《测试用例》。
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Tab>

          <Tab heading="5.测试进度表">
            <Content padder style={{ marginTop: 0 }}>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>此项目主要分为：业务测试和文档审查两部分的工作。
                    两部分的工作可以并行完成。
                    测试方为完成本方案所述的测试所需时间大约为{this.state.costDay}个工作日，
                    如测试需求产生变更会导致测试时间的变化。
                    下表大致估计了本次测试各个阶段所需工作量及起止时间。
                  </Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                  <Text>
                    /*TODO 表格*/
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Tab>

          <Tab heading="6.需求的可追踪性">
            <Content padder style={{ marginTop: 0 }}>
              <Card style={styles.mb}>
                <CardItem header bordered>
                  <Text>
                    设计的测试用例的ID中包含其对应的相关规约说明中对应条目的名称，每个测试用例都是可追踪的。
                  </Text>
                </CardItem>
              </Card>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
