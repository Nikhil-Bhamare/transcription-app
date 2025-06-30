import React, { useEffect, useState } from "react";
import { Animated, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNetworkStore } from "../store/useNetworkStore";

const NetworkStatusBanner = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const setIsOfflineGlobal = useNetworkStore((state) => state.setIsOffline);

  useEffect(() => {
    const checkInternet = async () => {
      try {
        await axios.get("https://clients3.google.com/generate_204", {
          timeout: 3000,
        });
        return true;
      } catch {
        return false;
      }
    };

    const handleConnectivityChange = async (state: any) => {
      const basicConnected =
        state.isConnected && state.isInternetReachable !== false;
      let internetWorking = basicConnected;

      if (basicConnected) {
        internetWorking = await checkInternet();
      }

      const offline = !internetWorking;
      setIsOfflineGlobal(offline);

      Animated.timing(fadeAnim, {
        toValue: offline ? 1 : 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    NetInfo.fetch().then(handleConnectivityChange);

    return () => unsubscribe();
  }, []);

  const isOffline = useNetworkStore((state) => state.isOffline);

  if (!isOffline) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.container, { opacity: fadeAnim }]}
    >
      <SafeAreaView style={tw`px-3 py-1 gap-1`}>
        <Text style={tw`text-white text-center font-semibold text-sm`}>
          ⚠️ &nbsp; No Internet Connection
        </Text>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`relative top-0 w-full py-3 bg-red-600 z-50`,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default NetworkStatusBanner;
