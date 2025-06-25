import React from "react";
import { View, Text, TextInput } from "react-native";
import tw from "../tailwind";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-base font-medium mb-1`}>{label}</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-lg px-4 py-3 bg-white text-base`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputField;
