import React from "react";
import { Image, Text, View } from "react-native";

export default function Section6() {
  return (
    <View
      style={{
        flexDirection: "column",
        marginHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>Location</Text>
      <Text style={{ fontSize: 13, color: "#555555", marginBottom: 10 }}>
        218 Austen Mountain, consectetur adipiscing, sed do eiusmod tempor incididunt ut labore et ...
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ flex: 1, resizeMode: "cover", aspectRatio: 16 / 7 }}
          source={require("@/assets/week3/map.jpg")}
        />
      </View>
    </View>
  );
}
