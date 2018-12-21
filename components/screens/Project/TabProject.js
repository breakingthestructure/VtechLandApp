import React, { Component } from 'react';
import { BackHandler, Image, ScrollView, View } from 'react-native';
import { Container, Content, ScrollableTab, Tab, Tabs, TabHeading, Icon } from 'native-base';
import Swiper from 'react-native-swiper';
import ActionProject from './ActionProject';
import SetCalendar from './SetCalendar';
import Header from '../Home/Header';
import SupportProject from './SupportProject';
import DetailProject from './DetailProject';
import CalcDebt from './CalcDebt';
import News from './News';
import styles from './../../../styles';
import { BASE_URL, NO_IMAGE } from './../../../Globals';
import { loading } from '../../../Helpers';

export default class TabProject extends Component {
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
        };
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation } = this.props;
        const project = navigation.getParam('project', null);
        const activeTab = navigation.getParam('activeTab', null);
        if (project) {
            this.setState({
                loaded: true,
                project
            });
            if (activeTab) {
                this.onChangeTab(activeTab);
            }
        }
    }

    onChangeTab(page) {
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({ activeTab: page });
    }

    render() {
        const { project } = this.state;
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header
                    navigation={this.props.navigation}
                    title={project.name}
                    back={'MapScreen'}
                />
                <ScrollView ref='_scrollView'>
                    <View style={styles.slideProject}>
                        <Swiper showsButtons>
                            {project.data.images.feature && project.data.images.feature.map((value, key) => (
                                <View key={key}>
                                    <Image
                                        source={{ uri: (value) ? `${BASE_URL}${value}` : NO_IMAGE }}
                                        style={styles.imageSlide}
                                    />
                                </View>
                            ))}
                        </Swiper>
                    </View>
                    <Content>
                        <Tabs
                            tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
                            // tabBarBackgroundColor={'#000'}
                            renderTabBar={() => <ScrollableTab style={styles.scrollTabProject} />}
                            // locked
                            tabBarPosition='top'
                            initialPage={this.state.initialPage}
                            page={this.state.activeTab}
                        >
                            <Tab
                                heading="Thông tin dự án"
                                // heading={<TabHeading style={{ backgroundColor: '#fff' }} ><Icon name="ios-calculator" /></TabHeading>}
                                tabStyle={styles.tabProject}
                                textStyle={styles.textTabProject}
                                activeTabStyle={styles.activeTab}
                                activeTextStyle={styles.textActiveTab}
                            >
                                <DetailProject onChangeTab={this.onChangeTab} state={this.state} project={project} />
                            </Tab>
                            <Tab
                                heading="Tin tức & Sự kiện"
                                // heading={<TabHeading style={{ backgroundColor: '#fff' }} ><Icon name="ios-calculator" /></TabHeading>}
                                tabStyle={styles.tabProject}
                                textStyle={styles.textTabProject}
                                activeTabStyle={styles.activeTab}
                                activeTextStyle={styles.textActiveTab}
                            >
                                <News />
                            </Tab>
                            <Tab
                                heading="Tính lãi suất vay"
                                // heading={<TabHeading style={{ backgroundColor: '#fff' }} ><Icon name="ios-calculator" /></TabHeading>}
                                tabStyle={styles.tabProject}
                                textStyle={styles.textTabProject}
                                activeTabStyle={styles.activeTab}
                                activeTextStyle={styles.textActiveTab}
                            >
                                <CalcDebt />
                            </Tab>
                            <Tab
                                heading="Bảng hàng"
                                // heading={<TabHeading style={{ backgroundColor: '#fff' }}><Icon name="ios-bicycle" /></TabHeading>}
                                tabStyle={styles.tabProject}
                                textStyle={styles.textTabProject}
                                activeTabStyle={styles.activeTab}
                                activeTextStyle={styles.textActiveTab}
                            >
                                <ActionProject
                                    navigation={this.props.navigation}
                                    project={project}
                                    goToTablePackage={this.goToTablePackage}
                                />
                            </Tab>
                            <Tab
                                heading="Đặt lịch"
                                // heading={<TabHeading style={{ backgroundColor: '#fff' }}><Icon name="ios-calendar" /></TabHeading>}
                                tabStyle={styles.tabProject}
                                textStyle={styles.textTabProject}
                                activeTabStyle={styles.activeTab}
                                activeTextStyle={styles.textActiveTab}
                            >
                                <SetCalendar />
                            </Tab>
                            <Tab
                                heading="Hỗ trợ dự án"
                                // heading={
                                //     <TabHeading style={{ backgroundColor: '#fff' }}>
                                //         <Icon
                                //             name="ios-call"
                                //         />
                                //     </TabHeading>
                                // }
                                tabStyle={styles.tabProject}
                                textStyle={styles.textTabProject}
                                activeTabStyle={styles.activeTab}
                                activeTextStyle={styles.textActiveTab}
                            >
                                <SupportProject
                                    navigation={this.props.navigation}
                                    directors={project.data.project_directors}
                                />
                            </Tab>
                        </Tabs>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}
