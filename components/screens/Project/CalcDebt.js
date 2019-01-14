import React from 'react';
import {
    Dimensions,
    FlatList,
    Switch,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import {
    Icon,
    Picker,
    Toast
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { MaskService } from 'react-native-masked-text';
import {
    formatMoney,
    getDayNextMonth,
    loading
} from './../../../Helpers';
import styles from './../../../styles';

const {
    width,
} = Dimensions.get('window');

export default class CalcDebt extends React.Component {
    state = {
        isDatePickerVisible: false,
    };
    showDatePicker = () => this.setState({ isDatePickerVisible: true }); //eslint-disable-line
    hideDatePicker = () => this.setState({ isDatePickerVisible: false }); //eslint-disable-line
    handleDatePicked = (date) => { //eslint-disable-line
        const selected = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
        this.setState({ txtDate: selected, date });
        this.hideDatePicker();
    };
    renderHeader = () => { //eslint-disable-line
        return (
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#F68121',
                    borderRadius: 2,
                    justifyContent: 'center',
                    marginTop: 10
                }}
            >
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
    handleChangeFromInput = (index, type, text) => { //eslint-disable-line
        const newArray = this.state.arrayCondition;
        newArray[index][type] = text;
        this.setState({ arrayCondition: newArray });
    }

    constructor(props) {
        super(props);
        // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            modeDebt: '',
            txtMoney: '',
            txtMonth: '',
            txtDate: 'NGÀY DẢI NGÂN',
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
            calculating: false,
            txtSubmit: 'TÍNH BÀI TOÁN TÀI CHÍNH'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 1000);
    }

    onSelectMode(value) {
        this.setState({
            modeDebt: value
        });
    }

    onCharge() {
        this.setState({
            graceDebt: (!this.state.graceDebt)
        });
    }

    addCondition() {
        const arr = this.state.arrayCondition;
        if (arr[arr.length - 1].to === '') {
            return Toast.show({
                text: 'Bạn chưa nhập tháng của điều kiện trước!',
                type: 'warning',
                buttonText: 'Okay'
            });
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
            return Toast.show({
                text: 'Phải có ít nhất 1 điều kiện!',
                type: 'warning',
                buttonText: 'Okay'
            });
        }
    }

    onCalcDebt() {
        const { modeDebt, txtMoney, txtMonth, graceDebt, arrayCondition, txtTimeGrace, date } = this.state;
        const moneyDebt = txtMoney.split('.').join('');
        let interestRateMonthly = 0;
        let totalMonthly = 0;
        // if (graceDebt) {
        //     interestRate = 0;
        // }
        let rootHavePay = moneyDebt;
        const result = [];
        if (!date) {
            return Toast.show({
                text: 'Bạn chưa chọn ngày!',
                type: 'warning',
                buttonText: 'Okay'
            });
        }
        if (parseInt(moneyDebt) === 0) {
            return Toast.show({
                text: 'Bạn chưa nhập số tiền vay!',
                type: 'warning',
                buttonText: 'Okay'
            });
        }
        if (modeDebt === '' || parseInt(modeDebt) === 0) {
            return Toast.show({
                text: 'Bạn chưa chọn hình thức vay!',
                type: 'warning',
                buttonText: 'Okay'
            });
        }
        if (parseInt(txtTimeGrace) > parseInt(txtMonth)) {
            return Toast.show({
                text: 'Thời gian ân hạn không được lớn hơn số tháng vay!',
                type: 'warning',
                buttonText: 'Okay'
            });
        }
        let totalMonthCondition = 0;
        let percent = 0;
        this.setState({ calculating: true, txtSubmit: 'Đang xử lý' });
        arrayCondition.map((condition, index) => {
            if (index === 0 && parseInt(condition.from) !== 1) {
                Toast.show({
                    text: 'Điều kiện: Tháng bắt đầu phải là 1',
                    type: 'warning',
                    buttonText: 'Okay'
                });
                return false;
            }
            if (arrayCondition.length === (index + 1)
                && parseInt(condition.to) !== parseInt(txtMonth)) {
                Toast.show({
                    text: 'Điều kiện: Tháng kết thúc phải là tổng số tháng',
                    type: 'warning',
                    buttonText: 'Okay'
                });
                return false;
            }
            if (condition.from === '' || condition.to === '') {
                return false;
            }
            totalMonthCondition += condition.to - condition.from + 1;

            if (arrayCondition.length === (index + 1)
                && totalMonthCondition !== parseInt(txtMonth)) {
                Toast.show({
                    text: 'Điều kiện: Tổng số tháng không khớp với điều kiện',
                    type: 'warning',
                    buttonText: 'Okay'
                });
                return false;
            }
        });
        let payRootMonthly = 0;
        for (let i = 1; i <= txtMonth; i++) {
            arrayCondition.map(condition => {
                if (condition.from === '' || condition.to === '' || condition.percent === '') {
                    return;
                }
                if (i >= condition.from && i <= condition.to) {
                    return percent = condition.percent;
                }
            });
            payRootMonthly = moneyDebt / txtMonth;
            if (graceDebt && i <= parseInt(txtTimeGrace)) {
                payRootMonthly = 0;
            }
            if (parseInt(modeDebt) === 1) {
                interestRateMonthly = rootHavePay / 12 * percent / 100;
            } else {
                interestRateMonthly = moneyDebt / 12 * percent / 100;
            }
            totalMonthly = interestRateMonthly + payRootMonthly;
            rootHavePay = rootHavePay - payRootMonthly;
            let payDay = getDayNextMonth(date, i);
            result.push(
                { key: payDay },
                { key: formatMoney(payRootMonthly, 0) },
                { key: formatMoney(interestRateMonthly, 0) },
                { key: formatMoney(totalMonthly, 0) },
                { key: formatMoney(rootHavePay, 0) }
            );
        }
        this.setState({ result, calculating: false, txtSubmit: 'TÍNH BÀI TOÁN TÀI CHÍNH' });
    }

    setFormatMoney(text) {
        const money = MaskService.toMask('money', text, {
            unit: '',
            separator: ' ',
            precision: 0
        });
        this.setState({ txtMoney: money });
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.content}>
                <Text style={styles.txtHeader}>TÍNH LÃI SUẤT VAY DỰ ÁN</Text>
                <Text style={{ color: '#333333' }}>Vui lòng nhập các tham số cần thiết</Text>
                <View>
                    <View
                        style={styles.item}
                    >
                        <View
                            style={{
                                height: 40,
                                width: '85%',
                                borderColor: '#33563743',
                                borderWidth: 1,
                                flexDirection: 'row',
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                borderLeftWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                alignItems: 'center'
                            }}
                        >
                            <Icon
                                active
                                name='ios-cash'
                                style={{
                                    color: 'orange',
                                    fontSize: 24,
                                    paddingLeft: 10
                                }}
                            />
                            <TextInput
                                style={{ height: 40, width: '95%', paddingLeft: 15, fontSize: 12 }}
                                placeholder='SỐ TIỀN VAY'
                                placeholderTextColor='#999999'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => {
                                    this.setFormatMoney(text);
                                }}
                                keyboardType={'numeric'}
                                value={this.state.txtMoney}
                            />
                        </View>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>VND</Text>
                        </View>
                    </View>
                    <View
                        style={styles.item}
                    >
                        <View
                            style={{
                                height: 40,
                                width: '85%',
                                borderColor: '#33563743',
                                borderWidth: 1,
                                flexDirection: 'row',
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                borderLeftWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                alignItems: 'center'
                            }}
                        >
                            <Icon
                                active
                                name='ios-clock'
                                style={{
                                    color: 'orange',
                                    fontSize: 24,
                                    paddingLeft: 10
                                }}
                            />
                            <TextInput
                                style={{ height: 40, width: '95%', paddingLeft: 15, fontSize: 12 }}
                                placeholder='THỜI GIAN VAY'
                                placeholderTextColor='#999999'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({ txtMonth: text })}
                                value={this.state.txtMonth}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>THÁNG</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            this.showDatePicker();
                        }}
                    >
                        <View
                            style={{
                                borderColor: '#33563743',
                                height: 40,
                                marginLeft: 0,
                                width: '85%',
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                borderLeftWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            regular
                        >
                            <Icon
                                active
                                name='ios-calendar'
                                style={{
                                    color: 'orange',
                                    marginLeft: 10,
                                    fontSize: 22,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    marginLeft: 15,
                                    alignSelf: 'center',
                                }}
                            >
                                {this.state.txtDate}
                            </Text>
                        </View>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>NGÀY</Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={styles.groupPickerIcon}
                    >
                        <View
                            style={styles.sectionPickerIcon}
                        >
                            <Icon
                                type="FontAwesome"
                                name="list-alt"
                                style={{
                                    color: 'orange',
                                    marginLeft: 10,
                                    fontSize: 19,
                                }}
                            />
                            <Picker
                                style={{
                                    width: width / 1.2,
                                    height: 35
                                }}
                                textStyle={{ fontSize: 14 }}
                                iosHeader="Hình thức vay"
                                placeholder="Chọn hình thức vay"
                                selectedValue={this.state.modeDebt}
                                onValueChange={this.onSelectMode.bind(this)}
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                            >
                                <Picker.Item label="Chọn hình thức vay" value="" />
                                <Picker.Item label="Dư nợ giảm dần" value="1" />
                                <Picker.Item label="Dư nợ ban đầu" value="2" />
                            </Picker>
                        </View>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>
                                <Icon name="ios-arrow-down" style={{ color: 'white' }} />
                            </Text>
                        </View>
                    </View>
                    <Text style={{ color: '#333333', fontSize: 12, paddingTop: 10 }}>BÀI TOÁN LÃI SUẤT</Text>
                    {this.state.arrayCondition.map((rowData, index) => (
                        <View
                            key={index}
                            style={styles.calcCondition}
                        >
                            <View
                                style={styles.inputLeft}
                            >
                                <Text style={{ fontSize: 12, paddingLeft: 10, color: '#000' }}>
                                    {this.state.arrayCondition[index].from}
                                </Text>
                            </View>
                            <TextInput
                                style={styles.inputCenter}
                                placeholder='ĐẾN THÁNG'
                                placeholderTextColor='#999999'
                                underlineColorAndroid='transparent'
                                // onChangeText={(text) => this.setState({ txtTo: text })}
                                onChangeText={this.handleChangeFromInput.bind(this, index, 'to')}
                                value={this.state.arrayCondition[index].to}
                                keyboardType={'numeric'}
                            />
                            <TextInput
                                style={styles.inputRight}
                                placeholder='LÃI SUẤT'
                                placeholderTextColor='#999999'
                                underlineColorAndroid='transparent'
                                onChangeText={this.handleChangeFromInput.bind(this, index, 'percent')}
                                value={this.state.arrayCondition[index].percent}
                                keyboardType={'numeric'}
                            />
                            <View
                                style={styles.labelBtn}
                            >
                                <Text style={styles.txtBtn}>%</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.closeCondition}
                                onPress={this.subCondition.bind(this, index)}
                            >
                                <Icon
                                    type="FontAwesome"
                                    name='minus'
                                    style={{
                                        fontSize: 14,
                                        color: 'white',
                                        marginRight: 5
                                    }}
                                />
                                {/*<Text style={styles.txtBtn}>x</Text>*/}
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity
                        style={styles.bigBtnIconSuccess}
                        onPress={this.addCondition.bind(this)}
                    >
                        <Icon
                            type="FontAwesome"
                            name='plus'
                            style={styles.iconBigBtn}
                        />
                        <Text style={styles.textBtnIcon}>
                            THÊM ĐIỀU KIỆN
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: '#333333',
                            paddingTop: 15,
                            fontSize: 12
                        }}
                    >
                        ÂN HẠN NỢ GỐC
                    </Text>
                    <View style={styles.item}>
                        <Switch
                            onValueChange={this.onCharge.bind(this)}
                            value={this.state.graceDebt}
                            style={{ height: 40 }}
                        />
                        <View
                            style={styles.inputItem}
                            regular
                        >
                            <Icon
                                active
                                name='ios-clock'
                                style={{
                                    color: 'orange',
                                    fontSize: 24,
                                    paddingLeft: 10,
                                    paddingTop: 5
                                }}
                            />
                            <TextInput
                                style={{ fontSize: 12, marginLeft: 10 }}
                                placeholder='THỜI GIAN ÂN HẠN'
                                placeholderTextColor='#999999'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({ txtTimeGrace: text })}
                                value={this.state.txtTimeGrace}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>THÁNG</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.bigBtnIcon}
                        onPress={this.onCalcDebt.bind(this)}
                    >
                        <Icon name='ios-calculator' style={styles.iconBigBtn} />
                        <Text style={styles.textBtnIcon}>
                            {this.state.txtSubmit}
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
                                <Text style={styles.textCell}>

                                    {item.key}
                                </Text>
                            </View>
                        }
                    />
                </View>

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
