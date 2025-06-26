import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import tw from "twrnc";
import { fetchTranscriptionData } from "../api/transcription";
import LoadingScreen from "../components/LoadingScreen";
import { Feather } from "@expo/vector-icons";

const TABS = ["Transcription", "Summary", "Segments"];

type AudioTranscriptionRouteParams = {
  fileUri?: string;
};

export const AudioTranscription = () => {
  const [activeTab, setActiveTab] = useState("Transcription");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const route =
    useRoute<RouteProp<{ params: AudioTranscriptionRouteParams }, "params">>();
  const fileUri = route.params?.fileUri;

  useEffect(() => {
    const loadData = async () => {
      if (!fileUri) {
        console.error("No file URI provided.");
        setLoading(false);
        return;
      }

      try {
        const json = await fetchTranscriptionData(fileUri, "12345");
        setData(json);
      } catch (err) {
        console.error("Error fetching transcription:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fileUri]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-red-600 text-base`}>No data found.</Text>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Transcription":
        return (
          <Text style={tw`text-gray-800 leading-6 text-base`}>
            {data.corrected_transcription}
          </Text>
        );
      case "Summary":
        return (
          <Text style={tw`text-gray-800 leading-6 text-base`}>
            {data.summary}
          </Text>
        );
      case "Segments":
        return (
          <View style={tw`space-y-4`}>
            {data.segments?.map((seg: any) => (
              <View
                key={seg.id}
                style={tw`bg-blue-50 p-4 m-2 rounded-lg border border-blue-100`}
              >
                <Text style={tw`font-semibold text-blue-800 text-sm mb-1`}>
                  ⏱ {seg.start.toFixed(2)}s - {seg.end.toFixed(2)}s
                </Text>
                <Text style={tw`text-gray-800 text-base`}>{seg.text}</Text>
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#f9f9f9] pt-10`}>
      <View style={tw`flex-row justify-around py-1 border-b border-gray-200`}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={tw`px-3 py-2 rounded-full ${
              activeTab === tab ? "bg-blue-100" : ""
            }`}
          >
            <Text
              style={tw.style(
                `text-base`,
                activeTab === tab ? `text-blue-600 font-bold` : `text-gray-500`
              )}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={tw`flex-1 p-4`}>{renderContent()}</ScrollView>

      <View style={tw`px-4 pb-6`}>
        <TouchableOpacity
          style={tw`bg-green-600 p-2 rounded-xl items-center shadow-md`}
          onPress={() => setShowModal(true)}
        >
          <Text style={tw`text-white font-semibold text-sm`}>
            Generate Report
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={tw`flex-1 bg-white`}>
          <ScrollView style={tw`p-4`}>
            <Text style={tw`text-xl font-bold mb-4 text-blue-700`}>
              Patient Report
            </Text>
            {data?.patient_details &&
              Object.entries(data.patient_details).map(([key, val]) => (
                <View key={key} style={tw`mb-4`}>
                  <Text style={tw`font-semibold capitalize text-gray-700 mb-1`}>
                    {key.replace(/_/g, " ")}:
                  </Text>
                  {Array.isArray(val) ? (
                    val.map((v, idx) => (
                      <Text key={idx} style={tw`text-gray-800 ml-2`}>
                        • {v}
                      </Text>
                    ))
                  ) : (
                    <Text style={tw`text-gray-800`}>{String(val)}</Text>
                  )}
                </View>
              ))}
          </ScrollView>

          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={tw`bg-blue-500 p-2 m-4 rounded-xl items-center shadow-md`}
          >
            <Text style={tw`text-white font-semibold text-sm`}>
              Close Report
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
