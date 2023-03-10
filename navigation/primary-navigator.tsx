/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { LoginScreen } from "../screens"

export type PrimaryParamList = {
  loginScreen: undefined
}

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator(props) {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="loginScreen">

      <Stack.Screen name="loginScreen" component={LoginScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  )
}
