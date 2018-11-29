import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    ListView,
    Alert,
    Keyboard,
    FlatList,
    StatusBar
} from 'react-native';
import { Container, Content, Item, Input, Icon, Spinner, Picker, Form } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TextInputMask, MaskService } from 'react-native-masked-text';
import Modal from "react-native-modal";
// import icTitle from './../../../icons/ic_title.png';
// import Header from './../Home/Header';
// import imgDuan from './../../../images/duan.jpg';

const { width, height } = Dimensions.get('window');

function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function getDayNextMonth(date, numberMonth = 1) {
    var day = date.getDate();
    var month = date.getMonth() + 1 + numberMonth;
    var year = date.getFullYear();
    var totalDayInMonth = getDaysInMonth(month, year);
    if (day > totalDayInMonth) {
        day = totalDayInMonth;
    }
    if (month > 12) {
        var times = Math.floor(month / 12);
        var few = month % 12;
        if (few > 0) {
            month = few;
            year += times;
        }
        if (times > 0 && few == 0) {
            month = 12;
            year += (times - 1);
        }
    }
    return day + '-' + month + '-' + year;
}

export default class CalcDebt extends React.Component {
    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            modeDebt: '',
            txtMoney: '',
            txtMonth: '',
            txtDate: '',
            date: null,
            loaded: false,
            txtTimeGrace: '',
            index: 0,
            graceDebt: false,
            // isDatePickerVisible: false,
            // isTimePickerVisible: false,
            arrayCondition: [{
                from: '1',
                to: '',
                percent: ''
            }],
            result: [],
            calculating: false
        };

    }
    handleChangeFromInput = (index, type, text) => {
        const newArray = this.state.arrayCondition;
        newArray[index][type] = text;
        this.setState({ arrayCondition: newArray });
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
        // this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows(this.state.arrayCondition)
        // });
    }
    onSelectMode(value) {
        this.setState({
            modeDebt: value
        });
    }
    onCharge(value) {
        this.setState({
            graceDebt: (!this.state.graceDebt) ? true : false
        });
    }
    addCondition() {
        const arr = this.state.arrayCondition;
        if (arr[arr.length - 1].to === '') {
            return Alert.alert(
                'Thông báo',
                'Bạn chưa nhập tháng của điều kiện trước'
            );
        }
        this.state.arrayCondition.push({
            from: (parseInt(arr[arr.length - 1].to) + 1).toString(),
            to: '',
            percent: ''
        });
        this.setState({ arrayCondition: this.state.arrayCondition });
    }
    subCondition(index) {
        if (this.state.arrayCondition.length > 1) {
            const arr = this.state.arrayCondition;
            if (arr[index + 1]) {
                arr[index + 1].from = (arr[index].from).toString();
            }
            arr.splice(index, 1);
            this.setState({
                arrayCondition: arr
            });
        } else {
            Alert.alert(
                'Thông báo',
                'Phải có ít nhất 1 điều kiện'
            );
        }
    }
    onCalcDebt() {
        this.setState({ calculating: true });
        const { modeDebt, txtMoney, txtMonth, graceDebt, arrayCondition, txtTimeGrace, date } = this.state;
        var moneyDebt = txtMoney.split('.').join('');
        let payRootMonthly = moneyDebt / txtMonth;
        let interestRateMonthly = 0;
        let totalMonthly = 0;
        if (graceDebt) {
            interestRate = 0;
        }
        let rootHavePay = moneyDebt;
        let result = [];
        if (!date) {
            Alert.alert(
                'Thông báo',
                'Bạn chưa chọn ngày'
            );
            return false;
        }
        if (parseInt(moneyDebt) === 0) {
            Alert.alert(
                'Thông báo',
                'Bạn chưa nhập số tiền vay'
            );
            return false;
        }
        if (modeDebt === '' || parseInt(modeDebt) === 0) {
            Alert.alert(
                'Thông báo',
                'Bạn chưa chọn hình thức vay'
            );
            return false;
        }
        if (parseInt(txtTimeGrace) > parseInt(txtMonth)) {
            Alert.alert(
                'Thông báo',
                'Thời gian ân hạn không được lớn hơn số tháng vay'
            );
            return false;
        }
        var totalMonthCondition = 0;
        arrayCondition.map((condition, index) => {
            if (index === 0 && parseInt(condition.from) !== 1) {
                Alert.alert(
                    'Điều kiện lãi suất',
                    'Tháng bắt đầu phải là 1'
                );
                return false;
            }
            if (arrayCondition.length === (index + 1) && parseInt(condition.to) !== parseInt(txtMonth)) {
                Alert.alert(
                    'Điều kiện lãi suất',
                    'Tháng kết thúc phải là tổng số tháng'
                );
                return false;
            }
            if (condition.from === '' || condition.to === '') {
                return false;
            }
            totalMonthCondition += condition.to - condition.from + 1;

            if (arrayCondition.length === (index + 1) && totalMonthCondition !== parseInt(txtMonth)) {
                Alert.alert(
                    'Điều kiện lãi suất không đúng',
                    'Tổng số tháng không khớp với điều kiện'
                );
                return false;
            }
        })
        var percent = 0;
        for (i = 1; i <= txtMonth; i++) {
            arrayCondition.map(condition => {
                if (condition.from === '' || condition.to === '' || condition.percent === '') {
                    return;
                }
                if (graceDebt && i <= txtTimeGrace) {
                    return percent = 0;
                }
                if (i >= condition.from && i <= condition.to) {
                    return percent = condition.percent;
                }
            })
            if (!percent) {
                return;
            }
            if (parseInt(modeDebt) === 1) {
                interestRateMonthly = rootHavePay / 12 * percent / 100;
            } else {
                interestRateMonthly = moneyDebt / 12 * percent / 100;
            }
            totalMonthly = interestRateMonthly + payRootMonthly;
            rootHavePay = rootHavePay - payRootMonthly;
            var payDay = getDayNextMonth(date, i);
            result.push(
                { key: payDay },
                { key: formatMoney(payRootMonthly, 0) },
                { key: formatMoney(interestRateMonthly, 0) },
                { key: formatMoney(totalMonthly, 0) },
                { key: formatMoney(rootHavePay, 0) }
            );
        }
        this.setState({ result, calculating: false });
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
    };
    renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#F68121', borderRadius: 2, justifyContent: 'center', marginTop: 10 }}>
                <View style={styles.headerRow}>
                    <Text style={styles.textHeader}>Ngày</Text>
                </View>
                <View style={styles.headerRow}>
                    <Text style={styles.textHeader}>Gốc</Text>
                </View>
                <View style={styles.headerRow}>
                    <Text style={styles.textHeader}>Lãi</Text>
                </View>
                <View style={styles.headerRow}>
                    <Text style={styles.textHeader}>Tổng</Text>
                </View>
                <View style={styles.headerRow}>
                    <Text style={styles.textHeader}>Còn lại</Text>
                </View>
            </View>
        );
    }
    setFormatMoney(text) {
        var money = MaskService.toMask('money', text, {
            unit: '',
            separator: ' ',
            precision: 0
        });
        this.setState({ txtMoney: money });
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
            <View style={styles.wrapper}>
                <Text style={styles.txtHeader}>TÍNH LÃI SUẤT VAY DỰ ÁN</Text>
                <Text style={{ color: '#333333' }}>Vui lòng nhập các tham số cần thiết</Text>
                <ScrollView>

                    <View style={styles.row}>
                        <Content>
                            <Item
                                style={styles.inputItem}
                                regular
                            >
                                <Icon active name='ios-cash' style={{ color: 'green' }} />
                                <Input
                                    style={{ fontSize: 12 }}
                                    placeholder='SỐ TIỀN VAY'
                                    placeholderTextColor='#999999'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => {
                                        this.setFormatMoney(text);
                                    }}
                                    value={this.state.txtMoney}
                                    keyboardType={'numeric'}
                                />
                            </Item>
                        </Content>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>VND</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Content>
                            <Item
                                style={styles.inputItem}
                                regular
                            >
                                <Icon active name='ios-clock' style={{ color: '#75D2BE' }} />
                                <Input
                                    style={{ fontSize: 12 }}
                                    placeholder='THỜI GIAN VAY'
                                    placeholderTextColor='#999999'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ txtMonth: text })}
                                    value={this.state.txtMonth}
                                    keyboardType={'numeric'}
                                />
                            </Item>
                        </Content>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>THÁNG</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Content>
                            <Item
                                style={styles.inputItem}
                                regular
                            >
                                <Icon active name='ios-calendar' style={{ color: '#75D2BE' }} />
                                <Input
                                    style={{ fontSize: 12 }}
                                    placeholder='NGÀY GIẢI NGÂN'
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
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>NGÀY</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 5,
                            height: 30
                        }}
                    >
                        <Content
                            style={{
                                height: 30,
                                borderTopLeftRadius: 2,
                                borderBottomLeftRadius: 2,
                                borderLeftWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: '#808080',
                                overflow: 'hidden'
                            }}
                        >
                            <Form>
                                <Picker
                                    style={{
                                        height: 30,
                                    }}
                                    selectedValue={this.state.modeDebt}
                                    onValueChange={this.onSelectMode.bind(this)}
                                >
                                    <Picker.Item label="Chọn hình thức vay" value="0" />
                                    <Picker.Item label="Dư nợ giảm dần" value="1" />
                                    <Picker.Item label="Dư nợ ban đầu" value="2" />
                                </Picker>
                            </Form>
                        </Content>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}><Icon name="ios-arrow-down" style={{ color: 'white' }} /></Text>
                        </View>
                    </View>
                    <Text style={{ color: '#333333', fontSize: 12, paddingTop: 10 }}>BÀI TOÁN LÃI SUẤT</Text>
                    {this.state.arrayCondition.map((rowData, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                paddingTop: 5
                            }}
                        >
                            <Content>
                                <Item
                                    style={styles.inputLeft}
                                    regular
                                >
                                    {/* <Input
                                        style={{ fontSize: 12 }}
                                        placeholder='TỪ THÁNG'
                                        placeholderTextColor='#999999'
                                        underlineColorAndroid='transparent'
                                        onChangeText={this.handleChangeFromInput.bind(this, index, 'from')}
                                        value={this.state.arrayCondition[index].from}
                                        keyboardType={'numeric'}
                                    /> */}
                                    <Text style={{ fontSize: 12, paddingLeft: 10, color: '#000' }}>
                                        {this.state.arrayCondition[index].from}
                                    </Text>
                                </Item>
                            </Content>
                            <Content>
                                <Item
                                    style={styles.inputCenter}
                                    regular
                                >
                                    <Input
                                        style={{ fontSize: 12 }}
                                        placeholder='ĐẾN THÁNG'
                                        placeholderTextColor='#999999'
                                        underlineColorAndroid='transparent'
                                        // onChangeText={(text) => this.setState({ txtTo: text })}
                                        onChangeText={this.handleChangeFromInput.bind(this, index, 'to')}
                                        value={this.state.arrayCondition[index].to}
                                        keyboardType={'numeric'}
                                    />
                                </Item>
                            </Content>
                            <Content>
                                <Item
                                    style={styles.inputRight}
                                    regular
                                >
                                    <Input
                                        style={{ fontSize: 12 }}
                                        placeholder='LÃI SUẤT'
                                        placeholderTextColor='#999999'
                                        underlineColorAndroid='transparent'
                                        onChangeText={this.handleChangeFromInput.bind(this, index, 'percent')}
                                        value={this.state.arrayCondition[index].percent}
                                        keyboardType={'numeric'}
                                    />
                                </Item>
                            </Content>
                            <View
                                style={styles.labelBtn}
                            >
                                <Text style={styles.txtBtn}>%</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.btnClose}
                                onPress={this.subCondition.bind(this, index)}
                            >
                                <Text style={styles.txtBtn}>x</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    {/* <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    paddingTop: 5
                                }}
                            >
                                <Content>
                                    <Item
                                        style={styles.inputLeft}
                                        regular
                                    >
                                        <Input
                                            style={{ fontSize: 12 }}
                                            placeholder='TỪ THÁNG'
                                            placeholderTextColor='#999999'
                                            underlineColorAndroid='transparent'
                                            onChangeText={this.handleChangeFromInput.bind(this, rowData, 'from')}
                                            value={this.state.txtDate}
                                            keyboardType={'numeric'}
                                        />
                                    </Item>
                                </Content>
                                <Content>
                                    <Item
                                        style={styles.inputCenter}
                                        regular
                                    >
                                        <Input
                                            style={{ fontSize: 12 }}
                                            placeholder='ĐẾN THÁNG'
                                            placeholderTextColor='#999999'
                                            underlineColorAndroid='transparent'
                                            // onChangeText={(text) => this.setState({ txtTo: text })}
                                            onChangeText={this.handleChangeFromInput.bind(this, rowData, 'to')}
                                            value={this.state.txtTo}
                                            keyboardType={'numeric'}
                                        />
                                    </Item>
                                </Content>
                                <Content>
                                    <Item
                                        style={styles.inputRight}
                                        regular
                                    >
                                        <Input
                                            style={{ fontSize: 12 }}
                                            placeholder='LÃI SUẤT'
                                            placeholderTextColor='#999999'
                                            underlineColorAndroid='transparent'
                                            onChangeText={(text) => this.setState({ txtTime: text })}
                                            value={this.state.txtTime}
                                            keyboardType={'numeric'}
                                        />
                                    </Item>
                                </Content>
                                <View
                                    style={styles.labelBtn}
                                >
                                    <Text style={styles.txtBtn}>%</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.btnClose}
                                    onPress={this.subCondition.bind(this, rowData)}
                                >
                                    <Text style={styles.txtBtn}>x</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    /> */}
                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={this.addCondition.bind(this)}
                    >
                        <Text style={{ color: 'white', fontWeight: '500', marginHorizontal: 5, fontSize: 12, textAlign: 'center' }}>THÊM ĐIỀU KIỆN</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#333333', paddingTop: 15, fontSize: 12 }}>ÂN HẠN NỢ GỐC</Text>
                    <View style={styles.row}>
                        <Switch onValueChange={this.onCharge.bind(this)} value={this.state.graceDebt} />
                        <Content>
                            <Item
                                style={styles.inputItem}
                                regular
                            >
                                <Icon active name='ios-clock' style={{ color: '#75D2BE' }} />
                                <Input
                                    style={{ fontSize: 12 }}
                                    placeholder='THỜI GIAN ÂN HẠN'
                                    placeholderTextColor='#999999'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ txtTimeGrace: text })}
                                    value={this.state.txtTimeGrace}
                                    keyboardType={'numeric'}
                                />
                            </Item>
                        </Content>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>THÁNG</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.bigBtn}
                        onPress={this.onCalcDebt.bind(this)}
                    >
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 12, textAlign: 'center' }}>
                            TÍNH BÀI TOÁN TÀI CHÍNH
                            {/* { this.state.calculating ? <Container><Content ><Spinner /></Content></Container> : 'TÍNH BÀI TOÁN TÀI CHÍNH'} */}
                        </Text>
                    </TouchableOpacity>
                    <FlatList
                        horizontal={false}
                        ListHeaderComponent={this.renderHeader}
                        numColumns={5}
                        // contentContainerStyle={{ flexDirection: 'row' }}
                        data={this.state.result}
                        // renderItem={this.renderTable}
                        renderItem={({ item }) =>
                            <View key={item.key} style={styles.cell}>
                                <Text style={styles.textRow}>

                                    {item.key}
                                </Text>
                            </View>
                        }
                    />
                </ScrollView>

                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDatePicker}
                    datePickerModeAndroid='calendar'
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
    },
    txtHeader: { fontWeight: '600', fontSize: 14, color: '#333333' },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 5
    },
    inputItem: {
        borderColor: '#808080',
        height: 30,
        marginLeft: 0,
        width: '100%',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    rightBtn: {
        backgroundColor: '#F58319',
        justifyContent: 'center',
        width: '15%',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2
    },
    inputLeft: {
        borderColor: '#808080',
        borderWidth: 1,
        height: 30,
        borderRadius: 2,
        width: width / 4.2,
        marginLeft: 0
    },
    inputCenter: {
        borderColor: '#808080',
        borderWidth: 1,
        height: 30,
        borderRadius: 2,
        width: width / 4.2,
        marginLeft: 5
    },
    inputRight: {
        borderColor: '#808080',
        borderWidth: 1,
        height: 30,
        borderRadius: 2,
        width: width / 4.2,
        marginLeft: 10
    },
    labelBtn: {
        backgroundColor: '#F58319',
        justifyContent: 'center',
        width: '10%',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        marginRight: 5,
        marginLeft: 0
    },
    btnClose: {
        backgroundColor: 'gray',
        justifyContent: 'center',
        width: '5%',
        borderRadius: 2
    },
    btnAdd: {
        width: '100%',
        height: 30,
        borderRadius: 2,
        backgroundColor: 'gray',
        justifyContent: 'center',
        padding: 10,
        marginTop: 15,
    },
    txtBtn: { color: 'white', textAlign: 'center', fontSize: 10 },
    bigBtn: {
        height: 40,
        width: '100%',
        borderRadius: 2,
        backgroundColor: '#F58319',
        justifyContent: 'center',
        marginTop: 5,
    },
    headerRow: {
        width: '20%',
        height: 40,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    textHeader: { textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 12 },
    textRow: {
        textAlign: 'center',
        color: '#666',
        fontSize: 10
    },
    cell: {
        width: '20%',
        height: 30,
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
});
