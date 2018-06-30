import React, { Component } from "react";
import { View,DeviceEventEmitter} from "react-native";
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
import styles from "./styles";


export default class TestRecordContentPage extends Component{
  constructor(props){
    super(props);
    this.state={
      data : [{
        id: 1,
        classification: 'SE',
        designNotes: '小猪佩奇社会人',
        statute: 'JS009',
        accordance: 'JS010',
        description: '小猪佩奇测试记录',
        process: '第一步……，第二步……，然后……，最后……。',
        expectedResult: '在期末考试周结束前完工',
        result: '大概是完工不了的TAT',
        consistency: '不一致',
        bugID: 250,
        time: '2018-06-09',
        prerequisites: '选择软件工程方向',
        executor: 'yj',
        confirmor: 'cc'
      }],
    }
  }

  render(){
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>测试记录详情</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{ marginTop: 0 }}>
          <Card style={styles.mb}>
            <CardItem header bordered>
              <Text>测试记录序号：{this.state.data[0].id}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                测试分类：{this.state.data[0].classification}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                预期结果：{this.state.data[0].expectedResult}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                实际结果：{this.state.data[0].result}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                是否与预期一致：{this.state.data[0].consistency}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                相关bug编号：{this.state.data[0].bugID}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                执行者：{this.state.data[0].executor}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                执行测试时间：{this.state.data[0].time}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                确认人：{this.state.data[0].confirmor}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                设计说明：{this.state.data[0].designNotes}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                有关的规约说明：{this.state.data[0].statute}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                依据：{this.state.data[0].accordance}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                前提条件：{this.state.data[0].prerequisites}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                测试执行过程：{this.state.data[0].process}
              </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
