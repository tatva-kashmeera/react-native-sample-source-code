/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { PrimaryNavigator } from "./primary-navigator"

export type RootParamList = {
  primaryStack: undefined
}

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        stackPresentation: "modal",
      }}
      initialRouteName={"primaryStack"}
    >
      <Stack.Screen
        name="primaryStack"
        options={{
          headerShown: false,
        }}>
        {() => PrimaryNavigator(props)}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack {...props} />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
