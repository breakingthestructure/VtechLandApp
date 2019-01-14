import React, { Component } from 'react';
import { Icon, Spinner } from 'native-base';
import {
    FlatList,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import icTitle from './../../icons/ic_title.png';
import {
    NO_IMAGE
} from './../../Globals';
import styles from './../../styles';
import {
    dataNotFound,
    loading,
} from '../../Helpers';

export default class PreviewProject extends Component {
    keyExtractor = (item) => item.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            listImage: [],
            index: 0,
            loaded: false,
            imagePreview: false
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
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ paddingTop: 5 }}>
                        <Image source={icTitle} style={styles.icTitle} />
                    </View>

                    <Text style={styles.title} note numberOfLines={1}>{project.name}</Text>
                </View>
                <Text note numberOfLines={1}>{project.address}</Text>
                {/* <Text>{project.description}</Text> */}
                {project.images && project.images.project_feature &&
                <FlatList
                    horizontal
                    data={project.images.project_feature}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={item}
                            onPress={this.onDisplayImage.bind(this, index)}
                        >
                            <FastImage
                                style={styles.thumbProject}
                                source={{
                                    uri: (item) ? item : NO_IMAGE,
                                    priority: FastImage.priority.normal,
                                }}
                                // resizeMode={FastImage.resizeMode.contain}
                                onProgress={e => {
                                    console.log(e.nativeEvent.loaded / e.nativeEvent.total);
                                    if (e.nativeEvent.loaded / e.nativeEvent.total < 1) {
                                        return <Spinner />;
                                    }
                                }}
                            />
                            {/*<Image*/}
                                {/*source={{ uri: (item) ? item : NO_IMAGE }}*/}
                                {/*style={styles.thumbProject}*/}
                                {/*onLoad={() => {*/}
                                    {/*this.setState({*/}
                                        {/*loaded: true*/}
                                    {/*});*/}
                                {/*}}*/}
                                {/*onLoadStart={() => {*/}
                                    {/*console.log('onLoadStart');*/}
                                {/*}}*/}
                                {/*onLoadEnd={() => {*/}
                                    {/*console.log('onLoadEnd');*/}
                                {/*}}*/}
                            {/*/>*/}
                        </TouchableOpacity>
                    )}
                /> }
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
                            if (this.state.loaded) {
                                this.setState({ imagePreview: false });
                            }
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
                                // projectId: project.id,
                                project
                            });
                        }}
                    >
                        <Text style={styles.textBtnIcon}>
                            XEM CHI TIẾT
                        </Text>
                        <Icon type="FontAwesome" name='caret-right'
                              style={{ fontSize: 14, color: 'white', marginTop: 13 }} />
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
                            this.props.navigation.navigate('BuildingScreen', {
                                // projectId: project.id,
                                project
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
                                // projectId: project.id,
                                activeTab: 3,
                                project
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
                                // projectId: project.id,
                                activeTab: 3,
                                project
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
