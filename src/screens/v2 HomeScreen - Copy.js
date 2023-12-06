import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
// import "./_mockLocation";
import * as Location from "expo-location"
import MapView, {Marker, Circle} from "react-native-maps";

import DanielImage from "../../assets/daniel.jpg"

const HomeScreen = () => {

  // const {addLocation, state: {currentLocation}} = useContext(LocationContext);
  const [err, setErr] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001
  })

  const [targetCircle, setTargetCircle] = useState({
    center: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    radius: 2
  })

  const startWatching = async () => {
    try{
      const { granted } = await Location.requestForegroundPermissionsAsync();
      
      if (!granted) {
        throw new Error("Location permission not granted");
      }

      
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          // updates either every 10 meters or every 1 second
          timeInterval: 1000,
          distanceInterval: 10
          // second argument is a callback function
        },
        (location) => {
          setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001
          })
          console.log(mapRegion)
          // addLocation(location);
        }
      )
    }
    
    // stores error message into err
    catch(e){
      console.log("threw error e is "+ e);
      setErr(e);
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  }

  const checkCirclesOverlap = () => {
    // calculate the distance between the centers of the two circles
    const distance = getDistance(
      mapRegion.latitude,
      mapRegion.longitude,
      targetCircle.center.latitude,
      targetCircle.center.longitude
    )

    const minDistanceForOverlap = targetCircle.radius + 5

    if (distance < minDistanceForOverlap){
      console.log("Circles are overlapping")
    }
    else{
      console.log("Circles are not overlapping")
    }
  }

  // gets called the first time this component is displayed
  useEffect(() => {
    startWatching();

    // Set initial targetCircle when the component mounts
    setTargetCircle({
      center: {
        latitude: mapRegion.latitude + 0.005,
        longitude: mapRegion.longitude + 0.005,
      },
      radius: 2,
    });
    console.log("Target: ", targetCircle)
  }, []);

  useEffect(() => {
    startWatching();

    checkCirclesOverlap();
  }, [mapRegion])

    return  <View style={styles.container}>
      <MapView style={styles.map}
        region={mapRegion}
      >
        <Marker 
          coordinate={mapRegion}
          title="Marker"
        >
          <Image source={DanielImage} style={{ width: 50, height: 50, borderRadius: 25 }} />
        </Marker>
        <Circle center={mapRegion} radius={5} />
        <Circle center={targetCircle.center} radius={targetCircle.radius} fillColor="rgba(255, 0, 0, 0.5)" />
      </MapView>

      <Button title="Start Watching" onPress={startWatching} />
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Button title="Check Overlap" onPress={checkCirclesOverlap} />
      {/* {err ? <Text>Please enable location services</Text> : null} */}
    </View>
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      height: 300
    },
  });

export default HomeScreen;
