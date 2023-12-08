import React, { useContext } from "react";
import {StyleSheet, ActivityIndicator} from "react-native";
import {Context} from "../../context/LocationContext"
import MapView, { Marker, Polyline, Circle } from "react-native-maps";

const Map = () => {

  const {state: {currentLocation}} = useContext(Context)

  console.log(currentLocation)

  if (!currentLocation){
    console.log("activity")
    return <ActivityIndicator size="large" style={{marginTop: 200}} />
  }

  // const {latitude, longitude} = currentLocation.coords;

  // let points = [];
  // for(let i = 0; i < 20; i++){
  //   points.push({
  //     latitude: 30.0273 + i * 0.001,
  //     longitude: -90.0680 + i * 0.001
  //   })
  // }

  // latitude: 30.0273,
  // longitude: -90.0680,


  return <MapView style={{height: 300}}
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        region={{
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        {/* <Polyline coordinates={points}/> */}
      </MapView>
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

export default Map;

{/* <View style={styles.container}>
      <MapView 
          style={styles.map}
          region={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005
          }}
      >
        <Circle
          center={{
            latitude: 0,
            longitude: 0,}}
            radius={10}
            strokeColor="rgba(158,158,255,1.0)"
            fillColor="rgba(158,158,255,0.3)"
        />
      </MapView>
    </View> */}