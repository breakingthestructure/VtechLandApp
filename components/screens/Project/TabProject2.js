import React, { Component } from "react";
import { Animated, Dimensions, Platform, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title } from "native-base";
import LinearGradient from "react-native-linear-gradient";

import Swiper from 'react-native-swiper';
import ActionProject from './ActionProject';
import SetCalendar from './SetCalendar';
import Header from '../Home/Header';
import SupportProject from './SupportProject';
import DetailProject from './DetailProject';
import CalcDebt from './CalcDebt';
import News from './News';
import styles from './../../../styles';
import getDetailProject from './../../../api/getDetailProject';
import getBuildings from './../../../api/getBuildings';
import { BASE_URL, NO_IMAGE } from './../../../Globals';
import { loading } from '../../../Helpers';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "rgba(255, 255, 255, 1)";
const FADED_THEME_COLOR = "rgba(255, 255, 255, 0.8)";

export default class TabProject2 extends Component {
    nScroll = new Animated.Value(0);
    scroll = new Animated.Value(0);
    textColor = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
        outputRange: ['red', FADED_THEME_COLOR, "#F58319"],
        extrapolate: "clamp"
    });
    tabBg = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT],
        outputRange: ["white", THEME_COLOR],
        extrapolate: "clamp"
    });
    tabY = this.nScroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
        outputRange: [0, 0, 1]
    });
    headerBg = this.scroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
        outputRange: ["transparent", "transparent", THEME_COLOR],
        extrapolate: "clamp"
    });
    imgScale = this.nScroll.interpolate({
        inputRange: [-25, 0],
        outputRange: [1.1, 1],
        extrapolateRight: "clamp"
    });
    imgOpacity = this.nScroll.interpolate({
        inputRange: [0, SCROLL_HEIGHT],
        outputRange: [1, 0],
    });
    tabContent = (x, i) => <View style={{ height: this.state.height }}>
        <List onLayout={({ nativeEvent: { layout: { height } } }) => {
            this.heights[i] = height;
            if (this.state.activeTab === i) this.setState({ height })
        }}>
            {new Array(x).fill(null).map((_, i) => <Item key={i}><Text>Item {i}</Text></Item>)}
        </List></View>;
    heights = [500, 500];
    state = {
        activeTab: 0,
        height: 500
    };

    constructor(props) {
        super(props);
        this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
        this.state = {
            initialPage: 0,
            activeTab: 0,
            project: null,
            buildings: [],
            showSlide: true,
        };
        this.onChangeTab = this.onChangeTab.bind(this);
    }
    onChangeTab(page) {
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({ activeTab: page });
    }
    componentDidMount() {
        const { navigation } = this.props;
        const projectId = navigation.getParam('projectId', null);
        const activeTab = navigation.getParam('activeTab', null);
        if (activeTab) {
            this.setState({ activeTab });
        }
        if (projectId) {
            getDetailProject(projectId)
                .then(resJson => {
                    if (resJson) {
                        this.setState({
                            project: resJson,
                            loaded: true
                        });
                    }
                })
                .catch(err => console.log(err));
            getBuildings(projectId)
                .then(resJson => {
                    if (resJson.status === 200) {
                        this.setState({
                            buildings: resJson.data,
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        const { project } = this.state;
        if (!this.state.loaded || !project) {
            return loading();
        }
        return (
            <View>
                <Animated.View style={{ position: "absolute", width: "100%", backgroundColor: this.headerBg, zIndex: 1 }}>
                    <Header navigation={this.props.navigation} back={'MapScreen'} />
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.nScroll } } }], { useNativeDriver: true })}
                    style={{ zIndex: 0 }}>
                    <Animated.View style={{
                        transform: [{ translateY: Animated.multiply(this.nScroll, 0.65) }, { scale: this.imgScale }],
                        backgroundColor: THEME_COLOR
                    }}>
                        {/* <Swiper showsButtons={true}>
                            {project.data.images.feature && project.data.images.feature.map((value, key) => (
                                <Animated.Image
                                key={key}
                                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg" }}
                                style={{ height: IMAGE_HEIGHT, width: "100%", opacity: this.imgOpacity }} />
                            ))}
                        </Swiper> */}
                        <Animated.Image
                            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg" }}
                            style={{ height: IMAGE_HEIGHT, width: "100%", opacity: this.imgOpacity }} />
                        {/*gradient
                        {/* <LinearGradient
                                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.35)", "rgba(255,255,255,0)"]}
                                locations={[0, 0.25, 1]}
                                style={{ position: "absolute", height: "100%", width: "100%" }} /> */}
                        {/* </Animated.Image> */}
                    </Animated.View>
                    <Tabs
                        prerenderingSiblingsNumber={3}
                        onChangeTab={({ i }) => {
                            this.setState({ height: this.heights[i], activeTab: i })
                        }}
                        renderTabBar={(props) => <Animated.View
                            style={{ transform: [{ translateY: this.tabY }], zIndex: 1, width: "100%", backgroundColor: "white" }}>
                            <ScrollableTab {...props}
                                renderTab={(name, page, active, onPress, onLayout) => (
                                    <TouchableOpacity key={page}
                                        onPress={() => onPress(page)}
                                        onLayout={onLayout}
                                        activeOpacity={0.4}>
                                        <Animated.View
                                            style={{
                                                flex: 1,
                                                height: 100,
                                                backgroundColor: this.tabBg
                                            }}>
                                            <TabHeading scrollable
                                                style={{
                                                    backgroundColor: "transparent",
                                                    width: SCREEN_WIDTH / 2
                                                }}
                                                active={active}>
                                                <Animated.Text style={{
                                                    fontWeight: active ? "bold" : "normal",
                                                    color: this.textColor,
                                                    fontSize: 14
                                                }}>
                                                    {name}
                                                </Animated.Text>
                                            </TabHeading>
                                        </Animated.View>
                                    </TouchableOpacity>
                                )}
                                underlineStyle={{ backgroundColor: this.textColor }} />
                        </Animated.View>
                        }>
                        <Tab heading="Tab 1">
                            {this.tabContent(30, 0)}
                        </Tab>
                        <Tab heading="Tab 2">
                            {this.tabContent(15, 1)}
                        </Tab>
                    </Tabs>
                </Animated.ScrollView>
            </View>
        )
    }
}
