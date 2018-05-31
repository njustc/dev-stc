import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Navigator,
    Button, Dimensions
} from 'react-native';

let {width, height} = Dimensions.get('window');

export default class ReportView extends React.Component{
    static navigationOptions = {
        title: '查看测试报告（客户）',
    };

    render(){

        return(
            <Text>abc</Text>
        );

    }//render
}