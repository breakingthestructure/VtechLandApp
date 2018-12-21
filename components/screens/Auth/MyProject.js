import React from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import Header from './../Home/Header';

import imgDuan from './../../../images/duan.jpg';
import styles from './../../../styles';
import { loading } from '../../../Helpers';
import getLocalProjects from '../../../api/getLocalProjects';
import getFavouriteProjects from '../../../api/getFavouriteProjects';
import getToken from '../../../api/getToken';

const { width } = Dimensions.get('window');

export default class MyProject extends React.Component {
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            listFavourite: []
        };
    }

    componentDidMount() {
        getToken()
            .then(token => {
                getFavouriteProjects(token)
                    .then(res => {
                        getLocalProjects()
                            .then(data => {
                                const listFavourite = data.filter(e => {
                                    if (res.data.includes(e.id)) {
                                        return e;
                                    }
                                    return null;
                                });
                                this.setState({
                                    listFavourite,
                                    loaded: true
                                });
                            });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} back='MapScreen' title='DỰ ÁN QUAN TÂM' />
                <View style={styles.content}>
                    <FlatList
                        data={this.state.listFavourite}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
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
                                        project: item
                                    });
                                }}
                            >
                                <View>
                                    <Image source={imgDuan}
                                           style={{ width: '100%', height: ((width - 100) / 975) * 523 }} />
                                </View>
                                <Text style={styles.titleScreenLeft}>{item.name}</Text>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ paddingTop: 5 }}>
                                            <Icon type="FontAwesome" name='map-marker' style={styles.iconText} />
                                        </View>
                                        <Text style={styles.textDescription}>{item.address}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ paddingTop: 5 }}>
                                            <Icon type="FontAwesome" name='list-ul' style={styles.iconText} />
                                        </View>
                                        <Text style={styles.textDescription}>{item.description}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ paddingTop: 5 }}>
                                            <Icon type="FontAwesome" name='suitcase' style={styles.iconText} />
                                        </View>
                                        <Text style={styles.textDescription}>{item.type.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
}

