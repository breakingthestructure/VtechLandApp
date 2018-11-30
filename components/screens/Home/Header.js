import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, StatusBar
} from 'react-native';
import { Icon } from 'native-base';
import icMenu from './../../../icons/menu.png';
import icSearch from './../../../icons/icon_search.png';
import icLogo from './../../../icons/logo_hpt.png';
import icAvatar from './../../../icons/profile.png';

const { height } = Dimensions.get('window');

export default class Header extends Component {
    openMenu() {
        this.props.navigation.openDrawer();
    }
    render() {
        const { wrapper, headerAction, iconStyle } = styles;
        return (
            <View style={wrapper}>
                <StatusBar
                    backgroundColor="#F58319"
                    barStyle="light-content"
                />
                <View style={headerAction}>
                    <TouchableOpacity onPress={this.openMenu.bind(this)}>
                        <Image source={icMenu} style={iconStyle} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 16, marginTop: 5 }}>{this.props.title ? this.props.title : 'VtechHome'}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                        <Image source={icAvatar} style={{ width: 30, height: 30, marginTop: 5, borderRadius: 15, borderWidth: 1, borderColor: 'white' }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        height: height / 13,
        backgroundColor: '#F58319',
        padding: 10,
        justifyContent: 'space-around'
    },
    headerAction: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 },
    iconStyle: { width: 20, height: 20, marginTop: 5 }
});
