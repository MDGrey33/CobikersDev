import React, { Component } from 'react';

import {
    View,
    Text,
    AppRegistry
} from 'react-native';

import MapContainer from './Containers/MapContainer.js';
//import Orientation from 'react-native-orientation';
//import codePush from "react-native-code-push";

import Remote from './Remote';

class App extends Component {

    constructor(props) {

        console.disableYellowBox = true;

        super(props);

        this.state = {
            pins: {},
        }

        this.remote = new Remote((key, location, distance) => this.addNewPins(key, location, distance));

    }

    componentWillMount() {

        //this.current_orientation = Orientation.getInitialOrientation();

    }

    addNewPins(key, location, distance) {

        var timestamp = key.split("_")[1];
        var type = key.split("_")[0];
        var pins = this.state.pins;
        pins[key] = {
            latitude: location[0],
            longitude: location[1],
            type: type,
        }
        
        this.setState({
            pins: pins,
        });

    }


    _orientationDidChange(orientation) {
        /*
        if (this.current_orientation != orientation) {
            codePush.restartApp();
        }
        */

    }

    componentDidMount() {

        //Orientation.addOrientationListener(this._orientationDidChange.bind(this));

        navigator.geolocation.getCurrentPosition(
            (position) => {

                var location = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    timestamp: position.timestamp,
                }

                this.remote.setInitialLocation(location);

            },
            (error) => false,
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        setInterval(() => {
            this.updateLocation();
        }, 1500);

    }

    updateLocation() {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                var location = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    timestamp: position.timestamp,
                }

                this.remote.updateQueryLocation(location);

            },
            (error) => false,
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    }

    render() {

        return (
            <View>
                <MapContainer pins={this.state.pins} remote={this.remote} />
            </View>
        );

    }

}

module.exports = App;