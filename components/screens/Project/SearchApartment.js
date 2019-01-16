import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Picker,
    Icon
} from 'native-base';
import Header from './../Home/Header';
import styles from './../../../styles';
import getOptionProjects from './../../../api/getOptionProjects';
import { loading } from './../../../Helpers';
import getTablePackage from '../../../api/getTablePackage';

export default class SearchApartment extends Component {
    _keyExtractor = (item, index) => index.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            direction: '',
            status: '',
            options: [],
            txtSubmit: 'TÌM KIẾM',
            minPrice: '',
            maxPrice: '',
            minArea: '',
            maxArea: '',
            row: '',
            column: '',
            bedroom: ''
        };
    }

    componentDidMount() {
        getOptionProjects()
            .then(resJson => {
                if (resJson) {
                    const arrFeature = Object.keys(resJson.data.project_features).map((item, index) => {
                        return { key: item, value: resJson.data.project_features[item] };
                    });
                    this.setState({
                        options: resJson.data,
                        loaded: true,
                        arrFeature,
                        feature: resJson.data.project_features
                    });
                }
            })
            .catch(err => console.log(err));


        getTablePackage(2, 4)
            .then(resJson => {
                if (resJson.status) {
                    this.setState({
                        listApartment: resJson.data.apartment,
                    });
                }
            })
            .catch(err => console.log(err));
    }

    onSearch() {
        // const { navigation } = this.props;
        const { status, direction, row, column, minPrice, maxPrice, minArea, maxArea } = this.state;
        // const listApartment = navigation.getParam('listApartment', null);
        const apartments = this.state.listApartment.filter(function (el) {
            if (row !== '' && el.row !== parseInt(row)) {
                return null;
            }
            if (column !== '' && el.column !== parseInt(column)) {
                return null;
            }
            if (status !== '' && el.status !== parseInt(status)) {
                return null;
            }
            if (direction !== '' && el.direction !== direction) {
                return null;
            }
            if (minPrice !== '' && el.price >= parseInt(minPrice)) {
                return null;
            }
            if (maxPrice !== '' && el.price >= parseInt(maxPrice)) {
                return null;
            }
            if (minArea !== '' && el.area <= parseInt(minArea)) {
                return null;
            }
            if (maxArea !== '' && el.area <= parseInt(maxArea)) {
                return null;
            }
            return el;
        });
        this.props.navigation.navigate('ResultApartmentScreen', {
            apartments
        });
    }

    render() {
        const { options } = this.state;
        console.log(this.state.loaded);
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    title='TÌM KIẾM CĂN HỘ'
                    back={'back'}
                />

                <ScrollView style={styles.content}>

                    <Text style={styles.titleSection}>Trạng thái căn hộ</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.optionAlone}
                        >
                            <Picker
                                selectedValue={this.state.status}
                                onValueChange={(itemValue) => this.setState({ status: itemValue })}
                                style={styles.picker}
                                iosHeader="Trạng thái"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                placeholder="Tất cả"
                            >
                                <Picker.Item
                                    label='Tất cả'
                                    value=''
                                />
                                {Object.keys(options.apartment_status).map(function (key) {
                                    return (
                                        <Picker.Item
                                            key={key}
                                            label={options.apartment_status[key]}
                                            value={key}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Vị trí</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Tầng'
                                underlineColorAndroid='transparent'
                                value={this.state.row}
                                onChangeText={text => this.setState({ row: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Thứ tự căn'
                                underlineColorAndroid='transparent'
                                value={this.state.column}
                                onChangeText={text => this.setState({ column: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Tầm tài chính</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Từ'
                                underlineColorAndroid='transparent'
                                value={this.state.minPrice}
                                onChangeText={text => this.setState({ minPrice: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Đến'
                                underlineColorAndroid='transparent'
                                value={this.state.maxPrice}
                                onChangeText={text => this.setState({ maxPrice: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Tính chất sản phẩm</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.direction}
                                onValueChange={(itemValue) => {
                                    this.setState({ direction: itemValue });
                                }}
                                iosHeader="Hướng"
                                headerBackButtonText={<Icon name='ios-arrow-back' />}
                                placeholder="Hướng"
                            >
                                <Picker.Item
                                    label='Hướng'
                                    value=''
                                />
                                {Object.keys(options.directions).map(function (key) {
                                    return <Picker.Item key={key} label={options.directions[key]} value={key} />
                                })}
                            </Picker>
                        </View>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Số phòng ngủ'
                                underlineColorAndroid='transparent'
                                value={this.state.bedroom}
                                onChangeText={text => this.setState({ bedroom: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <Text style={styles.titleSection}>Diện tích</Text>
                    <View style={styles.rowOption}>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Từ'
                                underlineColorAndroid='transparent'
                                value={this.state.minArea}
                                onChangeText={text => this.setState({ minArea: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Đến'
                                underlineColorAndroid='transparent'
                                value={this.state.maxArea}
                                onChangeText={text => this.setState({ maxArea: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.bigBtnIcon}
                        onPress={this.onSearch.bind(this)}
                    >
                        <Icon name='ios-search' style={styles.iconBigBtn} />
                        <Text style={styles.textBtnIcon}>{this.state.txtSubmit}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}
