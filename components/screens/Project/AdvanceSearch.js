import React, { Component } from 'react';
import {
    Text,
    Dimensions,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker,
    TextInput,
    Animated
} from 'react-native';
import { Container, Content, Item, Icon, Input, Spinner } from 'native-base';
import Header from './../Home/Header';
import getCities from './../../../api/getCities';
import getDistricts from './../../../api/getDistricts';
import getWards from './../../../api/getWards';
import getStreets from './../../../api/getStreets';
import { DIRECTIONS } from './../../../Globals';

const { width, height } = Dimensions.get('window');
const heightResult = 300;
const heightSearch = height - 15;

export default class AdvanceSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            cities: [],
            loaded: false,
            city: '',
            districts: [],
            district: '',
            wards: [],
            ward: '',
            streets: [],
            street: '',
            direction: '',
            bounceValue: new Animated.Value(heightSearch), //This is the initial position of the subview
            resultValue: new Animated.Value(heightResult),
            type: 'sell'
        };
    }
    componentDidMount() {
        getCities()
            .then(resJson => {
                if (resJson) {
                    // let result = Object.keys(resJson.data).map(function (key) {
                    //     return [Number(key), resJson.data[key]];
                    // });
                    this.setState({
                        cities: resJson.data,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }
    onSelectCity(idCity) {
        this.setState({ city: idCity });
        getDistricts(idCity)
            .then(resJson => {
                if (resJson) {
                    this.setState({
                        districts: resJson.data,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }
    onSelectDistrict(idDistrict) {
        this.setState({ district: idDistrict });
        getWards(idDistrict)
            .then(resJson => {
                if (resJson) {
                    this.setState({
                        wards: resJson.data,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
        getStreets(idDistrict)
            .then(resJson => {
                if (resJson) {
                    this.setState({
                        streets: resJson.data,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }
    onSelectType(type) {
        console.log(type);
        this.setState({ type });
    }
    render() {
        const { cities, districts, wards, streets } = this.state;
        if (!this.state.loaded && !cities) {
            return (
                <Container>
                    <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} title='Tìm kiếm nâng cao' />

                <ScrollView style={styles.wraper}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.onSelectType('sell')}
                            style={this.state.type === 'sell' ? styles.btnSellActive : styles.btnSellDeactive}
                        >
                            <Text style={this.state.type === 'sell' ? styles.textBtnActive : styles.textBtnDeactive}>BÁN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onSelectType('rent')}
                            style={this.state.type === 'rent' ? styles.btnRentActive : styles.btnRentDeactive}
                        >
                            <Text style={this.state.type === 'rent' ? styles.textBtnActive : styles.textBtnDeactive}>CHO THUÊ</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleGroup}>Dự án</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='Nhập tên dự án...'
                        underlineColorAndroid='transparent'
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />
                    <Text style={styles.titleGroup}>Loại hình</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.optionAlone}
                        >
                            <Picker
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                                style={styles.picker}
                            >
                                <Picker.Item label="Loại nhà đất" value="0" />
                                <Picker.Item label="Biệt thự" value="1" />
                                <Picker.Item label="Chung cư" value="1" />
                                <Picker.Item label="Liền kề" value="1" />
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleGroup}>Vị trí</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.city}
                                onValueChange={(itemValue, itemPosition) =>
                                    this.onSelectCity(itemValue)
                                }
                            >
                                <Picker.Item label="Tỉnh / Thành phố" value="0" />
                                {Object.keys(cities).map(function (key) {
                                    return <Picker.Item key={key} label={cities[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.district}
                                onValueChange={(itemValue, itemPosition) =>
                                    this.onSelectDistrict(itemValue)
                                }
                            >
                                <Picker.Item label="Quận / Huyện" value="0" />
                                {Object.keys(districts).map(function (key) {
                                    return <Picker.Item key={key} label={districts[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.ward}
                                onValueChange={(itemValue) => this.setState({ ward: itemValue })}
                            >
                                <Picker.Item label="Phường / Xã" value="0" />
                                {Object.keys(wards).map(function (key) {
                                    return <Picker.Item key={key} label={wards[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.street}
                                onValueChange={(itemValue) => this.setState({ street: itemValue })}
                            >
                                <Picker.Item label="Đường / Phố" value="0" />
                                {Object.keys(streets).map(function (key) {
                                    return <Picker.Item key={key} label={streets[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleGroup}>Phân khúc</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.optionAlone}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                            >
                                <Picker.Item label="Hạng A" value="0" />
                                <Picker.Item label="Hạng B" value="2" />
                                <Picker.Item label="Hạng C" value="3" />
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleGroup}>Tầm tài chính</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.optionAlone}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                            >
                                <Picker.Item label="20 Triệu / m2 Đến 30 Triệu / m2" value="0" />
                                <Picker.Item label="Dưới 1 tỉ" value="2" />
                                <Picker.Item label="1 đến 3 tỉ" value="3" />
                                <Picker.Item label="Trên 3 tỉ" value="3" />
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleGroup}>Tính chất sản phẩm</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.direction}
                                onValueChange={(itemValue) => this.setState({ direction: itemValue })}
                            >
                                <Picker.Item label="Hướng" value="0" />
                                {Object.keys(DIRECTIONS).map(function (key) {
                                    return <Picker.Item key={key} label={DIRECTIONS[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.kind}
                                onValueChange={(itemValue) => this.setState({ kind: itemValue })}
                            >
                                <Picker.Item label="Diện tích" value="0" />
                                <Picker.Item label="40 - 60 m2" value="2" />
                                <Picker.Item label="60 - 80 m2" value="3" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                            >
                                <Picker.Item label="Mặt tiền" value="0" />
                                <Picker.Item label="Dưới 1 tỉ" value="2" />
                                <Picker.Item label="1 đến 3 tỉ" value="3" />
                                <Picker.Item label="Trên 3 tỉ" value="3" />
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.kind}
                                onValueChange={(itemValue) => this.setState({ kind: itemValue })}
                            >
                                <Picker.Item label="Xây dựng" value="0" />
                                <Picker.Item label="40 - 60 m2" value="2" />
                                <Picker.Item label="60 - 80 m2" value="3" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.bedroom}
                                onValueChange={(itemValue) => this.setState({ bedroom: itemValue })}
                            >
                                <Picker.Item label="Số phòng ngủ" value="0" />
                                <Picker.Item label="1" value="2" />
                                <Picker.Item label="2" value="3" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="3" />
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.livingroom}
                                onValueChange={(itemValue) => this.setState({ livingroom: itemValue })}
                            >
                                <Picker.Item label="Số phòng khách" value="0" />
                                <Picker.Item label="1" value="2" />
                                <Picker.Item label="2" value="3" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="3" />
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleGroup}>Tiện ích</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='Hồ điều hòa, công viên nội khu...'
                        underlineColorAndroid='transparent'
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />
                    <TouchableOpacity
                        style={styles.btnSearch}
                        onPress={() => {
                            this.props.toggleAdvanceSearch(this.props.bounceValue, true);
                        }}
                    >
                        <Text style={styles.textBtnSearch}>TÌM KIẾM</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    wraper: { paddingHorizontal: 15, flex: 1 },
    iconStyle: { width: 15, height: 15 },
    inputStyle: {
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#cecece',
        backgroundColor: '#fff'
    },
    btnSellActive: {
        width: (width - 50) / 2,
        height: 30,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#177dba',
        marginTop: 15,
    },
    btnSellDeactive: {
        width: (width - 50) / 2,
        height: 30,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#d7d7d7',
        marginTop: 15,
    },
    btnRentActive: {
        width: (width - 50) / 2,
        height: 30,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#177dba',
        marginTop: 15
    },
    btnRentDeactive: {
        width: (width - 50) / 2,
        height: 30,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#d7d7d7',
        marginTop: 15
    },
    textBtnActive: { fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff', fontWeight: '600' },
    textBtnDeactive: { fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#666', fontWeight: '600' },
    titleGroup: { fontSize: 14, paddingTop: 5, color: '#000', fontWeight: '600' },
    rowOption: { justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingTop: 5 },
    option: {
        borderWidth: 1,
        borderColor: '#33563743',
        width: '48%',
        marginTop: 5,
        borderRadius: 2,
        backgroundColor: 'white',
        height: 40
    },
    optionAlone: {
        borderWidth: 1,
        borderColor: '#33563743',
        width: '100%',
        borderRadius: 2,
        backgroundColor: 'white',
        height: 40
    },
    btnSearch: { backgroundColor: '#F58319', height: 40, borderRadius: 5, marginTop: 10, marginBottom: 10, justifyContent: 'center' },
    textBtnSearch: { textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 16 },
    picker: { height: 40 }
});
