// import React, {Component} from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View,
//     Navigator,
//     Button
// } from 'react-native';
//
// export default class UserTreeViewScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {text: ''};
//     }
//     static navigationOptions = {
//         title: '委托（客户）',
//     };
//     render() {
//         return (
//             <View style={{flex: 1, flexDirection: 'row'}}>
//                 <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
//                 <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
//                 <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
//             </View>
//         );
//     }
// }
import React, { Component } from 'react';
import { SectionList, StyleSheet, TextInput,Text, View, Button } from 'react-native';

export default class UserTreeViewScreen extends Component {
    static navigationOptions = {
        title: '委托信息',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40}}
                    placeholder="委托名称"
                    onChangeText={(text) => this.setState({text})}
                />
                <SectionList
                    sections={[
                        {title: '委托ID', data: ['001']},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                />
                <Button
                    title="提交"
                    onPress={() =>
                        navigate('Main')
                    }
                />
                <Button
                    title="保存"
                    onPress={() =>
                        navigate('Main')
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

