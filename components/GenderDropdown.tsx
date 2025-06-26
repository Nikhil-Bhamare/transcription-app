// GenderDropdown.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export default function GenderDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const getLabel = (val: string) =>
    genderOptions.find((item) => item.value === val)?.label || "";

  return (
    <View style={tw`mb-4`}>
      <Text style={tw`mb-1 text-base font-semibold`}>Gender *</Text>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={tw`border border-gray-300 rounded-lg p-2.7 bg-white flex-row justify-between items-center`}
      >
        <Text style={tw`text-gray-600`}>
          {getLabel(value) || "Select gender"}
        </Text>
        <Feather name="chevron-down" size={20} color="#999" />
      </TouchableOpacity>

      <Modal transparent visible={showModal} animationType="fade">
        <Pressable
          onPress={() => setShowModal(false)}
          style={tw`flex-1 justify-center bg-black/40`}
        >
          <View style={tw`mx-6 bg-white rounded-lg p-4`}>
            {genderOptions.map((item) => (
              <Pressable
                key={item.value}
                onPress={() => {
                  onChange(item.value);
                  setShowModal(false);
                }}
                style={tw`py-3 border-b border-gray-200`}
              >
                <Text style={tw`text-base text-gray-800`}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
