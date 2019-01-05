import React, { Component } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import icMenu from './../../../icons/menu.png';
import icBack from './../../../icons/back_white.png';
import styles from './../../../styles';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class Header extends Component {
    openMenu() {
        this.props.navigation.openDrawer();
    }

    goBack() {
        console.log(this.props.back);
        if (this.props.back === 'hideAdvanceSearch') {
            return this.props.toggleAdvanceSearch(this.props.bounceValue, true);
        }
        if (this.props.back === 'popToTop') {
            return this.props.navigation.popToTop();
        }
        if (this.props.back === 'MapScreen') {
            return this.props.navigation.navigate('MapScreen');
        }
        return this.props.navigation.pop();
    }

    openRightMenu() {
        this.props.navigation.toggleRightDrawer();
    }

    render() {
        const { headerSection, headerAction, iconHeaderStyle } = styles;
        const goBackJSX = (
            <TouchableOpacity
                onPress={this.goBack.bind(this)}
                style={{ width: 60, height: 45, justifyContent: 'center' }}
            >
                <Image source={icBack} style={iconHeaderStyle} />
            </TouchableOpacity>
        );
        const menuJSX = (
            <TouchableOpacity
                onPress={this.openMenu.bind(this)}
                style={{ width: 60, height: 45, justifyContent: 'center' }}
            >
                <Image source={icMenu} style={iconHeaderStyle} />
            </TouchableOpacity>
        );
        return (
            <View>
                <MyStatusBar backgroundColor="#F58319" barStyle="light-content" />
                <View style={headerSection}>
                    {/*<StatusBar*/}
                    {/*backgroundColor="#F58319"*/}
                    {/*barStyle="light-content"*/}
                    {/*/>*/}
                    <View style={headerAction}>
                        {this.props.back ? goBackJSX : menuJSX}
                        <View style={{ justifyContent: 'center' }}>
                            <Text
                                style={{ color: 'white', fontWeight: '500', fontSize: 16, textAlign: 'center' }} note
                                numberOfLines={1}>{this.props.title ? this.props.title : 'VtechHome'}</Text>
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
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
