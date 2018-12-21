import React from 'react';
import { Alert, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../Home/Header';
import GLOBAL from './../../../Globals';
import getUser from './../../../api/getUser';
import avatar from './../../../images/avatar.jpg';
import styles from './../../../styles';
import { loading } from '../../../Helpers';
import postUploadAvatar from './../../../api/postUploadAvatar';
import getToken from '../../../api/getToken';
import postUpdateInfomation from './../../../api/postUpdateInfomation';
import saveUser from '../../../api/saveUser';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        const { user } = GLOBAL;
        this.state = {
            loaded: false,
            fullname: user ? user.fullname : '',
            phone: user ? user.phone : '',
            address: user ? user.address : '',
            email: user ? user.email : '',
            identity: user ? user.identity : '',
            image: null,
            resizedImageUri: null,
            txtSubmit: 'Lưu'
        };
    }
    state = {
        isDatePickerVisible: false,
    };
    async componentDidMount() {
        getUser()
            .then(user => {
                GLOBAL.user = user;
                this.setState({ loaded: true });
            });
    }
    showDatePicker = () => this.setState({ isDatePickerVisible: true });//eslint-disable-line

    hideDatePicker = () => this.setState({ isDatePickerVisible: false });//eslint-disable-line

    handleDatePicked = (date) => {//eslint-disable-line
        let selected = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
        this.setState({ txtDate: selected, date });
        this.hideDatePicker();
    }
    pickSingle(cropit, circular = false) {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.5,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            cropperActiveWidgetColor: '#F58319',
            cropperStatusBarColor: '#F58319',
            cropperToolbarColor: '#F58319',
            hideBottomControls: true
        }).then(image => {
            this.setState({
                image: {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    type: image.mime,
                    name: 'avatar'
                }
            });
            getToken()
                .then(token => {
                    let body = new FormData();
                    body.append('avatar', this.state.image);
                    postUploadAvatar(token, body)
                        .then(res => {
                            Alert.alert(
                                'Thông báo',
                                res.message,
                            );
                        })
                        .catch(err => console.error(err));
                });
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }
    onSubmit() {
        getToken()
            .then(token => {
                const { fullname, phone, address } = this.state;
                postUpdateInfomation(token, GLOBAL.user.id, fullname, phone, address)
                    .then(res => {
                        Alert.alert(
                            'Thông báo',
                            res.message,
                        );
                        saveUser(res.data);
                        GLOBAL.user = res.data;
                    });
            });
    }
    resize(image) {
        ImageResizer.createResizedImage(image, 8, 6, 'JPEG', 80)
            .then(({ uri }) => {
                this.setState({
                    resizedImageUri: uri,
                });
                console.log(uri);
            })
            .catch(err => {
                console.log(err);
                return Alert.alert(
                    'Unable to resize the photo',
                    'Check the console for full the error message'
                );
            });
    }
    renderImage(image) {
        return (<Image
            style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 5, borderColor: '#F58319' }}
            source={image}
        />);
    }
    renderAsset(image) {
        return this.renderImage(image);
    }
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='THÔNG TIN TÀI KHOẢN' back={'MapScreen'} />
                <ScrollView>
                    <View style={styles.content}>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <TouchableOpacity onPress={() => this.pickSingle(true, true)}>
                                {this.state.image ? this.renderAsset(this.state.image) : <Image
                                    source={avatar}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 60,
                                        borderWidth: 5,
                                        borderColor: '#F58319'
                                    }}
                                />}
                            </TouchableOpacity>
                            <View style={styles.sectionInputInline}>
                                <Text style={{ fontSize: 18 }}>Xin chào </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#F58319',
                                        fontWeight: '600'
                                    }}
                                >{this.state.fullname ? this.state.fullname : ''}!</Text>
                            </View>
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Họ tên'
                                underlineColorAndroid='transparent'
                                value={this.state.fullname}
                                onChangeText={text => this.setState({ fullname: text })}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Địa chỉ'
                                underlineColorAndroid='transparent'
                                value={this.state.address}
                                onChangeText={text => this.setState({ address: text })}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Điện thoại'
                                underlineColorAndroid='transparent'
                                value={this.state.phone}
                                onChangeText={text => this.setState({ phone: text })}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Email'
                                underlineColorAndroid='transparent'
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.input}
                                placeholder='Số CMND'
                                underlineColorAndroid='transparent'
                                value={this.state.identity}
                                onChangeText={text => this.setState({ identity: text })}
                                keyboardType={'numeric'}
                            />
                        </View>

                        <View style={styles.rowOption}>
                            <View
                                style={styles.viewHalfInput}
                            >
                                <TextInput
                                    style={styles.input}
                                    placeholder='Ngày cấp'
                                    underlineColorAndroid='transparent'
                                    value={this.state.identity}
                                    onChangeText={text => this.setState({ identity: text })}
                                    onFocus={() => {
                                        Keyboard.dismiss();
                                        this.showDatePicker();
                                    }}
                                />
                            </View>
                            <View
                                style={styles.viewHalfInput}
                            >
                                <TextInput
                                    style={styles.input}
                                    placeholder='Nơi cấp'
                                    underlineColorAndroid='transparent'
                                    value={this.state.identity}
                                    onChangeText={text => this.setState({ identity: text })}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.bigBtnIcon}
                            onPress={this.onSubmit.bind(this)}
                        >
                            <Icon type="FontAwesome" name='save' style={styles.iconBigBtn}
                            />
                            <Text style={styles.textBtnIcon}>
                                {this.state.txtSubmit}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDatePicker}
                            datePickerModeAndroid='calendar'
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

