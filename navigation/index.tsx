import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { OTPScreen } from "../screens/OTPScreen";
import { ScheduleAppointmentScreen } from "../screens/ScheduleAppointmentScreen";
import { AppointmentDetailScreen } from "../screens/AppointmentDetailScreen";
import BottomTabs from "./BottomTabs";
import { ScrollView } from "react-native-gesture-handler";
import tw from "../tailwind";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen
          name="ScheduleAppointment"
          component={ScheduleAppointmentScreen}
        />
        <Stack.Screen
          name="AppointmentDetail"
          component={AppointmentDetailScreen}
        />
        {/* <Stack.Screen
          name="LiveTranscription"
          component={LiveTranscriptionScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
