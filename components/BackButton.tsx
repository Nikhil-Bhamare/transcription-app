import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ paddingVertical: 10 }}
    >
      <Icon name="arrow-left" size={24} color="#000" />
    </TouchableOpacity>
  );
};

export default BackButton;
