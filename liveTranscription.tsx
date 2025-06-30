import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import { addEventListener } from "@react-native-community/netinfo";

type Report = {
  patient_name?: string | null;
  age?: string | number | null;
  gender?: string | null;
  chief_complaint?: string | null;
  history_of_present_illness?: string | null;
  assessment?: string | null;
  plan?: string | null;
};

const LiveTranscription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState("");
  const [timer, setTimer] = useState(0); // Timer in seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  let scrollViewRef: ScrollView | null = null;
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }
    })();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const connectWebSocket = () => {
    setLoading("Connecting");

    socketRef.current = new WebSocket(
      "wss://dev-medical-transcription-ai-model.huhoka.com/ws/transcribe_realtime"
    );

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setLoading("");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log(data);

      if (data?.complete_dictation === true) {
        console.log("🟢 Final report:", data.report);
        setReport(data.report);
        socketRef.current?.close();
        socketRef.current = null;
      } else if (data?.report) {
        setReport(data.report);
      } else {
        setTranscription((prev) => prev + data?.transcription);
      }
    };

    socketRef.current.onerror = (e) => {
      setLoading("");
      console.error("WebSocket error:", e);
    };

    socketRef.current.onclose = () => {
      setLoading("");
      setIsRecording(false);
      console.log("WebSocket closed");
    };
  };

  const convertToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const flushChunk = async (isFinal = false) => {
    const uri = audioRecorder.uri;
    if (!uri || !socketRef.current || socketRef.current.readyState !== 1)
      return;

    const base64 = await convertToBase64(uri);
    let payload: any = {
      uid: "12345",
      audio_base64: base64,
    };
    if (isFinal) {
      payload.complete = true;
      setLoading("Stopping");
    }

    socketRef.current.send(JSON.stringify(payload));
    console.log("🔼 Chunk sent");
  };

  const record = async () => {
    connectWebSocket();

    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);
    setTimer(0); // Reset timer

    intervalRef.current = setInterval(async () => {
      await audioRecorder.stop();
      await flushChunk();

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    }, 5000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    await audioRecorder.stop();
    await flushChunk(true);
  };

  return (
    <SafeAreaView>
      <ScrollView style={tw`h-full bg-gray-200`}>
        <View style={tw`flex p-6 w-full h-full gap-10`}>
          <Text style={tw`text-2xl font-bold`}>Live Transcription</Text>

          <View
            style={tw`p-4 gap-4 bg-white flex justify-between h-80 w-full rounded-xl shadow-sm border border-gray-300`}
          >
            <ScrollView
              ref={(ref) => {
                scrollViewRef = ref;
              }}
              onContentSizeChange={() => {
                if (scrollViewRef) {
                  scrollViewRef.scrollToEnd({ animated: true });
                }
              }}
              style={tw`bg-gray-100 rounded-lg p-2`}
            >
              <Text style={tw`text-lg`}>
                {transcription || "Start recording to see"}
              </Text>
            </ScrollView>
            <View style={tw`flex gap-4`}>
              <View style={tw`w-full h-[1px] bg-gray-400`}></View>
              <View style={tw`flex flex-row justify-between items-center`}>
                <TouchableOpacity
                  disabled={!!loading}
                  onPress={() => (isRecording ? stopRecording() : record())}
                  style={tw`${
                    isRecording ? "bg-red-400" : "bg-blue-500"
                  } p-3 px-4 rounded-lg text-black`}
                >
                  {loading ? (
                    <View style={tw`flex flex-row gap-4`}>
                      <ActivityIndicator size={10} color={"white"} />
                      <Text style={tw`text-white font-semibold`}>
                        {loading}
                      </Text>
                    </View>
                  ) : isRecording ? (
                    <View style={tw`flex flex-row gap-4`}>
                      <ActivityIndicator size={10} color={"white"} />
                      <Text style={tw`text-white font-semibold`}>
                        Stop Recording
                      </Text>
                    </View>
                  ) : (
                    <Text style={tw`text-white font-semibold`}>
                      Start Recording
                    </Text>
                  )}
                </TouchableOpacity>
                <Text style={tw`text-lg text-blue-400 font-semibold`}>
                  {formatTimer(timer)}
                </Text>
              </View>
            </View>
          </View>

          {!report ||
          (!report?.patient_name &&
            !report?.age &&
            !report?.assessment &&
            !report?.chief_complaint &&
            !report?.gender &&
            !report?.patient_name &&
            !report?.history_of_present_illness) ? (
            <View
              style={tw`p-4 bg-white flex justify-between w-full rounded-xl shadow-sm border border-gray-300`}
            >
              <View style={tw`flex my-auto gap-2 bg-gray-100 rounded-lg p-2`}>
                <Text style={tw`text-center`}>No report available</Text>
              </View>
            </View>
          ) : (
            <View
              style={tw`p-4 bg-white flex justify-between w-full rounded-xl shadow-sm border border-gray-300`}
            >
              <View style={tw`flex gap-2 bg-gray-100 rounded-lg p-2 mb-3`}>
                {report?.patient_name && (
                  <View style={tw`flex`}>
                    <Text style={tw`text-lg font-semibold`}>Patient Name</Text>
                    <Text style={tw`text-lg`}>{report?.patient_name}</Text>
                  </View>
                )}
                {report?.age && (
                  <View style={tw`flex`}>
                    <Text style={tw`text-lg font-semibold`}>Age</Text>
                    <Text style={tw`text-lg`}>{report?.age}</Text>
                  </View>
                )}
                {report?.gender && (
                  <View style={tw`flex`}>
                    <Text style={tw`text-lg font-semibold`}>Gender</Text>
                    <Text style={tw`text-lg`}>{report?.gender}</Text>
                  </View>
                )}
                {report?.assessment && (
                  <View style={tw`flex`}>
                    <Text style={tw`text-lg font-semibold`}>Assessment</Text>
                    <Text style={tw`text-lg`}>{report?.assessment}</Text>
                  </View>
                )}
                {report?.chief_complaint && (
                  <View style={tw`flex`}>
                    <Text style={tw`text-lg font-semibold`}>
                      Chief Complaint
                    </Text>
                    <Text style={tw`text-lg`}>{report?.chief_complaint}</Text>
                  </View>
                )}
                {report?.history_of_present_illness && (
                  <View style={tw`flex`}>
                    <Text style={tw`text-lg font-semibold`}>
                      History of present illness:
                    </Text>
                    <Text style={tw`text-lg`}>
                      {report?.history_of_present_illness}
                    </Text>
                  </View>
                )}
                {report?.plan && (
                  <View style={tw`flex`}>
                    <Text style={tw`text-lg font-semibold`}>Plan</Text>
                    <Text style={tw`text-lg`}>{report?.plan}</Text>
                  </View>
                )}
              </View>
              <View style={tw` flex gap-4`}>
                <View style={tw`w-full h-[1px] bg-gray-400`}></View>
                <View style={tw`flex flex-row items-center justify-between`}>
                  <TouchableOpacity
                    style={tw`bg-blue-500 p-3 px-4 rounded-lg text-black`}
                  >
                    <Text style={tw`text-white font-semibold`}>
                      Generate Report
                    </Text>
                  </TouchableOpacity>
                  <Feather name="download" size={24} color="black" />
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveTranscription;
