import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function Section2() {
  return (
    <View
      style={{
        flex: 1,
        marginTop: -25,
        marginHorizontal: 20,
        padding: 15,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#dddddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Hilton San Francisco
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 6, gap: 2 }}>
        <FontAwesome name="star" size={14} color="#F5A623" />
        <FontAwesome name="star" size={14} color="#F5A623" />
        <FontAwesome name="star" size={14} color="#F5A623" />
        <FontAwesome name="star" size={14} color="#F5A623" />
        <FontAwesome name="star" size={14} color="#F5A623" />
      </View>
      <Text style={{ textAlign: "center", fontSize: 12, color: "gray", marginTop: 6 }}>
        Facilities provided may range from a modest quality mattress in a small room to large suites
      </Text>
    </View>
  );
}
