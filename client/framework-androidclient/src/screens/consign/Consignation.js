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
    route: "ConsignPage",
    text: "Consign001"
  },
  {
    route:"ConsianPage",
    text:"Consign002"
  },
];//TODO: get datas from 后端

export  default class Consignation extends Component {
  constructor(props){
    super(props);
    this.state= {
      datas:[
        {
          route: "ConsignPage",
          text: "Consign001"
        },
        {
          route:"ConsianPage",
          text:"Consign002"
        },


      ],
    };
  }

  onChanegeTextKeyword(text){
    this.timeA(text);
  }

  timeA(text){
    if(this.time){
      clearTimeout(this.time)
    }

    this.time = setTimeout(()=>{
      if (text=='') {
        this.setState({
          datas:datas,
        });
        return;
      }else{
        for (var i = 0; i < datas.length; i++) {
          if (datas[i].text==text) {
            this.setState({
              datas:[datas[i]],
            });
            return;
          }else{
            this.setState({
              datas:[],
            });
          }
        }
      }
    },500);

  }//搜索函数


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
          <Title>委托列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入委托名查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
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

