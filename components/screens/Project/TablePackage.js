import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Container, Content, Spinner } from 'native-base';

import Header from '../Home/Header';
import styles from './../../../styles';
import getTablePackage from './../../../api/getTablePackage';
import { AVAIABLE, HOLDING, WAITING, SOLD, DISABLED, INCOMPLETE } from './../../../constants/app';

export default class TablePackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: null,
            column: null,
            row: null,
            loaded: false,
            listApartment: null,
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const project = navigation.getParam('project', null);
        const buildingId = navigation.getParam('buildingId', null);
        const buildingName = navigation.getParam('buildingName', null);
        if (project) {
            getTablePackage(project.id, buildingId)
                .then(resJson => {
                    if (resJson.status) {
                        this.setState({
                            column: resJson.data.config.column,
                            row: resJson.data.config.row,
                            listApartmentId: Object.keys(resJson.data.listApartment.id).map(item => {
                                return { key: item };
                            }),
                            listApartmentStatus: resJson.data.listApartment.status,
                            loaded: true
                        });
                    } else {
                        Alert.alert(
                            'Thông báo',
                            'Tòa nhà này chưa có bảng hàng',
                            [
                                { text: 'OK', onPress: () =>  this.props.navigation.navigate('MapScreen') },
                            ],
                            { cancelable: false }
                        );
                        return false;
                    }
                })
                .catch(err => console.log(err));
        }
    }

    getClassName(type) {
        let className = '';
        if (this.state.listApartmentStatus[type] === AVAIABLE) {
            className = styles.avaiable;
        }
        if (this.state.listApartmentStatus[type] === HOLDING) {
            className = styles.holding;
        }
        if (this.state.listApartmentStatus[type] === DISABLED) {
            className = styles.disabled;
        }
        if (this.state.listApartmentStatus[type] === WAITING) {
            className = styles.waiting;
        }
        if (this.state.listApartmentStatus[type] === SOLD) {
            className = styles.sold;
        }
        if (this.state.listApartmentStatus[type] === INCOMPLETE) {
            className = styles.incomplete;
        }
        return className;
    }
    renderTable(obj) {
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => {
                    this.props.navigation.navigate('DetailApartmentScreen', {
                        apartmentId: obj.item.key
                    });
                }}
            >
                <Text style={styles.textRow}>
                    {obj.item.key}
                </Text>
            </TouchableOpacity>
        );
    }
    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: 'blue',
                }}
            />
        );
    }
    renderHeader = () => {
        const { column } = this.state;
        let header = [];
        for (let i = 1; i <= column; i++) {
            let txt = i;
            if (i < 10 && i != 0) {
                txt = `0${i}`;
            }
            header.push(
                <View key={i} style={styles.col}>
                    <Text style={styles.textFirstCol}>
                        {`Căn ${txt}`}
                    </Text>
                </View>
            );
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                {header}
            </View>
        );
    }
    render() {
        const { navigation } = this.props;
        const buildingName = navigation.getParam('buildingName', null);
        const project = navigation.getParam('project', null);
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
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={`${buildingName} - ${project.name}`} />
                <View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: '#6EC9FF' }} />
                            <Text style={{ fontSize: 12 }}> Còn trống</Text>
                        </View>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'yellow' }} />
                            <Text style={{ fontSize: 12 }}>Chờ thanh toán</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'green' }} />
                            <Text style={{ fontSize: 12 }}> Đang giữ chỗ</Text>
                        </View>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
                            <Text style={{ fontSize: 12 }}> Đã bán</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'gray' }} />
                            <Text style={{ fontSize: 12 }}> Chưa mở bán</Text>
                        </View>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'yellow' }} />
                            <Text style={{ fontSize: 12 }}> Chờ thanh toán</Text>
                        </View>
                    </View>
                </View>
                <ScrollView horizontal={true}>
                    <FlatList
                        horizontal={false}
                        ListHeaderComponent={this.renderHeader}
                        numColumns={this.state.column}
                        // contentContainerStyle={{ flexDirection: 'row' }}
                        data={this.state.listApartmentId}
                        // renderItem={this.renderTable}
                        renderItem={obj => {
                            let className = this.getClassName(obj.item.key);
                            return (
                                <TouchableOpacity
                                    style={className}
                                    onPress={() => {
                                        this.props.navigation.navigate('DetailApartmentScreen', {
                                            apartmentId: obj.item.key
                                        });
                                    }}
                                >
                                    <Text style={styles.textCell}>
                                        {obj.item.key}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}
