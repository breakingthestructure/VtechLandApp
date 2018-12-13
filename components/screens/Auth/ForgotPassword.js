import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import { Container, Content, Item, Input, Icon, Spinner } from 'native-base';
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

export default class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            txtSubmit: 'GỬI YÊU CẦU'
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }
    postForgotPassword() {
        this.props.navigation.navigate('ResetPasswordScreen')
        // this.setState({ txtSubmit: 'Đang xử lý' });
    }
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.wrapper}>
                <View style={{ alignItems: 'center', paddingTop: 10 }}>

                    <View style={{ paddingTop: 20 }}>
                        <Image source={icLogo} style={{ width: width / 2, height: ((width / 2) / 492) * 79 }} />
                        {/* <Image source={icLogo} style={{ width: width - 200, height: ((width - 200) / 935) * 152 }} /> */}
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
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#333333' }}>QUÊN MẬT KHẨU</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 30, paddingTop: 10 }}>
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
                                />
                                <Icon active name='ios-mail' style={{ color: 'gray', marginRight: 15 }} />
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
                        onPress={this.postForgotPassword.bind(this)}
                    >
                        <Icon type="FontAwesome" name='sign-in' style={{ fontSize: 14, color: 'white', marginTop: 13, marginRight: 5 }} />
                        {/* <Icon name='ios-calculator' style={{ fontSize: 14, color: 'white', marginTop: 13, marginRight: 5 }} /> */}
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
                            {this.state.txtSubmit}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomView}>
                    <Image source={bgImg} style={{ width, height: (width / 1440) * 550 }} />
                </View>
            </View >
        );
    };
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
        justifyContent: 'space-between', flexDirection: 'row', padding: 10, backgroundColor: 'transparent'
    }
});
