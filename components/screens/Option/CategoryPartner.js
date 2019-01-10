import React, { Component } from 'react';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Icon,
    Right,
} from 'native-base';
import {
    FlatList,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import Header from '../Home/Header';
import getCategoryPartner from './../../../api/getCategoryPartner';
import {
    MEDIA_BASE_URL
} from '../../../Globals';
import { loading } from "../../../Helpers";

export default class CategoryPartner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            listCategory: [],
        };
    }

    keyExtractor = (item, index) => index.toString(); //eslint-disable-line
    componentDidMount() {
        getCategoryPartner()
            .then(res => {
                if (res.status) {
                    this.setState({
                        listCategory: res.data,
                        loaded: true
                    });
                }
            })
            .catch(err => console.error(err));
    }

    render() {
        const { navigation } = this.props;
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header
                    navigation={this.props.navigation}
                    title='DANH SÁCH ĐỐI TÁC'
                    back={'MapScreen'}
                />
                <Content>
                    <Card>
                        <FlatList
                            data={this.state.listCategory}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ListPartnerScreen', {
                                        idCategory: item.id,
                                    })}
                                >
                                    <CardItem>
                                        <Icon
                                            active
                                            type='FontAwesome'
                                            name="vcard"
                                            style={{ color: '#1ba9ff' }}
                                        />
                                        <Text style={{ paddingLeft: 10 }}>
                                            {item.name} ({item.total_item})
                                        </Text>
                                        <Right style={{ marginLeft: 'auto' }}>
                                            <Icon
                                                name="arrow-forward"
                                                style={{ textAlign: 'right' }}
                                            />
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