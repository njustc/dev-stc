/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
    Navigator
}from 'react-native-deprecated-custom-components';

import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator
} from 'react-navigation';

import LoginScreen from './Login'
import ConsignationScreen from './consign/Consignation'
import ContractScreen from './contract/Contract'
import ReportScreen from './report/Report'
import SideMenuScreen from './SideMenu'

const App=StackNavigator({
    Login:{screen: LoginScreen},
    SideMenu: {screen: SideMenuScreen},
    Consignation:{screen: ConsignationScreen},
    Contract:{screen: ContractScreen},
    Report:{screen: ReportScreen},
});

export default App;
// export default class App extends React.Component{
//     renderScene=(route,navigator)=>{
//         return(
//             <route.scene
//             navigator={navigator}/>
//         );
//     }
//
//     initialRoute={
//         scene: LoginScreen,
//     }
//
//     render(){
//         return(
//             <Navigator
//             initialRoute={this.initialRoute}
//             renderScene={this.renderScene}
//             />
//         );
//     }
// }
