import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native';
import { Icon, Button } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from '../Home/Header';
import saveToken from './../../../api/saveToken';
import GLOBAL from './../../../Globals';
import avatar from './../../../images/avatar.jpg';
import styles from './../../../styles';
import { loading, callingPhone, openSmsUrl, openEmail } from '../../../Helpers';

export default class DetailCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 1000);
    }
    onSignOut() {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn thoát tài khoản',
            [
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        GLOBAL.user = null;
                        saveToken('');
                        this.props.navigation.navigate('LoginScreen');
                    }
                },
                { text: 'Hủy bỏ', onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false }
        );
    }
    state = {
        isDatePickerVisible: false,
    };

    showDatePicker = () => this.setState({ isDatePickerVisible: true });

    hideDatePicker = () => this.setState({ isDatePickerVisible: false });

    handleDatePicked = (date) => {
        let selected = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
        this.setState({ txtDate: selected, date });
        this.hideDatePicker();
    }
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='THÔNG TIN KHÁCH HÀNG' back={'ok'} />
                <ScrollView>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <Image source={avatar} style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 5, borderColor: '#F58319' }} />
                            <View style={styles.sectionInputInline}>
                                <Text style={{ fontSize: 18, color: '#F58319', fontWeight: '600' }}>Cowboy!</Text>
                            </View>
                        </View>
                        <View style={styles.list}>
                            <Button transparent onPress={() => callingPhone('0975151490')}>
                                <Text><Icon type="Feather" name="phone-call" style={{ color: 'orange', fontSize: 30 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10 }}>
                                <Text><Icon type="MaterialCommunityIcons" name="message-text-outline" style={{ color: 'orange', fontSize: 30 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openEmail()} style={{ paddingLeft: 10 }}>
                                <Text><Icon type="Octicons" name="mail" style={{ color: 'orange', fontSize: 30 }} /></Text>
                            </Button>
                        </View>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Họ tên'
                            underlineColorAndroid='transparent'
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Địa chỉ'
                            underlineColorAndroid='transparent'
                            value={this.state.address}
                            onChangeText={text => this.setState({ address: text })}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Điện thoại'
                            underlineColorAndroid='transparent'
                            value={this.state.phone}
                            onChangeText={text => this.setState({ phone: text })}
                            keyboardType={'numeric'}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Email'
                            underlineColorAndroid='transparent'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Số CMND'
                            underlineColorAndroid='transparent'
                            value={this.state.identity}
                            onChangeText={text => this.setState({ identity: text })}
                            keyboardType={'numeric'}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                style={styles.inputInline}
                                placeholder='Ngày cấp'
                                underlineColorAndroid='transparent'
                                value={this.state.identity}
                                onChangeText={text => this.setState({ identity: text })}
                                onFocus={() => {
                                    Keyboard.dismiss();
                                    this.showDatePicker();
                                }}
                            />
                            <TextInput
                                style={styles.inputInline}
                                placeholder='Nơi cấp'
                                underlineColorAndroid='transparent'
                                value={this.state.identity}
                                onChangeText={text => this.setState({ identity: text })}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.bigBtnIcon}
                        >
                            <Icon type="FontAwesome" name='save' style={styles.iconBigBtn} />
                            <Text style={styles.textBtnIcon}>
                                Lưu
                            </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDatePicker}
                            datePickerModeAndroid='calendar'
                        />
                    </View>
                </ScrollView>
            </View >
        );
    }
}

