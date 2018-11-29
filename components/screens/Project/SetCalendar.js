import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Alert
} from 'react-native';
import { Content, Item, Input, Icon, Spinner, Container, Textarea } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import postContact from './../../../api/postContact';
// import Header from './../Home/Header';

// import imgDuan from './../../../images/duan.jpg';

const { width, height } = Dimensions.get('window');

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

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
        Alert.alert(
            'Thông báo',
            'Đặt lịch thành công'
        );
        // this.setState({ loaded: false });
        // const { txtEmail, txtName, txtAddress, txtPhone, txtDate, txtTime, txtNote } = this.state;
        // postContact(email, name, address, phone, date, time, note)
        //     .then(resJson => {
        //         console.log(resJson);
        //         if (resJson.access_token) {
        //             GLOBAL.user = resJson;
        //             saveUser(resJson);
        //             saveToken(resJson.access_token);
        //             this.setState({ loaded: true });
        //             Alert.alert(
        //                 'Thông báo',
        //                 'Đặt lịch thành công',
        //                 [
        //                     { text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen') },
        //                 ],
        //                 { cancelable: false }
        //             );
        //         } else {
        //             Alert.alert(
        //                 'Thông báo',
        //                 'Đặt lịch thất bại',
        //                 [
        //                     { text: 'OK', onPress: () => console.log(password) },
        //                 ],
        //                 { cancelable: false }
        //             );
        //         }
        //     })
        //     .catch(err => console.log(err));
    }
    render() {
        if (!this.state.loaded) {
            return (
                <Container>
                    <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        return (
            <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
                {/* <Header navigation={this.props.navigation} title='ĐẶT LỊCH THAM QUAN NHÀ MẪU' />
                <Image source={imgDuan} style={{ width: '100%', height: height / 6 }} /> */}
                <View style={styles.wrapper}>
                    <Text style={{ fontWeight: '600', fontSize: 16, color: '#333333' }}>ĐẶT LỊCH THAM QUAN NHÀ MẪU</Text>
                    <Text style={{ color: '#333333' }}>Nhà mẫu dự án mở cửa 8h00 - 18h00 tất cả các ngày trong tuần (kể cả thứ 7 & chủ nhật)</Text>
                    <TextInput
                        style={{
                            fontSize: 12,
                            borderRadius: 2,
                            borderWidth: 1,
                            borderColor: '#808080',
                            backgroundColor: 'white',
                            paddingLeft: 5,
                            marginTop: 5,
                            height: 40
                        }}
                        placeholder='HỌ TÊN'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ txtName: text })}
                        value={this.state.txtName}
                    />
                    <TextInput
                        style={{
                            fontSize: 12,
                            borderRadius: 2,
                            borderWidth: 1,
                            borderColor: '#808080',
                            backgroundColor: 'white',
                            paddingLeft: 5,
                            marginTop: 5,
                            height: 40
                        }}
                        placeholder='ĐIỆN THOẠI'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ txtPhone: text })}
                        value={this.state.txtPhone}
                        keyboardType={'numeric'}
                    />
                    <TextInput
                        style={{
                            fontSize: 12,
                            borderRadius: 2,
                            borderWidth: 1,
                            borderColor: '#808080',
                            backgroundColor: 'white',
                            paddingLeft: 5,
                            marginTop: 5,
                            color: 'black',
                            height: 40
                        }}
                        placeholder='EMAIL'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ txtEmail: text })}
                        value={this.state.txtEmail}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'flex-end',
                            paddingTop: 5
                        }}
                    >
                        {/* <Container> */}
                        <Content>
                            <Item
                                style={{
                                    borderColor: '#808080',
                                    borderWidth: 1,
                                    height: 40,
                                    borderRadius: 2,
                                    width: width / 2.3,
                                    marginLeft: 0
                                }}
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
                        <Content style={{ position: 'absolute', right: 0, marginTop: 5 }}>
                            <Item
                                style={{
                                    borderColor: '#808080',
                                    borderWidth: 1,
                                    height: 40,
                                    borderRadius: 2,
                                    width: width / 2.3,
                                    right: 0
                                }}
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
                        style={{ borderColor: '#808080', borderRadius: 2, fontSize: 10 }}
                        rowSpan={5}
                        bordered
                        placeholder="LƯU Ý DÀNH CHO NHÂN VIÊN KINH DOANH"
                    />
                    <TouchableOpacity style={styles.btnTable} onPress={this.onSubmit.bind(this)}>
                        <Text style={{ color: 'white', fontWeight: '500', marginHorizontal: 5, fontSize: 14, textAlign: 'center' }}>ĐĂNG KÝ</Text>
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

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15
    },
    sectionAction: {
        paddingHorizontal: 15,
        paddingTop: 15,
        justifyContent: 'space-around',
        marginBottom: 10,
        width,
        flexDirection: 'row'
    },
    btnAction: {
        width: '45%',
        borderColor: '#33563743',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
        height: height / 5,
        justifyContent: 'center'
    },
    btnTextAction: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center'
    },
    btnTable: {
        height: 40,
        borderRadius: 2,
        backgroundColor: '#f5821f',
        justifyContent: 'center',
        padding: 10,
        marginTop: 5
    }
});
