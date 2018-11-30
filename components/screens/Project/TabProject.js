import React, { Component } from 'react';
import { Dimensions, Image, Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab, TabHeading, Icon, Content } from 'native-base';
import Swiper from 'react-native-swiper';
import ActionProject from './ActionProject';
import SetCalendar from './SetCalendar';
import Header from '../Home/Header';
import imgDuan from './../../../images/duan.jpg';
import SupportProject from './SupportProject';
import DetailProject from './DetailProject';
import CalcDebt from './CalcDebt';
import AdvanceSearch from './AdvanceSearch';
import News from './News';

const { width, height } = Dimensions.get('window');
const imageWidth = width;
const imageHeight = (imageWidth / 3900) * 2092;

export default class TabProject extends Component {
    constructor(props) {
        super(props)
        this.state = { initialPage: 0, activeTab: 0 };
        this.onChangeTab = this.onChangeTab.bind(this)
    }
    onChangeTab(page) {
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        this.setState({ activeTab: page, initialPage: page });
    }
    render() {
        return (
            <Container>
                <Header navigation={this.props.navigation} title='AN PHÚ SHOP VILLA' />
                <ScrollView ref='_scrollView'>
                    <View style={{ height: height / 4 }}>
                        <Swiper showsButtons={true}>
                            <View>
                                <Image source={imgDuan} style={styles.imageSlide} />
                            </View>
                            <View>
                                <Image source={imgDuan} style={styles.imageSlide} />
                            </View>

                        </Swiper>
                    </View>
                    <Content>
                        <Tabs
                            tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
                            // tabBarBackgroundColor={'#000'}
                            renderTabBar={() => <ScrollableTab style={{ backgroundColor: '#cacaca', height: 40 }} />}
                            locked
                            tabBarPosition='top'
                            initialPage={this.state.initialPage}
                            page={this.state.activeTab}
                        >
                            <Tab
                                heading="Thông tin dự án"
                                // heading={<TabHeading style={{ backgroundColor: '#cacaca' }} ><Icon name="ios-calculator" /></TabHeading>}
                                tabStyle={{ backgroundColor: '#fff' }}
                                textStyle={{ color: '#000', fontSize: 12, fontWeight: '400' }}
                                activeTabStyle={{ backgroundColor: '#F58319' }}
                                activeTextStyle={{ color: 'white', fontWeight: '400', fontSize: 12 }}
                            >
                                <DetailProject onChangeTab={this.onChangeTab} state={this.state} />
                            </Tab>
                            <Tab
                                heading="Tin tức & Sự kiện"
                                // heading={<TabHeading style={{ backgroundColor: '#cacaca' }} ><Icon name="ios-calculator" /></TabHeading>}
                                tabStyle={{ backgroundColor: '#fff' }}
                                textStyle={{ color: '#000', fontSize: 12, fontWeight: '400' }}
                                activeTabStyle={{ backgroundColor: '#F58319' }}
                                activeTextStyle={{ color: 'white', fontWeight: '400', fontSize: 12 }}
                            >
                                <News />
                            </Tab>
                            <Tab
                                heading="Tính lãi suất vay"
                                // heading={<TabHeading style={{ backgroundColor: '#cacaca' }} ><Icon name="ios-calculator" /></TabHeading>}
                                tabStyle={{ backgroundColor: '#fff' }}
                                textStyle={{ color: '#000', fontSize: 12 }}
                                activeTabStyle={{ backgroundColor: '#F58319' }}
                                activeTextStyle={{ color: 'white', fontWeight: '500', fontSize: 12 }}
                            >
                                <CalcDebt />
                            </Tab>
                            <Tab
                                heading="Đặt lịch"
                                // heading={<TabHeading style={{ backgroundColor: '#cacaca' }} ><Icon name="ios-calendar" /></TabHeading>}
                                tabStyle={{ backgroundColor: '#fff' }}
                                textStyle={{ color: '#000', fontSize: 12 }}
                                activeTabStyle={{ backgroundColor: '#F58319' }}
                                activeTextStyle={{ color: 'white', fontWeight: '500', fontSize: 12 }}
                            >
                                <SetCalendar />
                            </Tab>
                            <Tab
                                heading="Tiện ích dự án"
                                // heading={<TabHeading style={{ backgroundColor: '#cacaca' }} ><Icon name="ios-bicycle" /></TabHeading>}
                                tabStyle={{ backgroundColor: '#fff' }}
                                textStyle={{ color: '#000', fontSize: 12 }}
                                activeTabStyle={{ backgroundColor: '#F58319' }}
                                activeTextStyle={{ color: 'white', fontWeight: '500', fontSize: 12 }}
                            >
                                <ActionProject navigation={this.props.navigation} />
                            </Tab>
                            <Tab
                                heading="Hỗ trợ dự án"
                                // heading={<TabHeading style={{ backgroundColor: '#cacaca' }} ><Icon name="ios-call" /></TabHeading>}
                                tabStyle={{ backgroundColor: '#fff' }}
                                textStyle={{ color: '#000', fontSize: 12 }}
                                activeTabStyle={{ backgroundColor: '#F58319' }}
                                activeTextStyle={{ color: 'white', fontWeight: '500', fontSize: 12 }}
                            >
                                <SupportProject navigation={this.props.navigation} />
                            </Tab>
                        </Tabs>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSlide: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
