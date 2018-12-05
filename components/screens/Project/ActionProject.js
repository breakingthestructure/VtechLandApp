import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import Header from '../Home/Header';

import imgDuan from './../../../images/duan.jpg';
import icCalendar from './../../../icons/calendar.png';
import icList from './../../../icons/list.png';
import icMoneyBag from './../../../icons/money_bag.png';
import icLadder from './../../../icons/ladder.png';
// import SetCalendar from './SetCalendar';


const { width, height } = Dimensions.get('window');


export default class ActionProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }
    render() {
        const { buildings, navigation, project } = this.props;
        if (!this.state.loaded || !this.props.navigation) {
            return (
                <Container>
                    <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        return (
            <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
                <View style={styles.wrapper}>
                    <View style={styles.sectionAction}>
                        {Object.keys(buildings).map(function (key) {
                            return <TouchableOpacity
                                key={key}
                                style={styles.btnAction}
                                onPress={() => navigation.navigate('TablePackageScreen', {
                                    project: project,
                                    buildingId: key,
                                    buildingName: buildings[key]
                                })}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image source={icCalendar} style={{ width: 30, height: 30 }} />

                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>{buildings[key]}</Text>
                                </View>
                            </TouchableOpacity>
                        })}
                        {/* <TouchableOpacity
                            style={styles.btnAction}
                            onPress={() => this.props.navigation.navigate('SetCalendarProjectScreen')}
                        >
                            <View style={{ paddingVertical: 5 }}>
                                <Image source={icCalendar} style={{ width: 30, height: 30 }} />

                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.btnTextAction}>Đặt lịch thăm quan nhà mẫu</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnAction}
                            onPress={() => this.props.navigation.navigate('TablePackageScreen')}
                        >
                            <View style={{ paddingVertical: 5 }}>
                                <Image source={icList} style={{ width: 30, height: 30 }} />

                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.btnTextAction}>Check bảng hàng online</Text>
                            </View>
                        </TouchableOpacity> */}

                    </View>
                    {/* <View style={styles.sectionAction}>
                        <TouchableOpacity
                            style={styles.btnAction}
                            onPress={() => this.props.navigation.navigate('CalcDebtScreen')}
                        >
                            <View style={{ paddingVertical: 5 }}>
                                <Image source={icMoneyBag} style={{ width: 30, height: 30 }} />

                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.btnTextAction}>Tính lãi vay ngân hàng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnAction}
                            onPress={() => this.props.navigation.navigate('TablePackageScreen')}
                        >
                            <View style={{ paddingVertical: 5 }}>
                                <Image source={icLadder} style={{ width: 30, height: 30 }} />

                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.btnTextAction}>Tính tiến độ nộp tiền</Text>
                            </View>
                        </TouchableOpacity>

                    </View> */}
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionAction: {
        paddingHorizontal: 15,
        paddingTop: 15,
        justifyContent: 'space-around',
        marginBottom: 10,
        width,
        flexDirection: 'row'
    },
    btnAction: {
        width: '45%',
        borderColor: '#33563743',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
        height: height / 5,
        justifyContent: 'center'
    },
    btnTextAction: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center'
    },
});
