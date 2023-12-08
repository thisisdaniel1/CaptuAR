
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import CreateServerScreen from "./src/screens/CreateServerScreen";
import JoinServerScreen from "./src/screens/JoinServerScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from "./src/navigationRef";
import { Provider as LocationProvider } from "./src/context/LocationContext";



const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Register: RegisterScreen,
    Login: LoginScreen,
  }),
  mainFlow: createMaterialTopTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          title: 'Home', // Title for the HomeScreen
        },
      },
      CreateServer: {
        screen: CreateServerScreen,
        navigationOptions: {
          title: 'Create Server', // Title for the CreateServerScreen
        },
      },
      JoinServer: {
        screen: JoinServerScreen,
        navigationOptions: {
          title: 'Join Server', // Title for the JoinServerScreen
        },
      },
    },
    {
      tabBarOptions: {
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
      },
      style: {
        marginTop: 50, // Adjust the value based on your preference
      },
    }
  ),
});
const AppContainer = createAppContainer(switchNavigator)

const App = () => (
  <SafeAreaProvider>
    <AuthProvider>
      <LocationProvider>
        <AppContainer ref={(navigator) => { setNavigator(navigator) }} />
      </LocationProvider>
    </AuthProvider>
  </SafeAreaProvider>
)

export default App;

