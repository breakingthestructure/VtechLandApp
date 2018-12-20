import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Body, Button, Container, Content, Icon, Left, ListItem, Right, Thumbnail } from 'native-base';
import { BASE_URL, NO_IMAGE } from './../../Globals';
import { loading } from '../../Helpers';
import getToken from '../../api/getToken';
import postLikeProject from '../../api/postLikeProject';

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
                                    });
                            });
                    }
                },
                { text: 'Hủy', onPress: () => console.log('ok') },
            ],
            { cancelable: false }
        );
    }
    keyExtractor = (item) => item.toString(); //eslint-disable-line
    render() {
        const { dataSearch } = this.props.state;
        if (!this.props.state.loaded) {
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
                    <ScrollView>
                        {dataSearch && dataSearch.map((value, key) => (
                            <ListItem thumbnail key={key}>
                                <Left>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('TabProjectScreen', {
                                                projectId: value.id
                                            });
                                        }}
                                    >
                                        <Thumbnail square source={{ uri: (value.data.images.feature) ? `${BASE_URL}${value.data.images.feature[0]}` : NO_IMAGE }} />
                                    </TouchableOpacity>
                                </Left>
                                <Body>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('TabProjectScreen', {
                                                projectId: value.id
                                            });
                                        }}
                                    >
                                        <Text style={styles.textTitle}>{value.name}</Text>
                                        <Text style={styles.textDesc} note numberOfLines={1}>{value.address}</Text>
                                        <Text style={styles.textDesc} note numberOfLines={1}>{value.min_price} Tr - {value.max_price} tr/m2</Text>
                                    </TouchableOpacity>
                                </Body>
                                <Right>
                                    <Button transparent onPress={this.onLikeProject.bind(this, value.id)}>
                                        <Icon active name='ios-heart' style={{ color: 'orange' }} />
                                    </Button>
                                </Right>
                            </ListItem>
                        ))}
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
