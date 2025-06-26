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
import { RootStackParamList } from "../navigation/types"; // adjust path if needed
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ScheduleAppointment"
>;

export const AppointmentDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100 pt-6`}>
      <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
        <Text style={tw`text-xl font-bold mb-4`}>View Appointment Details</Text>

        <View style={tw`bg-white rounded-xl p-4 mb-4 shadow`}>
          <Text style={tw`text-gray-700 mb-1`}>
            <Text style={tw`font-semibold`}>Scheduled on:</Text> 15/06/25
          </Text>
          <Text style={tw`text-gray-700 mb-2`}>
            <Text style={tw`font-semibold`}>Time:</Text> 12:00 PM
          </Text>
          <Text style={tw`text-green-600 font-medium`}>Status: Active</Text>
        </View>

        <View style={tw`bg-white rounded-xl p-4 shadow`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Patient Details</Text>
          <Text style={tw`text-gray-700`}>Name: Unknown User</Text>
          <Text style={tw`text-gray-700`}>Contact: +91 8899277284</Text>
          <Text style={tw`text-gray-700`}>Age: 26</Text>
          <Text style={tw`text-gray-700 mb-2`}>Gender: Male</Text>

          <Text style={tw`text-gray-700 font-medium`}>Description:</Text>
          <Text style={tw`text-gray-600 mt-1`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>

        <View style={tw`mt-6`}>
          <TouchableOpacity
            style={tw`bg-blue-500 py-3 rounded-xl items-center mb-4`}
            onPress={() => navigation.navigate("LiveTranscription" as never)}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              Start Recording
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-purple-500 py-3 rounded-xl items-center`}
            onPress={() => setModalVisible(true)}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              Upload Recording
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={tw`mt-8 items-center`}
          onPress={() => navigation.navigate("MainTabs" as never)}
        >
          <Text style={tw`text-blue-600 font-medium`}>
            Return to homescreen
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
