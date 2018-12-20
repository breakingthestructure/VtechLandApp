import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert, RefreshControl, FlatList
} from 'react-native';
import {
    Container,
    Content,
    ListItem,
    Thumbnail,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Tab,
    Tabs, ScrollableTab
} from 'native-base';
import { loading } from '../../Helpers';
import getProject from '../../api/getProject';
import { BASE_URL, NO_IMAGE } from './../../Globals';
import styles from './../../styles';

export default class KindProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: null,
            index: 0,
            loaded: true,
            imagePreview: false,
            listProject: null
        };
        this.arrayProject = [];
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

    componentDidMount() {
        this.setState({ loaded: false });
        getProject(`kind=${this.props.kind}`)
            .then(resJson => {
                if (resJson.data) {
                    this.arrayProject = resJson.data;
                    this.setState({
                        listProject: this.arrayProject,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    componentWillReceiveProps(props) {
        this.setState({ loaded: false });
        getProject(`kind=${props.kind}`)
            .then(resJson => {
                if (resJson.data) {
                    this.arrayProject = resJson.data;
                    this.setState({
                        listProject: this.arrayProject,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    render() {
        if (!this.props.state.loaded || !this.state.listProject) {
            return loading();
        }
        return (
            <Container>
                <Content>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => {
                            this.props.toggleKindProject();
                        }}
                    >
                        <Text
                            style={styles.titleScreen}
                        >
                            {this.state.listProject.length} dự án
                        </Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.listProject}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <ListItem thumbnail>
                                <Left>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('TabProjectScreen', {
                                                projectId: item.id
                                            });
                                        }}
                                    >
                                        <Thumbnail
                                            square
                                            source={{
                                                uri: (item.data.images.feature) ? `${BASE_URL}${item.data.images.feature[0]}` : NO_IMAGE
                                            }}
                                        />
                                    </TouchableOpacity>
                                </Left>
                                <Body>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('TabProjectScreen', {
                                            projectId: item.id
                                        });
                                    }}
                                >
                                    <Text style={styles.textTitle}>{item.name}</Text>
                                    <Text
                                        style={styles.textDesc}
                                        note
                                        numberOfLines={1}
                                    >
                                        {item.address}
                                    </Text>
                                    <Text
                                        style={styles.textDesc}
                                        note
                                        numberOfLines={1}
                                    >
                                        {item.min_price} Tr - {item.max_price} tr/m2
                                    </Text>
                                </TouchableOpacity>
                                </Body>
                                <Right>
                                    <Button transparent onPress={this.onLikeProject.bind(this)}>
                                        <Icon active name='ios-heart' style={{ color: 'orange' }} />
                                    </Button>
                                </Right>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}
