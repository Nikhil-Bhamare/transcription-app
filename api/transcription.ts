export const fetchTranscriptionData = async (
  fileUri: string,
  uid: string = "12345"
): Promise<any> => {
  const formData = new FormData();

  const fileExtension = fileUri.split(".").pop();
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
  } as any);

  formData.append("uid", uid);

  const response = await fetch(
    "https://dev-medical-transcription-ai-model.huhoka.com/transcription_individual/",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transcription data");
  }

  return response.json();
};
