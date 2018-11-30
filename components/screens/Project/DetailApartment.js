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

import icTitle from './../../../icons/ic_title.png';
import Header from '../Home/Header';
import getDetailApartment from './../../../api/getDetailApartment';
import { BASE_URL, TYPE_ROOM, DIRECTIONS } from './../../../Globals';
import ModalRN from "react-native-modal";

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
    // state = {
    //     isModalVisible: false
    // };
    // showAlert = () => {
    //     console.log(222);
    //     this.setState({ isModalVisible: !this.state.isModalVisible });
    // }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const { navigation } = this.props;
        const apartmentId = navigation.getParam('apartmentId', null);
        // if (apartmentId) {
        getDetailApartment(apartmentId)
            .then(resJson => {
                if (resJson) {
                    console.log(123);
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
        // }
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
            return (
                <Container>
                    <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        const { apartment } = this.state;
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Header navigation={this.props.navigation} title='CHI TIẾT CĂN A0501' />
                <ScrollView style={styles.wrapper}>
                    <Text style={{ fontWeight: '600', fontSize: 16, textAlign: 'center', color: '#053654' }}>CĂN HỘ {apartment.number} - {apartment.building.name} - {apartment.project.name}</Text>
                    <Text style={{ fontWeight: '300', fontSize: 14, textAlign: 'center', color: '#f48120', paddingTop: 5 }}>({apartment.status.description})</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity
                            // onPress={this.onLockApartment.bind(this)}
                            onPress={this._toggleModal}
                            style={{ width: (width - 50) / 2, height: 30, borderRadius: 15, backgroundColor: '#177dba', marginTop: 5, marginHorizontal: 5 }}
                        >
                            <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}>LOCK CĂN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('OrderSubmitScreen')}
                            style={{ width: (width - 50) / 2, height: 30, borderRadius: 15, backgroundColor: '#f48120', marginTop: 5, marginHorizontal: 5 }}
                        >
                            <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}>ĐẶT CỌC (ĐẶT CHỖ)</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontWeight: '100', fontSize: 14, textAlign: 'center', color: '#005b92', paddingTop: 5, fontStyle: 'italic' }}>
                        Diện tích sàn 85.91 m2 (diện tích thông thủy)
                    </Text>
                    <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
                        {/* <View
                            style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderStyle: 'dotted',
                                borderBottomColor: '#959595',
                                marginBottom: 10
                            }}
                        >
                            <Text style={{ fontSize: 14, paddingLeft: 5 }}>Giá tiền</Text>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, paddingLeft: 5 }}>{apartment.price}</Text>
                                <Text style={{ fontSize: 14, paddingLeft: 5, fontStyle: 'italic', fontWeight: '600' }}>m2</Text>
                            </View>
                        </View> */}
                        <View
                            style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderStyle: 'dotted',
                                borderBottomColor: '#959595',
                                marginBottom: 10
                            }}
                        >
                            <Text style={{ fontSize: 14 }}>Diện tích</Text>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>{apartment.area}</Text>
                                <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: '600' }}>m2</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderStyle: 'dotted',
                                borderBottomColor: '#959595',
                                marginBottom: 10
                            }}
                        >
                            <Text style={{ fontSize: 14 }}>Số phòng ngủ</Text>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>{apartment.bedroom}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderStyle: 'dotted',
                                borderBottomColor: '#959595',
                                marginBottom: 10
                            }}
                        >
                            <Text style={{ fontSize: 14 }}>Hướng</Text>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>{apartment.direction.description}</Text>
                            </View>
                        </View>
                        {apartment.room.map(item => (
                            <View
                                key={item.area}
                                style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderStyle: 'dotted',
                                    borderBottomColor: '#959595',
                                    marginBottom: 10
                                }}
                            >
                                <Text style={{ fontSize: 14 }}>{TYPE_ROOM[item.type]}</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14 }}>{item.area}</Text>
                                    <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: '600' }}>m2</Text>
                                </View>
                            </View>
                        ))}
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>Phối cảnh 3D</Text>
                        <ScrollView horizontal style={{ flexDirection: 'row' }}>
                            {apartment.image_3d.map(image => (
                                <TouchableOpacity key={image} onPress={this.onDisplayImage.bind(this, '3d')}>
                                    <Image source={{ uri: `${BASE_URL}${image}` }} style={{ width: width - 50, height: ((width - 50) / 337) * 367 }} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={{ fontSize: 14, color: '#000', fontWeight: '400' }}>Vị trí căn hộ</Text>
                        <TouchableOpacity onPress={this.onDisplayImage.bind(this, 'position')} style={{ justifyContent: 'center' }}>
                            <Image source={{ uri: `${BASE_URL}${apartment.position_apartment}` }} style={{ width: width - 50, height: ((width - 50) / 337) * 367 }} />
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


                    {/* <Text style={{ fontSize: 12, paddingLeft: 5 }}>Diện tích: {apartment.area} m2</Text>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}>Hướng {apartment.direction.description}</Text>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}>Số phòng ngủ: {apartment.bedroom}</Text>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}>Diện tích tim tường: {apartment.build_area} m2</Text>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}>Diện tích thông thủy: {apartment.live_area} m2</Text>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}>Hướng ban công</Text>
                    {apartment.balcony.map(item => (
                        <Text key={item} style={{ fontSize: 12, paddingLeft: 5 }}>{item}</Text>
                    ))} */}

                </ScrollView>
                <ModalRN
                    isVisible={this.state.isModalVisible}
                    // animationInTiming='1500'
                    onSwipe={() => this.setState({ isModalVisible: false })}
                    swipeDirection="left"
                >
                    {/* <View style={{ height: height / 3.5, backgroundColor: '#1f7eb8', borderRadius: 15 }}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: '600' }}>LOCK CĂN HỘ</Text>
                            <Text style={{ color: '#fff' }}>Căn hộ sẽ được khóa trong 120 phút và thông báo với giám đốc dự án.
                        Căn hộ sẽ được mở sau thời gian trên nếu không hoàn tất thủ tục thanh toán.</Text>
                            <Text style={{ color: '#fff' }}>Bạn có chắc muốn khóa căn hộ này không?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                                <TouchableOpacity
                                    // onPress={this.onLockApartment.bind(this)}
                                    onPress={this._toggleModal}
                                    style={{ width: (width - 100) / 2, height: 30, borderRadius: 15, backgroundColor: '#f48120', marginHorizontal: 5 }}
                                >
                                    <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}>XÁC NHẬN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this._toggleModal}
                                    style={{ width: (width - 100) / 2, height: 30, borderRadius: 15, backgroundColor: '#f48120', marginHorizontal: 5 }}
                                >
                                    <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> */}

                    <View style={{ borderRadius: 15 }}>
                        <View style={{ backgroundColor: '#F58319', height: 50, borderTopLeftRadius: 15, borderTopRightRadius: 15, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: '600' }}>LOCK CĂN HỘ</Text>
                        </View>
                        <View style={{ padding: 10, backgroundColor: '#fff', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                            <Text style={{ color: '#666' }}>Căn hộ sẽ được khóa trong 120 phút và thông báo với giám đốc dự án.
                        Căn hộ sẽ được mở sau thời gian trên nếu không hoàn tất thủ tục thanh toán.</Text>
                            <Text style={{ color: '#666' }}>Bạn có chắc muốn khóa căn hộ này không?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20, bottom: 0 }}>
                                <TouchableOpacity
                                    // onPress={this.onLockApartment.bind(this)}
                                    onPress={this._toggleModal}
                                    style={{ width: (width - 100) / 2, height: 30, borderRadius: 15, backgroundColor: '#f48120', marginHorizontal: 5 }}
                                >
                                    <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}>XÁC NHẬN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this._toggleModal}
                                    style={{ width: (width - 100) / 2, height: 30, borderRadius: 15, backgroundColor: '#1f7eb8', marginHorizontal: 5 }}
                                >
                                    <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 5, color: '#fff' }}>HỦY</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ModalRN>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
    },
});
