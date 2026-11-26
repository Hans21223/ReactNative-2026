import React from "react";
import { Text, View } from "react-native";

export default function Section3() {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            backgroundColor: "#E5634D",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>9.5</Text>
        </View>
        <View style={{ paddingLeft: 12 }}>
          <Text style={{ fontSize: 18, color: "#E5634D" }}>Excellent</Text>
          <Text style={{ fontSize: 13, color: "gray" }}>See 801 reviews</Text>
        </View>
      </View>
    </View>
  );
}
