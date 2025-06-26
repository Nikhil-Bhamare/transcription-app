import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import tw from "twrnc";

const messages = [
  "🔍 Getting your file...",
  "📊 Analyzing data...",
  "🧠 Understanding medical terms...",
  "✍️ Transcribing audio...",
  "📄 Generating insights...",
];

interface Props {
  spinnerColor?: string;
  interval?: number;
}

const LoadingScreen: React.FC<Props> = ({
  spinnerColor = "#3B82F6",
  interval = 2000,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <ActivityIndicator size="large" color={spinnerColor} />
      <Text style={tw`mt-4 text-base text-gray-700 font-medium`}>
        {messages[index]}
      </Text>
    </View>
  );
};

export default LoadingScreen;
