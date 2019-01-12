import React from 'react';
import {
    Animated,
    BackHandler,
    Dimensions,
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, {
    Marker,
} from 'react-native-maps';
import {
    Icon,
    Toast
} from 'native-base';
import Header from '../Home/Header';
import PreviewProject from './../../Modal/PreviewProject';
import AdvanceSearch from './AdvanceSearch';
import getProject from './../../../api/getProject';
import GLOBAL from './../../../Globals';
import SearchResult from '../../Modal/SearchResult';
import styles from './../../../styles';
import icRest from './../../../icons/rest.png';
import icInvest from './../../../icons/invest.png';
import { loading } from '../../../Helpers';
import KindProject from '../../Modal/KindProject';
import saveProject from '../../../api/saveProject';
import icPin from './../../../icons/pin-building.png';

const { width, height } = Dimensions.get('window');
let isHidden = true;
let isHiddenPopup = true;
const heightPopup = 220;
const heightResult = 300;
const heightSearch = Platform.OS === 'ios' ? height : height;

export default class MapProject extends React.Component {
    handleBackPress = () => { //eslint-disable-line
        if (!isHidden) {
            return this.toggleAdvanceSearch();
        }
        return this.props.navigation.navigate('MapScreen');
    }
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

    // onSearch() {
    //     fetch(GLOBAL.GOOGLE_API + this.state.txtAddress, //eslint-disable-line
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Accept: 'application/json'
    //             },
    //         })
    //         .then(res => res.json())
    //         .then(resJson => {
    //             if (resJson.results.length > 0) {
    //                 this.setState({
    //                     currentLocation: {
    //                         latitude: resJson.results[0].geometry.location.lat,
    //                         longitude: resJson.results[0].geometry.location.lng
    //                     }
    //                 });
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }

    constructor(props) {
        super(props);
        this.state = {
            txtAddress: '',
            type: '',
            kind: '',
            loaded: false,
            location: null,
            errorMessage: null,
            currentLocation: {
                latitude: 21.027763,
                longitude: 105.834160,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            text: '',
            listProject: [],
            modalKind: false,
            modalPreview: false,
            modalAdvanceSearch: false,
            detailProject: null,
            modalResult: false,
            bounceValue: new Animated.Value(heightSearch),
            popupValue: new Animated.Value(heightPopup),
            resultValue: new Animated.Value(heightResult),
            kindValue: new Animated.Value(heightResult),
            dataSearch: [],
            region: null
        };
        this.arrayProject = [];
        this.test = [];
        this.toggleResult = this.toggleResult.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        // getLocalProjects()
        //     .then(res => {
        //         if (res.length > 0) {
        //             this.arrayProject = res;
        //             this.setState({
        //                 listProject: this.arrayProject,
        //                 loaded: true
        //             });
        //         }
        //     })
        //     .catch(err => console.log(err));
        // if (!this.state.loaded) {

        // }
        // this.fetchProject(this.state.currentLocation);
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 1000);
    }

    fetchProject(center) {
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
                if (resJson.data.length > 0) {
                    this.arrayProject = resJson.data;
                    this.setState({
                        listProject: this.arrayProject
                    });
                    return saveProject(resJson.data)
                        .then()
                        .catch(err => console.log(err));
                }
                return Toast.show({
                    text: 'Không có dữ liệu!',
                    type: 'danger',
                    buttonText: 'Okay',
                    duration: 10000
                });
            })
            .catch(err => console.log(err));
    }

    toggleAdvanceSearch(val, wantHide, dataSearch) {
        let toValue = heightSearch;
        if (isHidden) {
            toValue = 0;
            this.setState({ modalAdvanceSearch: true });
        }
        let value = '';
        if (wantHide) {
            toValue = heightSearch;
            value = val;
        }
        if (wantHide && dataSearch) {
            this.toggleResult(true, dataSearch);
        }
        if (!wantHide) {
            value = this.state.bounceValue;
        }
        Animated.spring(
            value,
            {
                toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
        isHidden = !isHidden;
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

    toggleResult(isHiddenResult, dataSearch) {
        if (dataSearch) {
            this.setState({ dataSearch, modalResult: true });
        }
        let toValue = heightResult;
        if (isHiddenResult) {
            toValue = 0;
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

    toggleKindProject(isHiddenResult, kind) {
        let toValue = heightResult;
        if (isHiddenResult) {
            toValue = 0;
            this.setState({ kind, modalKind: true });
        }
        Animated.spring(
            this.state.kindValue,
            {
                toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} title='BẢN ĐỒ DỰ ÁN' />
                <View style={styles.mapContainer}>
                    <MapView
                        style={{ width, flex: 1 }}
                        initialRegion={{
                            latitude: this.state.currentLocation.latitude,
                            longitude: this.state.currentLocation.longitude,
                            // latitudeDelta: this.state.currentLocation.latitudeDelta,
                            // longitudeDelta: this.state.currentLocation.longitudeDelta,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        // provider='google'
                        mapType="standard"
                        // followsUserLocation
                        showsUserLocation
                        showsMyLocationButton
                        moveOnMarkerPress
                        // minZoomLevel={6}
                        // maxZoomLevel={12}
                        // showsCompass
                        // showsScale
                        // showsBuildings
                        // showsTraffic
                        // showsIndoors
                        // cacheEnabled
                        // loadingEnabled
                        onPress={() => {
                            this.togglePopup(true);
                            this.toggleKindProject();
                        }}
                        onMarkerSelect={(e) => {
                            this.togglePopup(false, e.nativeEvent.id);
                        }}
                        // ref={(ref) => {
                        //     this.mapView = ref;
                        // }}
                        onMapReady={() => {
                            // this.setState({ loaded: true });
                        }}
                        onRegionChangeComplete={(center) => {
                            this.fetchProject(center);
                        }}
                    >
                        {this.state.listProject.map(project => (
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
                </View>
                <View style={styles.actionContainer}>
                    <View
                        style={{
                            height: 40,
                            width: '100%',
                            borderRadius: 20,
                            marginTop: 5,
                            backgroundColor: '#dddddd',
                            flexDirection: 'row'
                        }}
                    >
                        <Icon
                            name='ios-search'
                            style={{
                                color: 'orange',
                                fontSize: 20,
                                textAlign: 'center',
                                marginTop: 10,
                                marginLeft: 15
                            }}
                        />
                        <TouchableOpacity
                            style={styles.fakeInputSearch}
                            onPress={() => {
                                this.toggleAdvanceSearch();
                            }}
                        >
                            <Text style={{ fontStyle: 'italic' }}>Nhập tên dự án...</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}
                        onPress={() => {
                            this.toggleAdvanceSearch();
                        }}
                    >
                        <Text style={styles.txtAdvanceSearch}>Tìm kiếm nâng cao </Text>
                        <Icon
                            type='FontAwesome'
                            name='caret-up'
                            style={{ color: '#004a80', fontSize: 14 }}
                        />
                    </TouchableOpacity>
                    <View style={styles.modalAction}>
                        <TouchableOpacity
                            style={styles.mapQuickAction}
                            onPress={() => {
                                this.toggleKindProject(true, GLOBAL.REAL_ESTATE.TO_LIVE);
                            }}
                        >
                            <View style={styles.btnMapOrange}>
                                <Icon name='ios-home' style={{ color: '#fff' }} />
                            </View>
                            <Text style={styles.textQuickAction}>Bất động sản để ở</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.mapQuickAction}
                            onPress={() => {
                                this.toggleKindProject(true, GLOBAL.REAL_ESTATE.TO_SELL);
                            }}
                        >
                            <View style={styles.btnMapRed}>
                                <Image source={icInvest} style={{ width: 25, height: 25 }} />
                            </View>
                            <Text style={styles.textQuickAction}>Bất động sản đầu tư</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.mapQuickAction}
                            onPress={() => {
                                this.toggleKindProject(true, GLOBAL.REAL_ESTATE.TO_REST);
                            }}
                        >
                            <View style={styles.btnMapGreen}>
                                <Image source={icRest} style={{ width: 25, height: 25 }} />
                            </View>
                            <Text style={styles.textQuickAction}>Bất động sản nghỉ dưỡng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.mapQuickAction}
                            onPress={() => {
                                this.toggleKindProject(true, GLOBAL.REAL_ESTATE.TO_INTERNATIONAL);
                            }}
                        >
                            <View style={styles.btnMapBlue}>
                                <Icon
                                    type='MaterialCommunityIcons'
                                    name='earth'
                                    style={{ color: '#fff' }}
                                />
                            </View>
                            <Text style={styles.textQuickAction}>Bất động sản quốc tế</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Animated.View
                    style={[styles.subView,
                        { transform: [{ translateY: this.state.bounceValue }] }]}
                >
                    {this.state.modalAdvanceSearch &&
                    <AdvanceSearch
                        navigation={this.props.navigation}
                        toggleAdvanceSearch={this.toggleAdvanceSearch}
                        bounceValue={this.state.bounceValue}
                        // state={this.state}
                        toggleResult={this.toggleResult}
                    />}
                </Animated.View>
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
                <Animated.View
                    style={
                        [styles.popupResult,
                            { transform: [{ translateY: this.state.resultValue }] }]
                    }
                >
                    {this.state.modalResult &&
                    <SearchResult
                        navigation={this.props.navigation}
                        toggleResult={this.toggleResult}
                        state={this.state}
                    />}
                </Animated.View>
                <Animated.View
                    style={[styles.popupResult,
                        { transform: [{ translateY: this.state.kindValue }] }]}
                >
                    {this.state.modalKind &&
                    <KindProject
                        navigation={this.props.navigation}
                        state={this.state}
                        toggleKindProject={this.toggleKindProject}
                        kind={this.state.kind}
                    />}
                </Animated.View>
            </View>
        );
    }
}
