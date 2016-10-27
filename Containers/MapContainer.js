import React,{Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Map from '../Components/Map';

class MapContainer extends Component{

    constructor(props){

        super(props);

    }

    render(){

        return(
            <View style={styles.content}>
                <Map />
            </View>
        );

    }

}

var styles = StyleSheet.create({
    content: {
        
    }
});

module.exports = MapContainer;