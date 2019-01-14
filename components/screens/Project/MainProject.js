import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import styles from './../../../styles';
import {
    NO_IMAGE,
} from './../../../Globals';
import SetCalendar from './SetCalendar';
import CalcDebt from './CalcDebt';
import SupportProject from './SupportProject';
import DetailProject from './DetailProject';
import { loading } from '../../../Helpers';
import Header from '../Home/Header';
import ActionProject from './ActionProject';
import News from './News';

export default class MainProject extends Component {
    handleBackPress = () => { //eslint-disable-line
        // this.props.navigation.pop();
        return true;
    }

    constructor(props) {
        super(props);
        this.state = {
            initialPage: 0,
            activeTab: 0,
            project: null,
            loaded: false,
            tab: 1,
            isReady: false,
            index: 0,
            modalVisible: false,
            status: null,
            quality: null,
            error: null,
            isPlaying: true,
            isLooping: true,
            duration: 0,
            currentTime: 0,
            fullscreen: false,
            containerMounted: false,
            containerWidth: null,
            listImage: [],
            videoId: '',
        };
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const project = navigation.getParam('project', null);
        const activeTab = navigation.getParam('activeTab', null);
        if (activeTab) {
            this.setState({
                project,
                loaded: false,
            });
            this.setState({
                tab: activeTab,
                loaded: true,
            });
        }
        if (project) {
            this.setState({
                project,
                loaded: true,
            });
        }
    }

    onChangeTab(page) {
        // this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({ tab: page });
    }

    render() {
        const { project } = this.state;
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    title={project.name}
                    back={'popToTop'}
                />
                <ScrollView ref='_scrollView'>
                    <View style={styles.slideProject}>
                        {project.images.project_feature &&
                        <Swiper showsButtons removeClippedSubviews={false}>
                            {project.images && project.images.project_feature &&
                            project.images.project_feature.map((value, key) => (
                                <FastImage
                                    key={key}
                                    style={styles.imageSlide}
                                    source={{
                                        uri: (value) ? value : NO_IMAGE,
                                        priority: FastImage.priority.normal,
                                    }}
                                    // resizeMode={FastImage.resizeMode.contain}
                                    onProgress={e => {
                                        console.log(e.nativeEvent.loaded / e.nativeEvent.total);
                                        if (e.nativeEvent.loaded / e.nativeEvent.total < 1) {
                                        }
                                    }}
                                />
                            ))}
                        </Swiper>}
                    </View>
                    <ScrollView
                        horizontal
                        style={{
                            flexDirection: 'row',
                            height: 40,
                            backgroundColor: '#F58319',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ tab: 1 });
                            }}
                            style={this.state.tab === 1 ? styles.btnTabActive : styles.btnTab}
                        >
                            <Text
                                style={this.state.tab === 1 ?
                                    styles.textTabActive : styles.textHeader}
                            >
                                Thông tin dự án
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ tab: 2 });
                            }}
                            style={this.state.tab === 2 ? styles.btnTabActive : styles.btnTab}
                        >
                            <Text
                                style={this.state.tab === 2 ?
                                    styles.textTabActive : styles.textHeader}
                            >
                                Tin tức
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ tab: 3 });
                            }}
                            style={this.state.tab === 3 ? styles.btnTabActive : styles.btnTab}
                        >
                            <Text
                                style={this.state.tab === 3 ?
                                    styles.textTabActive : styles.textHeader}
                            >
                                Bảng hàng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ tab: 4 });
                            }}
                            style={this.state.tab === 4 ? styles.btnTabActive : styles.btnTab}
                        >
                            <Text
                                style={this.state.tab === 4 ?
                                    styles.textTabActive : styles.textHeader}
                            >
                                Đặt lịch
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ tab: 5 });
                            }}
                            style={this.state.tab === 5 ? styles.btnTabActive : styles.btnTab}
                        >
                            <Text
                                style={this.state.tab === 5 ?
                                    styles.textTabActive : styles.textHeader}
                            >
                                Tính vay lãi suất
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ tab: 6 });
                            }}
                            style={this.state.tab === 6 ? styles.btnTabActive : styles.btnTab}
                        >
                            <Text
                                style={this.state.tab === 6 ?
                                    styles.textTabActive : styles.textHeader}
                            >
                                Hỗ trợ dự án
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    {this.state.tab === 1 &&
                    <DetailProject
                        state={this.state}
                        project={project}
                        onChangeTab={this.onChangeTab}
                    />}
                    {this.state.tab === 2 &&
                    <News project={project} navigation={this.props.navigation} />}
                    {this.state.tab === 3 &&
                    <ActionProject project={project} navigation={this.props.navigation} />}
                    {this.state.tab === 4 && <CalcDebt />}
                    {this.state.tab === 5 && <SetCalendar />}
                    {this.state.tab === 6 &&
                    <SupportProject directors={project.data.project_directors} />}
                </ScrollView>
            </View>
        );
    }
}
