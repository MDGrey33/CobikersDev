import * as firebase from 'firebase';

import GeoFire from 'geofire';

const firebaseConfig = {
    apiKey: "AIzaSyApsJN0568NxFfJSoR-ySNe1nCIUlaIPtE",
    authDomain: "cobikerdev.firebaseapp.com",
    databaseURL: "https://cobikerdev.firebaseio.com",
    storageBucket: "cobikerdev.appspot.com",
    messagingSenderId: "207559563521"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Remote {

    constructor(){
        
        //Init firebase
        this.firebaseRef = firebaseApp.database().ref();

        //Init geofire
        this.geoFire = new GeoFire(this.firebaseRef);
        this.geoRef = this.geoFire.ref();  // ref === firebaseRef

    }

    setPins(location){

        var timestamp = location.timestamp;
        timestamp = timestamp.toString();
        timestamp = timestamp.substring(0, timestamp.indexOf('.'));

        this.geoFire.set(timestamp, [location.lat, location.long]).then(() => {
            console.log("Provided key has been added to GeoFire");
        }, (error) => {
            console.log("Error: " + error);
        });

    }

    getPins(){

        this.geoFire.get("police").then((location) => {
            if (location === null) {
                console.log("Provided key is not in GeoFire");
            }
            else {
                console.log("Provided key has a location of " + location);
            }
            }, (error) => {
            console.log("Error: " + error);
        });
    }

}

module.exports = Remote;