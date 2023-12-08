import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import * as Location from "expo-location"
import * as geolib from "geolib"
import MapView, {Marker, Circle} from "react-native-maps";

import DanielImage from "../../assets/daniel.jpg"

const HomeScreen = () => {

  // const {addLocation, state: {currentLocation}} = useContext(LocationContext);

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

  /*
  i realized from the video that I did not need default values
  Those default values you see above were meant for when the map first displays
  it displays with a circle for the player and a circle for the target red circle

  BUT I could have just included a tertiary conditional to not display the circles ie have it be null
  in cases where mapRegion or targetCircle were undefined

  const [mapRegion, setMapRegion] = useState({})

  const [targetCircle, setTargetCircle] = useState({})
  */

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

          if (targetCircle.center.latitude === 37.78825 && targetCircle.center.longitude === -122.4324){
            setTargetCircle({
              center: {
                latitude: location.coords.latitude + 0.00005,
                longitude: location.coords.longitude + 0.00005
              },
              radius: 2
            })
          }
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
      { latitude: 29.8978225, longitude: -90.0646274 },
      { latitude: 29.8978673, longitude: -90.0646157 },
      targetCircle.radius
    )

    if (isInside){
      console.log("Inside the geofence")
    }
    else{
      console.log("Outside")
    }
  }


  const setPosition = () => {
    console.log("setting position")
  }


  const guessPosition = () => {
    console.log("guessing position")

    if (mapRegion.latitude){

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

    console.log("Initial Target: ", targetCircle)

    return () => clearInterval(intervalID)
  }, []);



  useEffect(() => {
    console.log("Hider Position", mapRegion)
    console.log("Guess: ", targetCircle)
    // startWatching();
  }, [mapRegion])


  

    return  <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        /*
        how the seeker would set where he/she thinks the hider is hiding

        onPress={e => {
          console.log(e.nativeEvent.coordinate)
          setTargetCircle(e.nativeEvent.coordinate)
        }}
        */
      >
        {/* {mapRegion !== undefined ? ( */}
          <Marker 
            coordinate={mapRegion}
            title="Hider"
          >
            <Image
              source={DanielImage}
              style={{ width: 50, height: 50, borderRadius: 25 }} 
            />
          </Marker>
        {/* ) : null} */}
        <Circle center={mapRegion} radius={5} />
        

        {/* {targetCircle !== undefined ? ( */}
          <Circle coordinate={targetCircle}></Circle>
        {/* ) : null} */}
      </MapView>

      <Button title="Set position" onPress={setPosition} />
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      <Button title="Confirm guess" onPress={guessPosition} />
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
