import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import { Spinner } from 'native-base';
import Swiper from 'react-native-swiper';
import {
    dataNotFound,
    getLinkImage,
    loading,
} from './../../../Helpers';
import styles from '../../../styles';
import { NO_IMAGE } from '../../../Globals';
import SetCalendar from './SetCalendar';
import CalcDebt from './CalcDebt';
import SupportProject from './SupportProject';
import DetailProject from './DetailProject';
import ActionProject from './ActionProject';
import News from './News';
import icTitle from '../../../icons/ic_title.png';

const ImageProgress = createImageProgress(FastImage);

export default class InfoProject extends Component {
    keyExtractor = (item) => item.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            listImage: [],
            index: 0,
            loaded: false,
            imagePreview: false,
            tab: 1
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
        if (this.props.project.images && this.props.project.images.project_feature) {
            this.setState({
                listImage: this.props.project.images.project_feature.map((item) => {
                    return { url: item };
                }),
            });
        }
    }

    componentWillReceiveProps(props) {
        if (props.project.images && props.project.images.project_feature) {
            this.setState({
                listImage: props.project.images.project_feature.map((item) => {
                    return { url: item };
                })
            });
        }
    }

    onDisplayImage(index) {
        this.setState({
            index,
            imagePreview: true
        });
    }

    componentWillUnmount() {
        this.setState({
            loaded: false
        });
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        const { project } = this.props;
        if (!project) {
            return dataNotFound();
        }
        return (
            <View style={{ paddingBottom: 80 }}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ paddingTop: 5 }}>
                        <Image source={icTitle} style={styles.icTitle} />
                    </View>

                    <Text style={styles.title} note numberOfLines={1}>{project.name}</Text>
                </View>
                <ScrollView ref='_scrollView'>
                    <View style={styles.slideProject}>
                        {project.images.project_feature &&
                        <Swiper showsButtons removeClippedSubviews={false}>
                            {project.images && project.images.project_feature &&
                            project.images.project_feature.map((value, key) => (
                                <ImageProgress
                                    key={key}
                                    source={{ uri: (value) ? getLinkImage(value) : NO_IMAGE }}
                                    indicator={Spinner}
                                    style={styles.imageSlide}
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
                                Tính vay lãi suất
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
                                Đặt lịch
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
