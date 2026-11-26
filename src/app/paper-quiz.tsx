import React from "react";
import { Image, ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  MD3LightTheme,
  PaperProvider,
  Text,
} from "react-native-paper";

const AMENITIES = [
  { label: "wifi", icon: "wifi" },
  { label: "coffee", icon: "coffee" },
  { label: "shower", icon: "shower" },
  { label: "car", icon: "car" },
  { label: "paw", icon: "paw" },
];

export default function PaperQuiz() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        {/* Cover Image */}
        <Card.Cover style={{ borderRadius: 0 }} source={require("@/assets/week3/room-6.jpg")} />

        {/* Overlapping Hotel Header Card */}
        <Card style={{ marginHorizontal: 20, marginTop: -25, backgroundColor: "#ffffff" }}>
          <Card.Content style={{ alignItems: "center" }}>
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              Hilton San Francisco
            </Text>
            <View style={{ flexDirection: "row", marginTop: 4, gap: 2 }}>
              <Icon source="star" size={16} color="orange" />
              <Icon source="star" size={16} color="orange" />
              <Icon source="star" size={16} color="orange" />
              <Icon source="star" size={16} color="orange" />
              <Icon source="star-half-full" size={16} color="orange" />
            </View>
            <Text
              variant="bodySmall"
              style={{ textAlign: "center", color: "grey", marginTop: 6 }}
            >
              Facilities provided may range from a modest quality mattress in a small room to large suites
            </Text>
          </Card.Content>
        </Card>

        {/* Rating Badge */}
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16 }}>
          <Avatar.Text
            size={44}
            label="9.5"
            style={{ backgroundColor: "#E5634D" }}
            color="#ffffff"
          />
          <View style={{ paddingLeft: 12 }}>
            <Text variant="titleMedium" style={{ color: "#222222" }}>
              Excellent
            </Text>
            <Text variant="bodySmall" style={{ color: "grey" }}>
              See 801 reviews
            </Text>
          </View>
        </View>

        <Divider style={{ marginHorizontal: 20 }} />

        {/* Hotel Description */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
          <Text variant="titleMedium">Hotel Description</Text>
          <Text variant="bodySmall" style={{ color: "#444444", marginTop: 4 }}>
            218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor incididunt ut labore et dolore
          </Text>
        </View>

        <Divider style={{ marginHorizontal: 20 }} />

        {/* Amenities Icons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}
        >
          {AMENITIES.map((item) => (
            <View key={item.label} style={{ alignItems: "center" }}>
              <Icon source={item.icon} size={24} color="#6BA4B8" />
              <Text variant="bodySmall" style={{ color: "grey", marginTop: 4 }}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        <Divider style={{ marginHorizontal: 20 }} />

        {/* Location */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
          <Text variant="titleMedium">Location</Text>
          <Text variant="bodySmall" style={{ color: "#444444", marginTop: 4, marginBottom: 10 }}>
            218 Austen Mountain, consectetur adipiscing, sed do eiusmod tempor incididunt ut labore et...
          </Text>
          <Card.Cover source={require("@/assets/week3/map.jpg")} style={{ borderRadius: 10 }} />
        </View>

        <Divider style={{ marginHorizontal: 20 }} />

        {/* Room Type */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
          <Text variant="titleMedium" style={{ marginBottom: 10 }}>
            Room Type
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 85, height: 85, borderRadius: 12 }}
              source={require("@/assets/week3/room-8.jpg")}
            />
            <View style={{ flex: 1, paddingLeft: 12, justifyContent: "space-between" }}>
              <Text variant="titleSmall" style={{ fontWeight: "bold" }}>
                Standard Twin Room
              </Text>
              <View>
                <Text variant="titleLarge" style={{ color: "#E5634D" }}>
                  $399.99
                </Text>
                <Text variant="bodySmall" style={{ color: "#3B7A9E" }}>
                  Hurry Up! This is your last room!
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Divider style={{ marginHorizontal: 20 }} />

        {/* Price & Book Now */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 14,
          }}
        >
          <View>
            <Text variant="bodySmall">Price</Text>
            <Text variant="titleLarge" style={{ color: "#E5634D" }}>
              $399.99
            </Text>
            <Text variant="bodySmall">AVG/Night</Text>
          </View>
          <Button mode="contained" buttonColor="#E5634D" onPress={() => {}}>
            Book Now
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
