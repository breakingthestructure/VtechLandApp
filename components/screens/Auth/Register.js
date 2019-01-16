import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import {
    Icon,
    Toast,
} from 'native-base';
import bgImg from './../../../icons/bg.png';
import icLogo from './../../../icons/logo_new.png';
import { loading } from '../../../Helpers';
import postRegister from '../../../api/postRegister';

const { width } = Dimensions.get('window');

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            txtSubmit: 'ĐĂNG KÝ',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }

    postRegister() {
        this.setState({ txtSubmit: 'Đang xử lý' });
        const { email, password, confirmPassword } = this.state;
        postRegister(email, password, confirmPassword)
            .then(resJson => {
                this.setState({ txtSubmit: 'ĐĂNG KÝ' });
                console.log(resJson);
                if (resJson.status === 200) {
                    this.setState({
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                    return Toast.show({
                        text: resJson.message,
                        type: 'success',
                        buttonText: 'Đồng ý',
                        duration: 10000
                    });
                }
                let message = '';
                Object.keys(resJson.data.errors).forEach(function (key) {
                    message += resJson.data.errors[key] + '\n';
                });
                return Toast.show({
                    text: message,
                    type: 'danger',
                    buttonText: 'Đồng ý',
                    duration: 10000
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
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
                    <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                        <Text
                            style={{ fontSize: 18, fontWeight: '600', color: '#333333' }}
                        >
                            ĐĂNG KÝ
                        </Text>
                    </View>
                    {/*<View*/}
                    {/*style={{*/}
                    {/*width: '100%',*/}
                    {/*paddingHorizontal: 30,*/}
                    {/*paddingTop: 10*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<View*/}
                    {/*style={{*/}
                    {/*height: 40,*/}
                    {/*width: '100%',*/}
                    {/*borderRadius: 20,*/}
                    {/*marginTop: 5,*/}
                    {/*borderColor: '#33563743',*/}
                    {/*borderWidth: 1,*/}
                    {/*flexDirection: 'row',*/}
                    {/*justifyContent: 'flex-end',*/}
                    {/*alignItems: 'center'*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<TextInput*/}
                    {/*style={{ height: 40, width: '95%', paddingLeft: 40 }}*/}
                    {/*placeholder='Họ tên'*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*value={this.state.fullname}*/}
                    {/*onChangeText={text => this.setState({ fullname: text })}*/}
                    {/*/>*/}
                    {/*<Icon*/}
                    {/*type='FontAwesome'*/}
                    {/*name='address-card-o'*/}
                    {/*style={{ color: 'gray', marginRight: 15, fontSize: 16 }}*/}
                    {/*/>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 30,
                            paddingTop: 10
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                width: '100%',
                                borderRadius: 20,
                                marginTop: 5,
                                borderColor: '#33563743',
                                borderWidth: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}
                        >
                            <TextInput
                                style={{ height: 40, width: '95%', paddingLeft: 40 }}
                                placeholder='E-mail'
                                underlineColorAndroid='transparent'
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                            />
                            <Icon
                                name='ios-mail'
                                style={{ color: 'gray', marginRight: 15, fontSize: 24 }}
                            />
                        </View>
                    </View>
                    {/*<View*/}
                    {/*style={{*/}
                    {/*width: '100%',*/}
                    {/*paddingHorizontal: 30,*/}
                    {/*paddingTop: 10*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<View*/}
                    {/*style={{*/}
                    {/*height: 40,*/}
                    {/*width: '100%',*/}
                    {/*borderRadius: 20,*/}
                    {/*marginTop: 5,*/}
                    {/*borderColor: '#33563743',*/}
                    {/*borderWidth: 1,*/}
                    {/*flexDirection: 'row',*/}
                    {/*justifyContent: 'flex-end',*/}
                    {/*alignItems: 'center'*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<TextInput*/}
                    {/*style={{ height: 40, width: '95%', paddingLeft: 40 }}*/}
                    {/*placeholder='Điện thoại'*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*value={this.state.phone}*/}
                    {/*onChangeText={text => this.setState({ phone: text })}*/}
                    {/*keyboardType={'numeric'}*/}
                    {/*/>*/}
                    {/*<Icon*/}
                    {/*type='FontAwesome'*/}
                    {/*name='phone'*/}
                    {/*style={{ color: 'gray', marginRight: 15, fontSize: 16 }}*/}
                    {/*/>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 30,
                            paddingTop: 10
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                width: '100%',
                                borderRadius: 20,
                                marginTop: 5,
                                borderColor: '#33563743',
                                borderWidth: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}
                        >
                            <TextInput
                                style={{ height: 40, width: '95%', paddingLeft: 40 }}
                                placeholder='Mật khẩu'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({ password: text })}
                                value={this.state.password}
                                secureTextEntry
                            />
                            <Icon
                                active
                                name='ios-lock'
                                style={{ color: 'gray', marginRight: 15, fontSize: 22 }}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 30,
                            paddingTop: 10
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                width: '100%',
                                borderRadius: 20,
                                marginTop: 5,
                                borderColor: '#33563743',
                                borderWidth: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}
                        >
                            <TextInput
                                style={{ height: 40, width: '95%', paddingLeft: 40 }}
                                placeholder='Nhập lại mật khẩu'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({ confirmPassword: text })}
                                value={this.state.confirmPassword}
                                secureTextEntry
                            />
                            <Icon
                                active
                                name='ios-lock'
                                style={{ color: 'gray', marginRight: 15, fontSize: 22 }}
                            />
                        </View>
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
                        onPress={this.postRegister.bind(this)}
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
                </View>
                <View style={styles.bottomView}>
                    <Image source={bgImg} style={{ width, height: (width / 1440) * 550 }} />
                </View>
            </View>
        );
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
