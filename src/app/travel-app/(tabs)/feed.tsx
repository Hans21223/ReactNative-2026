import { useTravelApp } from "@/context/TravelAppContext";
import { BRAND_CORAL, FEED_POSTS } from "@/data/travelData";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Chip, Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedScreen() {
  const { likedPosts, toggleLikePost } = useTravelApp();
  const [filter, setFilter] = useState<"All" | "Hotel" | "Tour">("All");

  const posts = useMemo(() => {
    if (filter === "All") return FEED_POSTS;
    return FEED_POSTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Text variant="headlineSmall" style={styles.title}>
            Travel Feed
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            Stories and hotel guides curated by travelers
          </Text>
        </View>

        <View style={styles.chipRow}>
          {(["All", "Hotel", "Tour"] as const).map((item) => (
            <Chip
              key={item}
              selected={filter === item}
              onPress={() => setFilter(item)}
              style={filter === item ? styles.chipSelected : styles.chip}
            >
              {item}
            </Chip>
          ))}
        </View>

        {posts.map((post, index) => {
          const liked = likedPosts.includes(post.id);
          return (
            <React.Fragment key={post.id}>
              {index > 0 && <Divider style={{ marginVertical: 4 }} />}
              <Card style={styles.card}>
                <Card.Title
                  title={post.author}
                  subtitle={post.meta}
                  left={() => <Avatar.Image size={40} source={post.avatar} />}
                  right={() => (
                    <Chip compact style={styles.tagChip} textStyle={{ fontSize: 11 }}>
                      {post.category}
                    </Chip>
                  )}
                  rightStyle={{ marginRight: 12 }}
                  subtitleStyle={{ color: "grey" }}
                />
                <Card.Cover style={{ borderRadius: 0 }} source={post.cover} />
                <Card.Content style={{ paddingTop: 12 }}>
                  <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                    {post.title}
                  </Text>
                  <Text variant="bodySmall" style={styles.description}>
                    {post.description}
                  </Text>
                </Card.Content>
                <Card.Actions style={styles.actions}>
                  <Button
                    mode="text"
                    onPress={() => toggleLikePost(post.id)}
                    icon={() => (
                      <FontAwesome
                        name={liked ? "heart" : "heart-o"}
                        size={16}
                        color={liked ? BRAND_CORAL : "#666666"}
                      />
                    )}
                    textColor={liked ? BRAND_CORAL : "#555555"}
                  >
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => router.push(`/travel-app/hotel/${post.hotelId}`)}
                  >
                    View Stay
                  </Button>
                </Card.Actions>
              </Card>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  title: {
    fontWeight: "800",
    color: "#1e242c",
  },
  subtitle: {
    color: "#66707c",
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    backgroundColor: "#eceff4",
  },
  chipSelected: {
    backgroundColor: "#fdecea",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
  },
  tagChip: {
    backgroundColor: "#f2f4f7",
  },
  description: {
    color: "#555d68",
    marginTop: 4,
    lineHeight: 19,
  },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});
