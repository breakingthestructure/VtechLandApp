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
    Icon
} from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import YouTube from 'react-native-youtube';
import HTMLView from 'react-native-htmlview';

import Header from './../Home/Header';

import imgDuan from './../../../images/duan.jpg';
import icTitle from './../../../icons/ic_title.png';

const { width, height } = Dimensions.get('window');
const images = [{
    // url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    // width: number
    // height: number
    // You can pass props to <Image />.
    props: {
        // headers: ...
        source: imgDuan
    },
    freeHeight: true
}, {
    props: {
        // Or you can set source directory.
        source: imgDuan
    },
    freeHeight: true
}]

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
        };
    }

    componentDidMount() {
        // const { navigation } = this.props;
        // const projectId = navigation.getParam('projectId', null);
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
        // if (apartmentId) {
        //     getDetailApartment(apartmentId)
        //         .then(resJson => {
        //             if (resJson) {
        //                 this.setState({
        //                     apartment: resJson,
        //                     image3d: resJson.image_3d.map((item, index) => {
        //                         return { url: `${BASE_URL}${item}` };
        //                     }),
        //                     loaded: true
        //                 });
        //             }
        //         })
        //         .catch(err => console.log(err));
        // }
    }
    onDisplayImage() {
        this.setState({ modalVisible: true });
    }
    render() {
        if (!this.state.loaded) {
            return (
                <Container>
                    <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        const htmlContent = '<div class=\"tongquanduan\" style=\"color: rgb(33, 37, 41); font-family: Arial, Helvetica, sans-serif;\"><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">T\u00ean d\u1ef1 \u00e1n:&nbsp;<\/span>Mulberry Lane<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">V\u1ecb tr\u00ed:<\/span>&nbsp;Khu \u0111\u00f4 th\u1ecb m\u1edbi M\u1ed7 Lao, Qu\u1eadn H\u00e0 \u0110\u00f4ng, th\u00e0nh ph\u1ed1 H\u00e0 N\u1ed9i<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">Ch\u1ee7 \u0111\u1ea7u t\u01b0 d\u1ef1 \u00e1n:&nbsp;<\/span>C\u00f4ng ty TNHH CapitaLand \u2013 Ho\u00e0ng Th\u00e0nh<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">Qu\u1ea3n l\u00fd thi c\u00f4ng d\u1ef1 \u00e1n:&nbsp;<\/span>C\u00f4ng ty CapitaLand (VN)<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">T\u1ed5ng di\u1ec7n t\u00edch d\u1ef1 \u00e1n<\/span>: 24,466 m2<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">Quy m\u00f4 d\u1ef1 \u00e1n:&nbsp;<\/span>&nbsp;G\u1ed3m 5 t\u00f2a th\u00e1p v\u00e0 1.478 c\u0103n h\u1ed9<\/p><p style=\"text-align: justify;\"><\/p><\/div><div class=\"vitriduan\" style=\"color: rgb(33, 37, 41); font-family: Arial, Helvetica, sans-serif;\"><div class=\"left-title\" style=\"margin: 20px 0px;\"><h2 style=\"margin-bottom: 0px; font-weight: bold; color: rgb(245, 130, 31); font-size: 18px; text-transform: uppercase;\">V\u1eca TR\u00cd D\u1ef0 \u00c1N<\/h2><\/div><\/div>';
        return (
            <View style={styles.container}>
                <ScrollView style={styles.wrapper}>
                    <Text style={styles.title}>AN PHÚ SHOP VILLA</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 5 }}>
                            <Icon type="FontAwesome" name='map-marker' style={{ fontSize: 12, color: 'orange' }} />
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 4, paddingLeft: 5 }}>Khu đô thị Dương Nội, P. Dương Nội, Q. Hà Đông, TP. Hà Nội</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 5 }}>
                            <Icon type="FontAwesome" name='list-ul' style={{ fontSize: 12, color: 'orange' }} />
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 4, paddingLeft: 5 }}>Liền kề - Biệt thự</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 5 }}>
                            <Icon type="FontAwesome" name='suitcase' style={{ fontSize: 12, color: 'orange' }} />
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 4, paddingLeft: 5 }}>Sản phẩm phát triển bởi Tập đoàn Nam Cường</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 80, borderWidth: 1, borderColor: '#cecece', borderRadius: 5, marginTop: 10 }}>
                        <View style={{ height: 75, width: (width - 20) / 4, borderRightWidth: 1, borderRightColor: '#cecece', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '400', color: '#333333', textAlign: 'center' }}>256</Text>
                            <Text style={{ fontSize: 8, color: '#333333', textAlign: 'center' }}>Lô liền kề - Biệt thự</Text>
                        </View>

                        <View style={{ height: 75, width: (width - 20) / 2, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '400', color: '#333333', textAlign: 'center' }}>180m2 - 220m2</Text>
                            <Text style={{ fontSize: 8, color: '#333333', textAlign: 'center' }}>Lô liền kề - Biệt thự</Text>
                        </View>

                        <View style={{ height: 75, width: (width - 20) / 4, borderLeftWidth: 1, borderLeftColor: '#cecece', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '400', color: '#333333', textAlign: 'center' }}>60 - 80</Text>
                            <Text style={{ fontSize: 8, color: '#333333', textAlign: 'center' }}>Đơn giá Triệu / m2</Text>
                        </View>
                    </View>
                    <Text style={{ fontWeight: '400', fontSize: 16, color: '#1f7eb8', paddingBottom: 5, paddingTop: 5 }}>TỔNG QUAN DỰ ÁN</Text>
                    {/* <HTMLView
                        value={htmlContent}
                        stylesheet={styles}
                    /> */}
                    <Text>
                        Dự án Roman Plaza Tố Hữu là sản phẩm tâm huyết của tập đoàn Hải Phát sau nhiều năm ấp ủ,
                        đã chính thức được ra mắt trên thị trường bất động sản bằng sự kiện khởi công xây dựng
                        cuối năm 2016. Tính đến tháng 9/2018 dự án đã cất nóc và đi vào công tác hoàn thiện
                        chuẩn bị bàn giao cho khách hàng vào 2019.
                        Với mong muốn đưa tới một nét thành Rome giữa lòng Hà Nội,
                        thiết kế của các căn hộ được lấy cảm hứng từ phong cách thiết kế của các công trình kiến trúc nổi tiếng nhất
                        tại đất nước Italia thơ mộng, đơn giản mà sang trọng, nhẹ nhàng mà cuốn hút. Dưới bàn tay và khối óc của các
                        kiến trúc sư tài năng, hội tụ và giao thoa của hai nền văn hóa phương Đông và phương Tây, sôi động mà bình yên,
                        nhộn nhịp mà an lành
                    </Text>
                    <Text style={{ fontWeight: '400', fontSize: 16, color: '#1f7eb8', paddingBottom: 5, paddingTop: 5 }}>TIỆN ÍCH DỰ ÁN</Text>
                    <Modal
                        visible={this.state.modalVisible}
                        transparent
                        onRequestClose={() => {
                            this.setState({ modalVisible: false });
                        }}
                    >
                        <ImageViewer
                            imageUrls={images}
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
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: (width - 20) / 3, height: 110, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: (width - 20) / 3, height: 110, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: (width - 20) / 3, height: 110, marginRight: 5 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: (width - 20) / 3, height: 110, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: (width - 20) / 3, height: 110, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: (width - 20) / 3, height: 110, marginRight: 5 }} />
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={{ marginLeft: 0, margin: 0, width: '100%', top: 0 }}>
                        <Text style={{ fontWeight: '400', fontSize: 16, color: '#1f7eb8', paddingTop: 10, marginBottom: 0 }}>Sản phẩm</Text>
                        <ListItem thumbnail style={{ marginLeft: 0, width: '100%', marginTop: 0 }}>
                            <Left>
                                <Thumbnail square source={imgDuan} style={{ height: 60, borderRadius: 5 }} />
                            </Left>
                            <Body style={{ margin: 0, height: 100 }}>
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
                        <ListItem thumbnail style={{ marginLeft: 0, width: '100%' }}>
                            <Left>
                                <Thumbnail square source={imgDuan} style={{ height: 60, borderRadius: 5 }} />
                            </Left>
                            <Body style={{ margin: 0, height: 100 }}>
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
                        <ListItem thumbnail style={{ marginLeft: 0, width: '100%' }}>
                            <Left>
                                <Thumbnail square source={imgDuan} style={{ height: 60, borderRadius: 5 }} />
                            </Left>
                            <Body style={{ margin: 0, height: 100 }}>
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
                        <ListItem thumbnail style={{ marginLeft: 0, width: '100%' }}>
                            <Left>
                                <Thumbnail square source={imgDuan} style={{ height: 60, borderRadius: 5 }} />
                            </Left>
                            <Body style={{ margin: 0, height: 100 }}>
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
                    </View>
                    <Text style={{ fontWeight: '400', fontSize: 16, color: '#1f7eb8', paddingBottom: 5 }}>Hình ảnh dự án & TVC</Text>
                    <YouTube
                        apiKey='AIzaSyByXMeeujrWpH517p7LkQrfBmTNIN1RTkQ'
                        videoId="XB-TIyGVM7I"   // The YouTube video ID
                        play={true}             // control playback of video with true/false
                        // fullscreen={true}       // control whether the video should play in fullscreen or inline
                        // loop={true}             // control whether the video should loop when ended

                        onReady={e => this.setState({ isReady: true })}
                        onChangeState={e => this.setState({ status: e.state })}
                        onChangeQuality={e => this.setState({ quality: e.quality })}
                        onError={e => this.setState({ error: e.error })}

                        style={{ alignSelf: 'stretch', height: 300 }}
                    />
                    <TouchableOpacity
                        style={styles.bigBtn}
                        onPress={() => this.props.onChangeTab(3)}
                    >
                        <Text style={{ color: '#555', fontWeight: '400', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
                            Đặt lịch thăm quan dự án & Nhà mẫu
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bigBtnCall}
                        onPress={() => this.props.onChangeTab(5)}
                    >
                        <Icon type="FontAwesome" name='volume-control-phone' style={{ fontSize: 14, color: 'white', marginTop: 10, marginRight: 5 }} />
                        <Text style={{ color: 'white', fontWeight: '400', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
                            LIÊN HỆ CHUYÊN VIÊN TƯ VẤN NGAY
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
    },
    textTitle: { fontSize: 14, fontWeight: '500', color: '#016aa9' },
    textDesc: { fontSize: 12, color: '#555' },
    bigBtn: {
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#c2c2c2'
    },
    bigBtnCall: {
        height: 40,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#187EB9',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: { backgroundColor: 'white', flex: 1 },
    title: { fontWeight: '400', fontSize: 18, color: '#1f7eb8', paddingBottom: 5 }
});
