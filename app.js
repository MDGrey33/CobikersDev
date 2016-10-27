import React, {Component} from 'react';

import {
    View,
    Text
} from 'react-native';

import MapContainer from './Containers/MapContainer.js';

import Remote from './Remote';

class App extends Component {

    constructor(props){

        super(props);

        this.remote = new Remote();

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