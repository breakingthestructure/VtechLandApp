import React from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Icon,
    Textarea,
    Toast
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import postContact from './../../../api/postContact';
import styles from './../../../styles';
import {
    formatAMPM,
    loading
} from './../../../Helpers';

export default class SetCalendar extends React.Component {
    state = { //eslint-disable-line
        isDatePickerVisible: false,
        isTimePickerVisible: false
    };
    showDatePicker = () => this.setState({ isDatePickerVisible: true }); //eslint-disable-line
    hideDatePicker = () => this.setState({ isDatePickerVisible: false }); //eslint-disable-line
    handleDatePicked = (date) => { //eslint-disable-line
        const selected = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
        this.setState({ txtDate: selected });
        this.hideDatePicker();
    };
    showTimePicker = () => this.setState({ isTimePickerVisible: true }); //eslint-disable-line
    hideTimePicker = () => this.setState({ isTimePickerVisible: false }); //eslint-disable-line
    handleTimePicked = (date) => { //eslint-disable-line
        this.setState({ txtTime: formatAMPM(date) });
        this.hideTimePicker();
    };

    constructor(props) {
        super(props);
        this.state = {
            txtAddress: '',
            txtName: '',
            txtPhone: '',
            txtEmail: '',
            txtDate: 'Ngày / tháng',
            txtTime: 'Thời gian',
            txtNote: '',
            loaded: false,
            txtSubmit: 'ĐĂNG KÝ'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }

    onSubmit() {
        this.setState({ loaded: false, txtSubmit: 'Đang xử lý' });
        const { txtEmail, txtName, txtAddress, txtPhone, txtDate, txtTime, txtNote } = this.state;
        postContact(txtEmail, txtName, txtAddress, txtPhone, txtDate, txtTime, txtNote)
            .then(resJson => {
                this.setState({ loaded: true, txtSubmit: 'ĐĂNG KÝ' });
                if (resJson.status) {
                    // GLOBAL.user = resJson;
                    return Toast.show({
                        text: resJson.message,
                        type: 'success',
                        buttonText: 'Okay'
                    });
                }
                let message = '';
                Object.keys(resJson.errors).forEach(function (key) {
                    message += resJson.errors[key] + '\n';
                });
                return Toast.show({
                    text: message,
                    type: 'danger',
                    buttonText: 'Okay'
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.content}>
                <Text style={styles.titleSection}>ĐẶT LỊCH THAM QUAN NHÀ MẪU</Text>
                <Text style={styles.subTitle}>
                    Nhà mẫu dự án mở cửa 8h00 - 18h00 tất cả các ngày trong tuần (kể cả
                    thứ 7 & chủ nhật)
                </Text>
                <View style={styles.viewInput}>
                    <TextInput
                        style={styles.input}
                        placeholder='Họ tên'
                        underlineColorAndroid='transparent'
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
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
                        value={this.state.txtEmail}
                        onChangeText={text => this.setState({ txtEmail: text })}
                    />
                </View>
                <View style={styles.item}>
                    <TouchableOpacity
                        style={styles.leftInputContact}
                        onPress={() => {
                            this.showDatePicker();
                        }}
                    >
                        <Icon
                            active
                            name='calendar'
                            style={{
                                color: 'orange',
                                fontSize: 22,
                                marginTop: 7,
                                marginLeft: 20
                            }}
                        />
                        <Text
                            style={{
                                height: 40,
                                width: '80%',
                                fontSize: 12,
                                marginTop: 13,
                                marginLeft: 10
                            }}
                        >
                            {this.state.txtDate}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.rightInputContact}
                        onPress={() => {
                            this.showTimePicker();
                        }}
                    >
                        <Icon
                            active
                            name='ios-clock'
                            style={{
                                color: 'orange',
                                fontSize: 22,
                                marginTop: 7,
                                marginLeft: 20
                            }}
                        />
                        <Text
                            style={{
                                height: 40,
                                width: '80%',
                                fontSize: 12,
                                marginTop: 13,
                                marginLeft: 10
                            }}
                        >
                            {this.state.txtTime}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Textarea
                    style={styles.textAreaContact}
                    rowSpan={5}
                    bordered
                    placeholder="LƯU Ý DÀNH CHO NHÂN VIÊN KINH DOANH"
                />
                <TouchableOpacity
                    style={styles.bigBtnIcon}
                    onPress={this.onSubmit.bind(this)}
                >
                    <Icon name='ios-checkmark-circle-outline' style={styles.iconBigBtn} />
                    <Text style={styles.textBtnIcon}>
                        {this.state.txtSubmit}
                    </Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDatePicker}
                    neverDisableConfirmIOS
                />
                <DateTimePicker
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this.handleTimePicked}
                    onCancel={this.hideTimePicker}
                    mode='time'
                    is24Hour={false}
                    neverDisableConfirmIOS
                    datePickerModeAndroid='spinner'
                />
            </View>
        );
    }
}
