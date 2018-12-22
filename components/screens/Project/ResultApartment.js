import React, { Component } from 'react';
import { Body, Button, Container, Icon, Left, ListItem, Right, Text } from 'native-base';
import Header from './../Home/Header';
import { FlatList, TouchableOpacity } from 'react-native';
import { loading } from '../../../Helpers';

export default class ResultApartment extends Component {
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

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
        const { navigation } = this.props;
        const apartments = navigation.getParam('apartments', null);
        console.log(apartments);
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header navigation={this.props.navigation} title='KẾT QUẢ TÌM KIẾM' back={'popToTop'} />
                <FlatList
                    data={apartments}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item }) => (
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: '#007AFF' }}>
                                    <Icon active name="ios-home" />
                                </Button>
                            </Left>
                            <Body>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('DetailApartmentScreen', {
                                        apartmentId: item.id
                                    });
                                }}
                            >
                                <Text>Căn hộ {item.number}</Text>
                            </TouchableOpacity>
                            </Body>
                            <Right>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('DetailApartmentScreen', {
                                            apartmentId: item.id
                                        });
                                    }}
                                >
                                    <Icon active name="arrow-forward" style={{ fontSize: 20, color: 'orange' }} />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    )}
                />
            </Container>
        );
    }
}
