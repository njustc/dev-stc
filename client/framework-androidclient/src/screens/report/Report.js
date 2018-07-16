import React, { Component } from "react";
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
  ListItem
} from "native-base";


import styles from "./styles";

const datas = [
  {
    route: "TestingReportList",
    text: "测试报告书"
  },
  {
    route:"TestingReportCheckTableList",
    text:"测试报告检查表"
  },
];//TODO: 修改界面跳转 route

/**
 * 报告所有功能
 * @class
 */
class Report extends Component {
  constructor(props){
    super(props);
  }


  extraUniqueKey(item,index){
    return index+item;
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>报告</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          {/*<Text>TODO: change to jump to a list first</Text>*/}
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}
                keyExtractor = {this.extraUniqueKey}//去除警告
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export  default Report;
