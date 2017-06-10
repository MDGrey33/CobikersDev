import * as firebase from 'firebase';

import GeoFire from 'geofire';

const firebaseConfig = {
    apiKey: "AIzaSyApsJN0568NxFfJSoR-ySNe1nCIUlaIPtE",
    authDomain: "cobikerdev.firebaseapp.com",
    databaseURL: "https://cobikerdev.firebaseio.com",
    storageBucket: "cobikerdev.appspot.com",
    messagingSenderId: "207559563521"
};

import Sound from 'react-native-sound';

import _ from "lodash"

const firebaseApp = firebase.initializeApp(firebaseConfig);

const radius = 11;

//6 hours to delete a pin
const TIMEOUT_RADAR = 24 * 3600000;//24 hours
const TIMEOUT_POLICE = 4 * 3600000;//4 hours
const SIREN_TIMEOUT = 10 * 10000; //10 seconds
class Remote {

    constructor(onEntered = null) {

        //Init firebase
        this.firebaseRef = firebaseApp.database().ref();

        //Init geofire
        this.geoFire = new GeoFire(this.firebaseRef);
        this.geoRef = this.geoFire.ref();  // ref === firebaseRef

        //Init geoQuery
        this.geoQuery = null;

        //Initialize the callback for data updates to the views
        this.onEntered = onEntered;

        //Create the sound file
        this.siren = new Sound('siren.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + this.siren.getDuration() + 'number of channels: ' + this.siren.getNumberOfChannels());
        });
        //This is needed to check if the pin that has just entered was just placed by the same user
        this.last_insert_time = 0;


    }

    //Initializes the geo query data
    setInitialLocation(location) {

        this.geoQuery = this.geoFire.query({
            center: [location.lat, location.long],
            radius: radius
        });

        this.onKeyEnteredRegistration = this.geoQuery.on("key_entered", (key, location, distance) => {
            //console.log(key + " entered query at " + location + " (" + distance + " km from center)");
            console.warn("Key enetered!!!!")

            var now = new Date();
            // Play the sound with an onEnd callback
            if (now > this.last_insert_time) {
                this.siren.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }

            this.updateVisiblePins(key, location, distance);

        });

    }

    updateQueryLocation(location) {


        if (location && _.get(this, "geoQuery.updateCriteria", false)) {
            this.geoQuery.updateCriteria({
                center: [location.lat, location.long],
                radius: radius
            });
        }


    }

    updateVisiblePins(key, location, distance) {

        var timestamp = key.split("_")[1];
        var type = key.split("_")[0]
        if (this.isPinOld(timestamp, type)) {

            this.removePins(key);

        } else {

            if (this.onEntered) {
                this.onEntered(key, location, distance);
            } else {
                console.warn("No onEntered callback found!");
            }

        }

    }

    //Saves a pin
    setPins(location, type) {

        var timestamp = type + "_" + location.timestamp;
        timestamp = timestamp.toString();
        timestamp = timestamp.substring(0, timestamp.indexOf('.'));

        this.last_insert_time = (new Date()) + SIREN_TIMEOUT;

        this.geoFire.set(timestamp, [location.lat, location.long]).then(() => {
            console.log("Provided key has been added to GeoFire");
        }, (error) => {
            console.log("Error: " + error);
        });

    }

    //Checks if the pin has timed out 
    isPinOld(key, type) {

        var now = new Date();

        return now.getTime() - key > (type == "radar" ? TIMEOUT_RADAR : TIMEOUT_POLICE);

    }

    //Removes an old pin so others won't see it
    removePins(key) {

        this.geoFire.remove(key).then(() => {
            console.log("Provided key has been removed from GeoFire");
        }, (error) => {
            console.log("Error: " + error);
        });

    }

}

module.exports = Remote;