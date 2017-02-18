import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Map from '../Components/Map';

import Button from '../Components/Button';

class MapContainer extends Component {

    constructor(props) {

        super(props);

        console.log("test");
    }

    addPolice() {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                var location = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    timestamp: position.timestamp,
                }

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

                this.props.remote.setPins(location, "radar");
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    }
    render() {

        return (
            <View style={styles.content}>
                <Map
                    provider="google"
                    mapType="hybrid"
                    style={styles.map}
                    pins={this.props.pins} />

                <View style={styles.buttonContainer}>
                    <Button icon={"md-camera"} title={"SPEED CAM"} onPress={() => this.addRadar()} style={styles.radarButton} />
                    <Button icon={"ios-hand"} title={"CHECKPOINT"} onPress={() => this.addPolice()} style={styles.policeButton} />
                </View>
            </View>
        );

    }

}

/*
    
        */
var styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor:"#FFFFFFAA",
        position: "absolute",
        flexDirection:"row",
        right: 20,
        bottom: -5,
        padding:5,
        borderRadius: 5,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:"#AAAAAADD",
        shadowColor: "black",
        shadowOffset: {
            width:2,
            height:2,
        },
        shadowOpacity:0.2,
        shadowRadius:2,  
    },
    content: {
        flex: 1,
    },

});

module.exports = MapContainer;