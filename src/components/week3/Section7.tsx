import React from "react";
import { Image, Text, View } from "react-native";

export default function Section7() {
  return (
    <View
      style={{
        marginHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Room Type</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Image
            style={{ width: 80, height: 80, borderRadius: 10 }}
            source={require("@/assets/week3/room-8.jpg")}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 12, justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Standard Twin Room</Text>
          <View>
            <Text style={{ fontSize: 16, color: "#E5634D", fontWeight: "600" }}>$399.99</Text>
            <Text style={{ fontSize: 12, color: "#4F8A9E" }}>Hurry Up! This is your last room!</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
