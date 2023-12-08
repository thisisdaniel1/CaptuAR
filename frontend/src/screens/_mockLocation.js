import * as Location from "expo-location";

// represents approximately 10 meters in lat or long
const tenMetersWithDegrees = 0.0001;

const getLocation = (increment) => {
    // return an object with all the normal props of a location
    return {
        timestamp: 100000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            longitude: -90.0680 + increment * tenMetersWithDegrees,
            latitude: 30.0273 + increment * tenMetersWithDegrees
        }
    };
};

let counter = 0;
// two arguments: one is a function to execute every interval
// and two is a the number of milliseconds between each interval
setInterval(() => {
    Location.EventEmitter.emit("Expo.LocationChanged", {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000);