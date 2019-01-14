import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Icon,
    Left,
    ListItem,
    Right,
    Thumbnail
} from 'native-base';
import { loading } from '../../Helpers';
import getProject from '../../api/getProject';
import {
    NO_IMAGE
} from './../../Globals';
import styles from './../../styles';
import getToken from '../../api/getToken';
import getFavouriteProjects from '../../api/getFavouriteProjects';
import postLikeProject from '../../api/postLikeProject';

export default class KindProject extends Component {
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            listImage: null,
            index: 0,
            loaded: false,
            imagePreview: false,
            listProject: [],
            listFavourite: []
        };
        this.arrayProject = [];
    }

    componentDidMount() {
        getToken()
            .then(token => {
                getFavouriteProjects(token)
                    .then(res => {
                        this.setState({
                            listFavourite: res.data
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
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

    onLikeProject(id) {
        Alert.alert(
            'Bạn quan tâm dự án này',
            '',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        getToken()
                            .then(token => {
                                postLikeProject(token, id)
                                    .then(res => {
                                        if (res.status === 200) {
                                            const arr = this.state.listFavourite;
                                            if (res.data === 'added') {
                                                arr.push(id);
                                            } else {
                                                const index = arr.indexOf(id);
                                                if (index > -1) {
                                                    arr.splice(index, 1);
                                                }
                                            }
                                            this.setState({ listFavourite: arr });
                                        }
                                    });
                            });
                    }
                },
                { text: 'Hủy', onPress: () => console.log('ok') },
            ],
            { cancelable: false }
        );
    }

    render() {
        if (!this.state.loaded || !this.state.listProject) {
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
                        extraData={this.state}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <ListItem thumbnail>
                                <Left>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('TabProjectScreen', {
                                                project: item
                                            });
                                        }}
                                    >
                                        <Thumbnail
                                            square
                                            source={{
                                                uri: (item.images.project_feature) ?
                                                    item.images.project_feature[0] : NO_IMAGE
                                            }}
                                        />
                                    </TouchableOpacity>
                                </Left>
                                <Body>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('TabProjectScreen', {
                                            project: item
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
                                    <Button transparent onPress={this.onLikeProject.bind(this, item.id)}>
                                        <Icon
                                            type='FontAwesome'
                                            name={this.state.listFavourite.includes(item.id) ? 'heart' : 'heart-o'}
                                            style={{ color: 'orange' }}
                                        />
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
