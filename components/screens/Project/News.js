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

export default class News extends React.Component {
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
        return (
            <View style={styles.container}>
                <ScrollView style={styles.wrapper}>
                    <Text style={{ fontWeight: '400', fontSize: 16, color: '#1f7eb8' }}>Tiến độ dự án</Text>
                    <List>
                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                    </List>

                    <Text style={{ fontWeight: '400', fontSize: 16, color: '#1f7eb8', paddingTop: 15 }}>Sự kiện</Text>
                    <List>
                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                    </List>

                    <Text style={{ fontWeight: '400', fontSize: 16, color: '#1f7eb8', paddingTop: 15 }}>Tin tức & Sự kiện</Text>
                    <List>
                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                        <ListItem thumbnail style={{ margin: 0 }}>
                            <Left>
                                <Icon name='ios-square' style={{ fontSize: 12, color: '#053654' }} />
                            </Left>
                            <Body style={{ margin: 0, height: 60 }}>
                                <Text note numberOfLines={1}>Tiến độ dự án An Phú Shop Villa - Tháng 12-2018</Text>
                                <Text>Ngày đăng: 05-11.2018</Text>
                            </Body>
                        </ListItem>

                    </List>
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
    title: { fontWeight: '400', fontSize: 18, color: '#1f7eb8' }
});
