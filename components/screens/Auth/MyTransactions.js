import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Switch,
    Button,
    Badge
} from 'native-base';
import Header from '../Home/Header';
import { loading } from '../../../Helpers';
import styles from './../../../styles';

export default class MyTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 1000);
    }
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header navigation={this.props.navigation} title='LỊCH SỬ GIAO DỊCH' back={'ok'} />
                <Content>
                    <ListItem icon style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('DetailTransactionScreen');
                                }}
                            >
                                <Text>A0502 - ROMAN PLAZA</Text>
                                <Text note numberOfLines={1}>16:00 05-12/2018</Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <Badge success>
                                <Text>Đặt cọc</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Text>A0502 - ROMAN PLAZA</Text>
                            <Text note numberOfLines={1}>16:00 05-12/2018</Text>
                        </Body>
                        <Right>
                            <Badge success>
                                <Text>Đặt cọc</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Text>A0502 - ROMAN PLAZA</Text>
                            <Text note numberOfLines={1}>16:00 05-12/2018</Text>
                        </Body>
                        <Right>
                            <Badge success>
                                <Text>Đặt cọc</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Text>A0502 - ROMAN PLAZA</Text>
                            <Text note numberOfLines={1}>16:00 05-12/2018</Text>
                        </Body>
                        <Right>
                            <Badge success>
                                <Text>Đặt cọc</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Text>A0502 - ROMAN PLAZA</Text>
                            <Text note numberOfLines={1}>16:00 05-12/2018</Text>
                        </Body>
                        <Right>
                            <Badge success>
                                <Text>Đặt cọc</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Text>A0502 - ROMAN PLAZA</Text>
                            <Text note numberOfLines={1}>16:00 05-12/2018</Text>
                        </Body>
                        <Right>
                            <Badge success>
                                <Text>Đặt cọc</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Text>A0502 - ROMAN PLAZA</Text>
                            <Text note numberOfLines={1}>16:00 05-12/2018</Text>
                        </Body>
                        <Right>
                            <Badge success>
                                <Text>Đặt cọc</Text>
                            </Badge>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Text>A0502 - ROMAN PLAZA</Text>
                            <Text note numberOfLines={1}>16:00 05-12/2018</Text>
                        </Body>
                        <Right>
                            <Badge success>
                                <Text>Đặt cọc</Text>
                            </Badge>
                        </Right>
                    </ListItem>

                </Content>
            </Container>
        );
    }
}
