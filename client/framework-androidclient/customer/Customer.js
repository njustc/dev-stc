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

export default class CustomerView extends React.Component{
    static navigationOptions = {
        title: '当前用户：客户',
    };

    render(){
        const { navigate } = this.props.navigation;

        return(
            <TouchableOpacity
                activeOpacity={0.5}
            >
                <View style={styles.BtnStyle}>
                    <Text
                        style={{color: 'white', fontSize: 16, fontWeight: '500'}}
                        onPress={() => navigate('Consignation')}
                    >
                        查看委托
                    </Text>
                </View>

                <View style={styles.BtnStyle}>
                    <Text
                        style={{color: 'white', fontSize: 16, fontWeight: '500'}}
                        onPress={() => navigate('Contract')}
                    >
                        查看合同
                    </Text>
                </View>

                <View style={styles.BtnStyle}>
                    <Text
                        style={{color: 'white', fontSize: 16, fontWeight: '500'}}
                        onPress={() => navigate('Report')}
                    >
                        查看测试报告
                    </Text>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: width,
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',

    },
    headerStyle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 50,
        marginBottom: 20
    },
    BtnStyle: {
        width: width,
        height: 60,
        marginTop: 20,
        backgroundColor: '#73B5F9',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginQueStyle: {
        flexDirection: 'row',
        width: width,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loginWayStyle: {
        position: 'absolute',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        bottom: 10,
        left: 10

    },
    loginWayLogoStyle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 8
    }

});