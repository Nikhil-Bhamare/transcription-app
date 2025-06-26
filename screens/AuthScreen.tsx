import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import tw from "../tailwind";
import LoginTab from "./AuthTabs/LoginTab";
import OTPTab from "./AuthTabs/OTPTab";

export const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<"login" | "otp">("login");

  return (
    <SafeAreaView style={tw`flex-1 bg-[#0B1E3D]`}>
      <View style={tw`flex-1 justify-end`}>
        <Text style={tw`text-white text-2xl font-bold px-6 mb-1`}>
          {activeTab === "login"
            ? "Login to your\naccount"
            : "Email\nVerification"}
        </Text>
        <Text style={tw`text-white text-sm px-6 mb-4 opacity-80`}>
          Sign in-up to enjoy the best managing experience
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={tw`bg-white rounded-t-[40px] pt-6 px-6 pb-12`}
      >
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={tw`flex-row bg-[#e2e8ef] rounded-full mb-6 p-2`}>
            <TouchableOpacity
              onPress={() => setActiveTab("login")}
              style={tw`flex-1 py-3 rounded-full items-center ${
                activeTab === "login" ? "bg-white shadow-md" : ""
              }`}
            >
              <Text
                style={tw`text-base font-semibold ${
                  activeTab === "login" ? "text-black" : "text-gray-400"
                }`}
              >
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("otp")}
              disabled
              style={tw`flex-1 py-3 rounded-full items-center ${
                activeTab === "otp" ? "bg-white shadow-md" : ""
              }`}
            >
              <Text
                style={tw`text-base font-semibold ${
                  activeTab === "otp" ? "text-black" : "text-gray-400"
                }`}
              >
                OTP
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "login" ? (
            <LoginTab onSuccess={() => setActiveTab("otp")} />
          ) : (
            <OTPTab />
          )}
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;
