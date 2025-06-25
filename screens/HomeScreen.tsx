import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "../tailwind";
import { useNavigation } from "@react-navigation/native";

const mockAppointments = [
  {
    id: "1",
    name: "Unknown User",
    phone: "+91 8899277284",
    status: "Active",
    date: "15/06/2025",
    time: "10:00 AM",
  },
  {
    id: "2",
    name: "Unknown User",
    phone: "+91 8899277284",
    status: "Active",
    date: "15/06/2025",
    time: "10:00 AM",
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => (
    <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm`}>
      <Text style={tw`text-lg font-semibold mb-1`}>{item.name}</Text>
      <Text style={tw`text-sm text-gray-600`}>{item.phone}</Text>
      <Text style={tw`text-sm text-green-600 font-semibold mt-1`}>
        Status: {item.status}
      </Text>
      <Text style={tw`text-sm text-gray-700 mt-1`}>
        Date: {item.date} | Time: {item.time}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("AppointmentDetail" as never)}
        style={tw`mt-3 bg-blue-500 py-2 px-4 rounded-lg self-start`}
      >
        <Text style={tw`text-white font-medium`}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100 py-8`}>
      <View style={tw`px-6 pt-6 flex-1`}>
        <Text style={tw`text-2xl font-bold mb-1`}>Welcome, Dr. Olivia</Text>

        <TextInput
          placeholder="Search patient name"
          style={tw`bg-white mt-4 mb-4 p-3 rounded-lg border border-gray-300`}
        />

        <View style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={tw`text-lg font-semibold`}>Appointment Management</Text>
          <TouchableOpacity
            style={tw`bg-green-600 px-4 py-2 rounded-lg`}
            onPress={() => navigation.navigate("ScheduleAppointment" as never)}
          >
            <Text style={tw`text-white font-semibold`}>Schedule</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={tw`pb-16`}
        />
      </View>
    </SafeAreaView>
  );
};
