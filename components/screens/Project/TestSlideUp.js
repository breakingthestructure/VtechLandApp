import React from 'react';
import { View, TextInput, Animated, TouchableHighlight, Text, StyleSheet } from 'react-native';
import Header from './../Home/Header';

let isHidden = true;
export default class GoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(100),  //This is the initial position of the subview
            buttonText: 'Show Subview'
        };
    }

    _toggleSubview() {
        this.setState({
            buttonText: !isHidden ? 'Show Subview' : 'Hide Subview'
        });

        let toValue = 100;

        if (isHidden) {
            toValue = 0;
        }

        //This will animate the transalteY of the subview between 0 & 100 depending on its current state
        //100 comes from the style below, which is the height of the subview.
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();

        isHidden = !isHidden;
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={() => { this._toggleSubview() }}>
                    <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                </TouchableHighlight>
                <Animated.View
                    style={[styles.subView,
                    { transform: [{ translateY: this.state.bounceValue }] }]}
                >
                    <Text>This is a sub view</Text>
                </Animated.View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 66
    },
    button: {
        padding: 8,
    },
    buttonText: {
        fontSize: 17,
        color: '#007AFF'
    },
    subView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        height: 100,
    }
});
