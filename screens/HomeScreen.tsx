import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from "../tailwind";
import { Feather } from "@expo/vector-icons";
import AppointmentCTA from "../components/AppointmentCTA";
import { useNavigation } from "@react-navigation/native";

const mockAppointments = [
  {
    id: "1",
    name: "Jane Smith",
    phone: "+91 9876543210",
    status: "Active",
    date: "16/06/2025",
    time: "11:30 AM",
  },
  {
    id: "2",
    name: "Unknown User",
    phone: "+91 8899277284",
    status: "Active",
    date: "15/06/2025",
    time: "10:00 AM",
  },
  {
    id: "3",
    name: "Jon Deo",
    phone: "+91 9123456789",
    status: "Cancelled",
    date: "17/06/2025",
    time: "09:00 AM",
  },
  {
    id: "4",
    name: "Dr. Alex Roy",
    phone: "+91 9988776655",
    status: "Pending",
    date: "18/06/2025",
    time: "02:15 PM",
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-600";
    case "cancelled":
      return "bg-red-600";
    case "pending":
      return "bg-yellow-500";
    case "completed":
      return "bg-blue-600";
    default:
      return "bg-gray-400";
  }
};

export const HomeScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => (
    <View style={tw`bg-white rounded-xl border border-gray-200 p-4 mb-4`}>
      <View style={tw`flex-row items-start justify-between mb-3`}>
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`w-10 h-10 rounded-full bg-blue-600 items-center justify-center mr-3`}
          >
            <Text style={tw`text-white font-semibold`}>UU</Text>
          </View>
          <View>
            <Text style={tw`text-black font-semibold text-base`}>
              {item.name}
            </Text>
            <Text style={tw`text-gray-500 text-sm`}>{item.phone}</Text>
          </View>
        </View>
        <View style={tw`w-5 h-5 rounded-md border border-gray-300`} />
      </View>

      <View style={tw`flex-row justify-between mb-4`}>
        <Text style={tw`text-gray-400 mt-1`}>Status</Text>
        <View
          style={tw`${getStatusColor(
            item.status
          )} px-3 py-1 rounded-full flex-row items-center`}
        >
          <View style={tw`w-2 h-2 rounded-full bg-white mr-2`} />
          <Text style={tw`text-white text-sm`}>{item.status}</Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between mb-3`}>
        <Text style={tw`text-gray-600 text-sm`}>Date: {item.date}</Text>
        <Text style={tw`text-gray-600 text-sm`}>Time: {item.time}</Text>
      </View>

      <View style={tw`border-t border-gray-200 pt-2 items-end`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AppointmentDetail" as never)}
        >
          <Text style={tw`text-blue-600 text-sm font-medium underline`}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-[#fbfaf5] pt-6`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={tw`px-6 pt-6 flex-1`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-xl font-bold`} numberOfLines={1}>
              Welcome, Dr. Olvia 👋
            </Text>
            <View style={tw`relative w-7 h-7 items-center justify-center`}>
              <Feather name="bell" size={28} color="#000" />
              <View
                style={tw`absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full border-2 border-white`}
              />
            </View>
          </View>

          <View
            style={tw`flex-row items-center bg-white mt-4 mb-4 p-3 rounded-lg border border-gray-300`}
          >
            <Feather name="search" size={20} color="#000" style={tw`mr-2`} />
            <TextInput
              placeholder="Search patient name"
              style={tw`flex-1 text-base text-gray-800 p-0`}
            />
          </View>

          <AppointmentCTA />

          <Text style={tw`text-xl font-bold mb-4`}>View Appointment</Text>

          <FlatList
            data={mockAppointments}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={tw`pb-24`}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
