import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import tw from "../tailwind";

const Tab = createBottomTabNavigator();

import { Feather, Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Platform } from "react-native";

export const tabBarIcons = {
  Home: ({ color, size }: any) => (
    <Ionicons name="home-outline" size={size} color={color} />
  ),
  History: ({ color, size }: any) => (
    <Feather name="clock" size={size} color={color} />
  ),
  Profile: ({ color, size }: any) => (
    <FontAwesome6 name="user-circle" size={size} color={color} />
  ),
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const IconComponent =
            tabBarIcons[route.name as keyof typeof tabBarIcons];
          return IconComponent ? IconComponent({ color, size }) : null;
        },
        tabBarLabelStyle: tw`text-xs`,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          height: Platform.OS === "android" ? 70 : 80,
          paddingBottom: Platform.OS === "android" ? 12 : 24,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#2462eb",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarLabel: "History" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
