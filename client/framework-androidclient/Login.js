import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image,
    ToastAndroid,
    Navigator
} from 'react-native';


import SideMenuScreen from "./SideMenu";
// import  PropTypes from 'prop-types';
import {baseAddress,STATUS} from "./common";
// import {httpPost} from "./FetchUtil";


const loginBase = baseAddress + '/login';
let {width, height} = Dimensions.get('window');

const httpPost = (url, params, callback) => {
    return sysFetch('POST', url, params, callback);
};

export default class LoginView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    // static propTypes = {
    //     setLogin: PropTypes.func.isRequired,
    // };



    renderClick(){

        let userName = this.state.username;
        let password = this.state.password;
        let toastMsg = '登录成功';

        if(userName===null||userName===""){
            toastMsg = '用户名不能为空';
            ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
            return;
        }
        if(password===null||password===""){
            toastMsg = '密码不能为空';
            ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
            return;
        }

        //TODO: compare userName and password with 后台
        const data = {
            username: this.state.username,
            password: this.state.password,
        };

        //
        let result = {
            status: STATUS.FAILURE,
        };

        let fullUrl = loginBase;
        let formData = new FormData();
        formData.append('params', data ? JSON.stringify(data): '');

        let request = { method: "POST" };

        return fetch(fullUrl, request)
            .then((res) =>
            {
                if(res.ok)
                {
                    return res.json();
                }
                else
                {
                    return Promise.reject();
                }
            })
            .then(json => {
                if(json.status == "SUCCESS"){
                    result.status = STATUS.SUCCESS;
                    result.data = json.data;
                    result.message = json.message;
                    toastMsg = '登录成功';
                    ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
                    this.props.navigation.replace('SideMenu');
                }
                else{
                    toastMsg = '用户名或密码错误';
                    ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
                }
                callback(result);
            })
            // .catch(err => {
            //     callback(result);
            // })

        // if(userName=="wyy"&&password==123456){
        //     toastMsg = '登录成功';
        //     ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
        //     this.props.navigation.replace('SideMenu');
        //     //TODO: remember to change
        //
        // }
        // else{
        //     toastMsg = '用户名或密码错误';
        //     ToastAndroid.showWithGravity(toastMsg, 1000, ToastAndroid.CENTER);
        // }

    }//renderClick

    render(){

        return(
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('./img/njust.png')}
                />
                <TextInput placeholder='请输入用户名' clearButtonMode="always" underlineColorAndroid="transparent"
                           style={styles.inputStyle}
                           onChangeText={(username) => this.setState({username})}
                />

                <TextInput placeholder='请输入密码' clearButtonMode="always" secureTextEntry={true} password={true}
                           underlineColorAndroid="transparent" style={styles.inputStyle}
                           onChangeText={(password) => this.setState({password})}
                />

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.renderClick()}
                >
                    <View style={styles.loginBtnStyle}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>登录</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.loginQueStyle}>
                    <Text style={{color: '#73B5F9', marginLeft: 20, fontSize: 14, fontWeight: '400'}}>忘记密码</Text>
                    <Text style={{color: '#73B5F9', marginRight: 20, fontSize: 14, fontWeight: '400'}}>用户注册</Text>
                </View>

            </View>
        );/*TODO: may need to add functions here, both 忘记密码 and 用户注册*/
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
    inputStyle: {
        textAlign: 'center',
        width: width * 0.9,
        height: 40,
        marginTop: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        alignSelf: 'center',
        color: 'black',
        fontWeight: '600'
    },
    loginBtnStyle: {
        width: width * 0.9,
        height: 40,
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

