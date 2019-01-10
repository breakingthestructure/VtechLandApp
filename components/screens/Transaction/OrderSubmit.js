import React from 'react';
import {
    Animated,
    BackHandler,
    Keyboard,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import {
    Body,
    Icon,
    ListItem,
    Picker,
    Toast
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TextInputMask } from 'react-native-masked-text';
import Autocomplete from 'react-native-autocomplete-input';
import Header from '../Home/Header';
import styles from './../../../styles';
import {
    formatMoney,
    loading
} from '../../../Helpers';
import postOrderTransaction from './../../../api/postOrderTransaction';
import getToken from '../../../api/getToken';
import getCustomers from '../../../api/getCustomers';
import getCities from './../../../api/getCities';
import getDistricts from "../../../api/getDistricts";

export default class OrderSubmit extends React.Component {
    handleBackPress = () => { //eslint-disable-line
        return this.props.navigation.navigate('TablePackageScreen');
    }

    constructor(props) {
        super(props);
        this.state = {
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
            txtSubmit: 'ĐẶT CỌC',
            fullName: '',
            customerId: '',
            searchCustomer: 0,
            customers: [],
            resultValue: new Animated.Value(40),
            isHidden: true,
            cities: [],
        };
    }

    onSelectCity(idCity) {
        this.setState({ where_identity: idCity });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation } = this.props;
        const apartment = navigation.getParam('apartment', null);
        const transactionCode = navigation.getParam('transactionCode', null);
        this.setState({ apartment, transactionCode });
        getToken()
            .then(token => {
                this.setState({ token });
                getCustomers(token)
                    .then(resJson => {
                        if (resJson.data) {
                            this.setState({
                                customers: resJson.data.data,
                                loaded: true
                            });
                        }
                    })
                    .catch(err => console.log(err));
            });
        getCities()
            .then(resJson => {
                if (resJson) {
                    this.setState({
                        cities: resJson.data,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    onChangeMoney(text) {
        this.setState({ reserveValue: text });
    }

    state = {
        isDatePickerVisible: false,
    };
    showDatePicker = () => this.setState({ isDatePickerVisible: true }); //eslint-disable-line
    hideDatePicker = () => this.setState({ isDatePickerVisible: false }); //eslint-disable-line
    handleDatePicked = (date) => { //eslint-disable-line
        const selected = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
        this.setState({ day_identity: selected, date });
        this.hideDatePicker();
    };

    onSubmit() {
        this.setState({ txtSubmit: 'Đang xử lý' });
        getToken()
            .then(token => {
                const { fullName, email, address, phone, identity, paymentMethod, reserveValue, transactionCode, customerId, searchCustomer } = this.state;
                postOrderTransaction(token, transactionCode, searchCustomer, customerId, fullName, email, address, phone, identity, paymentMethod, reserveValue)
                    .then(res => {
                        if (res.status === 200) {
                            return Toast.show({
                                text: res.message,
                                type: 'success',
                                buttonText: 'Okay'
                            });
                        }
                        let message = '';
                        Object.keys(res.data.errors).forEach(function (key) {
                            message += res.data.errors[key] + '\n';
                        });
                        return Toast.show({
                            text: message,
                            type: 'danger',
                            buttonText: 'Okay'
                        });
                    });
            });
    }

    selectMethodPayment(type) {
        this.setState({ paymentMethod: type });
    }

    findCustomer(fullName) {
        if (fullName === '') {
            return [];
        }
        const { customers } = this.state;
        const regex = new RegExp(`${fullName.trim()}`, 'i');
        return customers.filter(customer => customer.full_name.search(regex) >= 0);
    }

    toggleQuickSearch(wantHide) {
        let toValue = 300;
        if (this.state.name === '' || wantHide) {
            toValue = 40;
        }
        Animated.spring(
            this.state.resultValue,
            {
                toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
    }

    _filterData(fullName) {
        if (fullName === '') {
            return [];
        }
        getToken()
            .then(token => {
                this.setState({ token });
                getCustomers(token, `text_search=${fullName}`)
                    .then(resJson => {
                        console.log('aaa', resJson);
                        return resJson.data.data;
                    })
                    .catch(err => console.log(err));
            });
    }

    render() {
        const { fullName, apartment, cities } = this.state;
        const customers = this.findCustomer(fullName);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        if (!this.state.loaded || !apartment) {
            return loading();
        }
        return (
            <View style={styles.wrapper}>
                <Header
                    navigation={this.props.navigation}
                    title={`GIAO DỊCH ${apartment.number}`}
                    back={'ok'}
                />
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

                    <Animated.View
                        style={
                            [styles.viewAutocomplete,
                                { height: this.state.resultValue }]
                        }
                    >
                        <Autocomplete
                            containerStyle={
                                this.state.isHidden ?
                                    styles.autocompleteContainerFull :
                                    styles.autocompleteContainer
                            }
                            inputContainerStyle={{
                                borderWidth: 0,
                            }}
                            listStyle={styles.autocompleteResult}
                            autoCapitalize="none"
                            autoCorrect={false}
                            defaultValue={fullName}
                            onChangeText={text => this.setState({ fullName: text })}
                            data={customers.length === 1 &&
                            comp(fullName, customers[0].full_name) ? [] : customers
                            }
                            renderTextInput={() => (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            height: 40,
                                            width: '90%',
                                            backgroundColor: 'white',
                                            borderRadius: 20,
                                            borderWidth: 0,
                                            marginLeft: 15
                                        }}
                                        placeholder='Họ tên'
                                        underlineColorAndroid='transparent'
                                        value={this.state.fullName}
                                        onChangeText={text => {
                                            this.setState({
                                                fullName: text,
                                                searchCustomer: 0,
                                                customerId: '',
                                                address: '',
                                                phone: '',
                                                email: '',
                                                identity: '',
                                                isHidden: false
                                            }, () => {
                                                let hide = false;
                                                if (this.state.fullName === '') {
                                                    this.setState({ isHidden: true });
                                                    hide = true;
                                                }
                                                this.toggleQuickSearch(hide);
                                            });
                                        }}
                                        onEndEditing={() => {
                                            this.setState({ isHidden: true }, () => {
                                                setTimeout(() => {
                                                    this.toggleQuickSearch(true);
                                                }, 1000);
                                            });
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.toggleQuickSearch(true);
                                            this.setState({ isHidden: true });
                                        }}
                                    >
                                        <Icon
                                            name='ios-search'
                                            style={{
                                                fontSize: 24,
                                                color: 'orange',
                                                marginTop: 10,
                                                marginRight: 10
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            renderItem={item => (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            fullName: item.full_name,
                                            searchCustomer: 1,
                                            customerId: item.id,
                                            address: item.address,
                                            phone: item.phone,
                                            email: item.email,
                                            identity: item.identity
                                        }, () => {
                                            this.toggleQuickSearch(true);
                                            this.setState({ isHidden: true });
                                        });
                                    }}
                                    style={{
                                        flexDirection: 'column',
                                        height: 50,
                                        justifyContent: 'center',
                                        alignContent: 'center'
                                    }}
                                >
                                    <Text>{item.full_name}</Text>
                                    <Text>{item.phone}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </Animated.View>
                    {/*<View style={styles.viewInput}>*/}
                    {/*<TextInput*/}
                    {/*style={styles.input}*/}
                    {/*placeholder='Họ tên'*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*value={this.state.fullName}*/}
                    {/*onChangeText={text => this.setState({ fullName: text })}*/}
                    {/*/>*/}
                    {/*</View>*/}
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
                            <Picker
                                iosHeader="Nơi cấp"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                style={styles.picker}
                                selectedValue={this.state.where_identity}
                                onValueChange={(itemValue) =>
                                    this.onSelectCity(itemValue)
                                }
                            >
                                <Picker.Item label="Nơi cấp" value="" />
                                {Object.keys(cities).map(function (key) {
                                    return <Picker.Item key={key} label={cities[key]} value={key} />
                                })}
                            </Picker>
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
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDatePicker}
                    datePickerModeAndroid='calendar'
                />
            </View>
        );
    }
}
