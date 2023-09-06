import React, { useContext } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, {Polyline, Circle} from "react-native-maps";

const HomeScreen = () => {

  return <View style={styles.container}>
        <MapView 
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
        >
          <Circle
            center={{
              latitude: 37.78825,
              longitude: -122.4324,}}
              radius={200}
              strokeColor="rgba(158,158,255,1.0)"
              fillColor="rgba(158,158,255,0.3)"
          />
        </MapView>
      </View>
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
