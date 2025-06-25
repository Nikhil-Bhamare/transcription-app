import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import tw from "../tailwind";
import Button from "../components/Button";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

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
      alert("Appointment scheduled!");
      navigation.navigate("AppointmentDetail" as never);
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView contentContainerStyle={tw`p-6 pb-16`}>
        <Text style={tw`text-2xl font-bold mb-6`}>Schedule Appointment</Text>

        <Text style={tw`mb-1`}>Patient Name *</Text>
        <TextInput
          value={patientName}
          onChangeText={setPatientName}
          style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`}
          placeholder="Enter patient name"
        />

        <Text style={tw`mb-1`}>Contact Number *</Text>
        <TextInput
          value={contactNumber}
          onChangeText={setContactNumber}
          style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
        />

        <Text style={tw`mb-1`}>Age *</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`}
          placeholder="Enter age"
          keyboardType="numeric"
        />

        <Text style={tw`mb-1`}>Gender *</Text>
        <RNPickerSelect
          onValueChange={setGender}
          items={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          placeholder={{ label: "Select gender", value: "" }}
          style={{
            inputIOS: tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`,
            inputAndroid: tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`,
          }}
          value={gender}
        />

        <Text style={tw`mb-1`}>Date *</Text>
        <TextInput
          value={formatDate(date)}
          onFocus={() => setShowDate(true)}
          style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`}
        />
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={tw`mb-1`}>Time Slot *</Text>
        <TextInput
          value={formatTime(date)}
          onFocus={() => setShowTime(true)}
          style={tw`border border-gray-300 rounded-lg p-3 bg-white mb-4`}
        />
        {showTime && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <Text style={tw`mb-1`}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={tw`border border-gray-300 rounded-lg p-3 bg-white text-base`}
          placeholder="Add description"
        />

        <Button title="Schedule Appointment" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};
