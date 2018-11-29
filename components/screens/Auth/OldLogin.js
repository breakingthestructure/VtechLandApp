import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ImageBackground
} from 'react-native';

import icLogo from './../../../icons/logo.png';
import backgroundImg from './../../../icons/background.jpg';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    postLogin() {
        const { email, password } = this.state;
        Alert.alert(
            'Thông báo',
            'Login success',
            [
                { text: 'OK', onPress: () => console.log(password) },
            ],
            { cancelable: false }
        );
    }
    render() {
        return (

            <ImageBackground source={backgroundImg} style={{ width: '100%', height: '100%' }}>
                <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
                <View style={{ position: 'relative', zIndex: 2, padding: 15, height: '100%' }}>
                    <View style={styles.sectionHeader}>
                        <View style={{ padding: 30, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.3)' }}>
                            <Image
                                source={icLogo}
                                style={{ width: 40, height: 40 }}
                            />
                        </View>
                        <View >
                            <Text style={{ color: '#fff', fontSize: 12 }}>HỆ THỐNG GIẢI PHÁP BẤT ĐỘNG SẢN</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>SỐ 1 VIỆT NAM</Text>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', bottom: 10, left: 0, margin: 'auto', right: 0, paddingHorizontal: 15 }}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Email'
                            underlineColorAndroid='transparent'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Mật khẩu'
                            underlineColorAndroid='transparent'
                            value={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                            secureTextEntry
                        />
                        <TouchableOpacity onPress={this.postLogin.bind(this)} style={styles.bigBtn}>
                            <Text style={styles.btnText}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>Bạn chưa có tài khoản? Đăng ký</Text>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        // flex: 1,
        backgroundColor: '#34B089',
        padding: 20,
        justifyContent: 'center',
    },
    sectionHeader: {
        // justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 25,
        paddingLeft: 30,
        paddingRight: 30,
        paddingVertical: 0,
        width: '100%'
    },
    bigBtn: {
        height: 50,
        borderRadius: 25,
        // borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      },
    btnText: {
        color: '#34B089',
        fontWeight: '400'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    }
});
