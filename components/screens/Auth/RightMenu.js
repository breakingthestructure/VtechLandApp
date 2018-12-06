import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Icon } from 'native-base';

import icAvatar from './../../../icons/customer.png';
import icProfile from './../../../icons/icon_profile.png';
import icHistory from './../../../icons/history.png';
import icList from './../../../icons/list.png';
import icShutdown from './../../../icons/shutdown.png';
import saveToken from './../../../api/saveToken';
import GLOBAL from './../../../Globals';

const { width, height } = Dimensions.get('window');

export default class RightMenu extends Component {
    onSignOut() {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn xuất',
            [
                {
                    text: 'Muốn',
                    onPress: () => {
                        GLOBAL.user = null;
                        saveToken('');
                        this.props.navigation.navigate('LoginScreen');
                    }
                },
                { text: 'Đợi tí', onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false }
        );
    }

    render() {
        // console.log(GLOBAL.user);
        return (
            <View style={styles.wrapper}>
                <View style={styles.headerInfo}>
                    <Image source={icAvatar} style={styles.iconAvatar} />
                    <View style={styles.infoUser}>
                        <Text style={styles.textHeading}>{GLOBAL.user ? GLOBAL.user.fullname : 'Chưa đăng nhập '}</Text>
                        <Text style={{ fontSize: 12 }}>Chuyên viên tư vấn</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Text style={styles.textHeading}>Hồ sơ cá nhân</Text>
                </View>
                <View
                    style={styles.underLine}
                />
                <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                    <Image source={icProfile} style={styles.iconBtn} />
                    {/* <Icon type="FontAwesome" name='user' style={{ fontSize: 20, color: 'orange' }} /> */}
                    <Text style={styles.textBtn}>Thông tin tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('NotificationScreen')}>
                    <Icon active name='ios-notifications-outline' style={{ fontSize: 20, color: 'orange' }} />
                    <Text style={styles.textBtn}>Thông báo của tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('MyTransactionScreen')}>
                    <Image source={icHistory} style={styles.iconBtn} />
                    {/* <Icon name='ios-list' style={{ fontSize: 20, color: 'orange' }} /> */}
                    <Text style={styles.textBtn}>Lịch sử giao dịch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('MyProjectScreen')}>
                    <Image source={icList} style={styles.iconBtn} />
                    {/* <Icon name='ios-albums' style={{ fontSize: 20, color: 'orange' }} /> */}
                    <Text style={styles.textBtn}>Dự án quan tâm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('MyCustomerScreen')}>
                    {/* <Image source={icHistory} style={styles.iconBtn} /> */}
                    <Icon type="FontAwesome" name='group' style={{ fontSize: 12, color: 'orange' }} />
                    <Text style={styles.textBtn}>Danh sách khách hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction} onPress={this.onSignOut.bind(this)}>
                    {/* <Image source={icShutdown} style={styles.iconBtn} /> */}
                    <Icon type="FontAwesome" name='sign-out' style={{ fontSize: 16, color: 'red' }} />
                    <Text style={styles.textBtn}>Đăng xuất</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        borderRightWidth: 3,
        borderColor: '#fff',
        paddingLeft: 20,
        paddingTop: 20
    },
    headerInfo: {
        flexDirection: 'row'
    },
    iconAvatar: {
        width: 50, height: 50
    },
    infoUser: {
        paddingLeft: 15, paddingTop: 10
    },
    textHeading: {
        fontSize: 16, fontWeight: '500'
    },
    underLine: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        width: '90%',
        paddingTop: 5,

    },
    btnAction: {
        paddingTop: 20,
        flexDirection: 'row',
        height: 45
    },
    iconBtn: {
        width: 15, height: 15, marginTop: 2
    },
    textBtn: {
        fontSize: 14, paddingLeft: 10
    }
});
