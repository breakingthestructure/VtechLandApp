import React, { Component } from 'react';
import { FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Body, Button, Container, Fab, Icon, Left, List, ListItem, Right, Thumbnail } from 'native-base';
import Header from '../Home/Header';
import { callingPhone, loading, openSmsUrl } from '../../../Helpers';
import icSale from './../../../icons/customer.png';
import getCustomers from './../../../api/getCustomers';
import getToken from '../../../api/getToken';

export default class MyCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            active: false,
            listCustomer: null,
            refreshing: false,
            query: '',
            token: ''
        };
        this.arrayCustomer = [];
    }

    componentDidMount() {
        getToken()
            .then(token => {
                this.setState({ token });
                getCustomers(token)
                    .then(resJson => {
                        if (resJson.data) {
                            this.arrayCustomer = resJson.data.data;
                            this.setState({
                                listCustomer: this.arrayCustomer,
                                loaded: true
                            });
                        }
                    })
                    .catch(err => console.log(err));
            });
    }

    onSearch() {
        let query = '';
        query += `&text_search=${this.state.query}`;
        getCustomers(this.state.token, query)
            .then(resJson => {
                if (resJson.data) {
                    this.arrayCustomer = resJson.data;
                    this.setState({
                        listCustomer: this.arrayCustomer,
                        loaded: true
                    });
                }
            })
    }

    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header navigation={this.props.navigation} title='DANH SÁCH KHÁCH HÀNG' back={'MapScreen'} />
                <List>
                    <ListItem style={{ borderBottomWidth: 0 }}>
                        <View
                            style={{
                                height: 40,
                                width: '100%',
                                borderRadius: 20,
                                marginTop: 5,
                                backgroundColor: '#dddddd'
                            }}
                        >
                            <TextInput
                                style={{ height: 40, width: '100%', marginLeft: 15 }}
                                placeholder='Nhập tên khách hàng...'
                                underlineColorAndroid='transparent'
                                value={this.state.query}
                                onChangeText={text => this.setState({ query: text })}
                                onEndEditing={this.onSearch.bind(this)}
                            />
                        </View>
                    </ListItem>
                    <FlatList
                        data={this.state.listCustomer}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <ListItem avatar style={{ borderBottomWidth: 1 }}>
                                <Left>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('DetailCustomerScreen', {
                                                customer: item
                                            });
                                        }}
                                    >
                                        <Thumbnail source={icSale} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{ borderBottomWidth: 0 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('DetailCustomerScreen', {
                                            customer: item
                                        });
                                    }}
                                >
                                    <Text>{item.full_name}</Text>
                                </TouchableOpacity>
                                </Body>
                                <Right style={{ flexDirection: 'row', borderBottomWidth: 0 }}>
                                    <Button
                                        transparent
                                        onPress={() => callingPhone(item.phone)}
                                    >
                                        <Text>
                                            <Icon
                                                type="Feather"
                                                name="phone-call"
                                                style={{ color: 'orange', fontSize: 19 }}
                                            />
                                        </Text>
                                    </Button>
                                    <Button
                                        transparent
                                        onPress={() => openSmsUrl(item.phone, '')}
                                        style={{ paddingLeft: 10 }}
                                    >
                                        <Text>
                                            <Icon
                                                type="MaterialCommunityIcons"
                                                name="message-text-outline"
                                                style={{ color: 'orange', fontSize: 19 }}
                                            />
                                        </Text>
                                    </Button>
                                    <Button
                                        transparent
                                        onPress={() => openSmsUrl(item.phone, '')}
                                        style={{ paddingLeft: 10, fontSize: 19 }}
                                    >
                                        <Text>
                                            <Icon
                                                type="Octicons"
                                                name="mail" style={{ color: 'orange' }}
                                            />
                                        </Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true });
                                    const nextPage = this.state.page + 1;

                                    getCustomers(this.state.token)
                                        .then(resJson => {
                                            if (resJson.data) {
                                                this.arrayCustomer = resJson.data.concat(this.arrayCustomer);
                                                this.setState({
                                                    listCustomer: this.arrayCustomer,
                                                    refreshing: false,
                                                    page: nextPage
                                                });
                                            }
                                        })
                                        .catch(err => console.log(err));

                                }}
                            />
                        }
                    />
                </List>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#F58319', width: 35, height: 35 }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('DetailCustomerScreen')}
                >
                    <Icon type="MaterialIcons" name="add" />
                </Fab>
            </Container>
        );
    }
}
