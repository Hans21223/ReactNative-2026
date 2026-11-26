import React from "react";
import { Text, View } from "react-native";

export default function Section4() {
  return (
    <View
      style={{
        marginHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>Hotel Description</Text>
      <Text style={{ fontSize: 13, color: "#555555" }}>
        218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor incididunt ut labore et dolore
      </Text>
    </View>
  );
}
