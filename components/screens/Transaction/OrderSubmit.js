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
    Switch
} from 'react-native';

import { Container, Content, Spinner, Item, Input } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import Header from '../Home/Header';

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
            return (
                <Container>
                    <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Header navigation={this.props.navigation} title='GIAO DỊCH CĂN A0501' />
                <Text style={{ fontWeight: '600', fontSize: 18, textAlign: 'center', color: '#053654', paddingTop: 10 }}>PHIẾU ĐẶT CỌC</Text>
                <ScrollView style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>Thông tin sản phẩm</Text>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderStyle: 'dotted',
                            borderBottomColor: '#959595',
                            marginTop: 10
                        }}
                    >
                        <Text style={{ fontSize: 14 }}>Mã căn</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>A0502</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderStyle: 'dotted',
                            borderBottomColor: '#959595',
                            marginTop: 10
                        }}
                    >
                        <Text style={{ fontSize: 14 }}>Diện tích</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>72</Text>
                            <Text style={{ fontSize: 14 }}> m2</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderStyle: 'dotted',
                            borderBottomColor: '#959595',
                            marginTop: 10
                        }}
                    >
                        <Text style={{ fontSize: 14 }}>Đơn giá</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>30</Text>
                            <Text style={{ fontSize: 14 }}> tr/m2</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderStyle: 'dotted',
                            borderBottomColor: '#959595',
                            marginTop: 10
                        }}
                    >
                        <Text style={{ fontSize: 14 }}>Tổng tiền (trước chiết khấu)</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>2.577.300.000</Text>
                            <Text style={{ fontSize: 14 }}> VNĐ</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', paddingTop: 10 }}>Thông tin khách hàng</Text>
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
                            style={{
                                height: 40,
                                marginBottom: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: '#cecece',
                                width: '48%'
                            }}
                            placeholder='Ngày cấp'
                            underlineColorAndroid='transparent'
                            value={this.state.identity}
                            onChangeText={text => this.setState({ identity: text })}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                marginBottom: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: '#cecece',
                                width: '48%'
                            }}
                            placeholder='Nơi cấp'
                            underlineColorAndroid='transparent'
                            value={this.state.identity}
                            onChangeText={text => this.setState({ identity: text })}
                        />
                    </View>
                    <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', paddingTop: 10 }}>
                        Số tiền và phương thức thanh toán tiền cọc
                    </Text>
                    <View style={styles.row}>
                        <View style={{ backgroundColor: '#1f7eb8', height: '100%', width: '40%', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', textAlign: 'center' }}>
                                Số tiền đặt cọc (*)
                            </Text>
                        </View>

                        <TextInputMask
                            value={this.state.txtMoney}
                            type={'money'}
                            options={{ unit: '', suffixUnit: 'VND', precision: 0, separator: ' ' }}
                            style={{ fontSize: 12, width: '45%', borderWidth: 1, borderColor: '#cecece' }}
                        />
                        <View
                            style={styles.rightBtn}
                        >
                            <Text style={styles.txtBtn}>VND</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 12, color: '#555', paddingTop: 10 }}>
                        (Lưu ý số tiền đặt cọc tối thiểu 20.000.000 vnd)
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Switch style={{ marginTop: 5 }} />
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', paddingTop: 10 }}>
                            Thanh toán tại sàn
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Switch style={{ marginTop: 5 }} />
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', paddingTop: 10 }}>
                            Thanh toán qua chuyển khoản ngân hàng
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Switch style={{ marginTop: 5 }} />
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '400', paddingTop: 10 }}>
                            Thanh toán online qua ứng dụng
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }}>
                        <TouchableOpacity style={{ width: (width - 50) / 2, height: 30, borderRadius: 15, backgroundColor: '#177dba', marginTop: 5 }}>
                            <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}>ĐẶT CỌC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: (width - 50) / 2, height: 30, borderRadius: 15, backgroundColor: '#464646', marginTop: 5 }}>
                            <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}>HỦY</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
    },
    inputStyle: {
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#cecece'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        height: 40,
    },
    rightBtn: {
        backgroundColor: '#F58319',
        justifyContent: 'center',
        width: '15%',
    },
    txtBtn: { color: 'white', textAlign: 'center', fontSize: 10 },
});
