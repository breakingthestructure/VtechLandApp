import React from 'react';
import {
    View,
    BackHandler,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    ScrollView,
    FlatList,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
    Container,
    Content,
    Spinner,
    Item,
    Icon,
    Input,
    Fab,
    Button
} from 'native-base';
import Header from '../Home/Header';
import PreviewProject from './../../Modal/PreviewProject';
import AdvanceSearch from './AdvanceSearch';

import icPin from './../../../icons/pin-building.png';
import getProject from './../../../api/getProject';
import GLOBAL from './../../../Globals';
import SearchResult from '../../Modal/SearchResult';
import styles from './../../../styles';

const { width, height } = Dimensions.get('window');
let isHidden = true;
let isHiddenPopup = true;
// let isHiddenResult = true;
const heightPopup = 220;
const heightResult = 300;
const heightSearch = height - 5;

export default class MapProject extends React.Component {
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
                longitude: 105.834160
            },
            text: '',
            listProject: null,
            modalProject: false,
            modalPreview: false,
            modalAdvanceSearch: false,
            detailProject: null,
            modalResult: false,
            bounceValue: new Animated.Value(heightSearch), //This is the initial position of the subview
            popupValue: new Animated.Value(heightPopup),
            resultValue: new Animated.Value(heightResult),
            dataSearch: []
        };
        this.arrayProject = [];
        this.test = [];
        // this.setDataResult = this.setDataResult.bind(this);
        this.toggleResult = this.toggleResult.bind(this);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        getProject()
            .then(resJson => {
                if (resJson.data) {
                    this.arrayProject = resJson.data;
                    this.setState({
                        listProject: this.arrayProject,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }
    onSearch() {
        fetch(GLOBAL.GOOGLE_API + this.state.txtAddress, //eslint-disable-line
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.results.length > 0) {
                    this.setState({
                        currentLocation: {
                            latitude: resJson.results[0].geometry.location.lat,
                            longitude: resJson.results[0].geometry.location.lng
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }

    handleBackPress = () => { //eslint-disable-line
        if (!isHidden) {
            this.toggleAdvanceSearch();
        } else {
            this.props.navigation.navigate('MapScreen');
        }
        return true;
    }
    toggleAdvanceSearch(val, wantHide, dataSearch) {
        // Keyboard.dismiss();
        let toValue = heightSearch;
        if (isHidden) {
            toValue = 0;
            this.setState({ modalAdvanceSearch: true });
        }
        // if (dataSearch) {
        //     console.log('tes22', dataSearch);
        //     this.setState({ dataSearch });
        // }
        let value = '';
        if (wantHide) {
            toValue = heightSearch;
            value = val;
            this.toggleResult(true, dataSearch);
        }
        if (!wantHide) {
            value = this.state.bounceValue;
        }
        //This will animate the transalteY of the subview between 0 & 100 depending on its current state//eslint-disable-line
        //100 comes from the style below, which is the height of the subview.
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
    // setDataResult(dataSearch) {
    //     this.setState({ dataSearch, modalResult: true });
    //     console.log('dataSearch', this.state.dataSearch);
    // }
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
        // isHiddenResult = !isHiddenResult;
    }
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    render() {
        if (!this.state.loaded) {
            return (
                <Container>
                    <Header navigation={this.props.navigation} title='BẢN ĐỒ DỰ ÁN' />
                    <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} title='BẢN ĐỒ DỰ ÁN' />
                <View style={styles.mapContainer}>
                    <MapView
                        style={{ width, flex: 1 }}
                        region={{
                            latitude: this.state.currentLocation.latitude,
                            longitude: this.state.currentLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        // mapType="standard"
                        // followsUserLocation
                        // showsUserLocation
                        // showsMyLocationButton
                        moveOnMarkerPress
                        onPress={() => {
                            this.togglePopup(true);
                        }}
                        ref={(ref) => { this.mapView = ref; }}
                    >
                        {this.state.listProject.map(project => (
                            <Marker
                                key={project.id}
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
                            // ref={ref => { this[`marker${project.id}`] = ref; }}
                            // ref={ref => { this.test[project.id] = ref; }}
                            // ref={`marker${project.jd}`}
                            />
                        ))}
                    </MapView>
                    <View style={styles.toolSearch}>
                        <View style={styles.toolContent}>
                            <View
                                style={styles.sectionInput}>
                                <Icon type='FontAwesome' name='dot-circle-o' style={styles.iconSearch} />
                                <TouchableOpacity
                                    style={styles.fakeInputSearch}
                                    onPress={() => {
                                        this.toggleAdvanceSearch();
                                    }}
                                >
                                    <Text style={{ fontStyle: 'italic' }}>Nhập nội dung tìm kiếm</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal style={{ marginLeft: 35 }}>
                                <FlatList
                                    horizontal
                                    // contentContainerStyle={styles.wrapper}
                                    data={this.state.listProject}
                                    keyExtractor={this.keyExtractor}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.btnProject}
                                            onPress={() => {
                                                this.togglePopup(false, item.id);
                                                // this.toggleResult();
                                            }}
                                        >
                                            <Text style={styles.txtBtnProject}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </ScrollView>
                            <TouchableOpacity
                                style={{ marginTop: 5 }}
                                onPress={() => {
                                    this.toggleAdvanceSearch();
                                }}
                            >
                                <Text style={styles.txtAdvanceSearch}>Tìm kiếm nâng cao</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <Animated.View
                    style={[styles.subView,
                    { transform: [{ translateY: this.state.bounceValue }] }]}
                >
                    {this.state.modalAdvanceSearch && <AdvanceSearch navigation={this.props.navigation} toggleAdvanceSearch={this.toggleAdvanceSearch} bounceValue={this.state.bounceValue} state={this.state} toggleResult={this.toggleResult} setDataResult={this.setDataResult} />}
                </Animated.View>
                <Animated.View
                    style={[styles.popupProject,
                    { transform: [{ translateY: this.state.popupValue }] }]}
                >
                    {this.state.modalPreview && <PreviewProject project={this.state.detailProject} navigation={this.props.navigation} />}
                </Animated.View>
                <Animated.View
                    style={[styles.popupResult,
                    { transform: [{ translateY: this.state.resultValue }] }]}
                >
                    {this.state.modalResult && <SearchResult navigation={this.props.navigation} toggleResult={this.toggleResult} state={this.state} />}
                    {/* <SearchResult project={this.state.detailProject} navigation={this.props.navigation} toggleResult={this.toggleResult} state={this.state} /> */}
                </Animated.View>
            </View >
        );
    }
}
