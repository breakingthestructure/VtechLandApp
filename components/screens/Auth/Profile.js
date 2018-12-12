import React from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native';
import { Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from '../Home/Header';
import saveToken from './../../../api/saveToken';
import GLOBAL from './../../../Globals';
import avatar from './../../../images/avatar.jpg';
import styles from './../../../styles';
import { loading } from '../../../Helpers';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        const { user } = GLOBAL;
        this.state = {
            loaded: false,
            fullname: user ? user.fullname : '',
            phone: user ? user.phone : '',
            address: user ? user.address : '',
            email: user ? user.email : '',
            identity: user ? user.identity : ''
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
        const { user } = GLOBAL;
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='THÔNG TIN TÀI KHOẢN' back={'ok'} />
                <ScrollView>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <Image source={avatar} style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 5, borderColor: '#F58319' }} />
                            <View style={styles.sectionInputInline}>

                                <Text style={{ fontSize: 18 }}>Xin chào </Text>
                                <Text style={{ fontSize: 18, color: '#F58319', fontWeight: '600' }}>{this.state.fullname ? this.state.fullname : ''}!</Text>
                            </View>
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
                                    value={this.state.identity}
                                    onChangeText={text => this.setState({ identity: text })}
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
                                    value={this.state.identity}
                                    onChangeText={text => this.setState({ identity: text })}
                                />
                            </View>
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

