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

import { ToastAndroid,DeviceEventEmitter } from "react-native";

import ContractPage from './ContractPage'

import {baseAddress,baseServiceAddress,STATUS} from "../../common";
import {httpPost,httpGet,httpDelete,httpPut} from "../../FetchUtil";
import { getLocalclientDigest, getLocaluserName } from "../../login/Login";

//const contractBase = baseServiceAddress + '/contract?username=admin&clientDigest=qqq';

let AllContractList = [];//data from 后端

export const getContractList = () => {
  const contractBase = baseServiceAddress+'/contract?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
  httpGet(contractBase,(result)=>{
    const{status,data}=result;
    if(status===STATUS.SUCCESS){
      AllContractList=data;
    }
  });
};

export default class ContractList extends Component{
  constructor(props){
    super(props);
    this.state={
      datas:[
        {
          route:"ContractPage",
          text: ""
        }
      ],
      currentdatas:[
        {
          route: "ContractPage",
          text: ""
        }
      ],
    };
  }


  onChanegeTextKeyword(text){
    //console.warn("yyy");
    this.timeA(text);
  }

  timeA(text){
    if(this.time){
      clearTimeout(this.time)
    }

    this.time = setTimeout(()=>{
      //console.warn(text);
      //this.setState({currentdatas:ConsignList});
      //console.warn(this.state.currentdatas);

      if (text=='') {
        this.setState({
          datas:AllContractList,
        });//所有的

        this.setState({currentdatas:AllContractList});
        //console.warn(this.state.datas);
        return;
      }else{
        this.setState({currentdatas:AllContractList});
        //console.warn(this.state.currentdatas);
        //console.warn(this.state.currentdatas.length);
        //console.warn(this.state.currentdatas[1].id);
        for (var i = 0; i < this.state.currentdatas.length; i++)
        {
          // console.warn("now"+this.state.currentdatas[i].id);
          if (this.state.currentdatas[i].projectName==text) {
            this.setState({
              datas:[this.state.currentdatas[i]],
            });
            return;
          }
          else{
            this.setState({
              datas:[],
            });
            //console.warn(this.state.datas);
          }
        }
      }
    },500);

  }//搜索函数


  extraUniqueKey(item,index){
    return index+item;
  }

  getContractList = () => {
    const contractBase = baseServiceAddress+'/contract?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest();
    httpGet(contractBase,(result)=>{
      const{status,data}=result;
      if(status===STATUS.SUCCESS){
        AllContractList=data.map(item=>{
          const body =JSON.parse(item.contractBody);
          return {...item, ...body};
        });

        //console.warn(AllContractList);
        this.setState({datas: AllContractList});
      }
    });
  };

  componentWillMount() {
    this.getContractList();

    //this.state.datas=ConsignList;
  }

  gotoContractPage = (id) =>{
    httpGet(baseServiceAddress+'/contract/'+id+'?username='+getLocaluserName()+'&clientDigest='+getLocalclientDigest(),(result)=>{
      const {status,data}=result;

      if(status===STATUS.SUCCESS){
        let contractpage_content=JSON.parse(data.contractBody);
        //console.warn(contractpage_content);
        //DeviceEventEmitter.emit('consignUnitC',{CONSIGN_UNITC: consignationpage_content1.consignUnitC});
        DeviceEventEmitter.emit('projectName', {PROJECTNAME : contractpage_content.projectName });
        DeviceEventEmitter.emit('consignA', {CONSIGNA : contractpage_content.consignA });
        DeviceEventEmitter.emit('consignB', {CONSIGNB : contractpage_content.consignB });
        DeviceEventEmitter.emit('consignPlace', {CONSIGNPLACE : contractpage_content.consignPlace });
        DeviceEventEmitter.emit('consignDate', {CONSIGNDATE : contractpage_content.consignDate });
        DeviceEventEmitter.emit('ProjectName', {PROJECTNAME_2 : contractpage_content.ProjectName });
        DeviceEventEmitter.emit('qualityChar', {QUALITYCHAR : contractpage_content.qualityChar });
        DeviceEventEmitter.emit('testFee', {TESTFEE : contractpage_content.testFee });

        //let contractpage_consignA=JSON.parse(contractpage_content.ConsignA);
        //console.warn(contractpage_content.ConsignA.unitName);
        //DeviceEventEmitter.emit('ConsignA',{CONSIGNA_2:contractpage_content.ConsignA});
        DeviceEventEmitter.emit('consignA_unitName', {CONSIGNA_UNITNAME : contractpage_content.ConsignA.unitName });
        DeviceEventEmitter.emit('consignA_authRepresent', {CONSIGNA_AUTHREPRESENT : contractpage_content.ConsignA.authRepresent });
        DeviceEventEmitter.emit('consignA_signData', {CONSIGNA_SIGNDATA : contractpage_content.ConsignA.signData });
        DeviceEventEmitter.emit('consignA_contact', {CONSIGNA_CONTACT : contractpage_content.ConsignA.contact });
        DeviceEventEmitter.emit('consignA_poAddress', {CONSIGNA_POADDRESS : contractpage_content.ConsignA.poAddress });
        DeviceEventEmitter.emit('consignA_phone', {CONSIGNA_PHONE : contractpage_content.ConsignA.phone });
        DeviceEventEmitter.emit('consignA_fax', {CONSIGNA_FAX : contractpage_content.ConsignA.fax });
        DeviceEventEmitter.emit('consignA_accountBank', {CONSIGNA_ACCOUNTBANK : contractpage_content.ConsignA.accountBank });
        DeviceEventEmitter.emit('consignA_accountNum', {CONSIGNA_ACCOUNTNUM : contractpage_content.ConsignA.accountNum });
        DeviceEventEmitter.emit('consignA_postCode', {CONSIGNA_POSTCODE : contractpage_content.ConsignA.postCode });


        DeviceEventEmitter.emit('consignB_unitName', {CONSIGNB_UNITNAME : contractpage_content.ConsignB.unitName });
        DeviceEventEmitter.emit('consignB_authRepresent', {CONSIGNB_AUTHREPRESENT : contractpage_content.ConsignB.authRepresent });
        DeviceEventEmitter.emit('consignB_signData', {CONSIGNB_SIGNDATA : contractpage_content.ConsignB.signData });
        DeviceEventEmitter.emit('consignB_contact', {CONSIGNB_CONTACT : contractpage_content.ConsignB.contact });
        DeviceEventEmitter.emit('consignB_poAddress', {CONSIGNB_POADDRESS : contractpage_content.ConsignB.poAddress });
        DeviceEventEmitter.emit('consignB_phone', {CONSIGNB_PHONE : contractpage_content.ConsignB.phone });
        DeviceEventEmitter.emit('consignB_fax', {CONSIGNB_FAX : contractpage_content.ConsignB.fax });
        DeviceEventEmitter.emit('consignB_accountBank', {CONSIGNB_ACCOUNTBANK : contractpage_content.ConsignB.accountBank });
        DeviceEventEmitter.emit('consignB_accountNum', {CONSIGNB_ACCOUNTNUM : contractpage_content.ConsignB.accountNum });
        DeviceEventEmitter.emit('consignB_postCode', {CONSIGNB_POSTCODE : contractpage_content.ConsignB.postCode });



      }
    });
    this.props.navigation.navigate("ContractPage");
  }

  render(){
    return(
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>测试合同书列表</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Item>
            <Icon active name="search" />
            <Input placeholder="输入测试合同书ID查询"
                   onChangeText={this.onChanegeTextKeyword.bind(this)} />
          </Item>

          <List
            dataArray={this.state.datas}
            //dataArray={ConsignList}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.gotoContractPage(data.id)}
                keyExtractor = {this.extraUniqueKey}//去除警告
              >
                <Left>
                  <Text>
                    {data.projectName+'('+ data.consignDate+')'}
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
