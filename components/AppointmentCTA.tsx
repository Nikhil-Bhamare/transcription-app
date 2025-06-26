import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";

const AppointmentCTA = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#2563EB", "#1E40AF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={tw`flex-row rounded-2xl my-2 p-1 items-center`}
    >
      <View
        style={[
          tw`flex-row rounded-xl p-4 items-center`,
          {
            backgroundColor: "#1D4ED8",
          },
        ]}
      >
        {/* Doctor Image */}
        <Image
          source={require("../assets/doctorImg.png")}
          style={tw`w-22 h-36 rounded-lg mr-4`}
          resizeMode="cover"
        />

        {/* Text and Button */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-white text-[13px] font-bold`}>
            Appointment Management
          </Text>
          <Text style={tw`text-white text-[12px] my-4`}>
            Assign time slots and manage appointments easily.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ScheduleAppointment" as never)}
            style={tw`bg-white rounded-md px-3 py-2 self-start`}
          >
            <Text style={tw`text-blue-600 font-semibold text-sm`}>
              Schedule Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AppointmentCTA;
