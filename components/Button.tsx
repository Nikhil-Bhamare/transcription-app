import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "../tailwind";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={tw`bg-blue-500 py-3 rounded-xl items-center mt-4`}
      onPress={onPress}
    >
      <Text style={tw`text-white font-semibold text-base`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
