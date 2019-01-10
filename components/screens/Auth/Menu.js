import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import icAvatar from './../../../icons/customer.png';
import icProfile from './../../../icons/icon_profile.png';
import icHistory from './../../../icons/history.png';
import icList from './../../../icons/list.png';
import icCart from './../../../icons/cart.png';
import icPartner from './../../../icons/partner.png';
import icTraning from './../../../icons/traning.png';
import icLogohpt from './../../../icons/logo_hpt.png';
import icShutdown from './../../../icons/shutdown.png';
import icSale from './../../../icons/sale.png';
import saveToken from './../../../api/saveToken';
import GLOBAL from './../../../Globals';
import icLogo from './../../../icons/logo_new.png';
import styles from './../../../styles';
import bocongthuong_noti from './../../../icons/bocongthuong_noti.png';
import bocongthuong_register from './../../../icons/bocongthuong_register.png';

const { width, height } = Dimensions.get('window');

export default class Menu extends Component {
    gotoScreen(screen) {
        this.props.navigation.navigate(screen);
        this.props.navigation.closeDrawer();
    }
    render() {
        return (
            <View style={styles.menu}>
                <ScrollView>
                    <View>
                        <View>
                            <Image source={icLogo} style={styles.logoMenu} />
                        </View>

                        <View style={{ paddingTop: 20 }}>
                            <Text style={styles.textHeading}>TIỆN ÍCH HỆ THỐNG</Text>
                        </View>
                        <View
                            style={styles.underLine}
                        />
                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'MapScreen')}>
                            <Image source={icSale} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Tổng kho bất động sản</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'AllBuildingScreen')}>
                            <Image source={icCart} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Bảng hàng online</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'HomeScreen')}>
                            <Image source={icTraning} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Huấn luyện - đào tạo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'CategoryPartnerScreen')}>
                            <Image source={icPartner} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Đối tác</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'HomeScreen')}>
                            <Image source={icLogohpt} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Đặc quyền hệ thống</Text>
                        </TouchableOpacity>

                        <View style={{ paddingTop: 20 }}>
                            <Text style={styles.textHeading}>THÔNG TIN ỨNG DỤNG</Text>
                        </View>
                        <View
                            style={styles.underLine}
                        />
                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'QuestionScreen')}>
                            <Image source={icHistory} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Câu hỏi thường gặp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'PrivacyScreen')}>
                            <Image source={icList} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Điều khoản dịch vụ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'PrivacyScreen')}>
                            <Image source={icHistory} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Chính sách hoạt động</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnMenu} onPress={this.gotoScreen.bind(this, 'PrivacyScreen')}>
                            <Image source={icHistory} style={styles.iconMenu} />
                            <Text style={styles.textMenu}>Bảo mật thanh toán</Text>
                        </TouchableOpacity>


                    </View>
                    <View style={{ paddingTop: 10, bottom: 0 }}>
                        <View
                            style={styles.underLine}
                        />
                        <View>
                            <Text style={{ fontSize: 12, color: '#053654' }}>Phát triển bởi VTECHHOME</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, color: '#F58319' }}>CÔNG TY CỔ PHẦN CÔNG NGHỆ BẤT ĐỘNG SẢN VTECHHOME</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, color: '#053654' }}>Địa chỉ: Tầng 2, Tổ hợp TMDV và Căn hộ The Pride, KĐT mới An Hưng, Phường La Khê, Quận Hà Đông, TP. Hà Nội</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, color: '#053654' }}>Điện thoại: 0968 16 8800</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, color: '#053654' }}>Email: info@vtechhome.com</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, color: '#053654' }}>Website: www.vtechhome.com</Text>
                        </View>
                    </View>
                    <View style={styles.groupBoCongThuong}>
                        <Image source={bocongthuong_noti} style={{ width: width / 3.5, height: ((width / 3.5) / 243) * 92 }} />
                        <Image source={bocongthuong_register} style={{ width: width / 3.5, height: ((width / 3.5) / 243) * 92 }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

