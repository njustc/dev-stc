import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, Button } from 'react-native';

export default class OrganizationTreeViewScreen extends Component {
    static navigationOptions = {
         title: '委托信息',
     };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        {title: '委托名称', data: ['贪玩蓝月']},
                        {title: '委托ID', data: ['001']},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                />
                <Button
                    title="通过"
                    onPress={() =>
                        navigate('Main')
                    }
                />
                <Button
                    title="否决"
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

