import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import saveToken from './../../../api/saveToken';
import GLOBAL from './../../../Globals';
import SignOut from './SignOut';
import SignIn from './SignIn';
import getUser from './../../../api/getUser';
import { loading } from '../../../Helpers';
import styles from './../../../styles';

export default class RightMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }
    async componentDidMount() {
        getUser()
            .then(user => {
                GLOBAL.user = user;
                this.setState({ loaded: true });
            });
    }
    render() {
        if (!this.state.loaded) {
            return loading();
        }
        const mainJSX = !GLOBAL.user ? <SignIn navigation={this.props.navigation} /> : <SignOut navigation={this.props.navigation} />;
        return (
            <View style={styles.menu}>
                {mainJSX}
            </View>
        );

    }
}
