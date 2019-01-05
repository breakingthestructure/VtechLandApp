import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Content,
    Item,
    Input,
    Icon,
    Toast
} from 'native-base';
import KeyboardManager from 'react-native-keyboard-manager';
import login from './../../../api/login';
import saveToken from './../../../api/saveToken';
import saveUser from './../../../api/saveUser';
import GLOBAL from './../../../Globals';
import getProfile from './../../../api/getProfile';
import bgImg from './../../../icons/bg.png';
import icDevelop from './../../../icons/develop.png';
import icLogo from './../../../icons/logo_new.png';
import icPartner from './../../../icons/partner.png';
import icSale from './../../../icons/sale.png';
import icInvestor from './../../../icons/investor.png';
import icCustomer from './../../../icons/customer.png';
import { loading } from '../../../Helpers';

const { width } = Dimensions.get('window');
KeyboardManager.setEnable(false);
KeyboardManager.setEnableDebugging(false);
KeyboardManager.setKeyboardDistanceFromTextField(10);
KeyboardManager.setPreventShowingBottomBlankSpace(true);
KeyboardManager.setEnableAutoToolbar(true);
KeyboardManager.setToolbarDoneBarButtonItemText("Done");
KeyboardManager.setToolbarManageBehaviour(0);
KeyboardManager.setToolbarPreviousNextButtonEnable(false);
KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
KeyboardManager.setShouldShowTextFieldPlaceholder(true); // deprecated, use setShouldShowToolbarPlaceholder
KeyboardManager.setShouldShowToolbarPlaceholder(true);
KeyboardManager.setOverrideKeyboardAppearance(false);
KeyboardManager.setShouldResignOnTouchOutside(true);
KeyboardManager.resignFirstResponder();
KeyboardManager.isKeyboardShowing()
    .then((isShowing) => {
        // ...
    });

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            txtSubmit: 'ĐĂNG NHẬP'
        };
    }

    componentDidMount() {
        KeyboardManager.resignFirstResponder();
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }

    postLogin() {
        this.setState({ txtSubmit: 'Đang xử lý' });
        const { email, password } = this.state;
        login(email, password)
            .then(resJson => {
                if (resJson.access_token) {
                    saveToken(resJson.access_token);
                    Toast.show({
                        text: 'Đăng nhập thành công',
                        type: 'success',
                        buttonText: 'Okay'
                    });
                    return getProfile(resJson.access_token)
                        .then(response => {
                            saveUser(response.data)
                                .then(res => console.log(res))
                                .catch(err => console.log(err));
                            GLOBAL.user = response.data;
                            return this.props.navigation.navigate('MapScreen');
                        })
                        .catch(err => console.log(err));
                }
                this.setState({ txtSubmit: 'ĐĂNG NHẬP' });
                return Toast.show({
                    text: 'Đăng nhập thất bại',
                    type: 'danger',
                    buttonText: 'Okay'
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.loaded) {
            return (
                <View style={styles.wrapper}>
                    <View style={{ alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ paddingTop: 20 }}>
                            <Image
                                source={icLogo}
                                style={{ width: width / 2, height: ((width / 2) / 492) * 79 }}
                            />
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#cccccc',
                                borderBottomWidth: 1,
                                width: width / 1.5,
                                paddingTop: 20
                            }}
                        />
                        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>TRUY CẬP NHANH</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingHorizontal: 30,
                                width: '100%',
                                justifyContent: 'center'
                            }}
                        >
                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icDevelop} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center', padding: 2 }}>
                                    <Text style={styles.btnTextAction}>ĐƠN VỊ PHÁT TRIỂN</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icPartner} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>ĐỐI TÁC HỢP TÁC</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icCustomer} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text
                                        style={styles.btnTextAction}
                                    >KHÁCH HÀNG BẤT ĐỘNG SẢN
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icSale} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>CHUYÊN VIÊN TƯ VẤN</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnAction}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icInvestor} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>NHÀ ĐẦU TƯ</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                            <Text
                                style={{ fontSize: 18, fontWeight: '600', color: '#333333' }}
                            >
                                ĐĂNG NHẬP NGAY
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingHorizontal: 30
                            }}
                        >
                            <Content>
                                <Item
                                    style={{
                                        borderColor: '#33563743',
                                        borderWidth: 1,
                                        height: 40,
                                        borderRadius: 20,
                                        marginLeft: 0,
                                        width: '100%',
                                        // borderTopLeftRadius: 20,
                                        // borderTopRightRadius: 20,
                                    }}
                                    regular
                                >
                                    <Input
                                        style={{ fontSize: 12, paddingLeft: 30 }}
                                        placeholder='E-mail'
                                        placeholderTextColor='#999999'
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({ email: text })}
                                        value={this.state.email}
                                        onLayout={() => {
                                            KeyboardManager.reloadLayoutIfNeeded();
                                        }}
                                    />
                                    <Icon
                                        active
                                        name='ios-mail'
                                        style={{ color: 'gray', marginRight: 15 }}
                                    />
                                </Item>
                            </Content>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingHorizontal: 30,
                                paddingTop: 10
                            }}
                        >
                            <Content>
                                <Item
                                    style={{
                                        borderColor: '#33563743',
                                        height: 40,
                                        marginLeft: 0,
                                        width: '100%',
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        borderBottomWidth: 1,
                                        borderTopWidth: 1
                                    }}
                                    regular
                                >
                                    <Input
                                        style={{ fontSize: 12, paddingLeft: 30 }}
                                        placeholder='Mật khẩu'
                                        placeholderTextColor='#999999'
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => this.setState({ password: text })}
                                        value={this.state.password}
                                        secureTextEntry
                                    />
                                    <Icon
                                        active
                                        name='ios-lock'
                                        style={{ color: 'gray', marginRight: 15 }}
                                    />
                                </Item>
                            </Content>
                        </View>
                        <TouchableOpacity
                            style={{
                                height: 40,
                                width: '85%',
                                borderRadius: 20,
                                backgroundColor: '#F58319',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginVertical: 20,
                            }}
                            onPress={this.postLogin.bind(this)}
                        >
                            <Icon
                                type="FontAwesome"
                                name='sign-in'
                                style={{
                                    fontSize: 14,
                                    color: 'white',
                                    marginTop: 13,
                                    marginRight: 5
                                }}
                            />
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: 14,
                                    textAlign: 'center',
                                    marginTop: 10
                                }}
                            >
                                {this.state.txtSubmit}
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: '100%', paddingHorizontal: 30 }}>
                            <View style={styles.labelAction}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('RegisterScreen')}
                                >
                                    <Text style={{ color: '#000', fontSize: 12 }}>ĐĂNG KÝ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
                                >
                                    <Text
                                        style={{ color: '#000', fontSize: 12 }}
                                    >
                                        QUÊN MẬT KHẨU ?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <Image source={bgImg} style={{ width, height: (width / 1440) * 550 }} />
                    </View>
                </View>

            );
        }
        return loading();
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff'
    },
    btnAction: {
        width: '18%',
        height: 70,
        borderColor: '#33563743',
        borderWidth: 1,
        alignItems: 'center',
        margin: 2,
        borderRadius: 5
    },
    inputStyle: {
        height: 50,
        paddingVertical: 0,
        borderWidth: 1
    },
    btnTextAction: {
        fontSize: 8,
        fontWeight: '500',
        textAlign: 'center'
    },
    bigBtn: {
        height: 50,
        borderRadius: 5,
        // borderWidth: 1,
        backgroundColor: '#f4ad49',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        bottom: 0,
        paddingEnd: 0,
        marginBottom: 0,
    },
    btnText: {
        color: '#fff'
    },
    labelAction: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'transparent'
    }
});
