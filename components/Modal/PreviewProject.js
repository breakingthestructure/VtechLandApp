import React, { Component } from 'react';
import { Container, Content, Spinner, Icon } from 'native-base';
import {
    Text,
    FlatList,
    View,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import icTitle from './../../icons/ic_title.png';
import { BASE_URL, NO_IMAGE } from './../../Globals';
import styles from './../../styles';

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
        if (this.props.project.data.images.feature)
            this.setState({
                listImage: this.props.project.data.images.feature.map((item, index) => {
                    return { url: `${BASE_URL}${item}` };
                })
            });
    }
    componentWillReceiveProps(props) {
        if (props.project.data.images.feature)
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
                        <Image source={icTitle} style={styles.icTitle} />
                    </View>

                    <Text style={styles.title} note numberOfLines={1}>{project.name}</Text>
                </View>
                <Text note numberOfLines={1}>{project.address}</Text>
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
                <View style={styles.actionPreview}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            // borderRadius: 5,
                            backgroundColor: '#F58319',
                            width: '40%',
                            marginRight: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: project.id
                            });
                        }}
                    >
                        <Text style={styles.textBtnIcon}>
                            XEM CHI TIẾT
                        </Text>
                        <Icon type="FontAwesome" name='caret-right' style={{ fontSize: 14, color: 'white', marginTop: 13 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            backgroundColor: '#F58319',
                            justifyContent: 'center',
                            width: '20%',
                            alignItems: 'center',
                            marginRight: 1,
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: project.id,
                                activeTab: 3
                            });
                        }}
                    >
                        <Icon active name='ios-cart' style={styles.iconBtn} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            backgroundColor: '#F58319',
                            justifyContent: 'center',
                            width: '20%',
                            alignItems: 'center',
                            marginRight: 1,
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: project.id,
                                activeTab: 3
                            });
                        }}
                    >
                        <Icon type="FontAwesome" name='dollar' style={styles.iconBtn} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            backgroundColor: '#F58319',
                            justifyContent: 'center',
                            width: '20%',
                            alignItems: 'center',
                            marginRight: 1,
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: project.id,
                                activeTab: 3
                            });
                        }}
                    >
                        <Icon active name='ios-bookmark' style={styles.iconBtn} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
