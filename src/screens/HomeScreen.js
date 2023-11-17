import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import Map from "./components/Map";
// import { Context as LocationContext } from "../context/LocationContext";
import "./_mockLocation";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

const HomeScreen = () => {

  // const {addLocation} = useContext(LocationContext);
  const [err, setErr] = useState(null);

  const startWatching = async () => {
    try{
      const { granted } = await requestForegroundPermissionsAsync();
      

      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        // updates either every 10 meters or every 1 second
        timeInterval: 1000,
        distanceInterval: 10
        // second argument is a callback function
      }, (location) => {
        // console.log(location);
        addLocation(location);
      })


      if (!granted) {
        throw new Error("Location permission not granted");
      }
    }
    // stores error message into err
    catch(e){
      console.log("threw error e is "+ e);
      setErr(e);
    }
  };

  // gets called the first time this component is displayed
  useEffect(() => {
    startWatching();
  }, [])

    return  <View>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
    </View>
  };

  const styles = StyleSheet.create({
  });

export default HomeScreen;
