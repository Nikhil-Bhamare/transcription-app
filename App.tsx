import React from "react";
import AppNavigator from "./navigation";
import NetworkStatusBanner from "./components/NetworkStatusBanner"; // adjust path if needed
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "./tailwind";

export default function App() {
  return (
    <>
      <NetworkStatusBanner />
      <AppNavigator />
    </>
  );
}
