import React, { Component } from 'react';
import { Container, Content, Spinner, Icon } from 'native-base';
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import imgDuan from './../../images/duan.jpg';
import icTitle from './../../icons/ic_title.png';
import { BASE_URL, NO_IMAGE } from './../../Globals';

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
}];

// const { width, height } = Dimensions.get('window');

export default class AdvanceSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: null,
            index: 0,
            loaded: true,
            imagePreview: false
        };
        this.arrayProject = [];
    }
    componentDidMount() {
        this.setState({
            listImage: this.props.project.data.images.feature.map((item, index) => {
                return { url: `${BASE_URL}${item}` };
            })
        });
    }
    componentWillReceiveProps(props) {
        this.setState({
            listImage: props.project.data.images.feature.map((item, index) => {
                return { url: `${BASE_URL}${item}` };
            })
        });
    }
    onDisplayImage(index) {
        this.setState({
            index,
            imagePreview: true
        });
    }
    keyExtractor = (item) => item.toString(); //eslint-disable-line
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
        const { project } = this.props;
        if (!project) {
            return (
                <View>
                    <Text>Không tìm thấy dự án này</Text>
                </View>
            );
        }
        return (
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingTop: 5 }}>
                        <Image source={icTitle} style={{ width: 2, height: 13 }} />
                    </View>

                    <Text style={{ fontWeight: '600', fontSize: 16, paddingLeft: 5 }}>{project.name}</Text>
                </View>
                <Text>{project.address}</Text>
                {/* <Text>{project.description}</Text> */}
                <FlatList
                    horizontal
                    data={project.data.images.feature}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={item} onPress={this.onDisplayImage.bind(this, index)}>
                            <Image
                                source={{ uri: (item) ? `${BASE_URL}${item}` : NO_IMAGE }}
                                style={styles.thumbProject}
                            />
                        </TouchableOpacity>
                    )}
                />
                <Modal
                    visible={this.state.imagePreview}
                    transparent
                    onRequestClose={() => {
                        this.setState({ imagePreview: false });
                    }}
                >
                    <ImageViewer
                        imageUrls={this.state.listImage}
                        index={this.state.index}
                        onSwipeDown={() => {
                            this.setState({ imagePreview: false });
                        }}
                        enableSwipeDown
                        backgroundColor='black'
                        enablePreload
                    />
                </Modal>
                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                    <TouchableOpacity
                        style={styles.btnDetail}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: project.id
                            });
                        }}
                    >
                        <Text style={{ fontWeight: '500', marginHorizontal: 15, fontSize: 14, color: 'white', marginTop: 5 }}>
                            XEM CHI TIẾT
                        </Text>
                        <Icon active name='ios-arrow-forward' style={{ color: '#fff', fontSize: 14, marginTop: 7, marginLeft: 0 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnTable}
                        onPress={() => {
                            this.props.navigation.navigate('TablePackageScreen', {
                                projectId: project.id
                            });
                        }}
                    >
                        <Icon active name='ios-cart' style={{ color: '#fff', fontSize: 14 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnTable}
                        onPress={() => {
                            this.props.navigation.navigate('TablePackageScreen', {
                                projectId: project.id
                            });
                        }}
                    >
                        <Icon type="FontAwesome" name='dollar' style={{ color: '#fff', fontSize: 14 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnTable}
                        onPress={() => {
                            this.props.navigation.navigate('TablePackageScreen', {
                                projectId: project.id
                            });
                        }}
                    >
                        <Icon active name='ios-bookmark' style={{ color: '#fff', fontSize: 14 }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    thumbProject: { width: 120, height: 120, marginRight: 5 },
    btnDetail: {
        height: 30,
        // borderColor: '#959595',
        borderRadius: 5,
        backgroundColor: '#F4AF47',
        width: '40%',
        marginRight: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // borderWidth: 1
    },
    btnTable: {
        height: 30,
        borderColor: '#959595',
        borderRadius: 5,
        backgroundColor: '#F4AF47',
        justifyContent: 'center',
        width: '20%',
        alignItems: 'center',
        marginRight: 1,
    },
});
