import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Body,
    Icon,
    Left,
    ListItem,
    Toast
} from 'native-base';
import { loading } from '../../../Helpers';
import getNews from './../../../api/getNews';


export default class News extends React.Component {
    keyExtractor = (item) => item.id.toString(); //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isReady: false,
            index: 0,
            modalVisible: false,
            status: null,
            quality: null,
            error: null,
            isPlaying: true,
            isLooping: true,
            duration: 0,
            currentTime: 0,
            fullscreen: false,
            containerMounted: false,
            containerWidth: null,
            listNews: [],
        };
    }

    componentDidMount() {
        const { project } = this.props;
        if (project) {
            getNews(project.name)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.data.length === 0) {
                            return Toast.show({
                                text: 'Không có dữ liệu',
                                type: 'danger',
                                buttonText: 'Xác nhận'
                            });
                        }
                        this.setState({
                            listNews: res.data.data,
                            loaded: true
                        });
                    }
                })
                .catch(err => console.log(err));
        } else {
            return Toast.show({
                text: 'Không tồn tại dự án',
                type: 'danger',
                buttonText: 'Xác nhận'
            });
        }
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {/*<Text*/}
                        {/*style={{*/}
                            {/*fontWeight: '400',*/}
                            {/*fontSize: 16,*/}
                            {/*color: '#1f7eb8',*/}
                            {/*paddingTop: 15*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*Tin tức & Sự kiện*/}
                    {/*</Text>*/}
                    <FlatList
                        data={this.state.listNews}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <ListItem thumbnail style={{ margin: 0 }}>
                                <Left>
                                    <Icon
                                        name='ios-square'
                                        style={{ fontSize: 12, color: '#053654' }}
                                    />
                                </Left>
                                <Body style={{ margin: 0, height: 60 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate(
                                        'DetailNewsScreen', {
                                        news: item
                                    })}
                                >
                                    <Text note numberOfLines={1}>{item.name}</Text>
                                    <Text>Ngày đăng: {item.send_at}</Text>
                                </TouchableOpacity>
                                </Body>
                            </ListItem>
                        )}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
    },
    textTitle: { fontSize: 14, fontWeight: '500', color: '#016aa9' },
    textDesc: { fontSize: 12, color: '#555' },
    bigBtn: {
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#c2c2c2'
    },
    bigBtnCall: {
        height: 40,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#187EB9',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: { backgroundColor: 'white', flex: 1 },
    title: { fontWeight: '400', fontSize: 18, color: '#1f7eb8' }
});
