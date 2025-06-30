import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { Audio } from "expo-av";
import Voice from "@react-native-voice/voice";

const AudioTranscriber = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null); // Add state for audio URI

  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      if (event.value) {
        setTranscript(event.value.join(" "));
      }
    };

    Voice.onSpeechError = (e) => {
      console.error("Speech error:", e);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startBoth = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Prepare audio recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setAudioUri(null); // Reset audio URI on new recording

      // Start speech recognition
      await Voice.start("en-US");
      setIsListening(true);
    } catch (e) {
      console.error("Error starting both:", e);
    }
  };

  const stopBoth = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Audio file saved at:", uri);
        setAudioUri(uri || null); // Save audio URI for playback
        setRecording(null);
      }

      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      }
    } catch (e) {
      console.error("Error stopping both:", e);
    }
  };

  const playRecording = async () => {
    if (!audioUri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      await sound.playAsync();
    } catch (e) {
      console.error("Error playing audio:", e);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Button title="Start Recording + Transcription" onPress={startBoth} />
      <Button title="Stop Both" onPress={stopBoth} />
      {audioUri && <Button title="Play Recording" onPress={playRecording} />}
      <Text style={{ marginTop: 20, fontSize: 16 }}>Transcript:</Text>
      <Text>{transcript}</Text>
    </ScrollView>
  );
};

export default AudioTranscriber;
