import React, { Component } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Body, Button, Container, Content, Icon, Left, ListItem, Right, Thumbnail } from 'native-base';
import { BASE_URL, NO_IMAGE } from './../../Globals';
import {
    formatMoney,
    loading
} from '../../Helpers';
import getToken from '../../api/getToken';
import postLikeProject from '../../api/postLikeProject';
import getFavouriteProjects from '../../api/getFavouriteProjects';

// const { width, height } = Dimensions.get('window');

export default class SearchResult extends Component {
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            listImage: null,
            index: 0,
            loaded: false,
            imagePreview: false
        };
    }
    componentDidMount() {
        getToken()
            .then(token => {
                getFavouriteProjects(token)
                    .then(res => {
                        this.setState({
                            listFavourite: res.data,
                            loaded: true
                        });
                    })
                    .catch(err => console.log(err));
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
        const { dataSearch } = this.props.state;
        if (!this.state.loaded) {
            return loading();
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
                        <Text style={styles.textHeading}>{dataSearch.length} kết quả tìm kiếm</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={dataSearch}
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
                                        {formatMoney(item.data.price_unit_min, 0)}tr
                                        - {formatMoney(item.data.price_unit_max, 0)}tr/m2
                                    </Text>
                                </TouchableOpacity>
                                </Body>
                                <Right>
                                    <Button
                                        transparent
                                        onPress={this.onLikeProject.bind(this, item.id)}
                                    >
                                        <Icon
                                            type='FontAwesome'
                                            name={this.state.listFavourite.includes(item.id) ?
                                                'heart' : 'heart-o'}
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
