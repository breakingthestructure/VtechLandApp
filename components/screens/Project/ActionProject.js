import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList
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
    _keyExtractor = (item, index) => index;
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
        const arrBuilding = Object.keys(buildings).map((item, index) => {
            return { key: item, value: buildings[item] };
        })
        return (
            <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
                <View style={styles.wrapper}>
                    <Text style={{ fontWeight: '600', fontSize: 18, textAlign: 'center', color: '#053654', paddingTop: 10 }}>Danh sách bảng hàng</Text>
                    <View>
                        <FlatList
                            keyExtractor={this._keyExtractor}
                            horizontal={false}
                            numColumns={2}
                            contentContainerStyle={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}
                            data={arrBuilding}
                            // data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }]}
                            // renderItem={this.renderTable}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.btnAction}
                                    onPress={() => navigation.navigate('TablePackageScreen', {
                                        project: project,
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
                    </View>
                    <View style={styles.sectionAction}>

                        {/* {Object.keys(buildings).map(function (key) {
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
                        })} */}
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
        width: '40%',
        borderColor: '#33563743',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
        height: height / 5,
        justifyContent: 'center',
        margin: 15
    },
    btnTextAction: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center'
    },
});
