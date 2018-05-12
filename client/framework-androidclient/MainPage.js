import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Button
} from 'react-native';

export default class MainScreen extends React.Component {
    static navigationOptions = {
        title: '南大测试',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Button
                    title="委托（工作人员）"
                    onPress={() =>
                        navigate('OrganizationTreeView')
                    }
                />

                <Button
                    title="委托（客户）"
                    onPress={() =>
                        navigate('UserTreeView')
                    }
                />
            </View>
        );
    }
}
