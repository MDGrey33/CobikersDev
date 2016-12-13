import React,{Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Map from '../Components/Map';

import Button from '../Components/Button';

class MapContainer extends Component{

    constructor(props){

        super(props);

        console.log("test");
    }

    addPolice(){

        navigator.geolocation.getCurrentPosition(
        (position) => {
            
            var location = {
                lat:position.coords.latitude,
                long:position.coords.longitude,
                timestamp:position.timestamp,
            }
            
            this.props.remote.setPins(location);
        },
        (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

    }

    render(){

        return(
            <View style={styles.content}>
                <Map 
                    provider="google" 
                    mapType="hybrid"
                    style={styles.map} 
                    pins={this.props.pins}/>
                <Button title={"POLICE"} onPress={() => this.addPolice()} style={styles.policeButton} />
            </View>
        );

    }

}

var styles = StyleSheet.create({
    policeButton: {
        position:"absolute",
        bottom:20,
        right:20,
    },
    content: {
        flex:1,
    },

});

module.exports = MapContainer;