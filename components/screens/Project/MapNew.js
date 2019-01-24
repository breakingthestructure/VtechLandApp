import React from 'react';
import {
    Alert,
    Animated,
    BackHandler,
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
import { NavigationEvents } from 'react-navigation';
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
import Modal from 'react-native-modal';
import Header from '../Home/Header';
import PreviewProject from './../../Modal/PreviewProject';
import getProject from './../../../api/getProject';
import styles from './../../../styles';
import {
    dataNotFound,
    formatMoney,
    loading
} from '../../../Helpers';
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
import getToken from '../../../api/getToken';
import getFavouriteProjects from '../../../api/getFavouriteProjects';
import GLOBAL, { NO_IMAGE } from '../../../Globals';
import icInvest from '../../../icons/invest.png';
import icRest from '../../../icons/rest.png';

const { width, height } = Dimensions.get('window');
let isHiddenPopup = true;
const heightPopup = 220;
const heightAdvance = -(height - 160);

const filterProject = value => {
    return getProject(`&keyword=${value}`)
        .then(res => {
            return res.data.map(state => state.name);
        });
};


const quickSearchName = (value) => {
    const promise = new Promise((resolve) => {
        const filteredStates = value === ''
            ? []
            : filterProject(value);
        setTimeout(() => resolve(filteredStates), 400);
    });
    return promise;
};

export default class MapNew extends React.Component {
    handleBackPress = () => { //eslint-disable-line
        return this.props.navigation.navigate('MapScreen');
    }
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                latitude: 21.027763,
                longitude: 105.834160,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            listProject: [],
            listSnapPoint: [
                { x: 0, y: 0 },
                { x: 0, y: -(height / 3) },
                { x: 0, y: -(height / 2) },
                { x: 0, y: -(height - 250) },
                { x: 0, y: 100 },
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
            page: 1,
            popupValue: new Animated.Value(heightPopup),
            isShowResult: false,
            listResult: [],
            refreshing: false,
            loaded: false,
            location: null,
            errorMessage: null,
            modalPreview: false,
            detailProject: null,
            isSearching: false,
            isOpeningAdvance: false,
            isLoadingModal: false,
        };
        this.arrayProject = [];
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
                isLoadingModal: true
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
                        isLoadingModal: false
                    });
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

    showInfo(projectId, wantHide) {
        const project = this.state.listProject.filter(e => e.id == projectId);
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
        let index = 2;
        if (wantHide) {
            index = 0;
        }
        console.log('pok', index, projectId, this.state.modalPreview);
        // this.animatedInfoRef.snapTo({ index });
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
            const project = this.state.listProject.filter(e => e.id == projectId);
            if (project[0]) {
                // console.log(12333);
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
        // console.log(toValue);
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

    handleDidFocus = () => {
        console.log(this.props.navigation.getParam('value', 'ko bit'));
        // if (value === undefined) return;
        // this.setState({
        //     name: value,
        // });
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

    selectKind(kind) {
        this.setState({ kind });
        this.onSearch();
    }

    searchNameProject() {
        const { navigation: { navigate } } = this.props;
        const { name } = this.state;
        navigate('Autocomplete', {
            fetchOptions: quickSearchName,
            returnRoute: 'MapScreen',
            value: name,
            navigation: this.props.navigation
        });
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
                <NavigationEvents
                    onDidFocus={this.handleDidFocus}
                />
                <View style={styles.wrapper}>
                    <View
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
                            // provider='google'
                            mapType="standard"
                            // followsUserLocation
                            showsUserLocation
                            showsMyLocationButton
                            moveOnMarkerPress={false}
                            onRegionChangeComplete={(center) => {
                                this.fetchProject(center);
                            }}
                            onPress={() => {
                                this.togglePopup(true);
                                // this.showInfo(null, true);
                            }}
                            onMarkerSelect={(e) => {
                                this.togglePopup(false, e.nativeEvent.id);
                                // this.showInfo(e.nativeEvent.id, false);
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
                                        // this.showInfo(project.id, false);
                                    }}
                                />
                            ))}
                        </MapView>
                    </View>
                    <Interactable.View
                        style={{
                            padding: 10,
                            borderRadius: 10,
                            shadowColor: '#3B5458',
                            shadowOffset: {
                                width: 0,
                                height: 3
                            },
                            shadowOpacity: 0.2,
                            elevation: 3,
                            backgroundColor: 'white',
                            position: 'absolute',
                            bottom: heightAdvance,
                            left: 0,
                            right: 0,
                        }}
                        ref={ref => this.animatedViewRef = ref}
                        snapPoints={this.state.listSnapPoint}
                        initialPosition={this.state.listSnapPoint[0]}
                        verticalOnly
                        onSnap={this.onDrawerSnap.bind(this)}
                    >
                        <View
                            style={{
                                height,
                                // zIndex: 3,
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
                                        // onPress={this.onSearch.bind(this)}
                                        onPress={this.searchNameProject.bind(this)}
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
                    </Interactable.View>
                    {/*<Interactable.View*/}
                    {/*ref={ref => this.animatedInfoRef = ref}*/}
                    {/*verticalOnly*/}
                    {/*snapPoints={[*/}
                    {/*{ x: 0, y: 0 },*/}
                    {/*// { x: 0, y: -220 },*/}
                    {/*{ x: 0, y: -320 },*/}
                    {/*{ x: 0, y: -height },*/}
                    {/*]}*/}
                    {/*initialPosition={{ x: 0, y: 0 }}*/}
                    {/*style={[{*/}
                    {/*position: 'absolute',*/}
                    {/*bottom: heightAdvance - 205,*/}
                    {/*left: 0,*/}
                    {/*right: 0,*/}
                    {/*backgroundColor: 'white',*/}
                    {/*height*/}
                    {/*}]}*/}
                    {/*>*/}
                    {/*{this.state.modalPreview &&*/}
                    {/*<InfoProject*/}
                    {/*project={this.state.detailProject}*/}
                    {/*navigation={this.props.navigation}*/}
                    {/*/>}*/}
                    {/*</Interactable.View>*/}
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
                <Modal
                    isVisible={this.state.isLoadingModal && this.state.isOpeningAdvance}
                    onSwipe={() => this.setState({ isLoadingModal: false })}
                    swipeDirection="left"
                    transparent
                    onBackButtonPress={() => this.setState({ isLoadingModal: false })}
                    onBackdropPress={() => this.setState({ isLoadingModal: false })}
                >
                    {loading()}
                </Modal>
            </View>
        );
    }
}
