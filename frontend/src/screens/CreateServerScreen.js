import { View, StyleSheet } from "react-native";
import { Text, Input, Button, Slider, Icon } from 'react-native-elements'
import { Dropdown } from "react-native-element-dropdown";
import { useState } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";

const map = [
  { label: "UNO Map", value: '1' },
  { label: "UNO Map #2", value: '2' }
];

const CreateServerScreen = () => {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);

  const [numPlayers, setNumPlayers] = useState(2);
  const [numTeams, setNumTeams] = useState(2);

  return <View style={styles.view}>
    <Input
      label="Server Name" />
    <Text h9>Select Map</Text>
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={map}
      value={value}
      labelField="label"
      valueField="value"
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }} />
    <Text h9>Set Number Of Players: {numPlayers}</Text>
    <Slider 
      value={numPlayers} 
      thumbTouchSize={{width: 2, height:2}} 
      thumbTintColor="#1976d2" 
      minimumValue={2} 
      maximumValue={10} 
      step={1}
      onValueChange={(value) => setNumPlayers(value)}/>

    <Text h9>Set Number Of Teams: {numTeams}</Text>
    <Slider 
      value={numTeams} 
      thumbTouchSize={{width: 2, height:2}} 
      thumbTintColor="#1976d2" 
      minimumValue={2} 
      maximumValue={6} 
      step={1}
      onValueChange={(value) => setNumTeams(value)}/>
    <View style={styles.container}>
      <View>
            <Text h9>Server Type </Text>
      </View>
    <TouchableOpacity style={styles.touchable} title="Private" onPress={() => setIsPrivate(!isPrivate)}><Icon color={isPrivate ? "red" : "green"} size={28} name={isPrivate ? "lock" : "lock-open"}/><Text>{isPrivate ? "Private" : "Public"}</Text></TouchableOpacity>
    </View>

    <Button style={styles.button} title="Create Server" onPress={ () => {alert("Could not implement :(")}}/>


  </View>
};

const styles = StyleSheet.create({
  view: {
    margin: 15
  },
  h3: {
    marginBottom: 50,
    textAlign: "center"
  },
  h9: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
  },
  dropdown: {
    height: 50,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
   container: {
    flexDirection: 'row',
    marginTop: 20, // Adjust as needed
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchable: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
})

export default CreateServerScreen;
