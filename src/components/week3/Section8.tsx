import React from "react";
import { Button, Text, View } from "react-native";

export default function Section8() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        paddingVertical: 12,
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontSize: 12, color: "#333333" }}>Price</Text>
        <Text style={{ fontSize: 20, color: "#E5634D", fontWeight: "600" }}>$399.99</Text>
        <Text style={{ fontSize: 11, color: "#333333" }}>AVG/Night</Text>
      </View>
      <View>
        <Button title="Book Now" color="#E5634D" onPress={() => {}} />
      </View>
    </View>
  );
}
