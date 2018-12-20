import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    BackHandler,
    TextInput,
    Keyboard, Alert,
    Switch
} from 'react-native';

import { ListItem, CheckBox, Body, Icon } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import Header from '../Home/Header';
import styles from './../../../styles';
import { formatMoney, loading } from '../../../Helpers';
import postOrderTransaction from './../../../api/postOrderTransaction';
import getToken from '../../../api/getToken';

export default class OrderSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            address: '',
            phone: '',
            identity: '',
            day_identity: '',
            where_identity: '',
            loaded: false,
            reserveValue: '',
            apartment: null,
            paymentMethod: 1,
            transactionCode: '',
            txtSubmit: 'ĐẶT CỌC'
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation } = this.props;
        const apartment = navigation.getParam('apartment', null);
        const transactionCode = navigation.getParam('transactionCode', null);
        this.setState({ loaded: true, apartment, transactionCode });
    }

    handleBackPress = () => { //eslint-disable-line
        return this.props.navigation.navigate('TablePackageScreen');
    }

    onChangeMoney(text) {
        this.setState({ reserveValue: text });
    }

    onSubmit() {
        this.setState({ txtSubmit: 'Đang xử lý' });
        getToken()
            .then(token => {
                const { fullName, email, address, phone, identity, paymentMethod, reserveValue, transactionCode } = this.state;
                postOrderTransaction(token, transactionCode, 0, '', fullName, email, address, phone, identity, paymentMethod, reserveValue)
                    .then(res => {
                        if (res.status === 200) {
                            Alert.alert(
                                'Thông báo',
                                res.message,
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            this.props.navigation.navigate('DetailApartmentScreen', {
                                                apartmentId: this.state.apartment.id
                                            });
                                        }
                                    },
                                    { text: 'Hủy', onPress: () => console.log('ok') },
                                ],
                                { cancelable: false }
                            );
                        } else {
                            var message = '';
                            Object.keys(res.data.errors).forEach(function (key) {
                                message += res.data.errors[key] + '\n';
                            });
                            Alert.alert(
                                'Thông báo',
                                message,
                            );
                        }
                    });
            });
    }

    selectMethodPayment(type) {
        console.log(type);
        this.setState({ paymentMethod: type });
    }
    render() {
        const { apartment } = this.state;
        if (!this.state.loaded || !apartment) {
            return loading();
        }
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} title={`GIAO DỊCH CĂN ${apartment.number}`} back={'ok'} />
                <ScrollView style={styles.content}>
                    <Text style={styles.titleScreen}>PHIẾU ĐẶT CỌC</Text>
                    <Text style={styles.txtHeader}>Thông tin sản phẩm</Text>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>Mã căn</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>{apartment.number}</Text>
                        </View>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>Diện tích</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>{apartment.area}</Text>
                            <Text style={{ fontSize: 14 }}> m2</Text>
                        </View>
                    </View>
                    {/*<View*/}
                    {/*style={styles.lineInfo}*/}
                    {/*>*/}
                    {/*<Text style={{ fontSize: 14 }}>Đơn giá</Text>*/}
                    {/*<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>*/}
                    {/*<Text style={{ fontSize: 14 }}>{apartment.price}</Text>*/}
                    {/*<Text style={{ fontSize: 14 }}> tr/m2</Text>*/}
                    {/*</View>*/}
                    {/*</View>*/}
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>Tổng tiền (trước chiết khấu)</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>{formatMoney(apartment.price, 0)}</Text>
                            <Text style={{ fontSize: 14 }}> VNĐ</Text>
                        </View>
                    </View>
                    <Text style={styles.txtHeader}>Thông tin khách hàng</Text>

                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='Họ tên'
                            underlineColorAndroid='transparent'
                            value={this.state.fullName}
                            onChangeText={text => this.setState({ fullName: text })}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='Địa chỉ'
                            underlineColorAndroid='transparent'
                            value={this.state.address}
                            onChangeText={text => this.setState({ address: text })}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='Điện thoại'
                            underlineColorAndroid='transparent'
                            value={this.state.phone}
                            onChangeText={text => this.setState({ phone: text })}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            underlineColorAndroid='transparent'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='Số CMND'
                            underlineColorAndroid='transparent'
                            value={this.state.identity}
                            onChangeText={text => this.setState({ identity: text })}
                            keyboardType={'numeric'}
                        />
                    </View>

                    <View style={styles.rowOption}>
                        <View
                            style={styles.viewHalfInput}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Ngày cấp'
                                underlineColorAndroid='transparent'
                                value={this.state.day_identity}
                                onChangeText={text => this.setState({ day_identity: text })}
                                onFocus={() => {
                                    Keyboard.dismiss();
                                    this.showDatePicker();
                                }}
                            />
                        </View>
                        <View
                            style={styles.viewHalfInput}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Nơi cấp'
                                underlineColorAndroid='transparent'
                                value={this.state.where_identity}
                                onChangeText={text => this.setState({ where_identity: text })}
                            />
                        </View>
                    </View>
                    <Text style={styles.txtHeader}>
                        Số tiền và phương thức thanh toán tiền cọc
                    </Text>
                    <View style={styles.sectionMoneyOrder}>
                        <View style={styles.sectionInputMoney}>
                            <Text style={styles.labelMoney}>
                                Số tiền đặt cọc (*)
                            </Text>
                        </View>

                        <TextInputMask
                            value={this.state.reserveValue}
                            type={'money'}
                            options={{ unit: '', precision: 0, separator: ' ' }}
                            style={styles.inputMoney}
                            onChangeText={this.onChangeMoney.bind(this)}
                        />
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>VND</Text>
                        </View>
                    </View>
                    <Text style={styles.textSuggest}>
                        (Lưu ý số tiền đặt cọc tối thiểu 20.000.000 VND)
                    </Text>
                    <View>
                        <ListItem style={{ marginLeft: 0 }}>
                            <Switch
                                color="#177dba"
                                // checked={this.state.paymentMethod === 1}
                                value={this.state.paymentMethod === 1}
                                onValueChange={this.selectMethodPayment.bind(this, 1)}
                            />
                            <Body>
                            <Text> Thanh toán tại sàn</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0 }}>
                            <Switch
                                color="#177dba"
                                // checked={this.state.paymentMethod === 2}
                                value={this.state.paymentMethod === 2}
                                onValueChange={this.selectMethodPayment.bind(this, 2)}
                            />
                            <Body>
                            <Text> Thanh toán qua chuyển khoản ngân hàng</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0 }}>
                            <Switch
                                color="#177dba"
                                // checked={this.state.paymentMethod === 3}
                                value={this.state.paymentMethod === 3}
                                onValueChange={this.selectMethodPayment.bind(this, 3)}
                            />
                            <Body>
                            <Text> Thanh toán online qua ứng dụng</Text>
                            </Body>
                        </ListItem>
                    </View>
                    <View style={styles.groupInline}>
                        <TouchableOpacity
                            style={styles.btnSubmitSquareInline}
                            onPress={this.onSubmit.bind(this)}
                        >
                            <Icon name='ios-cart' style={styles.iconBigBtn} />
                            <Text style={styles.textBtnIcon}>{this.state.txtSubmit}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnDeleteSquareInline}
                            onPress={() => this.props.navigation.navigate('DetailApartmentScreen', {
                                apartmentId: this.state.apartment.id
                            })}
                        >
                            <Icon type="FontAwesome" name='trash-o' style={styles.iconBigBtn} />
                            <Text style={styles.textBtnIcon}>HỦY</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
