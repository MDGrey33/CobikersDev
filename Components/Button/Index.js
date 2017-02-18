import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const { BlurView } = require('react-native-blur');

import Icon from 'react-native-vector-icons/Ionicons';

export default class Button extends Component {

    constructor(props) {

        super(props);

    }

    onPress() {

        if (this.props.onPress) {

            this.props.onPress();

        }

    }

    render() {

        return (
            <View style={this.props.style}>
                <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer} onPress={() => this.onPress()}>
                    <BlurView blurType="dark" blurAmount={5} style={styles.blur}>
                        <Icon style={styles.icon} name={this.props.icon} size={55} color="white" />
                    </BlurView>
                </TouchableOpacity>
            </View>
        );

    }

}

var styles = StyleSheet.create({
    buttonContainer: {
        width: 80,
        height: 80,
        borderRadius: 5,
        justifyContent: "center",
        margin: 5,
        marginBottom:10,
    },
    text: {
        fontSize: 12,
        backgroundColor: "transparent",
        color: "white",
        alignSelf: "center",
    },
    icon: {
        alignSelf: "center",
    },
    blur: {
        width: 80,
        height: 80,
        borderRadius:5,
        justifyContent: "center",
    }
});
