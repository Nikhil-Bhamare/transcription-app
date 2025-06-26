import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "../tailwind";
import UploadRecordingModal from "../components/UploadRecordingModal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types"; // update path as needed
import BackButton from "../components/BackButton";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AppointmentDetail"
>;

export const AppointmentDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#fbfaf5]`}>
      <ScrollView contentContainerStyle={tw`p-6 py-20`}>
        <BackButton />
        <Text style={tw`text-xl font-bold mb-4`}>View Appointment Details</Text>
        {/* Buttons */}
        <View style={tw`flex-row justify-between mb-4`}>
          <TouchableOpacity
            style={tw`flex-1 mr-2 bg-blue-600 py-3 rounded-lg items-center`}
            onPress={() => setModalVisible(true)}
          >
            <Text style={tw`text-white font-semibold text-sm`}>
              Upload Recording
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 ml-2 bg-blue-600 py-3 rounded-lg items-center`}
            onPress={() => navigation.navigate("LiveTranscription" as never)}
          >
            <Text style={tw`text-white font-semibold text-sm`}>
              Start Recording
            </Text>
          </TouchableOpacity>
        </View>

        {/* Appointment Details */}
        <View style={tw`bg-white rounded-2xl p-4 border border-gray-200`}>
          <View style={tw`flex-row justify-between mb-1`}>
            <Text style={tw`text-gray-600 text-sm`}>
              Scheduled on: 15/06/25
            </Text>
            <Text style={tw`text-gray-600 text-sm`}>Time: 12:00 PM</Text>
          </View>
          {/* Status */}
          <View style={tw`flex-row justify-between my-4`}>
            <Text style={tw`text-gray-500 text-sm mb-1`}>Status</Text>
            <View
              style={tw`bg-green-600 px-3 py-1 rounded-full flex-row items-center self-start`}
            >
              <View style={tw`w-2 h-2 rounded-full bg-white mr-2`} />
              <Text style={tw`text-white text-sm`}>Active</Text>
            </View>
          </View>
          {/* Patient Details */}
          <Text style={tw`font-bold text-base mb-2`}>Patient Details</Text>
          <Text style={tw`text-gray-800 text-sm mb-1`}>
            <Text style={tw`font-semibold`}>Patient Name:</Text> Unknown User
          </Text>
          <Text style={tw`text-gray-800 text-sm mb-1`}>
            <Text style={tw`font-semibold`}>Contact Number:</Text> +91
            8899277284
          </Text>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-800 text-sm`}>
              <Text style={tw`font-semibold`}>Age:</Text> 26
            </Text>
            <Text style={tw`text-gray-800 text-sm`}>
              <Text style={tw`font-semibold`}>Gender:</Text> Male
            </Text>
          </View>
          {/* Description */}
          <Text style={tw`font-semibold text-sm mb-1`}>Description:</Text>
          <Text style={tw`text-gray-700 text-sm`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </Text>
        </View>

        {/* Back to home */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs" as never)}
          style={tw`mt-8 items-center`}
        >
          <Text style={tw`text-blue-600 text-sm underline`}>
            Return to homescreen
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Upload modal */}
      <UploadRecordingModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onUploadSuccess={(fileUri) => {
          navigation.navigate("AudioTranscription", { fileUri });
        }}
      />
    </SafeAreaView>
  );
};
