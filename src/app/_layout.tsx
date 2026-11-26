import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="review" options={{ headerShown: false }} />
    </Stack>
  );
}
