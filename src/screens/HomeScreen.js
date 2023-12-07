import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import * as Location from "expo-location"
import geolib from "geolib"
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
          // addLocation(location);
        }
      )
    }
    
    // stores error message into err
    catch(e){
      console.log("threw error e is "+ e);
      setErr(e);
    }
  }

  const checkGeofence = () => {
    const isInside = geolib.isPointWithinRadius(
      { latitude: mapRegion.latitude, longitude: mapRegion.longitude },
      { latitude: targetCircle.center.latitude, longitude: targetCircle.center.longitude },
      targetCircle.radius // radius of target circle
    )

    if (isInside){
      console.log("Inside the geofence")
    }
    else{
      console.log("Outside")
    }
  }

  useEffect(() => {
    startWatching()

    const intervalID = setInterval(() => {
      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitude: prevRegion.latitude,
        longitude: prevRegion.longitude
      }))
    }, 5000)

    setTargetCircle({
      center: {
        latitude: mapRegion.latitude + 0.005,
        longitude: mapRegion.longitude + 0.005,
      },
      radius: 2,
    })

    console.log("Initial Target: ", targetCircle)

    return () => clearInterval(intervalID)
  }, []);





  useEffect(() => {
    console.log("Map Region", mapRegion)
    console.log("Target: ", targetCircle)
    // startWatching();
  }, [mapRegion])


  

    return  <View style={styles.container}>
      <MapView style={styles.map}
        region={mapRegion}
      >
        <Marker 
          coordinate={mapRegion}
          title="Marker">
              <Image source={DanielImage} style={{ width: 50, height: 50, borderRadius: 25 }} />
        </Marker>
        <Circle center={mapRegion} radius={5} />
        <Circle center={targetCircle.center} radius={targetCircle.radius} fillColor="rgba(255, 0, 0, 0.5)" />
      </MapView>

      <Button title="Start Watching" onPress={startWatching} />
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Button title="Check Geoforce" onPress={checkGeofence} />
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
