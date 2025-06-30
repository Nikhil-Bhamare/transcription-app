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
      style={tw`flex-row rounded-xl my-2 items-center`}
    >
      {/* Doctor Image */}
      <Image
        source={require("../assets/Doctor1.png")}
        style={tw`w-28 h-36 rounded-lg mr-4`}
        resizeMode="cover"
      />

      {/* Text and Button */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-white text-md font-bold`}>
          Appointment Management
        </Text>
        <Text style={tw`text-white text-xs my-2 leading-tight`}>
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
