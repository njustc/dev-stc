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
  ScrollableTab,
  Textarea
} from "native-base";
import styles from "./styles";


export default class TestPlanContentPage extends Component{
  constructor(props){
    super(props);
    this.state={
      datas : [
        {
          id: 1,
          classification: 'yj',
          process: 'unhappy->happy',
          expectedResult: 'happy',
          designer: 'yj',
          time: '2018-06-03',
          action: 'delete',
          designNotes: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
          statute: 'sssssss',
          accordance: 'tttttt'
        },
        {
          id: 2,
          classification: '杨杰',
          process: 'unhappy->happy',
          expectedResult: 'happy',
          designer: 'yj',
          time: '2018-06-03',
          action: 'delete',
          designNotes: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
          statute: 'sssssss',
          accordance: 'tttttt'
        }
      ],
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
          <Title>测试用例详情</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{ marginTop: 0 }}>
          {/*<Text>TODO: change to a list</Text>*/}
          <Card style={styles.md}
                dataArray={this.state.datas}
                renderRow={data=>
                  <CardItem bordered>
                    <Body>
                    <Text style={{color:'#4169e1'}}>测试用例序号：{data.id}</Text>
                    <Text>测试分类：{data.classification}</Text>
                    <Text>执行过程：{data.process}</Text>
                    <Text>预期结果：{data.expectedResult}</Text>
                    <Text>设计者：{data.designer}</Text>
                    <Text>时间：{data.time}</Text>
                    <Text>设计说明：{data.designNotes}</Text>
                    <Text>有关的规约说明：{data.statute}</Text>
                    <Text>依据：{data.accordance}</Text>
                    </Body>
                  </CardItem>

                }
          />
        </Content>
      </Container>
    )
  }
}
