import React, { Component } from 'react';
import { FlatList, Picker, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import Header from './../Home/Header';
import styles from './../../../styles';
import getOptionProjects from './../../../api/getOptionProjects';
import { loading } from './../../../Helpers';
import getProject from './../../../api/getProject';

export default class SearchApartment extends Component {
    _keyExtractor = (item, index) => index.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            cities: [],
            loaded: false,
            city: '',
            districts: [],
            district: '',
            wards: [],
            ward: '',
            streets: [],
            street: '',
            direction: '',
            kind: 1,
            options: [],
            level: '',
            txtSubmit: 'TÌM KIẾM',
            feature: {},
            arrFeature: [],
            type: 1,
            area: '',
            minPrice: '',
            maxPrice: ''
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
    }
    onSearch() {

    }
    render() {
        const { cities, districts, wards, streets, options } = this.state;
        if (!this.state.loaded || !cities || !options.length === 0 || !options.project_types) {
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
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                                style={styles.picker}
                            >
                                <Picker.Item
                                    label='Tất cả'
                                    value='0'
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
                                onValueChange={(itemValue) => this.setState({ direction: itemValue })}
                            >
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
                                placeholder='Diện tích'
                                underlineColorAndroid='transparent'
                                value={this.state.area}
                                onChangeText={text => this.setState({ area: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <View style={styles.rowOption}>
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
                        <View
                            style={styles.option}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='Số phòng khách'
                                underlineColorAndroid='transparent'
                                value={this.state.livingroom}
                                onChangeText={text => this.setState({ livingroom: text })}
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
