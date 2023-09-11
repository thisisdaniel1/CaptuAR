import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, PLatform } from "react-native";
import MapView, {Polyline, Circle} from "react-native-maps";
import * as Location from "expo-location";

const HomeScreen = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      // if user has not granted permission, skip
      if (status !== "granted"){
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg){
    text = errorMsg;
  }
  else if (location){
    
    const {coords} = location;
    const {latitude, longitude} = coords;

    // console.log(latitude);
    // console.log(longitude);
    // console.log(coords);
    // text = JSON.stringify(location);
  }

  return  <View style={styles.container}>
      <MapView 
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
      >
        <Circle
          center={{
            latitude: latitude,
            longitude: longitude,}}
            radius={200}
            strokeColor="rgba(158,158,255,1.0)"
            fillColor="rgba(158,158,255,0.3)"
        />
      </MapView>
    </View>
    // <View>
    //   <Text>{text}</Text>
    // </View>
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });

export default HomeScreen;
