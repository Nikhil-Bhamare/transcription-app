import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import tw from "../tailwind";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export const OTPScreen = () => {
  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(60);
  const navigation = useNavigation();

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleContinue = () => {
    if (otp.length === 6) {
      navigation.navigate("MainTabs" as never);
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      //   TODO: Call resend OTP API
      alert("OTP resent");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex-1 px-6 justify-center`}>
        <Text style={tw`text-2xl font-bold mb-2`}>Verify your email</Text>
        <Text style={tw`text-base text-gray-500 mb-6`}>
          Insert the code we sent to your registered e-mail
        </Text>

        <TextInput
          style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-white text-center text-xl tracking-widest`}
          placeholder="______"
          value={otp}
          onChangeText={setOTP}
          keyboardType="number-pad"
          maxLength={6}
        />

        <Button title="Continue" onPress={handleContinue} />

        <View style={tw`flex-row justify-center mt-4`}>
          <Text style={tw`text-gray-500 mr-1`}>Didn’t get the code yet?</Text>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
            <Text style={tw`text-blue-500 font-semibold`}>
              Resend Code: {timer < 10 ? `00:0${timer}` : `00:${timer}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
