import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function TestComponent() {
  return (
    <ScrollView style={{ margin: 20 }}>
      {/* Text & Stylesheets (Slides 11-12, 19) */}
      <Text style={styles.sectionTitle}>Text & Stylesheets</Text>
      <Text> Hello World </Text>
      <View style={styles.inlineDemo}>
        <Text style={{ color: "blue", textAlign: "center" }}>This is my styled component</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.line1}>Text Component 1</Text>
        <Text style={styles.line2}>Text Component 2</Text>
        <Text style={styles.line3}>Text Component 3</Text>
      </View>

      {/* TextInput (Slides 13, 17) */}
      <Text style={styles.sectionTitle}>TextInput</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={30}
        multiline={false}
        placeholder="Please enter your email"
        returnKeyType="next"
        onChangeText={() => {}}
        defaultValue="Default text"
      />
      <TextInput
        style={styles.input}
        keyboardType="default"
        secureTextEntry={true}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Weight (KG)"
      />

      {/* Button & Alert (Slide 18) */}
      <Text style={styles.sectionTitle}>Button & Alert</Text>
      <Button
        title="Press me"
        onPress={() => Alert.alert("Simple Button pressed")}
        color="#665544"
      />

      {/* Image (Slide 20) */}
      <Text style={styles.sectionTitle}>Image (Local / URI / Base64)</Text>
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Image source={require("@/assets/week3/profile-2.jpg")} style={{ width: 50, height: 50 }} />
        <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={{ width: 50, height: 50 }} />
        <Image
          source={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
          }}
          style={{ width: 50, height: 50 }}
        />
      </View>

      {/* Image Trick: Rounded (Slide 21) */}
      <Text style={styles.sectionTitle}>Image Trick: Rounded</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        <Image style={{ width: 100, height: 50 }} source={require("@/assets/week3/room-1.jpg")} />
        <Image style={{ width: 100, height: 100 }} source={require("@/assets/week3/room-1.jpg")} />
        <Image style={{ width: 100, height: 100, borderRadius: 100 / 2 }} source={require("@/assets/week3/room-1.jpg")} />
      </View>

      {/* Image Trick: Full width (Slide 22) */}
      <Text style={styles.sectionTitle}>Image Trick: Full Width</Text>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Image style={{ flex: 1, resizeMode: "cover", aspectRatio: 3 / 2 }} source={require("@/assets/week3/room-1.jpg")} />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Image style={{ flex: 1, resizeMode: "cover", aspectRatio: 16 / 4 }} source={require("@/assets/week3/room-1.jpg")} />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, backgroundColor: "gray" }}>
          <Image style={{ flex: 1, resizeMode: "contain", aspectRatio: 16 / 4 }} source={require("@/assets/week3/room-1.jpg")} />
        </View>
      </View>

      {/* Icon: FontAwesome / Text Icon (Slide 23) */}
      <Text style={styles.sectionTitle}>Icon: FontAwesome / Text Icon</Text>
      <View style={{ flexDirection: "row", gap: 24, alignItems: "center", marginBottom: 30 }}>
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="heart" size={32} color="orange" />
          <Text>หัวใจ</Text>
        </View>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 50 / 2,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>หัวใจ</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  inlineDemo: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 8,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  line1: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "red",
    borderRadius: 10,
    overflow: "hidden",
    margin: 6,
    padding: 12,
  },
  line2: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "blue",
    borderRadius: 10,
    overflow: "hidden",
    margin: 6,
    padding: 12,
  },
  line3: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "green",
    borderRadius: 10,
    overflow: "hidden",
    margin: 6,
    padding: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
});
