import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Fab
} from 'native-base';
import Header from '../Home/Header';
import { loading, callingPhone, openSmsUrl } from '../../../Helpers';
import icSale from './../../../icons/customer.png';

export default class MyCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            active: false
        };
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header navigation={this.props.navigation} title='DANH SÁCH KHÁCH HÀNG' back={'ok'} />
                <List>
                    <ListItem style={{ borderBottomWidth: 0 }}>
                        <TextInput
                            style={{ height: 40, width: '100%', borderRadius: 20, marginTop: 5, backgroundColor: '#dddddd' }}
                            placeholder='Nhập tên khách hàng...'
                            underlineColorAndroid='transparent'
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                        />
                    </ListItem>
                    <ListItem avatar style={{ borderBottomWidth: 1 }}>
                        <Left>
                            <Thumbnail source={icSale} style={{ width: 50, height: 50 }} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                            <Text>James Bond</Text>
                        </Body>
                        <Right style={{ flexDirection: 'row', borderBottomWidth: 0 }}>
                            <Button transparent onPress={() => callingPhone('0975151490')}>
                                <Text><Icon type="Feather" name="phone-call" style={{ color: 'orange', fontSize: 19 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10 }}>
                                <Text><Icon type="MaterialCommunityIcons" name="message-text-outline" style={{ color: 'orange', fontSize: 19 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10, fontSize: 19 }}>
                                <Text><Icon type="Octicons" name="mail" style={{ color: 'orange' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem avatar style={{ borderBottomWidth: 1 }}>
                        <Left>
                            <Thumbnail source={icSale} style={{ width: 50, height: 50 }} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                            <Text>James Bond</Text>
                        </Body>
                        <Right style={{ flexDirection: 'row', borderBottomWidth: 0 }}>
                            <Button transparent onPress={() => callingPhone('0975151490')}>
                                <Text><Icon type="Feather" name="phone-call" style={{ color: 'orange', fontSize: 19 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10 }}>
                                <Text><Icon type="MaterialCommunityIcons" name="message-text-outline" style={{ color: 'orange', fontSize: 19 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10, fontSize: 19 }}>
                                <Text><Icon type="Octicons" name="mail" style={{ color: 'orange' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem avatar style={{ borderBottomWidth: 1 }}>
                        <Left>
                            <Thumbnail source={icSale} style={{ width: 50, height: 50 }} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                            <Text>James Bond</Text>
                        </Body>
                        <Right style={{ flexDirection: 'row', borderBottomWidth: 0 }}>
                            <Button transparent onPress={() => callingPhone('0975151490')}>
                                <Text><Icon type="Feather" name="phone-call" style={{ color: 'orange', fontSize: 19 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10 }}>
                                <Text><Icon type="MaterialCommunityIcons" name="message-text-outline" style={{ color: 'orange', fontSize: 19 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10, fontSize: 19 }}>
                                <Text><Icon type="Octicons" name="mail" style={{ color: 'orange' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem avatar style={{ borderBottomWidth: 1 }}>
                        <Left>
                            <Thumbnail source={icSale} style={{ width: 50, height: 50 }} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                            <Text>James Bond</Text>
                        </Body>
                        <Right style={{ flexDirection: 'row', borderBottomWidth: 0 }}>
                            <Button transparent onPress={() => callingPhone('0975151490')}>
                                <Text><Icon type="Feather" name="phone-call" style={{ color: 'orange', fontSize: 19 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10 }}>
                                <Text><Icon type="MaterialCommunityIcons" name="message-text-outline" style={{ color: 'orange', fontSize: 19 }} /></Text>
                            </Button>
                            <Button transparent onPress={() => openSmsUrl('0975151490', 'xin chao')} style={{ paddingLeft: 10, fontSize: 19 }}>
                                <Text><Icon type="Octicons" name="mail" style={{ color: 'orange' }} /></Text>
                            </Button>
                        </Right>
                    </ListItem>

                </List>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#F58319', width: 35, height: 35 }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <Icon type="MaterialIcons" name="add" />
                    <Button style={{ backgroundColor: '#34A34F' }}>
                        <Icon name="share" />
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }}>
                        <Icon name="logo-facebook" />
                    </Button>
                    <Button disabled style={{ backgroundColor: '#DD5144' }}>
                        <Icon name="mail" />
                    </Button>
                </Fab>
            </Container>
        );
    }
}
