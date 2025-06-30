import axios from "axios";

export const fetchTranscriptionData = async (
  fileUri: string,
  uid: string = "12345"
): Promise<any> => {
  const formData = new FormData();

  const fileExtension = fileUri.split(".").pop()?.toLowerCase();
  const mimeType =
    fileExtension === "mp4"
      ? "video/mp4"
      : fileExtension === "m4a"
      ? "audio/m4a"
      : "audio/*";

  formData.append("file", {
    uri: fileUri,
    name: `upload.${fileExtension}`,
    type: mimeType,
  } as any); // "as any" needed for React Native file object

  formData.append("uid", uid);

  try {
    const response = await axios.post(
      "https://dev-medical-transcription-ai-model.huhoka.com/transcription_individual/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Transcription upload error:", error.message);
    throw new Error("Failed to fetch transcription data");
  }
};
