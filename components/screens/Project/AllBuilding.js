import React, { Component } from 'react';
import {
    Container,
    Content,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Button,
} from 'native-base';
import {
    TouchableOpacity,
    View
} from 'react-native';
import Header from './../Home/Header';
import { loading } from '../../../Helpers';

export default class AllBuilding extends Component {
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
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header
                    navigation={this.props.navigation}
                    title='BẢNG HÀNG ONLINE'
                    back={'MapScreen'}
                />
                <Content>
                    <View style={{ backgroundColor: 'white' }}>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                width: '80%',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                borderBottomColor: '#cecece',
                                paddingVertical: 10
                            }}
                        >
                            <Text style={{ textAlign: 'center' }}>
                                Roman Plaza
                            </Text>
                        </View>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    <Icon active name="ios-home" />
                                </Button>
                            </Left>
                            <Body>
                            <TouchableOpacity
                                // onPress={() => navigation.navigate('TablePackageScreen', {
                                //     project,
                                //     buildingId: item.key,
                                //     buildingName: item.value
                                // })}
                            >
                            <Text>CT1</Text>
                            </TouchableOpacity>
                            </Body>
                            <Right>
                                <Text>Xem</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    <Icon active name="ios-home" />
                                </Button>
                            </Left>
                            <Body>
                            <Text>CT2</Text>
                            </Body>
                            <Right>
                                <Text>Xem</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </View>
                    <View style={{ backgroundColor: 'white' }}>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                width: '80%',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                borderBottomColor: '#cecece',
                                paddingVertical: 10
                            }}
                        >
                            <Text style={{ textAlign: 'center' }}>
                                The Pride
                            </Text>
                        </View>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    <Icon active name="ios-home" />
                                </Button>
                            </Left>
                            <Body>
                            <Text>CT1</Text>
                            </Body>
                            <Right>
                                <Text>Xem</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    <Icon active name="ios-home" />
                                </Button>
                            </Left>
                            <Body>
                            <Text>CT2</Text>
                            </Body>
                            <Right>
                                <Text>Xem</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </View>
                    <View style={{ backgroundColor: 'white' }}>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                width: '80%',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                borderBottomColor: '#cecece',
                                paddingVertical: 10
                            }}
                        >
                            <Text style={{ textAlign: 'center' }}>
                                The Phoenix Garden
                            </Text>
                        </View>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    <Icon active name="ios-home" />
                                </Button>
                            </Left>
                            <Body>
                            <Text>CT1</Text>
                            </Body>
                            <Right>
                                <Text>Xem</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    <Icon active name="ios-home" />
                                </Button>
                            </Left>
                            <Body>
                            <Text>CT2</Text>
                            </Body>
                            <Right>
                                <Text>Xem</Text>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </View>
                </Content>
            </Container>
        );
    }
}
