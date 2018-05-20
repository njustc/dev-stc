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

export default class ConsignationView extends React.Component{
    static navigationOptions = {
        title: '查看委托（客户）',
    };

    render(){

        return(
            <Text>abc</Text>
        );

    }//render
}