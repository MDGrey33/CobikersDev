import React, { Component } from 'react';

import {
    View,
    Text,
    Animated,
    StyleSheet,
} from 'react-native';

import Map from '../Components/Map';

import Button from '../Components/Button';

class MapContainer extends Component {

    constructor(props) {

        super(props);

        this.state = {
            following: true,
            recenter_bottom: new Animated.Value(-100),
        }

    }

    addPolice() {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                var location = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    timestamp: position.timestamp,
                }

                this.reCenter();
                this.props.remote.setPins(location, "police");
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    }

    addRadar() {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                var location = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    timestamp: position.timestamp,
                }

                this.reCenter();
                this.props.remote.setPins(location, "radar");
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    }

    onLocationChange(data) {
        
        if (this.state.following) {
            this.setState({ following: false, });
            this.animateRecenter(true);
        }

    }

    reCenter() {

        this.setState({ following: true,});)
        this._map.animateToCoordinate()
        this.animateRecenter(false);

    }

    animateRecenter(open) {
        Animated.timing(
            this.state.recenter_bottom,
            { toValue: open ? -5 : -100 }
        ).start();
    }

    render() {

        return (
            <View style={styles.content}>
                <Map
                    ref={(x) => this._map = x}
                    provider="google"
                    mapType="hybrid"
                    following={this.state.following}
                    onLocationChange={(data) => this.onLocationChange(data)}
                    style={styles.map}
                    pins={this.props.pins} />

                <Animated.View style={[styles.recenterContainer, {
                    bottom: this.state.recenter_bottom,
                }]}>
                    <Button icon={"ios-locate-outline"} title={"RECENTER"} onPress={() => this.reCenter()} style={styles.radarButton} />
                </Animated.View>

                <View style={styles.buttonContainer}>
                    <Button icon={"md-camera"} title={"SPEED CAM"} onPress={() => this.addRadar()} style={styles.radarButton} />
                    <Button icon={"ios-hand"} title={"CHECKPOINT"} onPress={() => this.addPolice()} style={styles.policeButton} />
                </View>
            </View>
        );

    }

}

var styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#FFFFFFAA",
        position: "absolute",
        flexDirection: "row",
        right: 20,
        bottom: -5,
        padding: 5,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#AAAAAADD",
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    recenterContainer: {
        backgroundColor: "#FFFFFFAA",
        position: "absolute",
        flexDirection: "row",
        left: 20,
        padding: 5,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#AAAAAADD",
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    content: {
        flex: 1,
    },

});

module.exports = MapContainer;