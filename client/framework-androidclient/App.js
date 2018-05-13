/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    StackNavigator
} from 'react-navigation';


import MainScreen from './MainPage';
import OrganizationTreeViewScreen from './OrganizationTreeViewScreen'
import UserTreeViewScreen from './UserTreeViewScreen';
// const ProfileScreen = () => (
//     <View style={{flex: 1, flexDirection: 'row'}}>
//         <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
//         <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
//         <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
//     </View>
// );

const App = StackNavigator({
    Main: {screen: MainScreen},
    OrganizationTreeView: {screen: OrganizationTreeViewScreen},
    UserTreeView: {screen: UserTreeViewScreen},
});

export default App;
