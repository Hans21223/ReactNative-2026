import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { type StyleProp, Text, type TextStyle, TouchableOpacity, View } from "react-native";

type MyIconProps = {
  title: string;
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size: number;
  color: string;
  onPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
};

export default function MyIcon(props: MyIconProps) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={props.onPress}>
        <FontAwesome name={props.name} size={props.size} color={props.color} />
        <Text style={props.titleStyle}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}
