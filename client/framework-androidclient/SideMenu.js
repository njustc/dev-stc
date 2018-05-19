import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ViewPagerAndroid,
    ScrollView,
    Navigator,
    View,
    ListView,
    Dimensions,
    WebView,
    ToastAndroid,
    DrawerLayoutAndroid,

} from 'react-native';

import modules from './Modules';

const{width,height} = Dimensions.get('window')


export default class SideMenu extends Component{
    constructor(props){
        super(props);
    };

    render() {
        const { navigate } = this.props.navigation;

        var navigationView = (
            <View style={{flex: 1, backgroundColor:'#B0C4DE'}}>
                <TouchableOpacity>
                    <Text onPress={this.close} style={[styles.textStyle, styles.textSmall]}>Close</Text>

                    {modules.map(item=><Text onPress={() => navigate(item.path)} style={[styles.textStyle, styles.textSmall]}>{item.name}</Text>)}
                </TouchableOpacity>
            </View>
        );
        //生成动态侧边栏
        return (
            <DrawerLayoutAndroid
                ref={(drawer) => { this.drawer = drawer; }}
                drawerWidth={200}
                onDrawerClose={this.handleDrawerClose}
                onDrawerOpen={this.handleDrawerOpen}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() =>navigationView}>
                <View style={[styles.textContainer,styles.drawerStyle]}>
                    <Text style={[styles.textStyle, styles.textLarge]} /** 当一个组件需要使用多个style样式时，需要用[]将样式括起来 */ >Welcome</Text>
                    <Text style={[styles.textStyle, styles.textLarge]}>南大测试</Text>

                    <TouchableOpacity onPress={this.open}>
                        <Text style={[styles.textStyle, styles.textSmall]}>Start</Text>
                    </TouchableOpacity>

                </View>
            </DrawerLayoutAndroid>
        );
    }

    handleDrawerOpen=()=> {
        //使用ToastAndroid组件弹出一个原生的Toast
        ToastAndroid.show("open drawer", ToastAndroid.SHORT);
    }

    handleDrawerClose=()=>{
        ToastAndroid.show("close drawer", ToastAndroid.SHORT);
    }

    open=()=>{
        this.drawer.openDrawer();
    }

    close=()=>{
        this.drawer.closeDrawer();
    }
}

const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: '#6699FF'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textStyle: {
        margin: 10,
        color: 'white',
        textAlign: 'center'
    },
    textSmall: {
        fontSize: 15,
    },
    textLarge: {
        fontSize: 35,
    }
})
