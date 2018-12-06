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
import { Icon, Left, Right } from 'native-base';
import Header from './../Home/Header';

import imgDuan from './../../../images/duan.jpg';
import icTitle from './../../../icons/ic_title.png';
import styles from './../../../styles';

const { width, height } = Dimensions.get('window');

export default class MyProject extends React.Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} back='ok' title='DỰ ÁN QUAN TÂM' />
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: 'f2f2f2',
                        padding: 10,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            marginBottom: 10,
                            shadowOffset: { width: 0, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            elevation: 3
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: 2
                            });
                        }}
                    >
                        <View>
                            <Image source={imgDuan} style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                        </View>
                        <Text style={styles.titleScreenLeft}>AN PHÚ SHOP VILLA</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='map-marker' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>Tố Hữu- Hà Đông - Hà Nội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='list-ul' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>An sinh xã hội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='suitcase' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>Biệt thự liền kề</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            marginBottom: 10,
                            shadowOffset: { width: 0, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            elevation: 3
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: 2
                            });
                        }}
                    >
                        <View>
                            <Image source={imgDuan} style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                        </View>
                        <Text style={styles.titleScreenLeft}>AN PHÚ SHOP VILLA</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='map-marker' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>Tố Hữu- Hà Đông - Hà Nội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='list-ul' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>An sinh xã hội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='suitcase' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>Biệt thự liền kề</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            marginBottom: 10,
                            shadowOffset: { width: 0, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            elevation: 3
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: 2
                            });
                        }}
                    >
                        <View>
                            <Image source={imgDuan} style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                        </View>
                        <Text style={styles.titleScreenLeft}>AN PHÚ SHOP VILLA</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='map-marker' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>Tố Hữu- Hà Đông - Hà Nội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='list-ul' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>An sinh xã hội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='suitcase' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>Biệt thự liền kề</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            marginBottom: 10,
                            shadowOffset: { width: 0, height: 10 },
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            elevation: 3
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('TabProjectScreen', {
                                projectId: 2
                            });
                        }}
                    >
                        <View>
                            <Image source={imgDuan} style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                        </View>
                        <Text style={styles.titleScreenLeft}>AN PHÚ SHOP VILLA</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='map-marker' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>Tố Hữu- Hà Đông - Hà Nội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='list-ul' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>An sinh xã hội</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Icon type="FontAwesome" name='suitcase' style={styles.iconText} />
                                </View>
                                <Text style={styles.textDescription}>Biệt thự liền kề</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                </ScrollView>
            </View >
        );
    }
}

