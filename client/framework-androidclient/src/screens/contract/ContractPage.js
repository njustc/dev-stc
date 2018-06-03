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
    company: "公司名称：",
    text: "江西贪玩游戏有限公司"
  },

];//TODO: get datas from 后端

export  default class ContractPage extends Component{

  render(){
    return(
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem>
                <Left>
                  <Text>
                    {data.company}
                  </Text>
                </Left>
                <Text>
                  {data.text}
                </Text>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }

}
