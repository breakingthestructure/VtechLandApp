import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Icon } from 'native-base';

import icAvatar from './../../../icons/customer.png';
import icProfile from './../../../icons/icon_profile.png';
import icHistory from './../../../icons/history.png';
import icList from './../../../icons/list.png';
import icShutdown from './../../../icons/shutdown.png';
import saveToken from './../../../api/saveToken';
import GLOBAL from './../../../Globals';
import bgLogin from './../../../icons/bg_login.png';
import styles from './../../../styles';
import saveUser from './../../../api/saveUser';

const { width, height } = Dimensions.get('window');

export default class SignOut extends Component {
    constructor(props) {
        super(props)
    }
    onSignOut() {
        Alert.alert(
            'Thông báo',
            'Bạn muốn đăng xuất khỏi hệ thống',
            [
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        GLOBAL.user = null;
                        saveToken('');
                        saveUser('');
                        this.onGoToSignIn();
                    }
                },
                { text: 'Hủy', onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false }
        );
    }
    onGoToSignIn() {
        this.props.navigation.navigate('LoginScreen');
    }
    render() {
        return (
            <View>
                <View style={styles.headerInfo}>
                    <Image source={icAvatar} style={styles.iconAvatar} />
                    <View style={styles.infoUser}>
                        <Text style={styles.textHeading}>{GLOBAL.user ? GLOBAL.user.fullname : 'Chưa đăng nhập '}</Text>
                        <Text style={{ fontSize: 12 }}>Chuyên viên tư vấn</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ paddingBottom: 20 }}>
                        <Text style={styles.textHeading}>Hồ sơ cá nhân</Text>
                    </View>
                    <View
                        style={styles.underLine}
                    />
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                        <Image source={icProfile} style={styles.iconMenu} />
                        {/* <Icon type="FontAwesome" name='user' style={{ fontSize: 20, color: 'orange' }} /> */}
                        <Text style={styles.textMenu}>Thông tin tài khoản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('ChangePasswordScreen')}>
                        <Icon name='ios-key' style={{ fontSize: 18, color: 'orange' }} />
                        <Text style={styles.textMenu}>Thay đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('NotificationScreen')}>
                        <Icon active name='ios-notifications-outline' style={{ fontSize: 20, color: 'orange' }} />
                        <Text style={styles.textMenu}>Thông báo của tôi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('MyTransactionScreen')}>
                        <Image source={icHistory} style={styles.iconMenu} />
                        {/* <Icon name='ios-list' style={{ fontSize: 20, color: 'orange' }} /> */}
                        <Text style={styles.textMenu}>Lịch sử giao dịch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('MyProjectScreen')}>
                        <Image source={icList} style={styles.iconMenu} />
                        {/* <Icon name='ios-albums' style={{ fontSize: 20, color: 'orange' }} /> */}
                        <Text style={styles.textMenu}>Dự án quan tâm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('MyCustomerScreen')}>
                        {/* <Image source={icHistory} style={styles.iconMenu} /> */}
                        <Icon type="FontAwesome" name='group' style={{ fontSize: 18, color: 'orange' }} />
                        <Text style={styles.textMenu}>Danh sách khách hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={this.onSignOut.bind(this)}>
                        {/* <Image source={icShutdown} style={styles.iconMenu} /> */}
                        <Icon type="FontAwesome" name='sign-out' style={{ fontSize: 20, color: 'red' }} />
                        <Text style={styles.textMenu}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

