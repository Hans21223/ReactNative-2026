import { Stack } from 'expo-router';

export default function Page2Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="lesson/[topic]" options={{ title: '' }} />
      <Stack.Screen name="quiz/[module]" options={{ title: 'Quiz', presentation: 'modal' }} />
      <Stack.Screen name="flexbox-quiz" options={{ title: 'Quiz' }} />
      <Stack.Screen name="name-form" options={{ title: 'Name form' }} />
      <Stack.Screen name="char-count" options={{ title: 'Character counter' }} />
    </Stack>
  );
}
