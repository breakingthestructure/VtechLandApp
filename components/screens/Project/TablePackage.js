import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Fab,
    Icon
} from 'native-base';
import Header from '../Home/Header';
import styles from './../../../styles';
import getTablePackage from './../../../api/getTablePackage';
import {
    AVAIABLE,
    DISABLED,
    HOLDING,
    INCOMPLETE,
    SOLD,
    WAITING
} from './../../../constants/app';
import { loading } from '../../../Helpers';

export default class TablePackage extends Component {
    renderHeader = () => { //eslint-disable-line
        const { column } = this.state;
        const header = [];
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
    _keyExtractor = (item, index) => item.id; //eslint-disable-line

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

    // renderTable(obj) {
    //     return (
    //         <TouchableOpacity
    //             style={styles.row}
    //             onPress={() => {
    //                 this.props.navigation.navigate('DetailApartmentScreen', {
    //                     apartmentId: obj.item.key
    //                 });
    //             }}
    //         >
    //             <Text style={styles.textRow}>
    //                 {obj.item.key}
    //             </Text>
    //         </TouchableOpacity>
    //     );

    componentDidMount() {
        const { navigation } = this.props;
        const project = navigation.getParam('project', null);
        const buildingId = navigation.getParam('buildingId', null);
        if (project) {
            getTablePackage(project.id, buildingId)
                .then(resJson => {
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
                })
                .catch(err => console.log(err));
        }
    }

    getClassName(type) {
        let className = styles.avaiable;
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

    onFilter() {
        var newArray = this.state.listApartment.filter(function (el) {
            return el.number === '102';
            // return el.price <= 1000 &&
            //     el.sqft >= 500 &&
            //     el.num_of_beds >=2 &&
            //     el.num_of_baths >= 2.5;
        });
        console.log(newArray);
    }

    render() {
        const { navigation } = this.props;
        const buildingName = navigation.getParam('buildingName', null);
        const project = navigation.getParam('project', null);
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    title={`${buildingName} - ${project.name}`}
                    back={'popToTop'}
                />
                <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={styles.note}>
                            <View
                                style={{
                                    borderRadius: 10,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#6EC9FF'
                                }}
                            />
                            <Text style={{ fontSize: 12, marginTop: 5 }}> Còn trống</Text>
                        </View>
                        <View style={styles.note}>
                            <View
                                style={{
                                    borderRadius: 10,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#FFDA23'
                                }}
                            />
                            <Text style={{ fontSize: 12, marginTop: 5 }}> Chờ thanh toán</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={styles.note}>
                            <View
                                style={{
                                    borderRadius: 10,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#FF9323'
                                }}
                            />
                            <Text style={{ fontSize: 12, marginTop: 5 }}> Đang giữ chỗ</Text>
                        </View>
                        <View style={styles.note}>
                            <View
                                style={{
                                    borderRadius: 10,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'red'
                                }}
                            />
                            <Text style={{ fontSize: 12, marginTop: 5 }}> Đã bán</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={styles.note}>
                            <View
                                style={{
                                    borderRadius: 10,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#c2c2c2'
                                }}
                            />
                            <Text style={{ fontSize: 12, marginTop: 5 }}> Chưa mở bán</Text>
                        </View>
                        <View style={styles.note}>
                            <View
                                style={{
                                    borderRadius: 10,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 12, marginTop: 5 }}> Không thể giao dịch</Text>
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
                            const className = this.getClassName(obj.item.status);
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
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#F58319', width: 50, height: 50 }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('SearchApartmentScreen', {
                        listApartment: this.state.listApartment
                    })}
                    // onPress={this.onFilter.bind(this)}
                >
                    <Icon type={'FontAwesome'} name="filter" />
                </Fab>
            </View>
        );
    }
}
