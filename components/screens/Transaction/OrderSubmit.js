import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    BackHandler,
    TextInput,
    Switch,
    Keyboard
} from 'react-native';

import { Container, Content, Spinner, Item, Input, ListItem, CheckBox, Body, Icon } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import Header from '../Home/Header';
import styles from './../../../styles';
import { loading } from '../../../Helpers';

const { width } = Dimensions.get('window');

export default class OrderSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            phone: '',
            identity: '',
            day_identity: '',
            where_identity: '',
            loaded: false,
            txtMoney: ''
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.setState({ loaded: true });
    }
    handleBackPress = () => { //eslint-disable-line
        this.props.navigation.navigate('TablePackageScreen');
        return true;
    }
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} title='GIAO DỊCH CĂN A0501' back={'ok'} />
                <ScrollView style={styles.content}>
                    <Text style={styles.titleScreen}>PHIẾU ĐẶT CỌC</Text>
                    <Text style={styles.txtHeader}>Thông tin sản phẩm</Text>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>Mã căn</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>A0502</Text>
                        </View>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>Diện tích</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>72</Text>
                            <Text style={{ fontSize: 14 }}> m2</Text>
                        </View>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>Đơn giá</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>30</Text>
                            <Text style={{ fontSize: 14 }}> tr/m2</Text>
                        </View>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>Tổng tiền (trước chiết khấu)</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>2.577.300.000</Text>
                            <Text style={{ fontSize: 14 }}> VNĐ</Text>
                        </View>
                    </View>
                    <Text style={styles.txtHeader}>Thông tin khách hàng</Text>

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
                            value={this.state.txtMoney}
                            type={'money'}
                            options={{ unit: '', precision: 0, separator: ' ' }}
                            style={styles.inputMoney}
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
                            <CheckBox checked={true} />
                            <Body>
                                <Text> Thanh toán tại sàn</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0 }}>
                            <CheckBox checked={false} />
                            <Body>
                                <Text> Thanh toán qua chuyển khoản ngân hàng</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 0 }}>
                            <CheckBox checked={false} />
                            <Body>
                                <Text> Thanh toán online qua ứng dụng</Text>
                            </Body>
                        </ListItem>
                    </View>
                    <View style={styles.groupInline}>
                        <TouchableOpacity style={styles.btnSubmitSquareInline}>
                            <Icon type="FontAwesome" name='save' style={styles.iconBigBtn} />
                            <Text style={styles.textBtnIcon}>ĐẶT CỌC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnDeleteSquareInline}>
                            <Icon type="FontAwesome" name='trash-o' style={styles.iconBigBtn} />
                            <Text style={styles.textBtnIcon}>HỦY</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        );
    }
}
