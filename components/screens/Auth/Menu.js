import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Icon } from 'native-base';

import icAvatar from './../../../icons/customer.png';
import icProfile from './../../../icons/icon_profile.png';
import icHistory from './../../../icons/history.png';
import icList from './../../../icons/list.png';
import icCart from './../../../icons/cart.png';
import icTraning from './../../../icons/traning.png';
import icLogohpt from './../../../icons/logo_hpt.png';
import icShutdown from './../../../icons/shutdown.png';
import icSale from './../../../icons/sale.png';
import saveToken from './../../../api/saveToken';
import GLOBAL from './../../../Globals';

export default class Menu extends Component {
    // onSignOut() {
    //     Alert.alert(
    //         'Thông báo',
    //         'Bạn có chắc muốn xuất',
    //         [
    //             {
    //                 text: 'Muốn',
    //                 onPress: () => {
    //                     GLOBAL.user = null;
    //                     saveToken('');
    //                     this.props.navigation.navigate('LoginScreen');
    //                 }
    //             },
    //             { text: 'Đợi tí', onPress: () => console.log('Cancel Pressed') },
    //         ],
    //         { cancelable: false }
    //     );
    // }
    gotoMapProject() {
        this.props.navigation.navigate('MapScreen');
    }
    render() {
        // console.log(GLOBAL.user);
        return (
            <View style={styles.wrapper}>
                {/* <View style={styles.headerInfo}>
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
                <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('ConfigScreen')}>
                    <Image source={icProfile} style={styles.iconBtn} />
                    <Text style={styles.textBtn}>Thông tin tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('NotificationScreen')}>
                    <Icon active name='ios-notifications-outline' style={{ fontSize: 20, color: 'orange' }} />
                    <Text style={styles.textBtn}>Thông báo của tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction}>
                    <Image source={icHistory} style={styles.iconBtn} />
                    <Text style={styles.textBtn}>Lịch sử giao dịch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction}>
                    <Image source={icList} style={styles.iconBtn} />
                    <Text style={styles.textBtn}>Quản lý khách hàng ký gửi</Text>
                </TouchableOpacity> */}

                <View style={{ paddingTop: 20, flex: 1 }}>
                    <Text style={styles.textHeading}>V-TECHLAND</Text>

                    <View
                        style={styles.underLine}
                    />
                    <TouchableOpacity style={styles.btnAction} onPress={this.gotoMapProject.bind(this)}>
                        <Image source={icSale} style={styles.iconBtn} />
                        <Text style={styles.textBtn}>Kho hàng bất động sản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('TablePackageScreen')}>
                        <Image source={icCart} style={styles.iconBtn} />
                        <Text style={styles.textBtn}>Bảng hàng online</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('TabProjectScreen')}>
                        <Image source={icTraning} style={styles.iconBtn} />
                        <Text style={styles.textBtn}>Huấn luyện và đào tạo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <Image source={icLogohpt} style={styles.iconBtn} />
                        <Text style={styles.textBtn}>Đặc quyền nghề tư vấn</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.btnAction} onPress={this.onSignOut.bind(this)}>
                    <Image source={icShutdown} style={styles.iconBtn} />
                    <Text style={styles.textBtn}>Đăng xuất</Text>
                </TouchableOpacity> */}

                </View>
                <View style={{ paddingTop: 10, bottom: 0, flex: 1 }}>
                    <View
                        style={styles.underLine}
                    />
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>HỆ THỐNG PHÁT TRIỂN BỞI V-TECH</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: '#333' }}>Công ty cổ phần công nghệ bất động sản VTECH</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: '#333' }}>Địa chỉ: Tầng 2, Tổ hợp TMDV và Căn hộ The Pride, KĐT mới An Hưng, Phường La Khê, Quận Hà Đông, TP. Hà Nội</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: '#333' }}>Điện thoại: 0968 16 8800</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: '#333' }}>Email: info@realtech.vn</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: '#333' }}>Website: www.realtech.vn</Text>
                    </View>
                </View>

            </View>
        );
    }
}

const { width } = Dimensions.get('window');

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
