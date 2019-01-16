import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import icCalendar from './../../../icons/calendar.png';
import {
    dataNotFound,
    loading,
} from '../../../Helpers';
import getBuildings from '../../../api/getBuildings';
import { Toast } from "native-base";

const { width, height } = Dimensions.get('window');

export default class ActionProject extends React.Component {
    _keyExtractor = (item, index) => index; //eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            buildings: []
        };
    }

    componentDidMount() {
        const { project } = this.props;
        // const project = navigation.getParam('project', null);
        if (project) {
            getBuildings(project.id)
                .then(resJson => {
                    this.setState({
                        loaded: true
                    });
                    if (resJson.status === 200) {
                        this.setState({
                            buildings: resJson.data,
                        });
                    }
                })
                .catch(err => console.log(err));
        } else {
            return Toast.show({
                text: 'Không có dữ liệu',
                type: 'danger',
                buttonText: 'Xác nhận'
            });
        }
    }

    render() {
        const { navigation, project } = this.props;
        const { buildings } = this.state;
        if (!this.state.loaded || !this.props.navigation) {
            return loading();
        }
        if (buildings.length <= 0) {
            return dataNotFound();
        }
        const arrBuilding = Object.keys(buildings).map((item) => {
            return { key: item, value: buildings[item] };
        });
        return (
            <View style={styles.wrapper}>
                <Text
                    style={{
                        fontWeight: '600',
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#053654',
                        paddingTop: 10
                    }}
                >
                    Danh sách bảng hàng
                </Text>
                <View>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            width: '100%',
                            alignItems: 'center',
                        }}
                        data={arrBuilding}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item}
                                style={{
                                    width: width / 2.5,
                                    borderColor: '#33563743',
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    height: height / 5,
                                    justifyContent: 'center',
                                    margin: 15,
                                }}
                                onPress={() => navigation.navigate('TablePackageScreen', {
                                    project,
                                    buildingId: item.key,
                                    buildingName: item.value
                                })}
                            >
                                <View style={{ paddingVertical: 5 }}>
                                    <Image
                                        source={icCalendar}
                                        style={{ width: 30, height: 30 }}
                                    />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.btnTextAction}>{item.value}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
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
