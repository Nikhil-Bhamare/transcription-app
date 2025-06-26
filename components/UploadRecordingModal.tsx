import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import * as DocumentPicker from "expo-document-picker";
import tw from "../tailwind";
import Icon from "react-native-vector-icons/Feather";

interface Props {
  visible: boolean;
  onClose: () => void;
  onUploadSuccess: (uri: string) => void;
}

const UploadRecordingModal: React.FC<Props> = ({
  visible,
  onClose,
  onUploadSuccess,
}) => {
  const [file, setFile] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["audio/*", "video/*"],
    });

    if (result.assets && result.assets.length > 0) {
      setFile(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!file?.uri) return;
    setIsPending(true);

    // simulate upload
    setTimeout(() => {
      setIsPending(false);
      onUploadSuccess(file.uri); // pass only the URI
      onClose();
    }, 1000);
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={tw`bg-white rounded-xl py-4`}>
        <View style={tw`px-4 flex-row items-center gap-3 mb-3`}>
          <Image
            source={require("../assets/UploadRecordingIcon.png")}
            style={{ width: 48, height: 48 }}
          />
          <View>
            <Text style={tw`text-[#0A0D12] font-bold text-xl`}>
              Upload Recording
            </Text>
            <Text style={tw`text-sm text-gray-600`}>
              Click to upload the recording
            </Text>
          </View>
        </View>

        <View style={tw`border-b border-gray-200 my-1`} />

        <View style={tw`px-4`}>
          <Text style={tw`text-xs mb-2 text-gray-800`}>Upload Recording</Text>

          <TouchableOpacity
            onPress={pickFile}
            style={tw`border border-dashed border-[#7F56D9] rounded-md p-6 items-center`}
          >
            <Icon name="upload-cloud" size={24} color="#6B7280" />
            <View
              style={tw`flex-row items-center flex-wrap justify-center mt-2`}
            >
              <Text style={tw`text-[#412DE2] font-semibold text-sm`}>
                Click to upload
              </Text>
              <Text style={tw`text-[#535862] text-sm`}> or drag and drop</Text>
            </View>
            <Text style={tw`text-[#535862] text-sm mt-1`}>
              Upload video/audio file
            </Text>
            {file && (
              <Text style={tw`text-green-600 text-xs mt-2`}>
                Selected: {file.name}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={tw`border-b border-gray-200 my-4`} />

        <View style={tw`px-4 flex-row justify-center gap-3`}>
          <TouchableOpacity
            onPress={onClose}
            style={tw`border border-[#004EC2] w-[46%] py-3 rounded-lg items-center`}
          >
            <Text style={tw`text-[#004EC2] font-semibold text-md`}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUpload}
            disabled={!file || isPending}
            style={tw`bg-[#004EC2] w-[46%] py-3 rounded-lg items-center ${
              !file || isPending ? "opacity-50" : "opacity-100"
            }`}
          >
            {isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={tw`text-white font-semibold text-md`}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UploadRecordingModal;
