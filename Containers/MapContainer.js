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

    }

    render(){

        return(
            <View style={styles.content}>
                <Map />
                <Button title={"POLICE"} style={styles.policeButton} />
            </View>
        );

    }

}

var styles = StyleSheet.create({
    policeButton: {
        position:"absolute",
        bottom:20,
        right:20,
    }
});

module.exports = MapContainer;