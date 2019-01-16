import React, { Component } from 'react';
import {
    Animated,
    FlatList,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Icon,
    Picker,
    Container,
    Content,
    Spinner
} from 'native-base';
import SwitchSelector from 'react-native-switch-selector';
import Autocomplete from 'react-native-autocomplete-input';
import Modal from 'react-native-modal';
import Header from './../Home/Header';
import getCities from './../../../api/getCities';
import getDistricts from './../../../api/getDistricts';
import getWards from './../../../api/getWards';
import getStreets from './../../../api/getStreets';
import styles from './../../../styles';
import { loading } from './../../../Helpers';
import getProject from './../../../api/getProject';
import getLocalOption from './../../../api/getLocalOption';

export default class AdvanceSearch extends Component {
    _keyExtractor = (item, index) => index.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
            kind: 1,
            options: [],
            level: '',
            txtSubmit: 'TÌM KIẾM',
            feature: {},
            arrFeature: [],
            type: '',
            area: '',
            minPrice: '',
            maxPrice: '',
            resultValue: new Animated.Value(40),
            isHidden: true,
            listProject: []
        };
    }

    componentDidMount() {
        getProject()
            .then(resJson => {
                if (resJson.data) {
                    this.setState({
                        listProject: resJson.data
                    });
                }
            })
            .catch(err => console.log(err));
        getLocalOption()
            .then(res => {
                if (res) {
                    const arrFeature = Object.keys(res.project_features).map((item) => {
                        return { key: item, value: res.project_features[item] };
                    });
                    this.setState({
                        options: res,
                        loaded: true,
                        arrFeature,
                        feature: res.project_features
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
        this.setState({ txtSubmit: 'Đang xử lý', isHidden: true, isLoadingModal: true });
        this.toggleQuickSearch(true);
        const {
            name,
            city,
            district,
            ward,
            street,
            direction,
            kind,
            level,
            type,
            area,
            minPrice,
            maxPrice
        } = this.state;
        let query = '';
        if (name !== '') {
            query += `&keyword=${name}`;
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
                    this.setState({ txtSubmit: 'TÌM KIẾM', isLoadingModal: false });
                    this.props.toggleAdvanceSearch(this.props.bounceValue, true, resJson.data);
                }
            })
            .catch(err => console.log(err));
    }

    findProject(name) {
        if (name === '') {
            return [];
        }
        // getProject(`&keyword=${name}`)
        //     .then(resJson => {
        //         this.setState({
        //             listProject: resJson.data
        //         });
        //     })
        //     .catch(err => console.log(err));
        const { listProject } = this.state;
        const regex = new RegExp(`${name.trim()}`, 'i');
        // const regex = new RegExp(`${query.trim().replace(/[-[]/{}()*+?.\^$|]/g, "\$&")}}`, 'i');
        return listProject.filter(project => project.name.search(regex) >= 0);
    }

    toggleQuickSearch(wantHide) {
        let toValue = 300;
        if (this.state.name === '' || wantHide) {
            toValue = 40;
        }
        Animated.spring(
            this.state.resultValue,
            {
                toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
    }

    render() {
        const { name } = this.state;
        // const listProject = this.findProject(name);
        // const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

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
                    {/*<Animated.View*/}
                    {/*style={*/}
                    {/*[styles.viewAutocomplete,*/}
                    {/*{ height: this.state.resultValue }]*/}
                    {/*}*/}
                    {/*// style={{*/}
                    {/*//     position: 'relative',*/}
                    {/*//     height: 40,*/}
                    {/*// }}*/}
                    {/*>*/}
                    {/*<Autocomplete*/}
                    {/*containerStyle={*/}
                    {/*this.state.isHidden ?*/}
                    {/*styles.autocompleteContainerFull :*/}
                    {/*styles.autocompleteContainer*/}
                    {/*}*/}
                    {/*inputContainerStyle={{*/}
                    {/*borderWidth: 0,*/}
                    {/*}}*/}
                    {/*listStyle={styles.autocompleteResult}*/}
                    {/*// autoCapitalize="none"*/}
                    {/*// autoCorrect*/}
                    {/*defaultValue={name}*/}
                    {/*onChangeText={text => this.setState({ name: text })}*/}
                    {/*data={*/}
                    {/*listProject.length === 1 && comp(name, listProject[0].name)*/}
                    {/*? [] : listProject*/}
                    {/*}*/}
                    {/*renderTextInput={() => (*/}
                    {/*<View*/}
                    {/*style={{*/}
                    {/*flexDirection: 'row',*/}
                    {/*justifyContent: 'space-between'*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<TextInput*/}
                    {/*style={{*/}
                    {/*height: 40,*/}
                    {/*width: '90%',*/}
                    {/*marginLeft: 15,*/}
                    {/*}}*/}
                    {/*placeholder='Nhập tên dự án...'*/}
                    {/*underlineColorAndroid='transparent'*/}
                    {/*value={this.state.name}*/}
                    {/*onChangeText={text => {*/}
                    {/*this.setState({*/}
                    {/*name: text,*/}
                    {/*isHidden: false*/}
                    {/*}, () => {*/}
                    {/*let hide = false;*/}
                    {/*// if (this.state.name === '') {*/}
                    {/*//     this.setState({ isHidden: true }, () => {*/}
                    {/*//     });*/}
                    {/*//     hide = true;*/}
                    {/*// }*/}
                    {/*// if (listProject.length === 0) {*/}
                    {/*//     hide = true;*/}
                    {/*// }*/}
                    {/*this.toggleQuickSearch(hide);*/}
                    {/*});*/}

                    {/*}}*/}
                    {/*onEndEditing={() => {*/}
                    {/*// this.setState({ isHidden: true }, () => {*/}
                    {/*//     setTimeout(() => {*/}
                    {/*//         this.toggleQuickSearch(true);*/}
                    {/*//     }, 1000);*/}
                    {/*// });*/}
                    {/*}}*/}
                    {/*/>*/}
                    {/*<TouchableOpacity*/}
                    {/*onPress={this.onSearch.bind(this)}*/}
                    {/*>*/}
                    {/*<Icon*/}
                    {/*name='ios-search'*/}
                    {/*style={{*/}
                    {/*fontSize: 24,*/}
                    {/*color: 'orange',*/}
                    {/*marginTop: 10,*/}
                    {/*marginRight: 10*/}
                    {/*}}*/}
                    {/*/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                    {/*)}*/}
                    {/*renderItem={item => (*/}
                    {/*<TouchableOpacity*/}
                    {/*onPress={() => {*/}
                    {/*this.setState({*/}
                    {/*name: item.name,*/}
                    {/*}, () => {*/}
                    {/*this.toggleQuickSearch(true);*/}
                    {/*this.setState({ isHidden: true });*/}
                    {/*});*/}
                    {/*}}*/}
                    {/*style={{*/}
                    {/*flexDirection: 'column',*/}
                    {/*height: 50,*/}
                    {/*justifyContent: 'center',*/}
                    {/*alignContent: 'center'*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<Text>{item.name}</Text>*/}
                    {/*<Text>{item.address}</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*)}*/}
                    {/*/>*/}
                    {/*</Animated.View>*/}
                    <View
                        style={{
                            width: '100%',
                            paddingTop: 10
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                width: '100%',
                                borderRadius: 20,
                                marginTop: 5,
                                borderColor: '#33563743',
                                borderWidth: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <TextInput
                                style={{ height: 40, width: '95%', paddingLeft: 30 }}
                                placeholder='Nhập tên dự án...'
                                underlineColorAndroid='transparent'
                                value={this.state.name}
                                onChangeText={text => this.setState({ name: text })}
                            />
                            <TouchableOpacity
                                onPress={this.onSearch.bind(this)}
                            >
                                <Icon
                                    active
                                    name='ios-search'
                                    style={{
                                        color: 'orange',
                                        paddingRight: 20,
                                        fontSize: 22,
                                        marginTop: 5
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
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
                                placeholder="Loại dự án"
                            >
                                <Picker.Item
                                    label='Loại dự án'
                                    value=''
                                />
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
                                placeholder="Tỉnh / Thành phố"
                            >
                                <Picker.Item
                                    label='Tỉnh / Thành phố'
                                    value=''
                                />
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
                                placeholder="Quận / Huyện"
                            >
                                <Picker.Item
                                    label='Quận / Huyện'
                                    value=''
                                />
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
                                placeholder="Phường / Xã"
                            >
                                <Picker.Item
                                    label='Phường / Xã'
                                    value=''
                                />
                                {Object.keys(wards).map(function (key) {
                                    return (<Picker.Item
                                        key={key}
                                        label={wards[key]}
                                        value={key}
                                    />);
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
                                placeholder="Đường / Phố"
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
                                placeholder="Phân khúc"
                            >
                                <Picker.Item
                                    label='Phân khúc'
                                    value=''
                                />
                                {Object.keys(options.project_levels).map(function (key) {
                                    return (<Picker.Item
                                        key={key}
                                        label={options.project_levels[key]}
                                        value={key}
                                    />);
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
                                iosHeader="Hướng"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                placeholder="Hướng"
                            >
                                <Picker.Item
                                    label='Hướng'
                                    value=''
                                />
                                {Object.keys(options.directions).map(function (key) {
                                    return (<Picker.Item
                                        key={key}
                                        label={options.directions[key]}
                                        value={key}
                                    />);
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
                <Modal
                    isVisible={this.state.isLoadingModal}
                    onSwipe={() => this.setState({ isLoadingModal: false })}
                    swipeDirection="left"
                    transparent
                >
                    {loading()}
                </Modal>
            </View>
        );
    }
}
