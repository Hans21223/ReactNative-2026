import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="review" options={{ headerShown: false }} />
      <Stack.Screen name="travel-app" options={{ headerShown: false }} />
      <Stack.Screen name="page2" options={{ headerShown: false }} />
    </Stack>
  );
}
