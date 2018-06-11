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
// import {getConsignList} from "./ConsignService";
import { ToastAndroid } from "react-native";

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
// import {ConsignListData} from "./Consignation"
// import { ToastAndroid } from "react-native";

const consignBase = baseServiceAddress + '/consign?username=admin&clientDigest=qqq';
// const consignActivitiBase = baseServiceAddress + '/processInstance';

let ConsignList;

export let CONSIGNATIONPAGE_CONTENT;

export const getConsignList = () => {
  httpGet(consignBase,(result) => {
    const {status, data} = result;
    if (status === STATUS.SUCCESS) {
      ConsignList = data;
      // let toastMsg2 = 'emmmm';
      // ToastAndroid.showWithGravity(toastMsg2, 1000, ToastAndroid.CENTER);
    }
    // callback && callback(status);
  });
};

const ConsignListData = [
  {
    route: "ConsignPage",
    text: ""
  },
  // {
  //   route:"ConsianPage",
  //   text:"Consign002"
  // },
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
          route:"ConsignPage",
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
        for (var i = 0; i < ConsignListData.length; i++) {
          if (ConsignListData[i].text==text) {
            this.setState({
              datas:[ConsignListData[i]],
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

  componentWillMount() {
    getConsignList(ConsignListData);
  }

  gotoConsignationPage = (id) => {
      httpGet(baseServiceAddress + '/consign/' + id + '?username=admin&clientDigest=qqq', (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
          const {consignation} = data;
          CONSIGNATIONPAGE_CONTENT = consignation;
        }

      });
    this.props.navigation.navigate("ConsignPage");
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
            //dataArray={this.state.datas}
            dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoConsignationPage(data.id)}
                keyExtractor = {this.extraUniqueKey}//去除警告
              >
                <Left>
                  <Text>
                    {data.id}
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

