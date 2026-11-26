import { TravelAppProvider } from "@/context/TravelAppContext";
import { BRAND_CORAL, BRAND_TEAL } from "@/data/travelData";
import { Stack } from "expo-router";
import React from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

const travelTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: BRAND_CORAL,
    secondary: BRAND_TEAL,
    surface: "#ffffff",
    background: "#f8f9fb",
  },
};

export default function TravelAppLayout() {
  return (
    <TravelAppProvider>
      <PaperProvider theme={travelTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="hotel/[id]" />
          <Stack.Screen name="reviews/[id]" />
        </Stack>
      </PaperProvider>
    </TravelAppProvider>
  );
}
