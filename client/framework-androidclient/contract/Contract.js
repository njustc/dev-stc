import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Navigator,
    TextInput,
    Button,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';

let {width, height} = Dimensions.get('window');

//TODO：get data from 后台
var NumberArr=[{id: '1', name: '贪玩蓝月'},
    {id: '2', name: '蓝月传奇'},
    {id: '3', name: '贪玩传世'},
    {id: '4', name: '贪玩雷霆'}];

export default class ContractView extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

            //NumberArr:[{name:'1',city:'beijing'},{name:'2',city:'上海'},{name:'3',city:'深圳'},{name:'4',city:'广州'},{name:'5',city:'杭州'},{name:'6',city:'苏州'},{name:'7',city:'沧州'},{name:'8',city:'邢台'},{name:'9',city:'邯郸'},{name:'10',city:'保定'},{name:'11',city:'石家庄'},{name:'12',city:'山东'},{name:'13',city:'潍坊'},{name:'14',city:'锦州'},{name:'15',city:'固州'},{name:'16',city:'西安'},{name:'17',city:'袁州'},{name:'18',city:'江西'},{name:'19',city:'承德'},{name:'20',city:'秦皇岛'},{name:'21',city:'唐山'},{name:'22',city:'廊坊'},{name:'23',city:'吕梁'},{name:'24',city:'衡水'},{name:'25',city:'山西'},{name:'26',city:'太原'},{name:'27',city:'朔州'},{name:'28',city:'大同'},{name:'29',city:'阳泉'},{name:'30',city:'长治'},{name:'31',city:'晋城'},{name:'32',city:'忻州'},{name:'33',city:'晋中'},{name:'34',city:'临汾'},{name:'35',city:'运城'},{name:'35',city:'包头'},{name:'37',city:'乌海'},{name:'38',city:'赤峰'},{name:'39',city:'沈阳'},{name:'40',city:'通辽'},{name:'41',city:'朝阳'},{name:'42',city:'阜新'},{name:'43',city:'抚顺'},{name:'44',city:'本溪'},{name:'45',city:'辽阳'},{name:'46',city:'鞍山'},{name:'47',city:'丹东'},{name:'48',city:'大连'},{name:'49',city:'营口'},{name:'50',city:'盘锦'},{name:'51',city:'白城'},{name:'52',city:'长春'},{name:'53',city:'吉林'},{name:'54',city:'四平'},{name:'55',city:'辽源'},{name:'56',city:'大庆'},{name:'57',city:'鹤岗'},{name:'58',city:'伊春'},{name:'59',city:'南京'},{name:'60',city:'鸡西'},{name:'61',city:'徐州'},{name:'62',city:'绥化'},{name:'63',city:'宿迁'},{name:'64',city:'淮安'},{name:'65',city:'扬州'},{name:'66',city:'泰州'},{name:'67',city:'南通'},{name:'68',city:'镇江'},{name:'69',city:'常州'},{name:'70',city:'无锡'}],
//TODO：get data from 后台
            NumberArr:[{id: '1', name: '贪玩蓝月'},
                {id: '2', name: '蓝月传奇'},
                {id: '3', name: '贪玩传世'},
                {id: '4', name: '贪玩雷霆'}],
        };
    }

    static navigationOptions = {
        title: '查看合同（客户）',
    };

    onChanegeTextKeyword(text){

        this.timeA(text);
    }
    //利用防抖方式防止数据过大造成卡顿现象
    timeA(text){

        if(this.time){
            clearTimeout(this.time)
        }

        this.time = setTimeout(()=>{
            if (text=='') {
                this.setState({
                    NumberArr:NumberArr,
                });
                return;
            }else{
                for (var i = 0; i < NumberArr.length; i++) {
                    if (NumberArr[i].name==text) {
                        this.setState({
                            NumberArr:[NumberArr[i]],
                        });
                        return;
                    }else{
                        this.setState({
                            NumberArr:[],
                        });
                    }
                }
            }
        },500);

    }//搜索函数

    cityClicked(item){
        alert(item.name);
    }
    //列表的每一行
    renderItemView({item,index}){
        return(
            <TouchableOpacity style={{flex:1,
                height:60,
                backgroundColor:'#6699FF',
            }}
                              onPress={()=>{this.cityClicked(item)}}
            >
                <View style={{
                    backgroundColor:'#6699FF',
                    height:59,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }//列表内容 style

    extraUniqueKey(item,index){
        return index+item;
    }

    render(){
        for (var i = 0; i < NumberArr.length; i++) {
            NumberArr[i]['key'] = i;
        }

        return(
            <View style={styles.container}>
                <TextInput style={{height:50,borderColor:'#6699FF',borderWidth:1,marginTop:0}}
                           underlineColorAndroid="transparent"
                           maxLength={20}
                           placeholder={'输入合同名查询'}
                           onChangeText={this.onChanegeTextKeyword.bind(this)}>

                </TextInput>
                <FlatList style={{backgroundColor:'#6699FF',flex:1}}
                          data = {this.state.NumberArr}
                          renderItem={this.renderItemView.bind(this)}
                          keyExtractor = {this.extraUniqueKey}//去除警告
                >

                </FlatList>
            </View>
        );

    }//render
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});