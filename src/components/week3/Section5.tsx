import MyIcon from "@/components/week3/MyIcon";
import React from "react";
import { View } from "react-native";

export default function Section5() {
  const labelStyle = { fontSize: 11, color: "gray", marginTop: 4 };

  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      <MyIcon title="wifi" name="wifi" size={22} color="#4F8A9E" titleStyle={labelStyle} />
      <MyIcon title="coffee" name="coffee" size={22} color="#4F8A9E" titleStyle={labelStyle} />
      <MyIcon title="bath" name="bath" size={22} color="#4F8A9E" titleStyle={labelStyle} />
      <MyIcon title="car" name="car" size={22} color="#4F8A9E" titleStyle={labelStyle} />
      <MyIcon title="paw" name="paw" size={22} color="#4F8A9E" titleStyle={labelStyle} />
    </View>
  );
}
