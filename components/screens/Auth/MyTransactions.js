import React, { Component } from 'react';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Badge, Body, Container, Content, ListItem, Right, Text } from 'native-base';
import Header from '../Home/Header';
import { convertIntToDateTime, loading } from '../../../Helpers';
import getToken from '../../../api/getToken';
import getTransactions from '../../../api/getTransactions';
import getCustomers from '../../../api/getCustomers';
import { DISABLED, HOLDING, INCOMPLETE, SOLD, WAITING } from '../../../constants/app';

export default class MyTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            active: false,
            listTransaction: null,
            refreshing: false,
        };
        this.arrayTransaction = [];
    }
    componentDidMount() {
        getToken()
            .then(token => {
                this.setState({ token });
                getTransactions(token)
                    .then(resJson => {
                        if (resJson.data) {
                            this.arrayTransaction = resJson.data.data;
                            this.setState({
                                listTransaction: this.arrayTransaction,
                                loaded: true
                            });
                        }
                    })
                    .catch(err => console.log(err));
            });
    }

    getColor(type) {
        if (type === 1) {
            return 'success';
        }
        if (type === HOLDING) {
            return 'warning';
        }
        if (type === DISABLED) {
            return 'disable';
        }
        if (type === WAITING) {
            return '';
        }
        if (type === SOLD) {
            return '';
        }
        if (type === INCOMPLETE) {
            return '';
        }
    }

    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header navigation={this.props.navigation} title='LỊCH SỬ GIAO DỊCH' back={'MapScreen'} />
                <Content>
                    <FlatList
                        data={this.state.listTransaction}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <ListItem icon style={{ borderBottomWidth: 1 }}>
                                <Body>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('DetailTransactionScreen', {
                                            transaction: item,
                                        });
                                    }}
                                >
                                    <Text
                                        note numberOfLines={1}
                                        style={{ color: '#053654', fontWeight: '400' }}
                                    >
                                        {`${item.apartment.number} - ${item.project.name} - ${item.building.name}`}
                                    </Text>
                                    <Text note numberOfLines={1} style={{ fontStyle: 'italic' }}>
                                        {convertIntToDateTime(item.created_at)}
                                    </Text>
                                </TouchableOpacity>
                                </Body>
                                <Right>
                                    <Badge success>
                                        <Text style={{ fontSize: 8 }}>{item.status.name}</Text>
                                    </Badge>
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
                                                this.arrayTransaction = resJson.data.concat(this.arrayTransaction);
                                                this.setState({
                                                    listTransaction: this.arrayTransaction,
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
                </Content>
            </Container>
        );
    }
}
