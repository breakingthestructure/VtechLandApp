import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native';
import Header from './Header';

import icTitle from './../../../icons/ic_title.png';
import getProject from './../../../api/getProject';
import {
    BASE_URL,
    NO_IMAGE
} from './../../../Globals';
import { loading } from "../../../Helpers";

const { width } = Dimensions.get('window');

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            listProject: null,
            refreshing: false,
            page: 1
        };
        this.arrayProject = [];
    }

    componentDidMount() {
        getProject()
            .then(resJson => {
                if (resJson.data) {
                    this.arrayProject = resJson.data;
                    this.setState({
                        listProject: this.arrayProject,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    keyExtractor = (item) => item.id.toString(); //eslint-disable-line
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
                <Header
                    navigation={this.props.navigation}
                    title={'HUẤN LUYỆN & ĐÀO TẠO'}
                    back={'MapScreen'}
                />
                <FlatList
                    contentContainerStyle={styles.wrapper}
                    data={this.state.listProject}
                    keyExtractor={this.keyExtractor}
                    // renderItem={this.renderTable}
                    renderItem={({ item }) => (
                        <View style={styles.sectionItem}>
                            <View>
                                <Image
                                    source={{ uri: (item.images.project_feature) ?
                                            item.images.project_feature[0] : NO_IMAGE }}
                                    style={styles.imgItem}
                                />
                            </View>
                            <View style={styles.contentItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ paddingTop: 5 }}>
                                        <Image source={icTitle} style={{ width: 2, height: 13 }} />
                                    </View>
                                    <Text style={styles.txtNameProject}>{item.name}</Text>
                                </View>
                                <Text>{item.description}</Text>
                                <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        style={styles.btnDetail}
                                        onPress={() => {
                                            this.props.navigation.navigate('TabProjectScreen', {
                                                projectId: item.key
                                            });
                                        }}
                                    >
                                        <Text style={{
                                            fontWeight: '500',
                                            marginHorizontal: 15,
                                            fontSize: 12,
                                            color: 'black'
                                        }}>XEM CHI TIẾT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.btnTable}
                                        onPress={() => {
                                            this.props.navigation.navigate('TablePackageScreen', {
                                                projectId: item.key
                                            });
                                        }}
                                    >
                                        <Text style={{
                                            color: 'white',
                                            fontWeight: '500',
                                            marginHorizontal: 5,
                                            fontSize: 12
                                        }}>XEM BẢNG HÀNG</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                const nextPage = this.state.page + 1;
                                // getProject(this.state.category.id, nextPage)
                                getProject()
                                    .then(resJson => {
                                        this.arrayProject = resJson.data.concat(this.arrayProject);
                                        this.setState({
                                            listProject: this.arrayProject,
                                            refreshing: false,
                                            page: nextPage
                                        });
                                    })
                                    .catch(err => console.log(err));
                            }}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 15, paddingTop: 10
    },
    btnDetail: {
        height: 30,
        borderColor: '#959595',
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderWidth: 1
    },
    btnTable: {
        height: 30,
        borderColor: '#959595',
        borderRadius: 5,
        backgroundColor: '#F4AF47',
        justifyContent: 'center'
    },
    imgItem: { width: '100%', height: ((width - 100) / 975) * 523 },
    sectionItem: { backgroundColor: 'white', marginBottom: 10 },
    contentItem: { marginHorizontal: 10, marginVertical: 10 },
    txtNameProject: { fontWeight: '600', fontSize: 16, paddingLeft: 5 }
});
