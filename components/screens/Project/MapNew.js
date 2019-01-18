import React from 'react';
import {
    Animated,
    BackHandler,
    Dimensions,
    FlatList,
    Platform,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
    Icon,
    Picker,
    Spinner
} from 'native-base';
import Interactable from 'react-native-interactable';
import SwitchSelector from 'react-native-switch-selector';
import Header from '../Home/Header';
import PreviewProject from './../../Modal/PreviewProject';
import getProject from './../../../api/getProject';
import SearchResult from '../../Modal/SearchResult';
import styles from './../../../styles';
import { loading } from '../../../Helpers';
import KindProject from '../../Modal/KindProject';
import saveProject from '../../../api/saveProject';
import getLocalOption from '../../../api/getLocalOption';
import getOptionProjects from '../../../api/getOptionProjects';
import saveOptionProject from '../../../api/saveOptionProject';
import icPin from '../../../icons/pin-building.png';
import getCities from '../../../api/getCities';
import getDistricts from '../../../api/getDistricts';
import getWards from '../../../api/getWards';
import getStreets from '../../../api/getStreets';

const { width, height } = Dimensions.get('window');
let isHidden = true;
let isHiddenPopup = true;
const heightPopup = 220;
const heightResult = 300;
const heightSearch = Platform.OS === 'ios' ? height : height;

export default class MapNew extends React.Component {
    handleBackPress = () => { //eslint-disable-line
        return this.props.navigation.navigate('MapScreen');
    }
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            kind: 1,
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
            region: null,
            isSearching: false,
            isMoving: false,
            isLoadingModal: false,
            listSnapPoint: [
                { x: 0, y: 525 },
                { x: 0, y: 50 },
            ],
            txtSubmit: 'TÌM KIẾM',
            isOpeningAdvance: false,
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
        };
        this.arrayProject = [];
        this.test = [];
        this.toggleResult = this.toggleResult.bind(this);
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
                isMoving: false,
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
                    console.log(resJson);
                    if (resJson.data.length > 0) {
                        this.arrayProject = resJson.data;
                        this.setState({
                            listProject: this.arrayProject
                        });
                        return saveProject(resJson.data)
                            .then()
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        isLoadingModal: false
                    });
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
        this.refs['advance'].changePosition(this.state.listSnapPoint[0]);
        this.setState({ isSearching: true });
        getProject()
            .then(resJson => {
                console.log(resJson);
                if (resJson.data) {
                    this.setState({ isSearching: false });
                }
            })
            .catch(err => console.log(err));
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
                        style={{
                            backgroundColor: '#FFFFFF',
                            flex: 4
                        }}
                    >
                        <MapView
                            style={{ width, flex: 1 }}
                            initialRegion={{
                                latitude: this.state.currentLocation.latitude,
                                longitude: this.state.currentLocation.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            mapType="standard"
                            // followsUserLocation
                            showsUserLocation
                            showsMyLocationButton
                            moveOnMarkerPress
                            onRegionChangeComplete={(center) => {
                                this.fetchProject(center);
                            }}
                            onPress={() => {
                                this.togglePopup(true);
                                this.toggleKindProject();
                                this.toggleResult(false);
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
                            bottom: 0,
                            left: 0,
                            right: 0,
                            flex: 1
                        }}
                        ref='advance'
                        snapPoints={this.state.listSnapPoint}
                        initialPosition={{ x: 0, y: 525 }}
                        verticalOnly
                        // animatedValueY={this._deltaX}>
                        onSnap={this.onDrawerSnap.bind(this)}
                    >
                        <View
                            style={{
                                height: 600,
                                // flex: 1,
                                // backgroundColor: 'blue',
                                zIndex: 3
                            }}
                        >

                            <TouchableOpacity
                                style={{
                                    marginTop: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}
                            >
                                {this.state.isSearching ? <Spinner /> :
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                let index = 0;
                                                if (!this.state.isOpeningAdvance) {
                                                    index = 1;
                                                }
                                                this.refs['advance'].changePosition(this.state.listSnapPoint[index]);
                                            }}
                                        >
                                            <Text style={styles.txtAdvanceSearch}>
                                                Tìm kiếm dự án
                                            </Text>
                                        </TouchableOpacity>
                                        <Icon
                                            type='FontAwesome'
                                            name={this.state.isOpeningAdvance ?
                                                'caret-down' : 'caret-up'}
                                            style={{ color: '#004a80', fontSize: 14 }}
                                        />
                                    </View>
                                }
                            </TouchableOpacity>
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
                            <TouchableOpacity
                                style={styles.btnBtnIconSpecial}
                                onPress={this.onSearch.bind(this)}
                            >
                                <Icon name='ios-search' style={styles.iconBigBtn} />
                                <Text style={styles.textBtnIcon}>{this.state.txtSubmit}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity>
                                    <Text>Cài đặt</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text>Kết quả</Text>
                                </TouchableOpacity>
                            </View>
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
                            <ScrollView>
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
                                    contentContainerStyle={{ width: '100%', paddingBottom: 50 }}
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
                            </ScrollView>
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
                {/*<Modal*/}
                {/*isVisible={this.state.isLoadingModal}*/}
                {/*onSwipe={() => this.setState({ isLoadingModal: false })}*/}
                {/*swipeDirection="left"*/}
                {/*transparent*/}
                {/*onBackButtonPress={() => this.setState({ isLoadingModal: false })}*/}
                {/*onBackdropPress={() => this.setState({ isLoadingModal: false })}*/}
                {/*>*/}
                {/*{loading()}*/}
                {/*</Modal>*/}
            </View>
        );
    }
}
