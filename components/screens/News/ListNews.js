import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import Header from './../Home/Header';

import imgDuan from './../../../images/duan.jpg';
import icTitle from './../../../icons/ic_title.png';

const { width, height } = Dimensions.get('window');

export default class ListNews extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor: '#f2f2f2', height, width }}>
                <Header navigation={this.props.navigation} />
                <ScrollView style={styles.wrapper}>
                    <TouchableOpacity style={{ backgroundColor: 'white', marginBottom: 10 }} onPress={() => this.props.navigation.navigate('DetailNewsScreen') }>
                        <View>
                            <Image source={imgDuan} style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Image source={icTitle} style={{ width: 2, height: 13 }} />
                                </View>

                                <Text style={{ fontWeight: '600', fontSize: 16, paddingLeft: 5 }}>TIN TỨC VINHOMES DRAGON BAY</Text>
                            </View>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi magnam qui fugit culpa tenetur, quis repellat vero totam quibusdam laborum.</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                        <View>
                            <Image source={imgDuan} style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Image source={icTitle} style={{ width: 2, height: 13 }} />
                                </View>

                                <Text style={{ fontWeight: '600', fontSize: 16, paddingLeft: 5 }}>TIN TỨC VINHOMES DRAGON BAY</Text>
                            </View>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi magnam qui fugit culpa tenetur, quis repellat vero totam quibusdam laborum.</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                        <View>
                            <Image source={imgDuan} style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Image source={icTitle} style={{ width: 2, height: 13 }} />
                                </View>

                                <Text style={{ fontWeight: '600', fontSize: 16, paddingLeft: 5 }}>TIN TỨC VINHOMES DRAGON BAY</Text>
                            </View>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi magnam qui fugit culpa tenetur, quis repellat vero totam quibusdam laborum.</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                        <View>
                            <Image source={imgDuan} style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Image source={icTitle} style={{ width: 2, height: 13 }} />
                                </View>

                                <Text style={{ fontWeight: '600', fontSize: 16, paddingLeft: 5 }}>VINHOMES DRAGON BAY</Text>
                            </View>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi magnam qui fugit culpa tenetur, quis repellat vero totam quibusdam laborum.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 15, paddingTop: 10
    },
    btnDetail: {
        height: 30, borderColor: '#959595', borderRadius: 5, backgroundColor: '#F4AF47', justifyContent: 'center'
    },
    btnTable: {
        height: 30, borderColor: '#959595', borderRadius: 5, backgroundColor: '#F4AF47', justifyContent: 'center'
    }
});
