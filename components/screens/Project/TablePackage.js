import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Spinner } from 'native-base';

import Header from '../Home/Header';
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
            listApartment: null
        };
    }
    componentDidMount() {
        getTablePackage(2, 4)
            .then(resJson => {
                if (resJson.status) {
                    // let result = Object.keys(resJson.data.listApartment.id).map(item => {
                    //     return { key: item };
                    // });
                    this.setState({
                        column: resJson.data.config.column,
                        row: resJson.data.config.row,
                        listApartmentId: Object.keys(resJson.data.listApartment.id).map(item => {
                            return { key: item };
                        }),
                        listApartmentStatus: resJson.data.listApartment.status,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
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
        console.log(this.props);
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
                <Header navigation={this.props.navigation} title='Tòa CT1 - The Pride' />
                <View style={styles.wrapper}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: '#6EC9FF' }} />
                            <Text>Còn trống</Text>
                        </View>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'yellow' }} />
                            <Text>Chờ thanh toán</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'green' }} />
                            <Text>Đang giữ chỗ</Text>
                        </View>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
                            <Text>Đã bán</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'gray' }} />
                            <Text>Chưa mở bán</Text>
                        </View>
                        <View style={styles.note}>
                            <View style={{ width: 20, height: 20, backgroundColor: 'yellow' }} />
                            <Text>Chờ thanh toán</Text>
                        </View>
                    </View>
                </View>
                <ScrollView horizontal={true}>
                    <FlatList
                        horizontal={false}
                        // ListHeaderComponent={this.renderHeader}
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
                                    <Text style={styles.textRow}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        padding: 10
    },
    firstCol: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#A52D2D',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    col: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#F68121',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    row: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    firstRow: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#F68121',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    textFirstCol: { textAlign: 'center', color: 'white', fontWeight: '500' },
    textFirstRow: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '500'
    },
    textRow: {
        textAlign: 'center',
        color: '#666'
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    note: { flexDirection: 'row', paddingTop: 5, width: '50%' },
    avaiable: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#6EC9FF',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    sold: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#F68121',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    waiting: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#FFDA23',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    holding: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#FF9323',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    disabled: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    incomplete: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    }
});
