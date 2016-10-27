import React, {Component} from 'react';

import {
    View,
    Text
} from 'react-native';

import MapContainer from './Containers/MapContainer.js';

class App extends Component {

    constructor(props){

        super(props);

    }

    render(){

        return(
            <View>
                <MapContainer />
            </View>
        );

    }

}

module.exports = App;