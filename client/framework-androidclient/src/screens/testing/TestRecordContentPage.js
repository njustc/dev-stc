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


export default class TestRecordContentPage extends Component{
  constructor(props){
    super(props);
    this.state={
      datas : [{
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
      },
        {
          id: 2,
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
          <Title>测试记录详情</Title>
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
                    <Text style={{color:'#4169e1'}}>测试记录序号：{data.id}</Text>
                    <Text>测试分类：{data.classification}</Text>
                    <Text>执行过程：{data.process}</Text>
                    <Text>预期结果：{data.expectedResult}</Text>
                    <Text>实际结果：{data.result}</Text>
                    <Text>是否与预期一致：{data.consistency}</Text>
                    <Text>相关bug编号：{data.bugID}</Text>
                    <Text>执行者：{data.executor}</Text>
                    <Text>执行测试时间：{data.time}</Text>
                    <Text>确认人：{data.confirmor}</Text>
                    <Text>设计说明：{data.designNotes}</Text>
                    <Text>有关的规约说明：{data.statute}</Text>
                    <Text>依据：{data.accordance}</Text>
                    <Text>前提条件：{data.prerequisites}</Text>
                    <Text>测试执行过程：{data.process}</Text>
                    </Body>
                  </CardItem>

                }
          />
        </Content>
      </Container>
    )
  }
}
