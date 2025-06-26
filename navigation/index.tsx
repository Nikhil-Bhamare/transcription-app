import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ScheduleAppointmentScreen } from "../screens/ScheduleAppointmentScreen";
import { AppointmentDetailScreen } from "../screens/AppointmentDetailScreen";
import BottomTabs from "./BottomTabs";
import { AudioTranscription } from "../screens/AudioTranscription";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types"; // adjust the path as needed
import AuthScreen from "../screens/AuthScreen";
import { useAuthStore } from "../store/useAuthStore";
import { ActivityIndicator, View } from "react-native";
import tw from "../tailwind";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isLoggedIn, checkLoginStatus } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Run once on mount to check AsyncStorage
    checkLoginStatus().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#2462eb" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            <Stack.Screen
              name="ScheduleAppointment"
              component={ScheduleAppointmentScreen}
            />
            <Stack.Screen
              name="AppointmentDetail"
              component={AppointmentDetailScreen}
            />
            <Stack.Screen
              name="AudioTranscription"
              component={AudioTranscription}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
