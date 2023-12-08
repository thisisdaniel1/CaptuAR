import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import {Context as AuthContext} from '../context/AuthContext'

const LoginScreen = (props) => {

    const {state, login, clearErrorMessage} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <View style={styles.view}>
        <NavigationEvents>
            onWillFocus-{() => {clearErrorMessage()}}
        </NavigationEvents>
        <Text h3 style={styles.h3}>CaptuAR Login</Text>
        <Input
            autoCapitalize='none'
            autoCorrect={false}
            value={email}
            onChangeText={(newEmail) => setEmail(newEmail)}
            label="Email" />
        {/* <Input
            autoCapitalize='none'
            autoCorrect={false}
            value={username}
            onChangeText={(newUsername) => setUsername(newUsername)}
            label="Username" /> */}
        <Input
            secureTextEntry={true}
            autoCapitalize='none'
            autoCorrect={false}
            value={password}
            onChangeText={(newPassword) => setPassword(newPassword)}
            label="Password" />
        {console.log(state.errorMessage)}
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        <Button title="Login" onPress={
            () => login({email, password})
        } />

        <View>
            <Text h9 style={styles.h9}>Don't have an account?</Text>
            <Button title="Register" onPress={() => props.navigation.pop()} />
        </View>

    </View>
}

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

    }

})

export default LoginScreen;