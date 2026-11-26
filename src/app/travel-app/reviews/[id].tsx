import { useTravelApp } from "@/context/TravelAppContext";
import { BRAND_CORAL, BRAND_GOLD, getHotelById } from "@/data/travelData";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_HISTOGRAM = [
  { stars: 5, count: 4 },
  { stars: 4, count: 1 },
  { stars: 3, count: 13 },
  { stars: 2, count: 5 },
  { stars: 1, count: 2 },
];

export default function HotelReviewsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const hotel = getHotelById(id);
  const { reviewsByHotel, addReview, user } = useTravelApp();

  const reviews = reviewsByHotel[hotel.id] ?? hotel.initialReviews;
  const addedReviews = reviews.slice(0, reviews.length - hotel.initialReviews.length);

  const [composeVisible, setComposeVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewerName, setReviewerName] = useState(user?.name ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const summary = useMemo(() => {
    const baseTotal = 25;
    const baseAvg = hotel.id === "hilton-sf" ? 4.7 : hotel.stars;
    const addedSum = addedReviews.reduce((acc, r) => acc + r.rating, 0);
    const totalCount = baseTotal + addedReviews.length;
    const avg = (baseAvg * baseTotal + addedSum) / totalCount;

    const countsByStar = new Map<number, number>(BASE_HISTOGRAM.map((b) => [b.stars, b.count]));
    for (const r of addedReviews) {
      countsByStar.set(r.rating, (countsByStar.get(r.rating) ?? 0) + 1);
    }
    const maxCount = Math.max(...Array.from(countsByStar.values()), 1);

    const bars = [5, 4, 3, 2, 1].map((s) => {
      const c = countsByStar.get(s) ?? 0;
      return {
        stars: s,
        pct: `${Math.round((c / maxCount) * 85)}%` as const,
      };
    });

    return {
      avg: avg.toFixed(1),
      totalCount: hotel.id === "hilton-sf" ? totalCount : hotel.baseReviewCount + addedReviews.length,
      bars,
    };
  }, [addedReviews, hotel.baseReviewCount, hotel.id, hotel.stars]);

  const handlePost = () => {
    if (!title.trim() || !body.trim()) return;
    addReview(hotel.id, {
      name: reviewerName.trim() || user?.name || "Traveler",
      rating,
      title: title.trim(),
      body: body.trim(),
    });
    setTitle("");
    setBody("");
    setRating(5);
    setComposeVisible(false);
    setSnackbarVisible(true);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView style={styles.screen}>
        {/* Header matching Slide 88 */}
        <View style={styles.header}>
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/travel-app"))}
            hitSlop={8}
          >
            <FontAwesome name="arrow-left" size={20} color={BRAND_CORAL} />
          </Pressable>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.headerTitle}>Reviews</Text>
            <Text style={styles.headerSub}>{hotel.name}</Text>
          </View>
          <Pressable
            onPress={() => {
              if (!reviewerName && user?.name) setReviewerName(user.name);
              setComposeVisible(true);
            }}
            hitSlop={8}
          >
            <Text style={styles.headerAction}>Write</Text>
          </Pressable>
        </View>

        {/* Rating Summary */}
        <View style={styles.summaryRow}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreValue}>{summary.avg}</Text>
            <Text style={styles.scoreLabel}>out of 5</Text>
          </View>

          <View style={styles.barsBox}>
            {summary.bars.map((row) => (
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
            <Text style={styles.ratingsCount}>{summary.totalCount} Ratings</Text>
          </View>
        </View>

        {/* Review Cards */}
        <View style={styles.reviewsList}>
          {reviews.map((item) => (
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
                        color={i < item.rating ? BRAND_GOLD : "#cccccc"}
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

      <Portal>
        <Modal
          visible={composeVisible}
          onDismiss={() => setComposeVisible(false)}
          contentContainerStyle={styles.modalCard}
        >
          <Text variant="titleLarge" style={{ fontWeight: "700" }}>
            Write a Review
          </Text>
          <View style={styles.starPickerRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Pressable key={s} onPress={() => setRating(s)} hitSlop={6}>
                <FontAwesome
                  name={s <= rating ? "star" : "star-o"}
                  size={28}
                  color={s <= rating ? BRAND_GOLD : "#c4c9d4"}
                />
              </Pressable>
            ))}
          </View>
          <TextInput
            mode="outlined"
            label="Your Name"
            value={reviewerName}
            onChangeText={setReviewerName}
          />
          <TextInput
            mode="outlined"
            label="Headline"
            placeholder="e.g. Amazing breakfast and view"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            mode="outlined"
            label="Review"
            placeholder="Share your experience..."
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={3}
          />
          <View style={styles.modalActions}>
            <Button mode="text" onPress={() => setComposeVisible(false)}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handlePost}
              disabled={!title.trim() || !body.trim()}
            >
              Post Review
            </Button>
          </View>
        </Modal>
      </Portal>

      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={3000}>
        Thanks! Your review has been added.
      </Snackbar>
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
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
  },
  headerSub: {
    fontSize: 12,
    color: "#7c8591",
  },
  headerAction: {
    fontSize: 16,
    fontWeight: "600",
    color: BRAND_CORAL,
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
    color: BRAND_CORAL,
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
    backgroundColor: BRAND_CORAL,
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
  modalCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 18,
    gap: 12,
  },
  starPickerRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 4,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});
