import React, { Component } from "react";
import { View } from "react-native";
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
  Footer,
  FooterTab,
} from "native-base";
import styles from "./styles";
import {CONSIGNATIONPAGE_CONTENT} from "../../common";

const dataArray = [
    {
        title: "1.基本信息",
        content:
        CONSIGNATIONPAGE_CONTENT.SOFTWARE_NAME
        +"由"+CONSIGNATIONPAGE_CONTENT.REQUESTER
        +"（"+CONSIGNATIONPAGE_CONTENT.REQUESTER_ENGLISH
        +"）所委托，版本号为" +CONSIGNATIONPAGE_CONTENT.VERSION
        +"，交由隶属于"+CONSIGNATIONPAGE_CONTENT.NATURE_OF_UNIT+"的"
        +CONSIGNATIONPAGE_CONTENT.DEVELOPMENT_UNIT+"开发。\n"
        + "软件用户对象描述如下："+CONSIGNATIONPAGE_CONTENT.SOFTWARE_USER_OBJECT_DES+"\n"
        + "软件主要功能及用途简介如下："+CONSIGNATIONPAGE_CONTENT.MAIN_FUNCTION
    },
    {
        title: "2.测试要求",
        content:
        "该委托测试的类型为"+CONSIGNATIONPAGE_CONTENT.TEST_TYPE
        +"，测试依据"+CONSIGNATIONPAGE_CONTENT.TEST_BASIS
        +",需要测试的技术指标有"+CONSIGNATIONPAGE_CONTENT.TECH_INDICATOR
        +"。"
    },
    {
        title: "3.软件基本信息",
        content:
        "该软件的功能数为"+CONSIGNATIONPAGE_CONTENT.FUNCTION_QUANTITY
        +",功能点数为"+CONSIGNATIONPAGE_CONTENT.FUNCTION_POINTS
        +",代码行数为"+CONSIGNATIONPAGE_CONTENT.LINE_OF_CODE +"（不包括注释行、空行），"
        +"软件类型为"+CONSIGNATIONPAGE_CONTENT.SOFTWARE_TYPE
        +"。"
    },
    {
        title: "4.运行环境",
        content:
        "(1)客户端:\n操作系统要求："+CONSIGNATIONPAGE_CONTENT.OPERATING_SYS
        +"\n内存要求："+CONSIGNATIONPAGE_CONTENT.RAM
        +"\n硬盘要求："+CONSIGNATIONPAGE_CONTENT.HARD_DISK+"\n"
        + "(2)服务器端：\n硬件要求如下：\n"+"架构要求："+CONSIGNATIONPAGE_CONTENT.STRUCTURE+"\n"
        +"内存要求："+CONSIGNATIONPAGE_CONTENT.RAM2+"MB\n"
        +"硬盘要求："+CONSIGNATIONPAGE_CONTENT.HARD_DISK2+"MB\n"
        +"其他要求："+CONSIGNATIONPAGE_CONTENT.OTHERS+"\n"
        +"软件要求如下：\n操作系统要求："+CONSIGNATIONPAGE_CONTENT.OPERATING_SYS2+"\n"
        +"版本要求："+CONSIGNATIONPAGE_CONTENT.VERSION2+"\n"
        +"编程语言要求："+CONSIGNATIONPAGE_CONTENT.PROGRAMING_LANGUAGE+"\n"
        +"构架要求："+CONSIGNATIONPAGE_CONTENT.STRUCTURE2+"\n"
        +"数据库要求："+CONSIGNATIONPAGE_CONTENT.DATABASE+"\n"
        +"中间件要求："+CONSIGNATIONPAGE_CONTENT.MIDDLEWARE+"\n"
        +"其他支撑软件要求："+CONSIGNATIONPAGE_CONTENT.OTHER_SUPPORTING_SOFT+"\n"
        +"(3)网络环境要求如下："+CONSIGNATIONPAGE_CONTENT.WEB_ENVIRONMENT+"。"
    },
    {
        title: "5.样品和数量",
        content:
        "软件介质有："+CONSIGNATIONPAGE_CONTENT.SOFT_MEDIA+"；\n"
        +"文档资料包括："+CONSIGNATIONPAGE_CONTENT.DOCUMENTATION+"；\n"
        +"提交的样品（硬拷贝资料、硬件等）在五年保存期满后，将"+"。"
    },
    {
        title: "6.期望完成时间",
        content:
        "希望测试完成的时间为"+CONSIGNATIONPAGE_CONTENT.EXPECTED_FINISH_TIME+"。"
    },
    {
        title:"7.委托单位信息",
        content:
        "电话："+CONSIGNATIONPAGE_CONTENT.PHONE+"\n"
        +"传真："+CONSIGNATIONPAGE_CONTENT.FAX+"\n"
        +"地址："+CONSIGNATIONPAGE_CONTENT.ADDRESS+"\n"
        +"邮编："+CONSIGNATIONPAGE_CONTENT.ZIP_CODE+"\n"
        +"联系人："+CONSIGNATIONPAGE_CONTENT.CONTACTS+"\n"
        +"手机："+CONSIGNATIONPAGE_CONTENT.CELL_PHONE+"\n"
        +"E-mail："+CONSIGNATIONPAGE_CONTENT.E_MAIL+"\n"
        +"网址："+CONSIGNATIONPAGE_CONTENT.URL
    },
    {
        title:"8.国家重点实验室联系方式",
        content:
        "单位地址：南京市栖霞区仙林大道163号\n"
        +"邮政编码：210046\n"
        +"电话：86-25-89683467, 86-25-89683670\n"
        +"传真：86-25-89686596\n"
        +"网址： http://keysoftlab.nju.edu.cn \n" +
        "Email:  keysoftlab@nju.edu.cn\n"
    },
    {
        title:"9.委托审查结果",
        content:
        "经审查，确认意见为："+CONSIGNATIONPAGE_CONTENT.CONFIRMATION_OPINION+"\n"
        +"受理意见为："+CONSIGNATIONPAGE_CONTENT.ACCEPT_ADVICE
    },
];

export  default class ConsignationPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,

            state1: false,
            state2: false,

            disable1: false,
            disable2: false
        };
    }
    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,

            state1: true,
            state2: false
        });

        //TODO：在这里写通过后向后台传输状态改变
    }
    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,

            state1: false,
            state2: true
        });

      //TODO：在这里写否决后向后台传输状态改变
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>委托详情</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder style={{ backgroundColor: "white" }}>
                    <Accordion
                        dataArray={dataArray}
                        animation={true}
                        expanded={true}
                        headerStyle={{ backgroundColor: "#ddecf8" }}
                        contentStyle={{ backgroundColor: "#b7daf8" }}
                    />

                </Content>
                <Footer>
                    <FooterTab>
                        <Button disabled={this.state.disable1} active={this.state.tab1} onPress={() => this.toggleTab1()}>
                            <Icon active={this.state.tab1} name= "briefcase"/>
                            <Text>通过</Text>
                        </Button>
                        <Button  disabled={this.state.disable2} active={this.state.tab2} onPress={() => this.toggleTab2()}>
                            <Icon active={this.state.tab2} name="trash" style={{ color: "white" }}/>
                            <Text>否决</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }

}
