import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import tw from "../tailwind";
import Button from "../components/Button";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import GenderDropdown from "../components/GenderDropdown";
import { Feather } from "@expo/vector-icons";

export const ScheduleAppointmentScreen = () => {
  const [patientName, setPatientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const navigation = useNavigation();

  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
    if (selectedDate) setDate(selectedDate);
    setShowDate(false);
  };

  const handleTimeChange = (_: any, selectedTime: Date | undefined) => {
    if (selectedTime)
      setDate((prev) => {
        const newDate = new Date(prev);
        newDate.setHours(selectedTime.getHours());
        newDate.setMinutes(selectedTime.getMinutes());
        return newDate;
      });
    setShowTime(false);
  };

  const formatDate = (d: Date) =>
    `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;

  const formatTime = (d: Date) =>
    `${d.getHours() % 12 || 12}:${d.getMinutes().toString().padStart(2, "0")} ${
      d.getHours() >= 12 ? "PM" : "AM"
    }`;

  const handleSubmit = () => {
    if (patientName && contactNumber && age && gender) {
      // API call or state update here
      navigation.navigate("AppointmentDetail" as never);
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#fbfaf5]`}>
      <ScrollView contentContainerStyle={tw`p-6 pb-16`}>
        <BackButton />
        <Text style={tw`text-2xl font-bold mb-6`}>Schedule Appointment</Text>

        <Text style={tw`mb-1 text-base font-semibold`}>Patient Name *</Text>
        <TextInput
          value={patientName}
          onChangeText={setPatientName}
          style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`}
          placeholder="Enter patient name"
        />

        <Text style={tw`mb-1 text-base font-semibold`}>Contact Number *</Text>
        <TextInput
          value={contactNumber}
          onChangeText={setContactNumber}
          style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
        />

        <View style={tw`flex-row gap-4 mb-4`}>
          <View style={tw`flex-1`}>
            <Text style={tw`mb-1 text-base font-semibold`}>Age *</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              style={tw`border border-gray-300 rounded-lg p-3 bg-white`}
              placeholder="Enter age"
              keyboardType="numeric"
            />
          </View>
          <View style={tw`flex-1`}>
            <GenderDropdown value={gender} onChange={setGender} />
          </View>
        </View>

        <View style={tw`flex-row gap-4 mb-4`}>
          <View style={tw`flex-1 mb-4`}>
            <Text style={tw`mb-1 text-base font-semibold`}>Date *</Text>

            <TouchableOpacity
              onPress={() => setShowDate(true)}
              style={tw`border border-gray-300 rounded-lg p-3 bg-white flex-row items-center justify-between`}
            >
              <Text style={tw`text-base text-gray-800`}>
                {date ? formatDate(date) : "Select date"}
              </Text>
              <Feather name="calendar" size={20} color="#888" />
            </TouchableOpacity>

            {showDate && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={tw`flex-1 mb-4`}>
            <Text style={tw`mb-1 text-base font-semibold`}>Time Slot *</Text>

            <TouchableOpacity
              onPress={() => setShowTime(true)}
              style={tw`border border-gray-300 rounded-lg p-3 bg-white flex-row items-center justify-between`}
            >
              <Text style={tw`text-base text-gray-800`}>
                {date ? formatTime(date) : "Select time"}
              </Text>
              <Feather name="clock" size={20} color="#888" />
            </TouchableOpacity>

            {showTime && (
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
        </View>

        <View>
          <Text style={tw`mb-1 text-base font-semibold`}>Description *</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholder="Add description"
            style={[
              tw`border border-gray-300 rounded-lg p-3 bg-white text-base`,
              { minHeight: 100, textAlignVertical: "top" }, // acts like textarea
            ]}
          />
        </View>
        <View style={tw`mt-12 text-base font-semibold`}>
          <Button title="Schedule Appointment" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
