import React, { Component } from 'react';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Icon,
    Right,
    Body
} from 'native-base';
import {
    FlatList,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import Header from '../Home/Header';
import HTMLView from 'react-native-htmlview';
import { MEDIA_BASE_URL } from "../../../Globals";
import { loading } from "../../../Helpers";

export default class DetailPartner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            listPartner: [],
        };
    }

    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    componentDidMount() {

    }

    render() {
        const { navigation } = this.props;
        const partner = navigation.getParam('partner', null);
        if (!this.state.loaded) {
            return loading();
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
                        <CardItem header style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: (partner.image_url) ? `${MEDIA_BASE_URL}${partner.image_url}` : '' }}
                                style={{ height: 100, width: 100 }}
                            />
                            <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                                <Text>{partner.name}</Text>
                                <Text style={{ fontStyle: 'italic', fontSize: 12, fontWeight: '800' }}>{partner.email}</Text>
                                <Text style={{ fontStyle: 'italic', fontSize: 12, fontWeight: '800' }}>{partner.phone}</Text>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <HTMLView value={partner.detail} />
                            </Body>
                        </CardItem>
                        {/*<CardItem footer style={{ flexDirection: 'column' }}>*/}
                            {/**/}
                        {/*</CardItem>*/}
                    </Card>
                </Content>
            </Container>
        );
    }
}