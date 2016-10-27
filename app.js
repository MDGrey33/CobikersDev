import React, {Component} from 'react';

import {
    View,
    Text
} from 'react-native';

import MapContainer from './Containers/MapContainer.js';

import Remote from './Remote';

class App extends Component {

    constructor(props){

        console.disableYellowBox = true;

        super(props);

        this.state = {
            pins:{},
        }

        this.remote = new Remote((key, location, distance) => this.addNewPins(key, location, distance));
    
    }

    addNewPins(key, location, distance){
   
        var pins = this.state.pins;
        pins[key] = {
            latitude: location[0],
            longitude: location[1],
        }
        this.setState({
            pins:pins,
        });

    }

    componentDidMount(){

        navigator.geolocation.getCurrentPosition(
        (position) => {

            var location = {
                lat:position.coords.latitude,
                long:position.coords.longitude,
                timestamp:position.timestamp,
            }

            this.remote.setInitialLocation(location);

        },
        (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        setInterval(() => {
             this.updateLocation();
        }, 1500);

    }

    updateLocation(){

        navigator.geolocation.getCurrentPosition(
        (position) => {

            var location = {
                lat:position.coords.latitude,
                long:position.coords.longitude,
                timestamp:position.timestamp,
            }

            this.remote.updateQueryLocation(location);

        },
        (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

    }

    render(){

        return(
            <View>
                <MapContainer pins={this.state.pins} remote={this.remote} />
            </View>
        );

    }

}

module.exports = App;