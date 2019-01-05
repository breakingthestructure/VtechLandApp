import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Header from './../Home/Header';
import icTitle from './../../../icons/ic_title.png';
import {
    MEDIA_BASE_URL,
    NO_IMAGE
} from '../../../Globals';

const { width, height } = Dimensions.get('window');

export default class DetailNews extends React.Component {
    render() {
        const { navigation } = this.props;
        const news = navigation.getParam('news', null);
        return (
            <View style={{ backgroundColor: '#f2f2f2', height, width }}>
                <Header navigation={this.props.navigation} back={'MapScreen'} title={'TIN DỰ ÁN'} />
                <ScrollView style={styles.wrapper}>
                    <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                        <View>
                            <Image
                                source={{ uri: (news.image_url) ? `${MEDIA_BASE_URL}${news.image_url}` : NO_IMAGE }}
                                style={{ width: '100%', height: ((width - 100) / 975) * 523 }}
                            />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ paddingTop: 5 }}>
                                    <Image source={icTitle} style={{ width: 2, height: 13 }} />
                                </View>

                                <Text style={{ fontWeight: '600', fontSize: 16, paddingLeft: 5 }}>{news.name}</Text>
                            </View>
                            <Text style={{ fontStyle: 'italic' }}>
                                {news.description}
                            </Text>
                            <HTMLView value={news.content} />
                        </View>
                    </View>
                </ScrollView>
            </View>
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
