import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    BackHandler,
    Alert
} from 'react-native';

import { Container, Content, Spinner } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';

// import icTitle from './../../../icons/ic_title.png';
import Header from '../Home/Header';
import getDetailApartment from './../../../api/getDetailApartment';
import { BASE_URL, TYPE_ROOM, DIRECTIONS } from './../../../Globals';
import ModalRN from "react-native-modal";
import styles from './../../../styles';
import { loading } from '../../../Helpers';

const { width, height } = Dimensions.get('window');

export default class DetailApartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isReady: false,
            index: 0,
            modal3D: false,
            modalPosition: false,
            apartment: null,
            image3d: null
        };
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation } = this.props;
        const apartmentId = navigation.getParam('apartmentId', null);
        if (apartmentId) {
            getDetailApartment(apartmentId)
                .then(resJson => {
                    if (resJson) {
                        this.setState({
                            apartment: resJson,
                            image3d: resJson.image_3d.map((item, index) => {
                                return { url: `${BASE_URL}${item}` };
                            }),
                            loaded: true
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    }
    onDisplayImage(type) {
        if (type === '3d') {
            this.setState({ modal3D: true });
        }
        if (type === 'position') {
            this.setState({ modalPosition: true });
        }
    }
    handleBackPress = () => { //eslint-disable-line
        console.log('ok');
        this.props.navigation.navigate('TablePackageScreen');
        return true;
    }
    onLockApartment() {
        // this._toggleModal();
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn lock căn này',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen') },
                { text: 'Hủy', onPress: () => console.log('ok') },
            ],
            { cancelable: false }
        );
    }

    state = {
        isModalVisible: false
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        const { apartment } = this.state;
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} title='CHI TIẾT CĂN A0501' />
                <ScrollView style={styles.content}>
                    <Text style={styles.titleScreen}>CĂN HỘ {apartment.number} - {apartment.building.name} - {apartment.project.name}</Text>
                    <Text style={styles.subTitleScreen}>({apartment.status.description})</Text>
                    <View style={styles.sectionInputInline}>
                        <TouchableOpacity
                            // onPress={this.onLockApartment.bind(this)}
                            onPress={this._toggleModal}
                            style={styles.btnSubmit}
                        // style={{ width: (width - 50) / 2, height: 30, borderRadius: 15, backgroundColor: '#177dba', marginTop: 5, marginHorizontal: 5 }}
                        >
                            <Text
                                // style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}
                                style={styles.textBtnActive}
                            >LOCK CĂN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('OrderSubmitScreen')}
                            // style={styles.btnCancel}
                            style={styles.btnSpecial}
                        >
                            <Text
                                // style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}
                                style={styles.textBtnActive}
                            >ĐẶT CỌC (ĐẶT CHỖ)</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleDescription}>
                        Diện tích sàn 85.91 m2 (diện tích thông thủy)
                    </Text>
                    <View style={styles.contentWrapper}>
                        <View
                            style={styles.lineInfo}
                        >
                            <Text style={{ fontSize: 14 }}>Diện tích</Text>
                            <View style={styles.headerAction}>
                                <Text style={{ fontSize: 14 }}>{apartment.area}</Text>
                                <Text style={styles.subLabel}> m2</Text>
                            </View>
                        </View>
                        <View
                            style={styles.lineInfo}
                        >
                            <Text style={{ fontSize: 14 }}>Số phòng ngủ</Text>
                            <View style={styles.headerAction}>
                                <Text style={{ fontSize: 14 }}>{apartment.bedroom}</Text>
                            </View>
                        </View>
                        <View
                            style={styles.lineInfo}
                        >
                            <Text style={{ fontSize: 14 }}>Hướng</Text>
                            <View style={styles.headerAction}>
                                <Text style={{ fontSize: 14 }}>{apartment.direction.description}</Text>
                            </View>
                        </View>
                        {apartment.room.map(item => (
                            <View
                                key={item.area}
                                style={styles.lineInfo}
                            >
                                <Text style={{ fontSize: 14 }}>{TYPE_ROOM[item.type]}</Text>
                                <View style={styles.headerAction}>
                                    <Text style={{ fontSize: 14 }}>{item.area}</Text>
                                    <Text style={styles.subLabel}> m2</Text>
                                </View>
                            </View>
                        ))}
                        <Text style={styles.txtHeader}>Phối cảnh 3D</Text>
                        <ScrollView horizontal style={{ flexDirection: 'row' }}>
                            {apartment.image_3d.map(image => (
                                <TouchableOpacity key={image} onPress={this.onDisplayImage.bind(this, '3d')}>
                                    <Image source={{ uri: `${BASE_URL}${image}` }} style={styles.imageApartment} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.txtHeader}>Vị trí căn hộ</Text>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this, 'position')} style={{ justifyContent: 'center' }}>
                            <Image source={{ uri: `${BASE_URL}${apartment.position_apartment}` }} style={styles.imageApartment} />
                        </TouchableOpacity>
                        <Modal
                            visible={this.state.modalPosition}
                            transparent
                            onRequestClose={() => {
                                this.setState({ modalPosition: false });
                            }}
                        >
                            <ImageViewer
                                imageUrls={[{ url: `${BASE_URL}${apartment.position_apartment}` }]}
                                index={this.state.index}
                                onSwipeDown={() => {
                                    this.setState({ modalPosition: false });
                                }}
                                enableSwipeDown
                                backgroundColor='black'
                                enablePreload
                            />
                        </Modal>
                        <Modal
                            visible={this.state.modal3D}
                            transparent
                            onRequestClose={() => {
                                this.setState({ modal3D: false });
                            }}
                        >
                            <ImageViewer
                                imageUrls={this.state.image3d}
                                index={this.state.index}
                                onSwipeDown={() => {
                                    this.setState({ modal3D: false });
                                }}
                                enableSwipeDown
                                backgroundColor='black'
                                enablePreload
                            />
                        </Modal>
                    </View>
                </ScrollView>
                <ModalRN
                    isVisible={this.state.isModalVisible}
                    // animationInTiming='1500'
                    onSwipe={() => this.setState({ isModalVisible: false })}
                    swipeDirection="left"
                >
                    <View style={{ borderRadius: 15 }}>
                        <View style={styles.titleModal}>
                            <Text style={styles.textTitleModal}>LOCK CĂN HỘ</Text>
                        </View>
                        <View style={styles.contentModal}>
                            <Text style={{ color: '#666' }}>Căn hộ sẽ được khóa trong 120 phút và thông báo với giám đốc dự án.
                        Căn hộ sẽ được mở sau thời gian trên nếu không hoàn tất thủ tục thanh toán.</Text>
                            <Text style={{ color: '#666' }}>Bạn có chắc muốn khóa căn hộ này không?</Text>
                            <View style={styles.modalAction}>
                                <TouchableOpacity
                                    // onPress={this.onLockApartment.bind(this)}
                                    onPress={this._toggleModal}
                                    style={styles.btnSubmitModal}
                                >
                                    <Text style={styles.textBtnActive}>XÁC NHẬN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this._toggleModal}
                                    style={styles.btnCancelModal}
                                >
                                    <Text style={styles.textBtnActive}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ModalRN>
            </View >
        );
    }
}
