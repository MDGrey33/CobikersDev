import React,{Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import _ from 'lodash';

import MapView from 'react-native-maps';

import {PROVIDER_DEFAULT} from 'react-native-maps';

var policeIcon = require("../../Images/police.png");

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends Component{

    constructor(props){

        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        };
    }

    componentDidMount() {

    }

    renderPins(pins){

        var data = [];

        _.forIn(pins, (value,key) => {
            
            data.push(
                <MapView.Marker 
                    title={"Police"}
                    image={policeIcon}
                    coordinate={value}
                    flat={true}
                    identifier={key}
                    style={{width:30,height:30}}
                    key={key}
                />
            )
        });

        return data;

    }

    render(){

        return(
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_DEFAULT}
                    style={styles.map}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    rotateEnabled={true}
                    showsCompass={true}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    showsMyLocationButton={true}

                >
                {this.renderPins(this.props.pins)}
                </MapView>
            </View>
        );

    }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    width: width,
    height: height,
  },
});

module.exports = Map;