import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Spinner
} from 'native-base';

import icSale from './../../../icons/sale.png';

export default class SupportProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }
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
                <ScrollView>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={icSale} />
                        </Left>
                        <Body>
                            <Text>James Bond</Text>
                            <Text note numberOfLines={1}>091236587</Text>
                            <Text note numberOfLines={1}>jamesbond@haiphatland.vn</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text><Icon name="ios-call" style={{ color: 'green' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={icSale} />
                        </Left>
                        <Body>
                            <Text>James Bond</Text>
                            <Text note numberOfLines={1}>Phòng kinh doanh 2</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text><Icon name="ios-call" style={{ color: 'green' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={icSale} />
                        </Left>
                        <Body>
                            <Text>James Bond</Text>
                            <Text note numberOfLines={1}>Phòng kinh doanh 2</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text><Icon name="ios-call" style={{ color: 'green' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={icSale} />
                        </Left>
                        <Body>
                            <Text>James Bond</Text>
                            <Text note numberOfLines={1}>Phòng kinh doanh 2</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text><Icon name="ios-call" style={{ color: 'green' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={icSale} />
                        </Left>
                        <Body>
                            <Text>James Bond</Text>
                            <Text note numberOfLines={1}>Phòng kinh doanh 2</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text><Icon name="ios-call" style={{ color: 'green' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={icSale} />
                        </Left>
                        <Body>
                            <Text>James Bond</Text>
                            <Text note numberOfLines={1}>Phòng kinh doanh 2</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text><Icon name="ios-call" style={{ color: 'green' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                </ScrollView>
            </Container>
        );
    }
}
