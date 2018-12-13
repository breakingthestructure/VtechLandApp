import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import Header from '../Home/Header';
import styles from './../../../styles';
import getTablePackage from './../../../api/getTablePackage';
import { AVAIABLE, HOLDING, WAITING, SOLD, DISABLED, INCOMPLETE } from './../../../constants/app';
import { loading } from '../../../Helpers';

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
        if (project) {
            getTablePackage(project.id, buildingId)
                .then(resJson => {
                    console.log(resJson.status);
                    if (resJson.status) {
                        this.setState({
                            column: resJson.data.config.column,
                            row: resJson.data.config.row,
                            listApartment: resJson.data.apartment,
                            // listApartmentStatus: resJson.data.listApartment.status,
                            loaded: true
                        });
                    } else {
                        this.setState({ loaded: true });
                        Alert.alert(
                            'Thông báo',
                            'Tòa nhà này chưa có bảng hàng',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.navigate('MapScreen') },
                            ],
                            { cancelable: false }
                        );
                        return false;
                    }
                    console.log('resJson.status');
                })
                .catch(err => console.error(err));
        }
    }

    getClassName(type) {
        let className = '';
        if (type === AVAIABLE) {
            className = styles.avaiable;
        }
        if (type === HOLDING) {
            className = styles.holding;
        }
        if (type === DISABLED) {
            className = styles.disabled;
        }
        if (type === WAITING) {
            className = styles.waiting;
        }
        if (type === SOLD) {
            className = styles.sold;
        }
        if (type === INCOMPLETE) {
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
    _keyExtractor = (item, index) => item.id;
    render() {
        const { navigation } = this.props;
        const buildingName = navigation.getParam('buildingName', null);
        const project = navigation.getParam('project', null);
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={`${buildingName} - ${project.name}`} back={'MapScreen'} />
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
                <ScrollView horizontal>
                    <FlatList
                        horizontal={false}
                        keyExtractor={this._keyExtractor}
                        ListHeaderComponent={this.renderHeader}
                        numColumns={this.state.column}
                        // contentContainerStyle={{ flexDirection: 'row' }}
                        data={this.state.listApartment}
                        // renderItem={this.renderTable}
                        renderItem={obj => {
                            let className = this.getClassName(obj.item.status);
                            return (
                                <TouchableOpacity
                                    style={className}
                                    onPress={() => {
                                        this.props.navigation.navigate('DetailApartmentScreen', {
                                            apartmentId: obj.item.id
                                        });
                                    }}
                                >
                                    <Text style={styles.textCell}>
                                        {obj.item.number}
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
