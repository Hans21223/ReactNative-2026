import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RATING_BARS = [
  { stars: 5, pct: "15%" as const },
  { stars: 4, pct: "5%" as const },
  { stars: 3, pct: "78%" as const },
  { stars: 2, pct: "28%" as const },
  { stars: 1, pct: "6%" as const },
];

const REVIEWS = [
  {
    id: "1",
    name: "Grigory Kozhukhov",
    date: "Jun 2018",
    rating: 4,
    title: "Nice Place",
    body: "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
    avatar: require("@/assets/week3/profile-3.jpg"),
  },
  {
    id: "2",
    name: "Ea Tipene",
    date: "Jun 2018",
    rating: 4,
    title: "Great for families",
    body: "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
    avatar: require("@/assets/week3/profile-4.jpg"),
  },
];

export default function Review() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView style={styles.screen}>
        {/* Top Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
            hitSlop={8}
          >
            <FontAwesome name="arrow-left" size={20} color="#E5634D" />
          </Pressable>
          <Text style={styles.headerTitle}>Reviews</Text>
          <Text style={styles.headerAction}>Replay</Text>
        </View>

      {/* Rating Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreValue}>4.7</Text>
          <Text style={styles.scoreLabel}>out of 5</Text>
        </View>

        <View style={styles.barsBox}>
          {RATING_BARS.map((row) => (
            <View key={row.stars} style={styles.barRow}>
              <View style={styles.starsCol}>
                {Array.from({ length: row.stars }, (_, i) => (
                  <FontAwesome key={i} name="star" size={10} color="#9e9e9e" />
                ))}
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: row.pct }]} />
              </View>
            </View>
          ))}
          <Text style={styles.ratingsCount}>25 Ratings</Text>
        </View>
      </View>

      {/* Review Cards */}
      <View style={styles.reviewsList}>
        {REVIEWS.map((item) => (
          <View key={item.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.reviewerName}>{item.name}</Text>
                <View style={{ flexDirection: "row", marginTop: 3, gap: 2 }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <FontAwesome
                      key={i}
                      name="star"
                      size={12}
                      color={i < item.rating ? "#F5A623" : "#cccccc"}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewDate}>{item.date}</Text>
            </View>
            <Text style={styles.reviewTitle}>{item.title}</Text>
            <Text style={styles.reviewBody}>{item.body}</Text>
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
  },
  headerAction: {
    fontSize: 16,
    color: "#E5634D",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scoreBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
  },
  scoreValue: {
    fontSize: 44,
    fontWeight: "400",
    color: "#E5634D",
  },
  scoreLabel: {
    fontSize: 13,
    color: "#888888",
  },
  barsBox: {
    flex: 1,
    gap: 4,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  starsCol: {
    width: 56,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 1,
  },
  barTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#e6e6e6",
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#E5634D",
    borderRadius: 2,
  },
  ratingsCount: {
    textAlign: "right",
    fontSize: 13,
    fontWeight: "600",
    color: "#222222",
    marginTop: 6,
  },
  reviewsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  reviewCard: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 15,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222222",
  },
  reviewDate: {
    fontSize: 12,
    color: "#aaaaaa",
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
    marginTop: 10,
  },
  reviewBody: {
    fontSize: 13,
    color: "#888888",
    lineHeight: 19,
    marginTop: 6,
  },
});
