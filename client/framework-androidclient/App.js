/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
    StackNavigator
} from 'react-navigation';

import LoginScreen from './Login'
import CustomerScreen from './customer/Customer'
import ConsignationScreen from './customer/Consignation'
import ContractScreen from './customer/Contract'
import ReportScreen from './customer/Report'
import SideMenuScreen from './SideMenu'

const App=StackNavigator({
    Login:{screen: LoginScreen},
    SideMenu: {screen: SideMenuScreen},
    Customer:{screen: CustomerScreen},
    Consignation:{screen: ConsignationScreen},
    Contract:{screen: ContractScreen},
    Report:{screen: ReportScreen},
});

export default App;