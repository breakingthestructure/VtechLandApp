import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'native-base';

import bgLogin from './../../../icons/bg_login.png';
import styles from './../../../styles';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class SignIn extends Component {
    onGoToSignIn() {
        this.props.navigation.navigate('LoginScreen');
    }
    onGoToSignUp() {
        this.props.navigation.navigate('RegisterScreen');
    }
    render() {
        return (
            <View>
                <Image source={bgLogin} style={{ width: width / 2, height: ((width / 2) / 539) * 525, alignSelf: 'center', marginTop: 20 }} />
                <View style={styles.loginContainer}>
                    <Text style={{ fontSize: 18, textAlign: 'center', marginHorizontal: 20, fontWeight: '600' }}>Truy cập ngay tổng kho bất động sản hàng đầu Việt Nam & Đông Nam Á</Text>
                    <TouchableOpacity
                        style={styles.btnBtnIconSpecial}
                        onPress={this.onGoToSignIn.bind(this)}
                    >
                        <Icon type="FontAwesome" name='sign-in' style={styles.iconBigBtn} />
                        <Text style={styles.textBtnIcon}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bigBtnIcon}
                        onPress={this.onGoToSignUp.bind(this)}
                    >
                        <Icon type="FontAwesome" name='sign-in' style={styles.iconBigBtn} />
                        <Text style={styles.textBtnIcon}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, textAlign: 'center' }}>hoặc kết nối qua</Text>
                    <View style={styles.groupInline}>
                        <TouchableOpacity
                            style={styles.btnGrayInline}
                        >
                            <Icon type="FontAwesome" name='facebook' style={styles.iconBigBtnFacebook} />
                            <Text style={styles.textBtnIconFacebook}>Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnGrayInline}
                        >
                            <Icon type="FontAwesome" name='google-plus' style={styles.iconBigBtnGoogle} />
                            <Text style={styles.textBtnIconGoogle}>Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
