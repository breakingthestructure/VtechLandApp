import React, { Component } from 'react';
import { FlatList, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker, Icon } from 'native-base';
import SwitchSelector from 'react-native-switch-selector';
import Header from './../Home/Header';
import getCities from './../../../api/getCities';
import getDistricts from './../../../api/getDistricts';
import getWards from './../../../api/getWards';
import getStreets from './../../../api/getStreets';
import styles from './../../../styles';
import getOptionProjects from './../../../api/getOptionProjects';
import { loading } from './../../../Helpers';
import getProject from './../../../api/getProject';

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
            direction: 'east',
            kind: 1,
            options: [],
            level: '1',
            txtSubmit: 'TÌM KIẾM',
            feature: {},
            arrFeature: [],
            type: '1',
            area: '',
            minPrice: '',
            maxPrice: ''
        };
    }
    componentDidMount() {
        getOptionProjects()
            .then(resJson => {
                if (resJson) {
                    const arrFeature = Object.keys(resJson.data.project_features).map((item, index) => {
                        return { key: item, value: resJson.data.project_features[item] };
                    });
                    this.setState({
                        options: resJson.data,
                        loaded: true,
                        arrFeature,
                        feature: resJson.data.project_features
                    });
                }
            })
            .catch(err => console.log(err));
        getCities()
            .then(resJson => {
                if (resJson) {
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
        if (idCity) {
            getDistricts(idCity)
                .then(responseJson => {
                    if (responseJson.status === 200) {
                        this.setState({
                            districts: responseJson.data,
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    }
    onSelectDistrict(idDistrict) {
        if (idDistrict) {
            getWards(idDistrict)
                .then(resJson => {
                    if (resJson.status === 200) {
                        this.setState({
                            wards: resJson.data,
                            loaded: true
                        });
                    }
                    this.setState({ district: idDistrict });
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
    }
    onSearch() {
        this.setState({ txtSubmit: 'Đang xử lý' });
        const { text, city, district, ward, street, direction, kind, level, type, area, minPrice, maxPrice } = this.state;
        let query = '';
        if (text !== '') {
            query += `&key_word=${text}`;
        }
        if (city !== '') {
            query += `&city_id=${city}`;
        }
        if (district !== '') {
            query += `&district_id=${district}`;
        }
        if (ward !== '') {
            query += `&ward_id=${ward}`;
        }
        if (street !== '') {
            query += `&street_id=${street}`;
        }
        if (direction !== '') {
            query += `&direction=${direction}`;
        }
        if (kind !== '') {
            query += `&kind=${kind}`;
        }
        if (level !== '') {
            query += `&level=${level}`;
        }
        if (type !== '') {
            query += `&type=${type}`;
        }
        if (area !== '') {
            query += `&area=${area}`;
        }
        if (minPrice !== '') {
            query += `&min_price=${minPrice}`;
        }
        if (maxPrice !== '') {
            query += `&max_price=${maxPrice}`;
        }
        Object.keys(this.state.feature).filter(e => {
            if (this.state.feature[e] === '1') {
                query += `&features[]=${e}`;
            }
            return query;
        });
        // if (page !== '') {
        //     query += `&page=${page}`;
        // }
        console.log(query);
        getProject(query)
            .then(resJson => {
                if (resJson.data) {
                    this.setState({ txtSubmit: 'TÌM KIẾM' });
                    this.props.toggleAdvanceSearch(this.props.bounceValue, true, resJson.data);
                }
            })
            .catch(err => console.log(err));
    }

    _keyExtractor = (item, index) => index.toString(); //eslint-disable-line
    render() {
        const { cities, districts, wards, streets, options } = this.state;
        if (!this.state.loaded || !cities || !options.length === 0 || !options.project_types) {
            return loading();
        }
        return (
            <View style={{ flex: 1 }}>
                <Header
                    navigation={this.props.navigation}
                    title='TÌM KIẾM NÂNG CAO'
                    back={'hideAdvanceSearch'}
                    toggleAdvanceSearch={this.props.toggleAdvanceSearch}
                    bounceValue={this.props.bounceValue}
                />

                <ScrollView style={styles.content}>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='Nhập tên dự án...'
                            underlineColorAndroid='transparent'
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                            autoFocus
                            ref={(input) => { this.nameProject = input; }}
                        />
                    </View>
                    <Text style={styles.titleScreen}>Tìm kiếm nâng cao</Text>
                    <View style={{ paddingTop: 10 }}>
                        <SwitchSelector
                            initial={0}
                            onPress={value => this.setState({ kind: value })}
                            textColor='#21a1fc' //'#7a44cf'
                            selectedColor='white'
                            buttonColor='#F58319'
                            borderColor='#cecece'
                            hasPadding
                            options={[
                                { label: 'Bán', value: 1 },
                                { label: 'Cho thuê', value: 2 }
                            ]}
                        />
                    </View>
                    <Text style={styles.titleSection}>Loại hình</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.optionAlone}
                        >
                            <Picker
                                iosHeader="Loại dự án"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                // headerStyle={{ backgroundColor: '#F58319'}}
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                                style={styles.picker}
                            >
                                {Object.keys(options.project_types).map(function (key) {
                                    return (
                                        <Picker.Item
                                            key={key}
                                            label={options.project_types[key]}
                                            value={key}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Vị trí</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                iosHeader="Tỉnh / Thành phố"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                style={styles.picker}
                                selectedValue={this.state.city}
                                onValueChange={(itemValue) =>
                                    this.onSelectCity(itemValue)
                                }
                            >
                                <Picker.Item label="Tỉnh / Thành phố" value="" />
                                {Object.keys(cities).map(function (key) {
                                    return <Picker.Item key={key} label={cities[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                iosHeader="Quận / Huyện"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                style={styles.picker}
                                selectedValue={this.state.district}
                                onValueChange={(itemValue) =>
                                    this.onSelectDistrict(itemValue)
                                }
                            >
                                <Picker.Item label="Quận / Huyện" value="" />
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
                                iosHeader="Phường / Xã"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                style={styles.picker}
                                selectedValue={this.state.ward}
                                onValueChange={(itemValue) => this.setState({ ward: itemValue })}
                            >
                                <Picker.Item label="Phường / Xã" value="" />
                                {Object.keys(wards).map(function (key) {
                                    return <Picker.Item key={key} label={wards[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                iosHeader="Đường / Phố"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                style={styles.picker}
                                selectedValue={this.state.street}
                                onValueChange={(itemValue) => this.setState({ street: itemValue })}
                            >
                                <Picker.Item label="Đường / Phố" value="" />
                                {Object.keys(streets).map(function (key) {
                                    return <Picker.Item key={key} label={streets[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Phân khúc</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.optionAlone}
                        >
                            <Picker
                                style={styles.picker}
                                iosHeader="Phân khúc"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                selectedValue={this.state.level}
                                onValueChange={(itemValue) => this.setState({ level: itemValue })}
                            >
                                {Object.keys(options.project_levels).map(function (key) {
                                    return <Picker.Item key={key} label={options.project_levels[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Tầm tài chính</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Từ'
                                underlineColorAndroid='transparent'
                                value={this.state.minPrice}
                                onChangeText={text => this.setState({ minPrice: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Đến'
                                underlineColorAndroid='transparent'
                                value={this.state.maxPrice}
                                onChangeText={text => this.setState({ maxPrice: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Tính chất sản phẩm</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.direction}
                                onValueChange={(itemValue) => this.setState({ direction: itemValue })}
                            >
                                {Object.keys(options.directions).map(function (key) {
                                    return <Picker.Item key={key} label={options.directions[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Diện tích'
                                underlineColorAndroid='transparent'
                                value={this.state.area}
                                onChangeText={text => this.setState({ area: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Mặt tiền'
                                underlineColorAndroid='transparent'
                                value={this.state.facade}
                                onChangeText={text => this.setState({ facade: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Diện tích xây dựng'
                                underlineColorAndroid='transparent'
                                value={this.state.buildArea}
                                onChangeText={text => this.setState({ buildArea: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Số phòng ngủ'
                                underlineColorAndroid='transparent'
                                value={this.state.bedroom}
                                onChangeText={text => this.setState({ bedroom: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Số phòng khách'
                                underlineColorAndroid='transparent'
                                value={this.state.livingroom}
                                onChangeText={text => this.setState({ livingroom: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Tiện ích</Text>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        numColumns={2}
                        data={this.state.arrFeature}
                        contentContainerStyle={{ width: '100%' }}
                        renderItem={({ item }) => (
                            <View
                                key={item.key}
                                style={{
                                    marginLeft: 0,
                                    width: '50%',
                                    flexDirection: 'row',
                                    marginBottom: 5,
                                    left: 0
                                }}
                            >
                                <Switch
                                    color="#177dba"
                                    onValueChange={() => {
                                        const arr = this.state.feature;
                                        arr[item.key] = '1';
                                        this.setState({ feature: arr });
                                    }}
                                    value={this.state.feature[item.key] === '1'}
                                />
                                <Text style={{ marginLeft: 10 }}> {item.value}</Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.bigBtnIcon}
                        onPress={this.onSearch.bind(this)}
                    >
                        <Icon name='ios-search' style={styles.iconBigBtn} />
                        <Text style={styles.textBtnIcon}>{this.state.txtSubmit}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View >
        );
    }
}
