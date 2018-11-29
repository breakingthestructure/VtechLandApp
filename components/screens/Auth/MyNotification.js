import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import Header from './../Home/Header';

export default class MyNotification extends Component {
    render() {
        return (
            <Container>
                <Header navigation={this.props.navigation} title='Thông báo của tôi' />
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left style={{ marginTop: 10 }}>
                                <Icon active name='ios-alert' style={{ color: 'orange', fontSize: 20 }} />
                            </Left>
                            <Body>
                                <Text>Roman Plaza</Text>
                                <Text note>Đổ trần vào ngày 22/12</Text>
                            </Body>
                            <Right>
                                <Text note>8:00 am</Text>
                            </Right>
                        </ListItem>
                        
                        <ListItem avatar>
                            <Left style={{ marginTop: 10 }}>
                                <Icon active name='ios-alert' style={{ color: 'orange', fontSize: 20 }} />
                            </Left>
                            <Body>
                                <Text>HPC LandMark 51</Text>
                                <Text note>Mở bán đợt 1 vào ngày mai</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        
                        <ListItem avatar>
                            <Left style={{ marginTop: 10 }}>
                                <Icon active name='ios-alert' style={{ color: 'orange', fontSize: 20 }} />
                            </Left>
                            <Body>
                                <Text>The Phoenix Garden</Text>
                                <Text note>Sự kiện giới thiệu nhà mẫu</Text>
                            </Body>
                            <Right>
                                <Text note>2:00 pm</Text>
                            </Right>
                        </ListItem>
                        
                        <ListItem avatar>
                            <Left style={{ marginTop: 10 }}>
                                <Icon active name='ios-alert' style={{ color: 'orange', fontSize: 20 }} />
                            </Left>
                            <Body>
                                <Text>The Pride Hải Phát</Text>
                                <Text note>Gala cuối năm vào ngày 25/12/2018</Text>
                            </Body>
                            <Right>
                                <Text note>8:00 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}