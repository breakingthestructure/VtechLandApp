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
import { loading } from '../../../Helpers';
import getBuildings from '../../../api/getBuildings';

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
        const { navigation } = this.props;
        const project = navigation.getParam('project', null);
        getBuildings(project.id)
            .then(resJson => {
                if (resJson.status === 200) {
                    this.setState({
                        buildings: resJson.data,
                        loaded: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { navigation, project } = this.props;
        const { buildings } = this.state;
        if (!this.state.loaded || !this.props.navigation) {
            return loading();
        }
        const arrBuilding = Object.keys(buildings).map((item, index) => {
            return { key: item, value: buildings[item] };
        });
        return (
            <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
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
                                alignItems: 'center'
                            }}
                            data={arrBuilding}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.btnAction}
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
