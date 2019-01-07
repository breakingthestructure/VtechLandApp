import React from 'react';
import { BackHandler, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Toast } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import ModalRN from 'react-native-modal';
import Header from '../Home/Header';
import getDetailApartment from './../../../api/getDetailApartment';
import { BASE_URL, TYPE_ROOM } from './../../../Globals';
import styles from './../../../styles';
import { loading } from '../../../Helpers';
import createTokenTransaction from './../../../api/createTokenTransaction';
import getToken from '../../../api/getToken';
import postLockApartment from './../../../api/postLockApartment';

export default class DetailApartment extends React.Component {
    handleBackPress = () => { //eslint-disable-line
        return this.props.navigation.navigate('TablePackageScreen');
    }
    state = {
        isModalVisible: false,
        isModalOrderVisible: false,
    };
    _toggleModal = () => //eslint-disable-line
        this.setState({ isModalVisible: !this.state.isModalVisible });
    _toggleModalOrder = () => //eslint-disable-line
        this.setState({ isModalOrderVisible: !this.state.isModalOrderVisible });

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isReady: false,
            index: 0,
            modal3D: false,
            modalPosition: false,
            apartment: null,
            image3d: null,
            txtSubmit: 'XÁC NHẬN'
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
                        let img3Ds = [];
                        if (resJson.image_3d && resJson.image_3d.length > 0) {
                            img3Ds = resJson.image_3d.map((item) => {
                                return { url: `${BASE_URL}${item}` };
                            });
                        }
                        this.setState({
                            apartment: resJson,
                            image3d: img3Ds,
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

    onLockApartment() {
        this.setState({ loaded: false, txtSubmit: 'Đang xử lý' });
        getToken()
            .then(token => {
                postLockApartment(token, this.state.apartment.id)
                    .then(res => {
                        Toast.show({
                            text: res.message,
                            type: 'success',
                            buttonText: 'Okay'
                        });
                        this.setState({ loaded: true, txtSubmit: 'XÁC NHẬN' });
                        this._toggleModal();
                    });
            });
    }

    onOrderApartment() {
        // this.setState({ loaded: false });
        getToken()
            .then(token => {
                createTokenTransaction(token, this.state.apartment.id)
                    .then(res => {
                        this._toggleModalOrder();
                        if (res.status === 200) {
                            return this.props.navigation.navigate('OrderSubmitScreen', {
                                apartment: this.state.apartment,
                                transactionCode: res.data
                            });
                        }
                        let message = res.message;
                        if (res.status === 401) {
                            message = 'Vui lòng đăng nhập để sử dụng chức năng này';
                        }
                        // this.setState({ loaded: true });
                        return Toast.show({
                            text: message,
                            type: 'danger',
                            buttonText: 'Okay'
                        });
                    });
            });
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        const { apartment } = this.state;
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} title={`CĂN HỘ ${apartment.number}`} back={'back'} />
                <ScrollView style={styles.content}>
                    <Text style={styles.titleScreen}>CĂN
                        HỘ {apartment.number} - {apartment.building.name} - {apartment.project.name}</Text>
                    <Text style={styles.subTitleScreen}>({apartment.status.description})</Text>
                    <View style={styles.groupInline}>
                        <TouchableOpacity
                            style={styles.btnSubmitSquareInline}
                            onPress={this._toggleModal}
                        >
                            <Icon name='ios-lock' style={styles.iconBigBtn} />
                            <Text style={styles.textBtnIcon}>LOCK CĂN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnSpecial}
                            onPress={this._toggleModalOrder}
                            // onPress={this.onOrderApartment.bind(this)}
                        >
                            <Icon name='ios-cart' style={styles.iconBigBtn} />
                            <Text style={styles.textBtnIcon}>ĐẶT CỌC</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleDescription}>
                        Diện tích sàn {apartment.live_area} m2 (diện tích thông thủy)
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
                        {apartment.room.map((item, index) => (
                            <View
                                key={index}
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
                            {apartment.image_3d.map((image, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={this.onDisplayImage.bind(this, '3d')}
                                >
                                    <Image
                                        source={{ uri: `${BASE_URL}${image}` }}
                                        style={styles.imageApartment}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.txtHeader}>Vị trí căn hộ</Text>
                        <TouchableOpacity
                            onPress={this.onDisplayImage.bind(this, 'position')}
                            style={{ justifyContent: 'center' }}
                        >
                            <Image
                                source={{ uri: `${BASE_URL}${apartment.position_apartment}` }}
                                style={styles.imageApartment}
                            />
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
                            <Text style={{ color: '#666' }}>Căn hộ sẽ được khóa trong 120 phút và thông báo với giám đốc
                                dự án.
                                Căn hộ sẽ được mở sau thời gian trên nếu không hoàn tất thủ tục thanh toán.</Text>
                            <Text style={{ color: '#666' }}>Bạn có chắc muốn khóa căn hộ này không?</Text>
                            <View style={styles.modalAction}>
                                <TouchableOpacity
                                    onPress={this.onLockApartment.bind(this)}
                                    style={styles.btnSubmitModal}
                                >
                                    <Text style={styles.textBtnActive}>{this.state.txtSubmit}</Text>
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
                <ModalRN
                    isVisible={this.state.isModalOrderVisible}
                    onSwipe={() => this.setState({ isModalOrderVisible: false })}
                    swipeDirection="left"
                >
                    <View style={{ borderRadius: 15 }}>
                        <View style={styles.titleModal}>
                            <Text style={styles.textTitleModal}>GIAO DỊCH ĐẶT CỌC</Text>
                        </View>
                        <View style={styles.contentModal}>
                            <Text style={{ color: '#666' }}>Chuyển tới trang làm thủ tục thanh toán đặt cọc căn hộ.
                                Các bước thanh toán hoàn tất chỉ sau 1 phút.</Text>
                            <Text style={{ color: '#666' }}>Bạn có chắc muốn đặt cọc căn hộ này không?</Text>
                            <View style={styles.modalAction}>
                                <TouchableOpacity
                                    onPress={this.onOrderApartment.bind(this)}
                                    style={styles.btnSubmitModal}
                                >
                                    <Text style={styles.textBtnActive}>{this.state.txtSubmit}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this._toggleModalOrder}
                                    style={styles.btnCancelModal}
                                >
                                    <Text style={styles.textBtnActive}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ModalRN>
            </View>
        );
    }
}
