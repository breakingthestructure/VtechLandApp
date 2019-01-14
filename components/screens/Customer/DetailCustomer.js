import React from 'react';
import {
    Alert,
    Image,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Button,
    Icon,
    Toast
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SwitchSelector from 'react-native-switch-selector';
import Header from '../Home/Header';
import styles from './../../../styles';
import {
    callingPhone,
    loading,
    openEmail,
    openSmsUrl
} from '../../../Helpers';
import getToken from '../../../api/getToken';
import postCreateCustomer from '../../../api/postCreateCustomer';
import postUpdateCustomer from '../../../api/postUpdateCustomer';
import postDeleteCustomer from '../../../api/postDeleteCustomer';
import icSale from './../../../icons/customer.png';

export default class DetailCustomer extends React.Component {
    state = {
        isDatePickerVisible: false,
    };
    showDatePicker   = () => this.setState({ isDatePickerVisible: true }); //eslint-disable-line
    hideDatePicker   = () => this.setState({ isDatePickerVisible: false }); //eslint-disable-line
    handleDatePicked = (date) => { //eslint-disable-line
        let selected = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
        this.setState({ txtDate: selected, date });
        this.hideDatePicker();
    }

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const customer       = navigation.getParam('customer', null);
        this.state           = {
            loaded: false,
            customer: customer ? customer : '',
            fullname: customer ? customer.full_name : '',
            phone: customer ? customer.phone : '',
            address: customer ? customer.address : '',
            email: customer ? customer.email : '',
            identity: customer ? customer.identity : '',
            txtSubmit: 'Lưu',
            identity_day: '',
            birthday: customer ? customer.birth_day : '',
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }

    onSubmit() {
        getToken()
            .then(token => {
                const { fullname, phone, address, customer, birthday, identity, gender, email } = this.state;
                if (customer) {
                    postUpdateCustomer(token, customer.id, fullname, phone, address, birthday, identity, gender, email)
                        .then(res => {
                            return Toast.show({
                                text: res.message,
                                type: 'success',
                                buttonText: 'Xác nhận'
                            });
                        });
                } else {
                    postCreateCustomer(token, fullname, phone, address, birthday, identity, gender, email)
                        .then(res => {
                            return Toast.show({
                                text: res.message,
                                type: 'success',
                                buttonText: 'Xác nhận'
                            });
                        });
                }
            });
    }

    onDelete() {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn xóa khách hàng này',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        getToken()
                            .then(token => {
                                const { customer } = this.state;
                                if (customer) {
                                    postDeleteCustomer(token, customer.id)
                                        .then(res => {
                                            return Toast.show({
                                                text: res.message,
                                                type: 'success',
                                                buttonText: 'Xác nhận'
                                            });
                                        });
                                }
                            });
                    }
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        console.log(this.state.customer);
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='THÔNG TIN KHÁCH HÀNG' back={'back'} />
                <ScrollView>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <Image source={icSale} style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                borderWidth: 5,
                                borderColor: '#F58319'
                            }} />
                            <View style={styles.sectionInputInline}>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#F58319',
                                    fontWeight: '600'
                                }}>{this.state.fullname}!</Text>
                            </View>
                        </View>
                        <View style={styles.list}>
                            <Button transparent onPress={() => callingPhone(this.state.phone)}>
                                <Text><Icon type="Feather" name="phone-call"
                                            style={{ color: 'orange', fontSize: 30 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl(this.state.phone, '')}
                                    style={{ paddingLeft: 50 }}>
                                <Text><Icon type="MaterialCommunityIcons" name="message-text-outline"
                                            style={{ color: 'orange', fontSize: 30 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openEmail()} style={{ paddingLeft: 50 }}>
                                <Text><Icon type="Octicons" name="mail"
                                            style={{ color: 'orange', fontSize: 34 }} /></Text>
                            </Button>
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Họ tên'
                                underlineColorAndroid='transparent'
                                value={this.state.fullname}
                                onChangeText={text => this.setState({ fullname: text })}
                            />
                        </View>
                        <SwitchSelector
                            initial={0}
                            onPress={value => this.setState({ gender: value })}
                            textColor='#21a1fc' //'#7a44cf'
                            selectedColor='white'
                            buttonColor='#21a1fc'
                            borderColor='#cecece'
                            hasPadding
                            options={[
                                { label: 'Nam', value: 'm' },
                                { label: 'Nữ', value: 'f' }
                            ]}
                            style={{ paddingTop: 10 }}
                        />
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
                                    placeholder='Ngày sinh'
                                    underlineColorAndroid='transparent'
                                    value={this.state.birthday}
                                    onChangeText={text => this.setState({ birthday: text })}
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
                                    value={this.state.identity_where}
                                    onChangeText={text => this.setState({ identity_where: text })}
                                />
                            </View>
                        </View>
                        <View style={styles.groupInline}>
                            <TouchableOpacity
                                style={styles.btnSubmitSquareInline}
                                onPress={this.onSubmit.bind(this)}
                            >
                                <Icon type="FontAwesome" name='save' style={styles.iconBigBtn} />
                                <Text style={styles.textBtnIcon}>LƯU</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnDeleteSquareInline}
                                onPress={this.onDelete.bind(this)}
                            >
                                <Icon type="FontAwesome" name='trash-o' style={styles.iconBigBtn} />
                                <Text style={styles.textBtnIcon}>XÓA</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDatePicker}
                            datePickerModeAndroid='calendar'
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

