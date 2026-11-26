import { tint } from '@/components/ui';
import { FontAwesome } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';

type FaName = React.ComponentProps<typeof FontAwesome>['name'];

function tabIcon(name: FaName) {
  function TabBarIcon({ color, size }: { color: unknown; size: number }) {
    return (
      <FontAwesome
        name={name}
        size={size - 2}
        color={typeof color === 'string' ? color : tint}
      />
    );
  }
  return TabBarIcon;
}

function HomeBackButton() {
  return (
    <Pressable onPress={() => router.replace('/')} style={{ paddingHorizontal: 14, paddingVertical: 6 }}>
      <Text style={{ color: tint, fontWeight: '600', fontSize: 15 }}>← หน้าแรก</Text>
    </Pressable>
  );
}

export default function Page2TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        headerRight: () => <HomeBackButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: tabIcon('book'),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercises',
          tabBarIcon: tabIcon('th-large'),
        }}
      />
      <Tabs.Screen
        name="playground"
        options={{
          title: 'Playground',
          tabBarIcon: tabIcon('sliders'),
        }}
      />
    </Tabs>
  );
}
