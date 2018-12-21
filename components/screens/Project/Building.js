import React, { Component } from 'react';
import { BackHandler, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Body, Card, CardItem, Container, DeckSwiper, Icon, Left, Thumbnail } from 'native-base';
import Header from '../Home/Header';
import styles from './../../../styles';
import { BASE_URL, NO_IMAGE } from './../../../Globals';
import { loading } from '../../../Helpers';
import getBuildings from '../../../api/getBuildings';
import icCalendar from '../../../icons/calendar.png';

export default class Building extends Component {
    handleBackPress = () => { //eslint-disable-line
        // this.props.navigation.pop();
        return true;
    }

    constructor(props) {
        super(props);
        this.state = {
            initialPage: 0,
            activeTab: 0,
            project: null,
            loaded: true,
            buildings: []
        };
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation } = this.props;
        const project = navigation.getParam('project', null);
        getBuildings(project.id)
            .then(resJson => {
                if (resJson.status === 200) {
                    console.log(resJson);
                    this.setState({
                        buildings: resJson.data,
                        loaded: true,
                        project
                    });
                }
            })
            .catch(err => console.log(err));
    }

    onChangeTab(page) {
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({ activeTab: page });
    }

    render() {

        const { navigation } = this.props;
        const project = navigation.getParam('project', null);
        if (!this.state.loaded) {
            return loading();
        }
        const arrBuilding = Object.keys(this.state.buildings).map((item, index) => {
            return { key: item, value: this.state.buildings[item] };
        });
        return (
            <Container>
                <Header
                    navigation={this.props.navigation}
                    title={project.name}
                    back={'MapScreen'}
                />
                <ScrollView ref='_scrollView'>
                    <View style={{ height: 300 }}>
                        <DeckSwiper
                            dataSource={project.data.images.feature}
                            renderItem={item =>
                                <Card style={{ elevation: 3 }}>
                                    {/*<CardItem>*/}
                                        {/*<Left>*/}
                                            {/*<Thumbnail source={{ uri: (item) ? `${BASE_URL}${item}` : NO_IMAGE }} />*/}
                                            {/*<Body>*/}
                                            {/*<Text>{project.name}</Text>*/}
                                            {/*<Text note>V-techHome</Text>*/}
                                            {/*</Body>*/}
                                        {/*</Left>*/}
                                    {/*</CardItem>*/}
                                    <CardItem cardBody>
                                        <Image style={{ height: 300, flex: 1 }}
                                               source={{ uri: (item) ? `${BASE_URL}${item}` : NO_IMAGE }} />
                                    </CardItem>
                                    {/*<CardItem>*/}
                                        {/*<Icon name="heart" style={{ color: '#ED4A6A' }} />*/}
                                        {/*<Text>{project.name}</Text>*/}
                                    {/*</CardItem>*/}
                                </Card>
                            }
                        />
                    </View>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 20 }}
                        data={arrBuilding}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item}
                                style={styles.btnAction}
                                onPress={() => navigation.navigate('TablePackageScreen', {
                                    project,
                                    buildingId: item.key,
                                    buildingName: item.value
                                })}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icCalendar} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>{item.value}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </Container>
        );
    }
}
