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
        this.geoRef = geoFire.ref();  // ref === firebaseRef

    }

    setPins(location){

        this.geoFire.set("some_key", [loaction.long, long.lat]).then(() => {
            console.log("Provided key has been added to GeoFire");
        }, (error) => {
            console.log("Error: " + error);
        });

    }

    getPins(){

        this.geoFire.get("some_key").then((location) => {
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