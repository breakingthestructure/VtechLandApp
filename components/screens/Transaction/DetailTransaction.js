import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import { Icon } from 'native-base';
import Header from '../Home/Header';
import styles from './../../../styles';
import { loading } from '../../../Helpers';

export default class DetailTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            phone: '',
            identity: '',
            day_identity: '',
            where_identity: '',
            loaded: false,
            txtMoney: ''
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.setState({ loaded: true });
    }
    handleBackPress = () => { //eslint-disable-line
        this.props.navigation.navigate('TablePackageScreen');
        return true;
    }
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} title='CHI TIẾT GIAO DỊCH' back={'ok'} />
                <ScrollView style={styles.content}>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>MÃ GD</Text>
                        <Text style={{ fontSize: 14 }}>A0502</Text>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>GIAO DỊCH</Text>
                        <Text style={{ fontSize: 14 }}>Đặt cọc</Text>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>Mã SP</Text>
                        <Text style={{ fontSize: 14 }}>30</Text>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>DỰ ÁN</Text>
                        <Text style={{ fontSize: 14 }}>Roman Plaza</Text>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>KHÁCH HÀNG</Text>
                        <Text style={{ fontSize: 14 }}>Nguyễn Huy Tuân</Text>
                    </View>
                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>THỜI GIAN</Text>
                        <Text style={{ fontSize: 14 }}>16:00 15-12-2018</Text>
                    </View>

                    <View
                        style={styles.lineInfo}
                    >
                        <Text style={{ fontSize: 14 }}>GIÁ TRỊ GIAO DỊCH</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14 }}>20</Text>
                            <Text style={{ fontSize: 14 }}> triệu</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.bigBtnBackIcon}
                        onPress={() => this.props.navigation.pop()}
                    >
                        <Icon type="FontAwesome" name='mail-reply' style={styles.iconBigBtn} />
                        <Text style={styles.textBtnIcon}>
                        QUAY LẠI
                            </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.bigBtn}
                    >
                        <Text style={styles.textBtnActive}>
                            QUAY LẠI
                        </Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View >
        );
    }
}
