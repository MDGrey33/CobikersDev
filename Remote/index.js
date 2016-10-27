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

const radius = 11;

class Remote {

    constructor(onEntered = null){
        
        //Init firebase
        this.firebaseRef = firebaseApp.database().ref();

        //Init geofire
        this.geoFire = new GeoFire(this.firebaseRef);
        this.geoRef = this.geoFire.ref();  // ref === firebaseRef

        //Init geoQuery
        this.geoQuery = null;

        //Initialize the callback for data updates to the views
        this.onEntered = onEntered;

    }

    //Initializes the geo query data
    setInitialLocation(location){

        this.geoQuery = this.geoFire.query({
            center: [location.lat, location.long],
            radius: radius
        });

        this.onKeyEnteredRegistration = this.geoQuery.on("key_entered", (key, location, distance) => {
            //console.log(key + " entered query at " + location + " (" + distance + " km from center)");
            this.updateVisiblePins(key, location, distance);

        });

    }

    updateQueryLocation(location){

        this.geoQuery.updateCriteria({
            center: [location.lat, location.long],
            radius: radius
        });


    }

    updateVisiblePins(key, location, distance){

        if(this.onEntered){
            this.onEntered(key, location, distance);
        }else{
            console.warn("No onEntered callback found!");
        }

    }

    //Saves a pin
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

}

module.exports = Remote;