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

import { Container, Content, Spinner } from 'native-base';
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
        const { navigation } = this.props;
        const projectId = navigation.getParam('projectId', null);
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
                    <Content>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        const htmlContent = '<div class=\"tongquanduan\" style=\"color: rgb(33, 37, 41); font-family: Arial, Helvetica, sans-serif;\"><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">T\u00ean d\u1ef1 \u00e1n:&nbsp;<\/span>Mulberry Lane<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">V\u1ecb tr\u00ed:<\/span>&nbsp;Khu \u0111\u00f4 th\u1ecb m\u1edbi M\u1ed7 Lao, Qu\u1eadn H\u00e0 \u0110\u00f4ng, th\u00e0nh ph\u1ed1 H\u00e0 N\u1ed9i<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">Ch\u1ee7 \u0111\u1ea7u t\u01b0 d\u1ef1 \u00e1n:&nbsp;<\/span>C\u00f4ng ty TNHH CapitaLand \u2013 Ho\u00e0ng Th\u00e0nh<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">Qu\u1ea3n l\u00fd thi c\u00f4ng d\u1ef1 \u00e1n:&nbsp;<\/span>C\u00f4ng ty CapitaLand (VN)<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">T\u1ed5ng di\u1ec7n t\u00edch d\u1ef1 \u00e1n<\/span>: 24,466 m2<\/p><p style=\"text-align: justify;\"><span style=\"font-weight: bolder;\">Quy m\u00f4 d\u1ef1 \u00e1n:&nbsp;<\/span>&nbsp;G\u1ed3m 5 t\u00f2a th\u00e1p v\u00e0 1.478 c\u0103n h\u1ed9<\/p><p style=\"text-align: justify;\"><\/p><\/div><div class=\"vitriduan\" style=\"color: rgb(33, 37, 41); font-family: Arial, Helvetica, sans-serif;\"><div class=\"left-title\" style=\"margin: 20px 0px;\"><h2 style=\"margin-bottom: 0px; font-weight: bold; color: rgb(245, 130, 31); font-size: 18px; text-transform: uppercase;\">V\u1eca TR\u00cd D\u1ef0 \u00c1N<\/h2><\/div><\/div>';
        return (
            <View style={{ backgroundColor: 'white', height, width }}>
                <Header navigation={this.props.navigation} title='Chi tiết dự án' />
                <ScrollView style={styles.wrapper}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingTop: 5 }}>
                            <Image source={icTitle} style={{ width: 2, height: 13 }} />
                        </View>
                        <Text style={{ fontWeight: '600', fontSize: 16, paddingLeft: 5 }}>VINHOMES DRAGON BAY</Text>
                    </View>
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
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: 120, height: 120, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: 120, height: 120, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: 120, height: 120, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: 120, height: 120, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: 120, height: 120, marginRight: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this)}>
                            <Image source={imgDuan} style={{ width: 120, height: 120, marginRight: 5 }} />
                        </TouchableOpacity>
                    </ScrollView>
                    <HTMLView
                        value={htmlContent}
                        stylesheet={styles}
                    />
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
                    <Text>TVC Dự án</Text>
                    <YouTube
                        apiKey='AIzaSyByXMeeujrWpH517p7LkQrfBmTNIN1RTkQ'
                        videoId="peZ1LVG0ydA"   // The YouTube video ID
                        // play={true}             // control playback of video with true/false
                        // fullscreen={true}       // control whether the video should play in fullscreen or inline
                        // loop={true}             // control whether the video should loop when ended

                        onReady={e => this.setState({ isReady: true })}
                        onChangeState={e => this.setState({ status: e.state })}
                        onChangeQuality={e => this.setState({ quality: e.quality })}
                        onError={e => this.setState({ error: e.error })}

                        style={{ alignSelf: 'stretch', height: 300 }}
                    />
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
});
