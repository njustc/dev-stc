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

/**
 * TestProblemContentPage
 * 实现类
 */
class TestProblemContentPage extends Component{
    /**
     * constructor
     * 其中包含了初始值和定义
     * @param props
     */
  constructor(props){
    super(props);
    this.state={
      datas : [{
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
      },
        {
          id: 2,
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
        }
      ],
    }
  }

    /**
     * render
     * 移动端绘制测试问题详情页面
     * @func
     * @returns {*}
     */
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
          {/*<Text>TODO: change to a list</Text>*/}
          <Card style={styles.md}
                dataArray={this.state.datas}
                renderRow={data=>
                  <CardItem bordered>
                    <Body>
                    <Text style={{color:'#4169e1'}}>测试问题序号：{data.id}</Text>
                    <Text>问题（缺陷）简要描述：{data.description}</Text>
                    <Text>对应需求条目：{data.requirementIndex}</Text>
                    <Text>关联用例：{data.relatedTestCase}</Text>
                    <Text>发现时间：{data.discoveryTime}</Text>
                    <Text>测试执行人：{data.executor}</Text>
                    <Text>确认人：{data.confirmor}</Text>
                    <Text>问题（缺陷）简要描述：{data.description}</Text>
                    <Text>发现缺陷的初始条件：{data.initialConditions}</Text>
                    <Text>发现缺陷用例及具体操作路径：{data.operationPath}</Text>
                    <Text>修改建议：{data.advice}</Text>
                    </Body>
                  </CardItem>

                }
          />
        </Content>
      </Container>
    )
  }
}
export default TestProblemContentPage;
