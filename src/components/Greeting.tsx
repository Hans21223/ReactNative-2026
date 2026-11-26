import { Text, View } from "react-native";

type GreetingProps = {
  name: string;
};

export default function Greeting({ name }: GreetingProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text>Hello {name}!</Text>
    </View>
  );
}
