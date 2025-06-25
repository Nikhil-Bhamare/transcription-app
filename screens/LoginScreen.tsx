import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Button from "../components/Button";
import tw from "../tailwind";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleNext = () => {
    if (email.includes("@")) {
      navigation.navigate("OTP" as never);
    } else {
      alert("Please enter a valid email.");
    }
    
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex-1 px-6 justify-center`}>
        <Text style={tw`text-2xl font-bold mb-2`}>Login to your account</Text>
        <Text style={tw`text-base text-gray-500 mb-6`}>
          Sign in-up to enjoy the best managing experience
        </Text>

        <InputField
          label="Email"
          placeholder="Enter email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button title="Next" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};
