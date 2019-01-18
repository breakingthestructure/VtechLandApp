import React from 'react';
import {
    Animated,
    BackHandler,
    Dimensions,
    FlatList,
    Platform,
    RefreshControl,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
import Interactable from 'react-native-interactable';
import SwitchSelector from 'react-native-switch-selector';
import Header from '../Home/Header';
import PreviewProject from './../../Modal/PreviewProject';
import getProject from './../../../api/getProject';
import styles from './../../../styles';
import { loading, dataNotFound } from '../../../Helpers';
import postLikeProject from './../../../api/postLikeProject';
import saveProject from '../../../api/saveProject';
import getLocalOption from '../../../api/getLocalOption';
import getOptionProjects from '../../../api/getOptionProjects';
import saveOptionProject from '../../../api/saveOptionProject';
import icPin from '../../../icons/pin-building.png';
import getCities from '../../../api/getCities';
import getDistricts from '../../../api/getDistricts';
import getWards from '../../../api/getWards';
import getStreets from '../../../api/getStreets';
import { NO_IMAGE } from '../../../Globals';
import getToken from '../../../api/getToken';
import getFavouriteProjects from '../../../api/getFavouriteProjects';

const { width, height } = Dimensions.get('window');
let isHiddenPopup = true;
const heightPopup = 220;

export default class MapNew extends React.Component {
    handleBackPress = () => { //eslint-disable-line
        return this.props.navigation.navigate('MapScreen');
    }
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            location: null,
            errorMessage: null,
            currentLocation: {
                latitude: 21.027763,
                longitude: 105.834160,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            listProject: [],
            modalPreview: false,
            detailProject: null,
            popupValue: new Animated.Value(heightPopup),
            isSearching: false,
            isOpeningAdvance: false,
            listSnapPoint: [
                { x: 0, y: 535 },
                { x: 0, y: 50 },
            ],
            txtSubmit: 'TÌM KIẾM',
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
            isShowResult: false,
            listResult: [],
            refreshing: false,
            page: 1
        };
        this.arrayProject = [];
        this.test = [];
    }

    _onRefresh = () => { //eslint-disable-line
        this.setState({ refreshing: true });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        getLocalOption()
            .then(res => {
                if (!res) {
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
                } else {
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
                        cities: resJson.data
                    });
                }
            })
            .catch(err => console.log(err));
        getToken()
            .then(token => {
                console.log(token);
                getFavouriteProjects(token)
                    .then(res => {
                        this.setState({
                            listFavourite: res.data,
                            loaded: true
                        });
                    })
                    .catch(err => console.log(err));
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

    fetchProject(center) {
        setTimeout(() => {
            this.setState({
                isSearching: true,
            });
            const northeast = {
                latitude: center.latitude + center.latitudeDelta / 2,
                longitude: center.longitude + center.longitudeDelta / 2,
            };
            const southwest = {
                latitude: center.latitude - center.latitudeDelta / 2,
                longitude: center.longitude - center.longitudeDelta / 2,
            };
            let query = '';
            query += `&north_east_lat=${northeast.latitude}`;
            query += `&north_east_lng=${northeast.longitude}`;
            query += `&south_west_lat=${southwest.latitude}`;
            query += `&south_west_lng=${southwest.longitude}`;
            getProject(query)
                .then(resJson => {
                    this.setState({
                        isSearching: false,
                    });
                    console.log(resJson);
                    if (resJson.data.length > 0) {
                        this.setState({
                            listProject: resJson.data
                        });
                        return saveProject(resJson.data)
                            .then()
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }, 200);
    }

    togglePopup(wantHide, projectId) {
        let toValue = heightPopup;
        if (isHiddenPopup) {
            toValue = 0;
        }
        if (wantHide) {
            toValue = heightPopup;
        } else {
            toValue = 0;
            const project = this.state.listProject.filter(e => e.id === projectId);
            if (project[0]) {
                this.setState({
                    modalPreview: true,
                    currentLocation: {
                        latitude: parseFloat(project[0].latitude),
                        longitude: parseFloat(project[0].longitude)
                    },
                    detailProject: project[0]
                });
            }
        }
        Animated.spring(
            this.state.popupValue,
            {
                toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
        isHiddenPopup = !isHiddenPopup;
    }

    onDrawerSnap(event) {
        const snapPoint = event.nativeEvent;
        if (snapPoint.index !== 0) {
            this.setState({
                isOpeningAdvance: true
            });
        } else {
            this.setState({
                isOpeningAdvance: false
            });
        }
    }

    onSearch() {
        // this.animatedViewRef.changePosition(this.state.listSnapPoint[0]);
        // this.animatedViewRef.snapTo({ index: 0 });
        this.setState({ isSearching: true });
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
        console.log(query);
        getProject(query)
            .then(resJson => {
                console.log(resJson);
                if (resJson.data) {
                    this.arrayProject = resJson.data.concat(this.arrayProject);
                    const nextPage = page + 1;
                    this.setState({
                        listResult: this.arrayProject,
                        refreshing: false,
                        page: nextPage,
                        isSearching: false,
                        isShowResult: true
                    });
                    this.animatedViewRef.snapTo({ index: 1 });
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
        if (!this.state.loaded || !options.length === 0 || !options.project_types || !cities) {
            return loading();
        }
        return (
            <View
                style={styles.container}
            >
                <Header navigation={this.props.navigation} title='BẢN ĐỒ DỰ ÁN' />
                <View style={styles.wrapper}>
                    <Animated.View
                        style={styles.mapWrapper}
                    >
                        <MapView
                            style={styles.mapContent}
                            initialRegion={{
                                latitude: this.state.currentLocation.latitude,
                                longitude: this.state.currentLocation.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            mapType="standard"
                            followsUserLocation
                            showsUserLocation
                            showsMyLocationButton
                            moveOnMarkerPress
                            onRegionChangeComplete={(center) => {
                                this.fetchProject(center);
                            }}
                            onPress={() => {
                                this.togglePopup(true);
                            }}
                            onMarkerSelect={(e) => {
                                this.togglePopup(false, e.nativeEvent.id);
                            }}
                        >
                            {this.state.listProject && this.state.listProject.map(project => (
                                <Marker.Animated
                                    key={project.id}
                                    identifier={project.id.toString()}
                                    coordinate={{
                                        latitude: parseFloat(project.latitude),
                                        longitude: parseFloat(project.longitude),
                                    }}
                                    title={project.name}
                                    description={project.address}
                                    image={icPin}
                                    onPress={() => {
                                        this.togglePopup(false, project.id);
                                    }}
                                />
                            ))}
                        </MapView>
                    </Animated.View>
                    <Interactable.View
                        style={styles.dynamicSearch}
                        ref={ref => this.animatedViewRef = ref}
                        snapPoints={this.state.listSnapPoint}
                        initialPosition={{ x: 0, y: 535 }}
                        verticalOnly
                        onSnap={this.onDrawerSnap.bind(this)}
                    >
                        <View style={styles.dynamicSearchContent}>
                            <TouchableOpacity style={styles.btnShowAdvanceSearch}>
                                {this.state.isSearching ? <Spinner /> :
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                let index = 0;
                                                if (!this.state.isOpeningAdvance) {
                                                    index = 1;
                                                }
                                                this.animatedViewRef.snapTo({ index });
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
                            <View>
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
                            <ScrollView>
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
                                    contentContainerStyle={{ width: '100%', paddingBottom: 50 }}
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
                            {this.state.isShowResult && this.state.listResult.length === 0 && dataNotFound()}
                            {this.state.isShowResult &&
                            <FlatList
                                contentContainerStyle={{ width: '100%', paddingBottom: 50 }}
                                data={this.state.listResult}
                                extraData={this.state}
                                keyExtractor={this.keyExtractor}
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
                                                {item.min_price} Tr - {item.max_price} tr/m2
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
                    </Interactable.View>
                </View>
                <Animated.View
                    style={[styles.popupProject,
                        { transform: [{ translateY: this.state.popupValue }] }]}
                >
                    {this.state.modalPreview &&
                    <PreviewProject
                        project={this.state.detailProject}
                        navigation={this.props.navigation}
                    />}
                </Animated.View>
            </View>
        );
    }
}
