import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import tw from '../tailwind';
import { useNavigation } from '@react-navigation/native';

export const AppointmentDetailScreen = () => {
  const navigation = useNavigation();

  const handleUploadRecording = () => {
    Alert.alert('Upload Recording', 'Simulating upload modal...');
    // In real app, open modal or file picker
  };

  const handleStartRecording = () => {
    navigation.navigate('LiveTranscription' as never);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
        <Text style={tw`text-xl font-bold mb-4`}>View Appointment Details</Text>

        {/* Appointment Info */}
        <View style={tw`bg-white rounded-xl p-4 mb-4 shadow`}>
          <Text style={tw`text-gray-700 mb-1`}>
            <Text style={tw`font-semibold`}>Scheduled on:</Text> 15/06/25
          </Text>
          <Text style={tw`text-gray-700 mb-2`}>
            <Text style={tw`font-semibold`}>Time:</Text> 12:00 PM
          </Text>
          <Text style={tw`text-green-600 font-medium`}>Status: Active</Text>
        </View>

        {/* Patient Info */}
        <View style={tw`bg-white rounded-xl p-4 shadow`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Patient Details</Text>
          <Text style={tw`text-gray-700`}>Name: Unknown User</Text>
          <Text style={tw`text-gray-700`}>Contact: +91 8899277284</Text>
          <Text style={tw`text-gray-700`}>Age: 26</Text>
          <Text style={tw`text-gray-700 mb-2`}>Gender: Male</Text>

          <Text style={tw`text-gray-700 font-medium`}>Description:</Text>
          <Text style={tw`text-gray-600 mt-1`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={tw`mt-6`}>
          <TouchableOpacity
            style={tw`bg-blue-500 py-3 rounded-xl items-center mb-4`}
            onPress={handleStartRecording}
          >
            <Text style={tw`text-white font-semibold text-base`}>Start Recording</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-purple-500 py-3 rounded-xl items-center`}
            onPress={handleUploadRecording}
          >
            <Text style={tw`text-white font-semibold text-base`}>Upload Recording</Text>
          </TouchableOpacity>
        </View>

        {/* Return Link */}
        <TouchableOpacity
          style={tw`mt-8 items-center`}
          onPress={() => navigation.navigate('Home' as never)}
        >
          <Text style={tw`text-blue-600 font-medium`}>Return to homescreen</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
