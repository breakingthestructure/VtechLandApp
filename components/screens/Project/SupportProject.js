import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import {
    Container,
    Content,
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
import {
    callingPhone,
    loading
} from '../../../Helpers';

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

    keyExtractor = (item, index) => index.toString(); //eslint-disable-line
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View>
                <FlatList
                    data={this.props.directors}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item }) => (
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={icSale} />
                            </Left>
                            <Body>
                            <Text>{item.name}</Text>
                            <Text note numberOfLines={1}>{item.phone}</Text>
                            <Text note numberOfLines={1}>{item.email}</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => callingPhone(item.phone)}>
                                    <Text><Icon name="ios-call" style={{ color: 'green' }} /></Text>
                                </Button>
                            </Right>
                        </ListItem>
                    )}
                />
            </View>
        );
    }
}
