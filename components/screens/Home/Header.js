import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, StatusBar
} from 'react-native';
import { Icon } from 'native-base';
import icMenu from './../../../icons/menu.png';
import icBack from './../../../icons/back_white.png';
// import icSearch from './../../../icons/icon_search.png';
// import icLogo from './../../../icons/logo_hpt.png';
// import icAvatar from './../../../icons/profile.png';
import styles from './../../../styles';
import icAvatar from './../../../icons/customer.png';

export default class Header extends Component {
    openMenu() {
        this.props.navigation.openDrawer();
    }
    goBack() {
        if (this.props.back === 'AnimateView') {
            this.props.toggleAdvanceSearch(this.props.bounceValue, true);
        }
        if (this.props.back !== 'MapScreen') {
            this.props.navigation.navigate('MapScreen');
        } else {
            this.props.navigation.pop();
        }
    }
    openRightMenu() {
        this.props.navigation.toggleRightDrawer();
    }
    render() {
        const { headerSection, headerAction, iconHeaderStyle } = styles;
        const goBackJSX = (
            <TouchableOpacity onPress={this.goBack.bind(this)} style={{ width: 60, height: 45, justifyContent: 'center' }}>
                <Image source={icBack} style={iconHeaderStyle} />
            </TouchableOpacity>
        );
        const menuJSX = (
            <TouchableOpacity onPress={this.openMenu.bind(this)} style={{ width: 60, height: 45, justifyContent: 'center' }}>
                <Image source={icMenu} style={iconHeaderStyle} />
            </TouchableOpacity>
        );
        return (
            <View style={headerSection}>
                <StatusBar
                    backgroundColor="#F58319"
                    barStyle="light-content"
                />
                <View style={headerAction}>
                    {this.props.back ? goBackJSX : menuJSX}
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16, textAlign: 'center' }} note numberOfLines={1}>{this.props.title ? this.props.title : 'VtechHome'}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.openRightMenu.bind(this)}
                        style={{
                            width: 50,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Icon name='ios-contact' style={{ color: 'white', marginRight: 10 }} />
                        {/* <Image source={icAvatar} style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: 'white', marginRight: 10 }} /> */}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
