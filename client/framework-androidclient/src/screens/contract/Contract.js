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
import { httpGet } from "../../FetchUtil";
import { STATUS } from "../../common";


const datas = [
  {
    route: "ContractList",
    text: "测试合同书"
  },
  // {
  //   route:"ContractPage",
  //   text:"合同评审表"
  // },
];//TODO: 修改界面跳转 route

/**
 * 合同功能界面
 * @class
 */

class Contract extends Component {
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
          <Title>合同</Title>
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

export  default Contract;
