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

export default class ContractView extends React.Component{
    static navigationOptions = {
        title: '查看合同（客户）',
    };

    render(){

        return(
            <Text>abc</Text>
        );

    }//render
}