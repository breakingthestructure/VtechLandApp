import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Picker,
    TextInput,
} from 'react-native';
import { Icon } from 'native-base';
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
            direction: '',
            kind: 'sell',
            options: [],
            level: '',
            txtSubmit: 'TÌM KIẾM'
        };
    }
    componentDidMount() {
        getOptionProjects()
            .then(resJson => {
                if (resJson) {
                    this.setState({
                        options: resJson.data,
                        loaded: true
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
                            // loaded: true,
                            districts: responseJson.data,
                            // district: '',
                            // ward: '',
                            // wards: [],
                            // street: '',
                            // streets: []
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
    onSelectKind(kind) {
        this.setState({ kind });
    }
    onSearch() {
        this.setState({ txtSubmit: 'Đang xử lý'})
        const { text, city, district, ward, street, direction, kind, level } = this.state;

        let query = '';
        if (text !== '') {
            query += `&text=${text}`;
        }
        if (city !== '') {
            query += `&city_id=${city}`;
        }
        if (district !== '') {
            query += `&district_id=${district}`;
        }
        if (ward !== '') {
            query += `&ward=${ward}`;
        }
        if (street !== '') {
            query += `&street=${street}`;
        }
        if (direction !== '') {
            query += `&direction=${direction}`;
        }
        // if (kind !== '') {
        //     query += `&kind=${kind}`;
        // }
        if (level !== '') {
            query += `&level=${level}`;
        }
        // if (type !== '') {
        //     query += `&type=${type}`;
        // }
        // if (min_price !== '') {
        //     query += `&min_price=${min_price}`;
        // }
        // if (max_price !== '') {
        //     query += `&max_price=${max_price}`;
        // }
        // if (page !== '') {
        //     query += `&page=${page}`;
        // }
        getProject(query)
            .then(resJson => {
                if (resJson.data) {
                    this.props.toggleAdvanceSearch(this.props.bounceValue, true, resJson.data);
                }
            })
            .catch(err => console.log(err));
    }
    _keyExtractor = (item, index) => item.id;
    render() {
        const { cities, districts, wards, streets, options } = this.state;
        if (!this.state.loaded || !cities || !options.length === 0 || !options.project_types) {
            return loading();
        }
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} title='TÌM KIẾM NÂNG CAO' back={'AnimateView'} toggleAdvanceSearch={this.props.toggleAdvanceSearch} bounceValue={this.props.bounceValue} />

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
                            buttonColor='#21a1fc'
                            borderColor='#cecece'
                            hasPadding
                            options={[
                                { label: 'Bán', value: 'sell' },
                                { label: 'Cho thuê', value: 'rent' }
                            ]}
                        />
                    </View>
                    <Text style={styles.titleSection}>Loại hình</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.optionAlone}
                        >
                            <Picker
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                                style={styles.picker}
                            >
                                {Object.keys(options.project_types).map(function (key) {
                                    return <Picker.Item key={key} label={options.project_types[key]} value={key} />
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
                    <Text style={styles.titleSection}>Tiện ích</Text>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='Hồ điều hòa, công viên nội khu...'
                            underlineColorAndroid='transparent'
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.bigBtnIcon}
                        onPress={this.onSearch.bind(this)}
                    // onPress={() => {
                    //     this.props.toggleAdvanceSearch(this.props.bounceValue, true);
                    // }}
                    >
                        <Icon name='ios-search' style={styles.iconBigBtn} />
                        <Text style={styles.textBtnIcon}>{this.state.txtSubmit}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View >
        );
    }
}
