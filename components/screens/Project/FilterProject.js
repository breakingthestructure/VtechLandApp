import React, { Component } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Body,
    Button,
    Icon,
    Left,
    ListItem,
    Picker,
    Right,
    Spinner,
    Thumbnail
} from 'native-base';
import {
    dataNotFound,
    formatMoney,
    loading
} from './../../../Helpers';

import styles from './../../../styles';
import GLOBAL, { NO_IMAGE } from '../../../Globals';
import icInvest from '../../../icons/invest.png';
import icRest from '../../../icons/rest.png';
import getProject from "../../../api/getProject";
import getLocalOption from "../../../api/getLocalOption";
import getCities from "../../../api/getCities";
import getDistricts from "../../../api/getDistricts";
import getWards from "../../../api/getWards";
import getStreets from "../../../api/getStreets";
import getOptionProjects from "../../../api/getOptionProjects";
import saveOptionProject from "../../../api/saveOptionProject";
import getToken from "../../../api/getToken";
import postLikeProject from "../../../api/postLikeProject";

const { width, height } = Dimensions.get('window');

const heightAdvance = -(height - 170);

export default class FilterProject extends Component {
    _keyExtractor = (item, index) => index.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            kind: 1,
            options: [],
            feature: {},
            arrFeature: [],
            cities: [],
            city: '',
            districts: [],
            district: '',
            wards: [],
            ward: '',
            streets: [],
            street: '',
            direction: '',
            level: '',
            area: '',
            minPrice: '',
            maxPrice: '',
            loaded: true,
            listSnapPoint: [
                { x: 0, y: 0 },
                { x: 0, y: -(height / 3) },
                { x: 0, y: -(height / 2) },
                { x: 0, y: heightAdvance },
            ],
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
                } else {
                    getOptionProjects()
                        .then(resJson => {
                            if (resJson) {
                                saveOptionProject(resJson.data)
                                    .then(resSave => console.log(resSave))
                                    .catch(err => console.log(err));
                                this.setState({
                                    options: resJson.data,
                                    loaded: true,
                                });
                            }
                        })
                        .catch(err => console.log(err));
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

    onDrawerSnap(event) {
        const snapPoint = event.nativeEvent;
        if (snapPoint.index === 3) {
            this.setState({
                isOpeningAdvance: true
            });
        }
        if (snapPoint.index === 0) {
            this.setState({
                isOpeningAdvance: false
            });
        }
    }

    onSearch() {
        this.setState({ isSearching: true, isLoadingModal: true });
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
            maxPrice,
            page
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
        query += `&page=${page}`;
        getProject(query)
            .then(resJson => {
                if (resJson.data) {
                    this.arrayProject = resJson.data.concat(this.arrayProject);
                    const nextPage = page + 1;
                    this.setState({
                        listResult: this.arrayProject,
                        refreshing: false,
                        page: nextPage,
                        isSearching: false,
                        isLoadingModal: false,
                        isShowResult: true
                    });
                    this.animatedViewRef.snapTo({ index: 3 });
                    return true;
                }
            })
            .catch(err => console.log(err));
    }

    onLikeProject(id) {
        Alert.alert(
            'Bạn quan tâm dự án này',
            '',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        getToken()
                            .then(token => {
                                postLikeProject(token, id)
                                    .then(res => {
                                        if (res.status === 200) {
                                            const arr = this.state.listFavourite;
                                            if (res.data === 'added') {
                                                arr.push(id);
                                            } else {
                                                const index = arr.indexOf(id);
                                                if (index > -1) {
                                                    arr.splice(index, 1);
                                                }
                                            }
                                            this.setState({ listFavourite: arr });
                                        }
                                    });
                            });
                    }
                },
                { text: 'Hủy', onPress: () => console.log('ok') },
            ],
            { cancelable: false }
        );
    }

    render() {
        const { cities, districts, wards, streets, options } = this.state;
        console.log(options);
        if (!this.state.loaded || !cities || !options.length === 0 || !options.project_types) {
            return loading();
        }
        return (

            <View
                style={{
                    height: height - 100,
                    zIndex: 3,
                }}
            >
                <TouchableOpacity style={styles.btnShowAdvanceSearch}>
                    {this.state.isSearching &&
                    !this.state.isOpeningAdvance ? <Spinner /> :
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    let index = 0;
                                    if (!this.state.isOpeningAdvance) {
                                        index = 3;
                                    }
                                    this.animatedViewRef.snapTo({ index });
                                }}
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Icon
                                    type='FontAwesome'
                                    name={this.state.isOpeningAdvance ?
                                        'caret-down' : 'caret-up'}
                                    style={styles.iconShowAdvanceSearch}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </TouchableOpacity>
                <View style={{ paddingBottom: 20 }}>
                    <View style={styles.inputView}>
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
                                style={styles.iconSearchInput}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.modalAction}>
                    <TouchableOpacity
                        style={styles.mapQuickAction}
                        onPress={() => {
                            this.selectKind(GLOBAL.REAL_ESTATE.TO_LIVE);
                        }}
                    >
                        <View style={styles.btnMapOrange}>
                            <Icon name='ios-home' style={{ color: '#fff' }} />
                        </View>
                        <Text style={styles.textQuickAction}>
                            Bất động sản để ở
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.mapQuickAction}
                        onPress={() => {
                            this.selectKind(GLOBAL.REAL_ESTATE.TO_SELL);
                        }}
                    >
                        <View style={styles.btnMapRed}>
                            <Image
                                source={icInvest}
                                style={{ width: 25, height: 25 }}
                            />
                        </View>
                        <Text style={styles.textQuickAction}>
                            Bất động sản đầu tư
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.mapQuickAction}
                        onPress={() => {
                            this.selectKind(GLOBAL.REAL_ESTATE.TO_REST);
                        }}
                    >
                        <View style={styles.btnMapGreen}>
                            <Image source={icRest} style={{ width: 25, height: 25 }} />
                        </View>
                        <Text style={styles.textQuickAction}>
                            Bất động sản nghỉ dưỡng
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.mapQuickAction}
                        onPress={() => {
                            this.selectKind(GLOBAL.REAL_ESTATE.TO_INTERNATIONAL);
                        }}
                    >
                        <View style={styles.btnMapBlue}>
                            <Icon
                                type='MaterialCommunityIcons'
                                name='earth'
                                style={{ color: '#fff' }}
                            />
                        </View>
                        <Text style={styles.textQuickAction}>
                            Bất động sản quốc tế
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.btnBtnIconSpecial}
                    onPress={this.onSearch.bind(this)}
                >
                    <Icon name='ios-search' style={styles.iconBigBtn} />
                    <Text style={styles.textBtnIcon}>{this.state.txtSubmit}</Text>
                </TouchableOpacity>
                <View style={styles.list}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isShowResult: true
                            });
                        }}
                        style={{
                            width: '50%',
                            backgroundColor: (this.state.isShowResult ?
                                '#F58319' : 'white'),
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            height: 40,
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#F58319'
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: (this.state.isShowResult ?
                                    'white' : 'black'),
                                fontWeight: '400'
                            }}
                        >
                            Kết quả
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isShowResult: false
                            });
                        }}
                        style={{
                            width: '50%',
                            backgroundColor: (this.state.isShowResult ?
                                'white' : '#F58319'),
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            height: 40,
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#F58319'
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: (this.state.isShowResult ?
                                    'black' : 'white'),
                                fontWeight: '400'
                            }}
                        >
                            Cài đặt
                        </Text>
                    </TouchableOpacity>
                </View>
                {/*<View style={{ paddingTop: 10 }}>*/}
                {/*<SwitchSelector*/}
                {/*initial={0}*/}
                {/*onPress={value => this.setState({ isShowResult: value })}*/}
                {/*textColor='#21a1fc' //'#7a44cf'*/}
                {/*selectedColor='white'*/}
                {/*buttonColor='#F58319'*/}
                {/*borderColor='#cecece'*/}
                {/*hasPadding*/}
                {/*options={[*/}
                {/*{ label: 'Cài đặt', value: false },*/}
                {/*{ label: 'Kết quả', value: true }*/}
                {/*]}*/}
                {/*/>*/}
                {/*</View>*/}
                {!this.state.isShowResult &&
                <ScrollView style={{ paddingVertical: 10 }}>
                    <Text style={styles.titleSection}>Kiểu</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.optionAlone}
                        >
                            <Picker
                                iosHeader="Kiểu"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                // headerStyle={{ backgroundColor: '#F58319'}}
                                selectedValue={this.state.kind}
                                onValueChange={(itemValue) =>
                                    this.setState({ kind: itemValue })
                                }
                                style={styles.picker}
                                placeholder="Kiểu"
                            >
                                <Picker.Item
                                    label='Bán'
                                    value={1}
                                />
                                <Picker.Item
                                    label='Cho thuê'
                                    value={2}
                                />
                            </Picker>
                        </View>
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
                                onValueChange={(itemValue) =>
                                    this.setState({ type: itemValue })
                                }
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
                                    return (
                                        <Picker.Item
                                            key={key}
                                            label={cities[key]}
                                            value={key}
                                        />
                                    );
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
                                    return (
                                        <Picker.Item
                                            key={key}
                                            label={districts[key]}
                                            value={key}
                                        />
                                    );
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
                                onValueChange={
                                    (itemValue) => this.setState({ ward: itemValue })
                                }
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
                                onValueChange={
                                    (itemValue) => this.setState({ street: itemValue })
                                }
                                placeholder="Đường / Phố"
                            >
                                <Picker.Item label="Đường / Phố" value="" />
                                {Object.keys(streets).map(function (key) {
                                    return (
                                        <Picker.Item
                                            key={key}
                                            label={streets[key]}
                                            value={key}
                                        />
                                    );
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
                                onValueChange={
                                    (itemValue) => this.setState({ level: itemValue })
                                }
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
                                onValueChange={
                                    (itemValue) => this.setState({ direction: itemValue })
                                }
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
                                onChangeText={
                                    text => this.setState({ buildArea: text })
                                }
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
                                onChangeText={
                                    text => this.setState({ livingroom: text })
                                }
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Tiện ích</Text>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        numColumns={2}
                        data={this.state.arrFeature}
                        contentContainerStyle={{ width: '100%', paddingVertical: 10 }}
                        renderItem={({ item }) => (
                            <View
                                key={item.key}
                                style={styles.listFeature}
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
                </ScrollView>}
                {this.state.isShowResult &&
                <FlatList
                    ListEmptyComponent={() => {
                        return dataNotFound();
                    }}
                    contentContainerStyle={{ width: '100%', paddingVertical: 10 }}
                    data={this.state.listResult}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    refreshing={this.state.refreshing}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    renderItem={({ item }) => (
                        <ListItem thumbnail>
                            <Left>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            'TabProjectScreen', {
                                                project: item
                                            });
                                    }}
                                >
                                    <Thumbnail
                                        square
                                        source={{
                                            uri: (item.images.project_feature) ?
                                                item.images.project_feature[0] :
                                                NO_IMAGE
                                        }}
                                    />
                                </TouchableOpacity>
                            </Left>
                            <Body>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('TabProjectScreen', {
                                        project: item
                                    });
                                }}
                            >
                                <Text style={styles.textTitle}>{item.name}</Text>
                                <Text
                                    style={styles.textDesc}
                                    note
                                    numberOfLines={1}
                                >
                                    {item.address}
                                </Text>
                                <Text
                                    style={styles.textDesc}
                                    note
                                    numberOfLines={1}
                                >
                                    {formatMoney(item.data.price_unit_min, 0)} tr
                                    - {formatMoney(item.data.price_unit_max, 0)}tr/m2
                                </Text>
                            </TouchableOpacity>
                            </Body>
                            <Right>
                                <Button
                                    transparent
                                    onPress={this.onLikeProject.bind(this, item.id)}
                                >
                                    <Icon
                                        type='FontAwesome'
                                        name={this.state.listFavourite.includes(item.id)
                                            ? 'heart' : 'heart-o'}
                                        style={{ color: 'orange' }}
                                    />
                                </Button>
                            </Right>
                        </ListItem>
                    )}
                />}
            </View>
        );
    }
}
