import React, { Component } from 'react';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Icon,
    Right,
    Toast,
} from 'native-base';
import {
    FlatList,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import Header from '../Home/Header';
import getListPartner from './../../../api/getListPartner';
import {
    MEDIA_BASE_URL
} from '../../../Globals';
import { loading } from '../../../Helpers';

export default class ListPartner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            listPartner: [],
        };
    }

    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    componentDidMount() {
        const { navigation } = this.props;
        const idCategory = navigation.getParam('idCategory', null);
        if (idCategory) {
            getListPartner(idCategory)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            listPartner: res.data.data,
                            loaded: true
                        });
                    }
                })
                .catch(err => console.error(err));
        }
    }

    render() {
        const { navigation } = this.props;
        if (!this.state.loaded) {
            return loading();
        }
        if (this.state.listPartner.length <= 0) {
            return Toast.show({
                text: 'Dữ liệu trống!',
                type: 'danger',
                buttonText: 'Xác nhận'
            });
        }
        return (
            <Container>
                <Header
                    navigation={this.props.navigation}
                    title='CHỦ ĐẦU TƯ'
                    back={'back'}
                />
                <Content>
                    <Card>
                        <FlatList
                            data={this.state.listPartner}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('DetailPartnerScreen', {
                                        partner: item,
                                    })}
                                >
                                    <CardItem>
                                        <Image
                                            source={{ uri: (item.image_url) ? `${MEDIA_BASE_URL}${item.image_url}` : '' }}
                                            style={{ height: 30, width: 30 }}
                                        />
                                        <Text style={{ paddingLeft: 10 }}>{item.name}</Text>
                                        <Right style={{ marginLeft: 'auto' }}>
                                            <Icon name="arrow-forward" style={{ textAlign: 'right' }} />
                                        </Right>
                                    </CardItem>
                                </TouchableOpacity>
                            )}
                        />
                    </Card>
                </Content>
            </Container>
        );
    }
}