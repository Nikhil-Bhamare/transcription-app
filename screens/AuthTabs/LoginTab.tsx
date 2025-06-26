// screens/AuthTabs/LoginTab.tsx
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, Alert, View } from "react-native";
import tw from "../../tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  onSuccess: () => void;
}

const mockUser = { email: "demo@clinic.com" };

const LoginTab: React.FC<Props> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");

  const handleNext = async () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    if (email.toLowerCase() !== mockUser.email) {
      Alert.alert("Login Failed", "No such user found");
      return;
    }

    try {
      await AsyncStorage.setItem("user_email", email);
      onSuccess();
    } catch (e) {
      Alert.alert("Storage Error", "Failed to save login state");
    }
  };

  return (
    <View>
      <Text style={tw`text-base font-bold mb-2`}>
        Enter your email address to proceed
      </Text>

      <Text style={tw`text-sm font-semibold mb-1 mt-4`}>
        Email <Text style={tw`text-[#5031e8]`}>*</Text>
      </Text>

      <TextInput
        placeholder="Enter email address"
        placeholderTextColor="#707580"
        style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base mb-6`}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handleNext}
        style={tw`bg-[#2462eb] py-4 rounded-xl items-center mt-[25px] mb-4`}
      >
        <Text style={tw`text-white font-semibold text-base`}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginTab;
