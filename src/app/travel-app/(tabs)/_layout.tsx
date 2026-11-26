import { useTravelApp } from "@/context/TravelAppContext";
import { BRAND_CORAL } from "@/data/travelData";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

type FaName = React.ComponentProps<typeof FontAwesome>["name"];

function tabIcon(name: FaName, sizeOffset = 0) {
  function TabBarIcon({ color, size }: { color: unknown; size: number }) {
    return (
      <FontAwesome
        name={name}
        size={size + sizeOffset}
        color={typeof color === "string" ? color : BRAND_CORAL}
      />
    );
  }
  return TabBarIcon;
}

export default function TravelAppTabsLayout() {
  const { bookings } = useTravelApp();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: BRAND_CORAL,
        tabBarInactiveTintColor: "#7c8591",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#eceef2",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: tabIcon("compass"),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: tabIcon("newspaper-o", -2),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarBadge: bookings.length > 0 ? bookings.length : undefined,
          tabBarIcon: tabIcon("suitcase", -2),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: tabIcon("user-circle", -1),
        }}
      />
    </Tabs>
  );
}
