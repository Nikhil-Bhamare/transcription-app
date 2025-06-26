import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "../tailwind";
import { useAuthStore } from "../store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileScreen = () => {
  const { logout } = useAuthStore();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("user_email");
      setEmail(storedEmail);
    };
    fetchUserEmail();
  }, []);

  const handleLogOut = () => {
    logout();
  };

  return (
    <View style={tw`flex-1 bg-gray-100 px-6 pt-12`}>
      <View style={tw`bg-white rounded-xl p-6 shadow-md`}>
        <Text style={tw`text-xl font-bold mb-2`}>Profile</Text>
        <Text style={tw`text-base text-gray-700 mb-1`}>
          Email:{" "}
          <Text style={tw`font-medium text-black`}>{email ?? "N/A"}</Text>
        </Text>
        <Text style={tw`text-sm text-gray-500 mb-6`}>
          Logged in as a clinic user
        </Text>

        <TouchableOpacity
          onPress={handleLogOut}
          style={tw`bg-red-500 py-3 rounded-lg items-center`}
        >
          <Text style={tw`text-white text-base font-semibold`}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
