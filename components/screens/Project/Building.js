import React, { Component } from 'react';
import {
    BackHandler,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    DeckSwiper,
    Icon,
    Left,
    ListItem,
    Right,
    Thumbnail
} from 'native-base';
import Header from '../Home/Header';
import styles from './../../../styles';
import {
    BASE_URL,
    NO_IMAGE
} from './../../../Globals';
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
                        {project.data.images.feature.length > 0 &&
                        <DeckSwiper
                            dataSource={project.data.images.feature}
                            renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem cardBody>
                                    <Image
                                        style={{ height: 300, flex: 1 }}
                                        source={{ uri: (item) ? `${BASE_URL}${item}` : NO_IMAGE }}
                                    />
                                </CardItem>
                            </Card>
                        }
                        />}
                    </View>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 18,
                            textAlign: 'center',
                            color: '#053654',
                            paddingTop: 10
                        }}
                    >
                        Danh sách bảng hàng
                    </Text>
                    <FlatList
                        data={arrBuilding}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: '#007AFF' }}>
                                        <Icon active name="ios-home" />
                                    </Button>
                                </Left>
                                <Body>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('TablePackageScreen', {
                                        project,
                                        buildingId: item.key,
                                        buildingName: item.value
                                    })}
                                >
                                    <Text>{item.value}</Text>
                                </TouchableOpacity>
                                </Body>
                                <Right>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('TablePackageScreen', {
                                            project,
                                            buildingId: item.key,
                                            buildingName: item.value
                                        })}
                                    >
                                        <Icon active name="arrow-forward" style={{ fontSize: 20, color: 'orange' }} />
                                    </TouchableOpacity>
                                </Right>
                            </ListItem>
                        )}
                    />
                </ScrollView>
            </Container>
        );
    }
}
