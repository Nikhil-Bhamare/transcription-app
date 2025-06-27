import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";

const AppointmentCTA = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#1D4ED8", "#2563EB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={tw`flex-row rounded-xl px-4 py-5 my-4 items-center`}
    >
      {/* Doctor Image */}
      <Image
        source={require("../assets/doctorImg.png")}
        style={tw`w-22 h-36 rounded-lg mr-4`}
        resizeMode="cover"
      />

      {/* Text and Button */}
      <View style={tw`ml-2 flex-1`}>
        <Text style={tw`text-white text-[13px] font-bold`}>
          Appointment Management
        </Text>
        <Text style={tw`text-white text-[12px] my-2 leading-tight`}>
          Assign time slots and manage appointments easily.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ScheduleAppointment" as never)}
          style={tw`bg-white rounded-md px-4 py-2 mt-2 self-start`}
        >
          <Text style={tw`text-blue-600 font-semibold text-[10px]`}>
            Schedule Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AppointmentCTA;
