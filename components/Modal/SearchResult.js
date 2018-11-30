import React, { Component } from 'react';
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Image,
    Modal,
    Alert
} from 'react-native';
import {
    Container,
    Header,
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
import imgDuan from './../../images/duan.jpg';
import icTitle from './../../icons/ic_title.png';
import { BASE_URL, NO_IMAGE } from './../../Globals';

// const { width, height } = Dimensions.get('window');

export default class SearchResult extends Component {
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

    }
    onLikeProject() {
        Alert.alert(
            'Bạn quan tâm dự án này',
            '',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen') },
                { text: 'Hủy', onPress: () => console.log('ok') },
            ],
            { cancelable: false }
        );
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
        return (
            <Container>
                <Content>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => {
                            this.props.toggleResult();
                        }}
                    >
                        <Text style={styles.textHeading}>10 kết quả tìm kiếm</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <ListItem thumbnail>
                            <Left>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('TabProjectScreen', {
                                            projectId: 1
                                        });
                                    }}
                                >
                                    <Thumbnail square source={imgDuan} />
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('TabProjectScreen', {
                                            projectId: 1
                                        });
                                    }}
                                >
                                    <Text style={styles.textTitle}>An Phú Shop Villa</Text>
                                    <Text style={styles.textDesc} note numberOfLines={1}>Khu đô thị Dương nội, Hà Đông, Hà Nội</Text>
                                    <Text style={styles.textDesc} note numberOfLines={1}>60.000.000 Tr - 80.000.000 tr/m2</Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <Button transparent onPress={this.onLikeProject.bind(this)}>
                                    <Icon active name='ios-heart' style={{ color: 'orange' }} />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={imgDuan} />
                            </Left>
                            <Body>
                                <Text style={styles.textTitle}>An Phú Shop Villa</Text>
                                <Text style={styles.textDesc} note numberOfLines={1}>Khu đô thị Dương nội, Hà Đông, Hà Nội</Text>
                                <Text style={styles.textDesc} note numberOfLines={1}>60.000.000 Tr - 80.000.000 tr/m2</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon active name='ios-heart' style={{ color: 'orange' }} />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={imgDuan} />
                            </Left>
                            <Body>
                                <Text style={styles.textTitle}>An Phú Shop Villa</Text>
                                <Text style={styles.textDesc} note numberOfLines={1}>Khu đô thị Dương nội, Hà Đông, Hà Nội</Text>
                                <Text style={styles.textDesc} note numberOfLines={1}>60.000.000 Tr - 80.000.000 tr/m2</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon active name='ios-heart' style={{ color: 'orange' }} />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={imgDuan} />
                            </Left>
                            <Body>
                                <Text style={styles.textTitle}>An Phú Shop Villa</Text>
                                <Text style={styles.textDesc} note numberOfLines={1}>Khu đô thị Dương nội, Hà Đông, Hà Nội</Text>
                                <Text style={styles.textDesc} note numberOfLines={1}>60.000.000 Tr - 80.000.000 tr/m2</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon active name='ios-heart' style={{ color: 'orange' }} />
                                </Button>
                            </Right>
                        </ListItem>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    underLine: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        width: '90%',
        paddingTop: 5,
        justifyContent: 'center'
    },
    textHeading: { textAlign: 'center', fontSize: 16, fontWeight: '500', color: '#016aa9', paddingTop: 10 },
    textTitle: { fontSize: 14, fontWeight: '500', color: '#016aa9' },
    textDesc: { fontSize: 12, color: '#555' }
});
