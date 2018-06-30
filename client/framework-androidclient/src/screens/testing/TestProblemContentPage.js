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
        description: 'a bug in 小猪佩奇',
        process: 'unhappy->happy',
        requirementIndex: 25,
        initialConditions: '佩奇是一只猪',
        operationPath: '佩奇->乔治',
        relatedTestCase: 'yj',
        discoveryTime: '2018-06-06',
        executor: 'yj',
        confirmor: 'qqyx',
        advice: '给曹老板打call'
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
          <Title>测试问题详情</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{ marginTop: 0 }}>
          <Card style={styles.mb}>
            <CardItem header bordered>
              <Text>测试问题序号：{this.state.data[0].id}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                问题（缺陷）简要描述：{this.state.data[0].description}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                对应需求条目：{this.state.data[0].requirementIndex}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                关联用例：{this.state.data[0].relatedTestCase}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                发现时间：{this.state.data[0].discoveryTime}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                测试执行人：{this.state.data[0].executor}
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
                问题（缺陷）简要描述：{this.state.data[0].description}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                发现缺陷的初始条件：{this.state.data[0].initialConditions}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                发现缺陷用例及具体操作路径：{this.state.data[0].operationPath}
              </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>
                修改建议：{this.state.data[0].advice}
              </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
