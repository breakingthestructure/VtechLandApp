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
import icLogo from './../../../icons/logo_new.png';
import styles from './../../../styles';

// const { width, height } = Dimensions.get('window');

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
        return (
            <View style={styles.menu}>

                <View style={{ paddingTop: 20, flex: 1 }}>
                    <View>
                        <Image source={icLogo} style={styles.logoMenu} />
                    </View>

                    <View
                        style={styles.underLine}
                    />
                    <TouchableOpacity style={styles.btnMenu} onPress={this.gotoMapProject.bind(this)}>
                        <Image source={icSale} style={styles.iconMenu} />
                        <Text style={styles.textMenu}>Kho hàng bất động sản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('TablePackageScreen')}>
                        <Image source={icCart} style={styles.iconMenu} />
                        <Text style={styles.textMenu}>Bảng hàng online</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('TabProjectScreen')}>
                        <Image source={icTraning} style={styles.iconMenu} />
                        <Text style={styles.textMenu}>Huấn luyện và đào tạo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <Image source={icLogohpt} style={styles.iconMenu} />
                        <Text style={styles.textMenu}>Đặc quyền nghề tư vấn</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.btnMenu} onPress={this.onSignOut.bind(this)}>
                    <Image source={icShutdown} style={styles.iconMenu} />
                    <Text style={styles.textMenu}>Đăng xuất</Text>
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

