import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Alert
} from 'react-native';
import { Content, Item, Input, Icon, Textarea } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import postContact from './../../../api/postContact';
import styles from './../../../styles';
import { formatAMPM, loading } from './../../../Helpers';

export default class SetCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txtAddress: '',
            txtName: '',
            txtPhone: '',
            txtEmail: '',
            txtDate: '',
            txtTime: '',
            txtNote: '',
            loaded: false
        };
    }
    state = { //eslint-disable-line
        isDatePickerVisible: false,
        isTimePickerVisible: false
    };
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }

    showDatePicker = () => this.setState({ isDatePickerVisible: true });

    hideDatePicker = () => this.setState({ isDatePickerVisible: false });
    
    handleDatePicked = (date) => { //eslint-disable-line
        let selected = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
        this.setState({ txtDate: selected });
        this.hideDatePicker();
    };

    showTimePicker = () => this.setState({ isTimePickerVisible: true });

    hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    handleTimePicked = (date) => { //eslint-disable-line
        this.setState({ txtTime: formatAMPM(date) });
        this.hideTimePicker();
    };
    onSubmit() {
        this.setState({ loaded: false });
        const { txtEmail, txtName, txtAddress, txtPhone, txtDate, txtTime, txtNote } = this.state;
        postContact(txtEmail, txtName, txtAddress, txtPhone, txtDate, txtTime, txtNote)
            .then(resJson => {
                this.setState({ loaded: true });
                if (resJson.status) {
                    GLOBAL.user = resJson;
                    Alert.alert(
                        'Thông báo',
                        resJson.message,
                    );
                } else {
                    Alert.alert(
                        'Thông báo',
                        resJson.errors.email[0],
                    );
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View>
                {/* <Header navigation={this.props.navigation} title='ĐẶT LỊCH THAM QUAN NHÀ MẪU' />
                <Image source={imgDuan} style={{ width: '100%', height: height / 6 }} /> */}
                <View style={styles.content}>
                    <Text style={styles.titleSection}>ĐẶT LỊCH THAM QUAN NHÀ MẪU</Text>
                    <Text style={styles.subTitle}>Nhà mẫu dự án mở cửa 8h00 - 18h00 tất cả các ngày trong tuần (kể cả thứ 7 & chủ nhật)</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='HỌ TÊN'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ txtName: text })}
                        value={this.state.txtName}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='ĐIỆN THOẠI'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ txtPhone: text })}
                        value={this.state.txtPhone}
                        keyboardType={'numeric'}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='EMAIL'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ txtEmail: text })}
                        value={this.state.txtEmail}
                    />
                    <View
                        style={styles.item}
                    >
                        <Content>
                            <Item
                                style={styles.leftInputContact}
                                regular
                            >
                                <Icon active name='calendar' style={{ color: 'green' }} />
                                <Input
                                    style={{ fontSize: 12 }}
                                    placeholder='NGÀY/THÁNG'
                                    placeholderTextColor='#999999'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ txtDate: text })}
                                    value={this.state.txtDate}
                                    onFocus={() => {
                                        Keyboard.dismiss();
                                        this.showDatePicker();
                                    }}
                                />
                            </Item>
                        </Content>
                        <Content style={styles.rightSectionInputContact}>
                            <Item
                                style={styles.rightInputContact}
                                regular
                            >
                                <Icon active name='ios-clock' style={{ color: 'green' }} />
                                <Input
                                    style={{ fontSize: 12 }}
                                    placeholder='THỜI GIAN'
                                    placeholderTextColor='#999999'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ txtTime: text })}
                                    value={this.state.txtTime}
                                    onFocus={() => {
                                        Keyboard.dismiss();
                                        this.showTimePicker();
                                    }}
                                />
                            </Item>
                        </Content>
                    </View>
                    <Textarea
                        style={styles.textAreaContact}
                        rowSpan={5}
                        bordered
                        placeholder="LƯU Ý DÀNH CHO NHÂN VIÊN KINH DOANH"
                    />
                    <TouchableOpacity style={styles.bigBtn} onPress={this.onSubmit.bind(this)}>
                        <Text style={styles.textBtnActive}>ĐĂNG KÝ</Text>
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
                    // datePickerModeAndroid='spinner'
                    />
                </View>
            </View >
        );
    }
}
