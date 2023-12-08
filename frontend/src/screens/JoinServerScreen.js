import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Icon, Text } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";

const dummyData = [
  {
    serverName: "Max's Server",
    isPrivate: false,
    map: "UNO Map",
    maxPlayers: 10,
    playerCount: 5,
    id: 214124,
  }, {
    serverName: "CTF Fun",
    isPrivate: true,
    map: "UNO Map #2",
    maxPlayers: 10,
    playerCount: 2,
    id: 21415,
  },
  {
    serverName: "Coolest Server",
    isPrivate: false,
    map: "French Quarter Map",
    maxPlayers: 10,
    playerCount: 9,
    id: 215914,
  },

  {
    serverName: "Random Server",
    isPrivate: false,
    map: "Tulane Map",
    maxPlayers: 10,
    playerCount: 10,
    id: 514124,
  },

]
const JoinServerScreen = () => {

  return <ScrollView>
    <View style={styles.servers}>
      <TouchableOpacity style={styles.touchable}><Icon name="refresh" size={40}/></TouchableOpacity>
      {dummyData.map((server) => {
        return <Card key={server.id}>
          <Card.Title>
            {server.serverName}
          </Card.Title>
          <View style={styles.container}>
            {server.isPrivate ? <View style={styles.container}><Icon name="lock" color="red" /><Text>Private</Text></View> : <View style={styles.container}><Icon name="lock-open" color="green" /><Text>Public</Text></View>}
            <Text>{server.map}</Text>
            <Text h4>{server.playerCount} / {server.maxPlayers}</Text>
          </View>

          <Button title="Join Server" disabled={server.isPrivate || server.maxPlayers <= server.playerCount} onPress={() => {alert("Couldn't implement :(")}}/>
        </Card>
      })}
    </View>
  </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchable: {
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
})


export default JoinServerScreen;
