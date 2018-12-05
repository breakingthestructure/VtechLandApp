import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Left,
    Body,
    Right,
    Button,
    Spinner,
    Icon,
    DeckSwiper,
    Card,
    CardItem
} from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import YouTube from 'react-native-youtube';
import HTMLView from 'react-native-htmlview';
import styles from './../../../styles';
import { BASE_URL, NO_IMAGE, YOUTUBE_APIKEY } from './../../../Globals';
import icLogo from './../../../icons/logo_new.png';
import getYoutubeId, { loading } from './../../../Helpers';

export default class DetailProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
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
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
        if (this.props.project.data.images.feature)
            this.setState({
                listImage: this.props.project.data.images.feature.map((item, index) => {
                    return { url: `${BASE_URL}${item}` };
                })
            });

        if (this.props.project.data.youtube_video) {
            if (newval = this.props.project.data.youtube_video.match(/(\?|&)v=([^&#]+)/)) {
                videoId = newval.pop();
            } else if (newval = this.props.project.data.youtube_video.match(/(\.be\/)+([^\/]+)/)) {
                videoId = newval.pop();
            } else if (newval = this.props.project.data.youtube_video.match(/(\embed\/)+([^\/]+)/)) {
                videoId = newval.pop().replace('?rel=0', '');
            }
            // let videoId = '';
            // videoID = getYoutubeId(this.props.project.data.youtube_video);
            this.setState({ videoId });
        }

    }
    onDisplayImage(index) {
        this.setState({ modalVisible: true, index });
    }
    setReady() {
        this.setState({ isReady: true })
    }
    setChangeState(param) {
        this.setState({ status: param })
    }
    setChangeQuality(param) {
        this.setState({ quality: param })
    }
    setOnError(param) {
        this.setState({ error: param })
    }
    render() {
        const { project } = this.props;
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View>
                <ScrollView style={styles.content}>
                    <Text style={styles.titleScreenLeft}>{project.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 5 }}>
                            <Icon type="FontAwesome" name='map-marker' style={styles.iconText} />
                        </View>
                        <Text style={styles.textDescription}>{project.address}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 5 }}>
                            <Icon type="FontAwesome" name='list-ul' style={styles.iconText} />
                        </View>
                        <Text style={styles.textDescription}>{project.type.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 5 }}>
                            <Icon type="FontAwesome" name='suitcase' style={styles.iconText} />
                        </View>
                        <Text style={styles.textDescription}>{project.description}</Text>
                    </View>
                    <View style={styles.basicInfoProject}>
                        <View style={styles.leftInfoProject}>
                            <Text style={styles.numberBasicInfo}>256</Text>
                            <Text style={styles.textBasicInfo}>Lô liền kề - Biệt thự</Text>
                        </View>

                        <View style={styles.centerInfoProject}>
                            <Text style={styles.numberBasicInfo}>180m2 - 220m2</Text>
                            <Text style={styles.textBasicInfo}>Lô liền kề - Biệt thự</Text>
                        </View>

                        <View style={styles.rightInfoProject}>
                            <Text style={styles.numberBasicInfo}>60 - 80</Text>
                            <Text style={styles.textBasicInfo}>Đơn giá Triệu / m2</Text>
                        </View>
                    </View>
                    <Text style={styles.titleSection}>TỔNG QUAN DỰ ÁN</Text>
                    <HTMLView
                        value={project.data.infomation}
                    // stylesheet={styles}
                    />
                    <Text style={styles.titleSection}>TIỆN ÍCH DỰ ÁN</Text>
                    <Modal
                        visible={this.state.modalVisible}
                        transparent
                        onRequestClose={() => {
                            this.setState({ modalVisible: false });
                        }}
                    >
                        <ImageViewer
                            imageUrls={this.state.listImage}
                            index={this.state.index}
                            onSwipeDown={() => {
                                this.setState({ modalVisible: false });
                            }}
                            enableSwipeDown
                            backgroundColor='black'
                            // loadingRender={() => {
                            //     <Text>Loading...</Text>
                            // }}
                            // pageAnimateTime='5000'
                            enablePreload
                        />
                    </Modal>
                    <ScrollView horizontal style={{ flexDirection: 'row', marginBottom: 5 }}>
                        {project.data.images.image_advance && project.data.images.image_advance.map((value, key) => (
                            <TouchableOpacity key={key} onPress={this.onDisplayImage.bind(this, key)}>
                                <Image
                                    source={{ uri: (value) ? `${BASE_URL}${value}` : NO_IMAGE }}
                                    style={styles.imgThumbProject}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View>
                        <Text style={styles.titleSection}>Sản phẩm</Text>
                        {project.data.images.design && project.data.images.design.map((value, key) => (
                            <ListItem thumbnail style={styles.itemList} key={key}>
                                <Left>
                                    <Thumbnail square source={{ uri: (value) ? `${BASE_URL}${value}` : NO_IMAGE }} style={styles.imgList} />
                                </Left>
                                <Body style={styles.bodyList}>
                                    <Text style={styles.textTitle}>An Phú Shop Villa - P1 - 1</Text>
                                    <Text style={styles.textDesc} note numberOfLines={1}>
                                        Kích thước: 9m x 18m
                                </Text>
                                    <Text style={styles.textDesc} note numberOfLines={1}>
                                        Số lượng: 72 Lô
                                </Text>
                                    <Text style={styles.textDesc} note numberOfLines={1}>
                                        Xây dựng: 3 tầng 1 tum
                                </Text>
                                </Body>
                            </ListItem>
                        ))}

                    </View>
                    <Text style={styles.titleSection}>Hình ảnh dự án & TVC</Text>
                    <YouTube
                        apiKey={YOUTUBE_APIKEY}
                        videoId={this.state.videoId}   // The YouTube video ID
                        play={true}             // control playback of video with true/false
                        // fullscreen={true}       // control whether the video should play in fullscreen or inline
                        // loop={true}             // control whether the video should loop when ended

                        onReady={e => this.setReady.bind(this)}
                        onChangeState={e => this.setChangeState.bind(this, e.state)}
                        onChangeQuality={e => this.setChangeQuality.bind(this, e.quality)}
                        onError={e => this.setOnError.bind(this, e.error)}

                        style={{ alignSelf: 'stretch', height: 300 }}
                    />
                    
                    <View style={{ height: 450 }}>
                        <DeckSwiper
                            dataSource={project.data.images.feature}
                            renderItem={item =>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: (item) ? `${BASE_URL}${item}` : NO_IMAGE }} />
                                            <Body>
                                                <Text>{project.name}</Text>
                                                <Text note>V-techHome</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={{ height: 300, flex: 1 }} source={{ uri: (item) ? `${BASE_URL}${item}` : NO_IMAGE }} />
                                    </CardItem>
                                    <CardItem>
                                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                        <Text>{project.name}</Text>
                                    </CardItem>
                                </Card>
                            }
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.bigBtn}
                        onPress={() => this.props.onChangeTab(4)}
                    >
                        <Text style={styles.textBtnActive}>
                            Đặt lịch thăm quan dự án & Nhà mẫu
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bigBtnIcon}
                        onPress={() => this.props.onChangeTab(5)}
                    >
                        <Icon type="FontAwesome" name='volume-control-phone' style={styles.iconBigBtn} />
                        <Text style={styles.textBtnIcon}>
                            LIÊN HỆ CHUYÊN VIÊN TƯ VẤN NGAY
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

            </View >
        );
    }
}
