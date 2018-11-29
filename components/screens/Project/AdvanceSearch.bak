import React, { Component } from 'react';
import {
    FlatList,
    Text,
    Dimensions,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker,
    Animated,
    Image,
} from 'react-native';
import { Content, Item, Icon, Input } from 'native-base';
import Header from './../Home/Header';
import icPin from './../../../icons/pin-building.png';
// import icSearch from './../../../icons/icon_search.png';

// const { width, height } = Dimensions.get('window');

export default class AdvanceSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    render() {
        const { listProject } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} title='Tìm kiếm nâng cao' />

                <View style={{ paddingHorizontal: 15, flex: 1 }}>
                    <View
                        style={{
                            height: 80,
                            paddingTop: 20,
                        }}
                    >
                        <Content
                            style={{
                                // borderWidth: 2,
                                // borderColor: 'red',
                            }}
                        >
                            <Item
                                style={{
                                    borderRadius: 2,
                                    borderWidth: 1,
                                    // borderColor: 'red',
                                    backgroundColor: 'white',
                                    // paddingLeft: 5,
                                }}
                            // regular
                            >
                                <Icon active name='ios-search' style={{ color: 'orange' }} />
                                <Input
                                    style={{ fontSize: 12, borderTopColor: 'red' }}
                                    placeholder='Tìm kiếm dự án...'
                                    placeholderTextColor='#999999'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ text })}
                                    value={this.state.text}
                                    onFocus={() => console.log('ok')}
                                    returnKeyType='done'
                                />
                            </Item>
                        </Content>
                    </View>
                    {/* <Text style={{ fontSize: 16, fontWeight: '600', color: '#555', paddingVertical: 10, textAlign: 'center' }}>Tìm kiếm nâng cao</Text> */}
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingTop: 5 }}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#33563743',
                                width: '100%',
                                marginTop: 5,
                                borderRadius: 2,
                                backgroundColor: 'white'
                            }}
                        >
                            <Picker
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                            >
                                <Picker.Item label="Loại nhà đất" value="0" />
                                <Picker.Item label="Biệt thự" value="1" />
                                <Picker.Item label="Chung cư" value="1" />
                                <Picker.Item label="Liền kề" value="1" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#33563743',
                                width: '48%',
                                marginTop: 5,
                                borderRadius: 2,
                                backgroundColor: 'white'
                            }}
                        >
                            <Picker
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}
                            >
                                <Picker.Item label="Mức giá" value="0" />
                                <Picker.Item label="Dưới 1 tỉ" value="2" />
                                <Picker.Item label="1 đến 3 tỉ" value="3" />
                                <Picker.Item label="Trên 3 tỉ" value="3" />
                            </Picker>
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#33563743',
                                width: '48%',
                                marginTop: 5,
                                borderRadius: 2,
                                backgroundColor: 'white'
                            }}
                        >
                            <Picker
                                selectedValue={this.state.kind}
                                onValueChange={(itemValue) => this.setState({ kind: itemValue })}
                            >
                                <Picker.Item label="Diện tích" value="0" />
                                <Picker.Item label="40 - 60 m2" value="2" />
                                <Picker.Item label="60 - 80 m2" value="3" />
                            </Picker>
                        </View>
                    </View>


                    <TouchableOpacity
                        style={{ backgroundColor: '#F58319', height: 50, paddingTop: 15, borderRadius: 5, marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}
                        onPress={() => console.log('ok')}
                    >
                        {/* <Image source={icSearch} style={styles.iconStyle} /> */}
                        {/* <Icon active name='ios-search' style={{ color: 'white' }} /> */}
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 16 }}>TÌM KIẾM</Text>
                    </TouchableOpacity>
                    <View style={{ paddingTop: 5, backgroundColor: 'white', flex: 10, paddingBottom: 10, marginTop: 10, borderRadius: 2 }}>
                        <Text style={{ fontWeight: '600', paddingLeft: 10 }}>Dự án mới</Text>
                        <View
                            style={{
                                borderBottomColor: '#cccccc',
                                borderBottomWidth: 1,
                                width: '90%',
                                marginHorizontal: 10
                            }}
                        />
                        <ScrollView>
                            <FlatList
                                // contentContainerStyle={styles.wrapper}
                                data={listProject}
                                keyExtractor={this.keyExtractor}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        key={item} style={{ backgroundColor: 'white' }}
                                        onPress={() => {
                                            this.props.navigation.navigate('DetailProjectScreen', {
                                                projectId: item.id
                                            });
                                        }}
                                    >
                                        <View style={{ padding: 10, flexDirection: 'row' }}>
                                            <Image source={icPin} style={{ width: 30, height: (30 / 100) * 121 }} />
                                            <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
                                                <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                                                <Text>{item.address}</Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: '#cccccc',
                                                borderBottomWidth: 1,
                                                width: '90%',
                                                marginHorizontal: 10
                                            }}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    iconStyle: { width: 15, height: 15 },
});
