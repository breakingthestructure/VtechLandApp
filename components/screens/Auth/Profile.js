import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { Icon, ListItem, Left, Button, Body, Right } from 'native-base';

import icAvatar from './../../../icons/customer.png';
import Header from '../Home/Header';
import icProfile from './../../../icons/icon_profile.png';
import icHistory from './../../../icons/history.png';
import icList from './../../../icons/list.png';
import icShutdown from './../../../icons/shutdown.png';
import saveToken from './../../../api/saveToken';
import GLOBAL from './../../../Globals';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onSignOut() {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn thoát tài khoản',
            [
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        GLOBAL.user = null;
                        saveToken('');
                        this.props.navigation.navigate('LoginScreen');
                    }
                },
                { text: 'Hủy bỏ', onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false }
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='Thông tin cá nhân' />
                <View style={{ backgroundColor: '#fff', flex: 1 }}>
                    <View style={{ alignItems: 'center', padding: 20, flex: 1 }}>
                        <Image source={icAvatar} style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: '#cccccc' }} />
                        <Text style={{ fontSize: 18, padding: 10 }}>James Bond</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20, paddingLeft: 10 }}>
                        <ListItem icon style={{ backgroundColor: '#fff' }}>
                            <Left>
                                <Button style={{ backgroundColor: "green" }}>
                                    <Icon active name="ios-person" />
                                </Button>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfigScreen')}>
                                    <Text>Thông tin tài khoản</Text>
                                </TouchableOpacity>
                            </Body>

                        </ListItem>
                        <ListItem icon style={{ backgroundColor: '#fff' }}>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon active name='ios-notifications' />
                                </Button>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationScreen')}>
                                    <Text>Thông báo của tôi</Text>
                                </TouchableOpacity>
                            </Body>

                        </ListItem>
                        <ListItem icon style={{ backgroundColor: '#fff' }}>
                            <Left>
                                <Button style={{ backgroundColor: "#007AFF" }}>
                                    {/* <Icon active name="bluetooth" /> */}
                                    <Image source={icHistory} style={styles.iconBtn} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Lịch sử giao dịch</Text>
                            </Body>

                        </ListItem>
                        <ListItem icon style={{ backgroundColor: '#fff' }}>
                            <Left>
                                <Button style={{ backgroundColor: "orange" }}>
                                    <Image source={icList} style={styles.iconBtn} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Quản lý khách hàng ký gửi</Text>
                            </Body>

                        </ListItem>
                        <ListItem icon style={{ backgroundColor: '#fff' }}>
                            <Left>
                                <Button style={{ backgroundColor: "red" }}>
                                    <Icon active name="ios-log-out" />
                                </Button>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={this.onSignOut.bind(this)}>
                                    <Text>Đăng xuất</Text>
                                </TouchableOpacity>
                            </Body>

                        </ListItem>
                        {/* <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('ConfigScreen')}>
                            <Image source={icProfile} style={styles.iconBtn} />
                            <Text style={styles.textBtn}>Thông tin tài khoản</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAction} onPress={() => this.props.navigation.navigate('NotificationScreen')}>
                            <Icon active name='ios-notifications-outline' style={{ fontSize: 20, color: 'orange' }} />
                            <Text style={styles.textBtn}>Thông báo của tôi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAction}>
                            <Image source={icHistory} style={styles.iconBtn} />
                            <Text style={styles.textBtn}>Lịch sử giao dịch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAction}>
                            <Image source={icList} style={styles.iconBtn} />
                            <Text style={styles.textBtn}>Quản lý khách hàng ký gửi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAction} onPress={this.onSignOut.bind(this)}>
                            <Image source={icShutdown} style={styles.iconBtn} />
                            <Text style={styles.textBtn}>Đăng xuất</Text>
                        </TouchableOpacity> */}
                    </View>

                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
    btnAction: {
        width: '100%',
        borderTopColor: '#cccccc',
        borderBottomColor: '#cccccc',
        borderWidth: 1,
        height: 50,
        // marginBottom: 10,
        flexDirection: 'row',
        paddingTop: 15,
        paddingLeft: 15,
        backgroundColor: 'white',
        // borderRadius: 15,
        borderColor: '#cccccc',
    },
    iconBtn: {
        width: 15, height: 15, marginTop: 2
    },
    textBtn: {
        paddingLeft: 10,
        fontWeight: '500'
    }
});
