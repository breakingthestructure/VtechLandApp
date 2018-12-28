import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Icon, Toast } from 'native-base';
import Header from '../Home/Header';
import getUser from './../../../api/getUser';
import getToken from './../../../api/getToken';
import postChangePassword from './../../../api/postChangePassword';
import GLOBAL from './../../../Globals';
import avatar from './../../../images/avatar.jpg';
import styles from './../../../styles';
import { loading } from '../../../Helpers';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            txtSubmit: 'LƯU'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 1000);
    }

    onSubmit() {
        const { currentPassword, newPassword, confirmPassword } = this.state;
        this.setState({ txtSubmit: 'Đang xử lý' });
        getToken()
            .then(token => {
                getUser()
                    .then(user => {
                        postChangePassword(token, user.email, currentPassword, newPassword, confirmPassword)
                            .then(resJson => {
                                this.setState({ txtSubmit: 'LƯU' });
                                if (resJson.status) {
                                    GLOBAL.user = resJson;
                                    return Toast.show({
                                        text: resJson.message,
                                        type: 'success',
                                        buttonText: 'Okay'
                                    });
                                }
                                // let message = resJson.data.errors.map((val, key)=> {
                                //     return val;
                                // });
                                return Toast.show({
                                    text: resJson.message,
                                    type: 'danger',
                                    buttonText: 'Okay'
                                });
                            })
                            .catch(err => console.error(err));
                    });
            });


    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='THAY ĐỔI MẬT KHẨU' back={'MapScreen'} />
                <ScrollView>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <Image source={avatar} style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                borderWidth: 5,
                                borderColor: '#F58319'
                            }} />
                            <View style={styles.sectionInputInline}>

                                <Text style={{ fontSize: 18 }}>Xin chào </Text>
                                <Text style={{ fontSize: 18, color: '#F58319', fontWeight: '600' }}>Cowboy!</Text>
                            </View>
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Mật khẩu hiện tại'
                                underlineColorAndroid='transparent'
                                value={this.state.currentPassword}
                                onChangeText={text => this.setState({ currentPassword: text })}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Mật khẩu mới'
                                underlineColorAndroid='transparent'
                                value={this.state.newPassword}
                                onChangeText={text => this.setState({ newPassword: text })}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Xác nhận mật khẩu mới'
                                underlineColorAndroid='transparent'
                                value={this.state.confirmPassword}
                                onChangeText={text => this.setState({ confirmPassword: text })}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.groupInline}>
                            <TouchableOpacity style={styles.btnSubmitSquareInline} onPress={this.onSubmit.bind(this)}>
                                <Icon type="FontAwesome" name='save' style={styles.iconBigBtn} />
                                <Text style={styles.textBtnIcon}>{this.state.txtSubmit}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnBackSquareInline}
                                onPress={() => this.props.navigation.navigate('MapScreen')}
                            >
                                <Icon type="FontAwesome" name='mail-reply' style={styles.iconBigBtn} />
                                <Text style={styles.textBtnIcon}>QUAY LẠI</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

