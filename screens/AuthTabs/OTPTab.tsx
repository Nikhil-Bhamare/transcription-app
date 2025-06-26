// screens/AuthTabs/OTPTab.tsx
import React, { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import tw from "../../tailwind";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";

const OTPTab = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [showTimer, setShowTimer] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const navigation = useNavigation();
  const { setLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!showTimer || timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [showTimer, timer]);

  const formatTimer = (sec: number) => `00:${sec < 10 ? `0${sec}` : sec}`;

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const complete = newOtp.every((digit) => digit !== "");
    if (complete) {
      handleSubmit(newOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const handleResend = () => {
    setShowTimer(true);
    setTimer(60);
    Alert.alert("OTP Resent", "A new OTP has been sent to your email.");
  };

  const handleSubmit = (currentOtp: string[]) => {
    if (currentOtp.join("").length === 4) {
      setLoggedIn(true);
    }
  };

  return (
    <View>
      <Text style={tw`text-lg font-semibold mb-2`}>Verify your email</Text>
      <Text style={tw`text-sm text-gray-500 mb-6`}>
        Insert the code we sent to your registered e-mail
      </Text>

      <View style={tw`flex-row justify-between mb-6`}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            maxLength={1}
            keyboardType="number-pad"
            style={tw`w-14 h-14 text-center border border-gray-300 rounded-lg text-lg`}
          />
        ))}
      </View>

      <View style={tw`flex-row mb-8`}>
        <Text style={tw`text-gray-500 mr-2`}>Didn’t get the code yet?</Text>
        <TouchableOpacity
          onPress={handleResend}
          disabled={showTimer && timer > 0}
        >
          <Text style={tw`text-blue-600 font-semibold`}>
            Resend Code{showTimer && `: ${formatTimer(timer)}`}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => handleSubmit(otp)}
        style={tw`bg-[#2563EB] py-4 rounded-xl items-center mb-4`}
      >
        <Text style={tw`text-white font-semibold text-base`}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPTab;
