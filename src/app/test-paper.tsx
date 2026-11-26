import React from "react";
import { ScrollView } from "react-native";
import { Avatar, Card, Divider, MD3LightTheme, PaperProvider } from "react-native-paper";

const POSTS = [
  {
    id: "1",
    author: "Steve Garrett",
    meta: "5 hours ago | 100k views",
    avatar: require("@/assets/week3/profile-2.jpg"),
    cover: require("@/assets/week3/trip-2.jpg"),
    title: "Overseas Adventure Travel In Nepal",
    description:
      "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
  },
  {
    id: "2",
    author: "Steve Garrett",
    meta: "5 hours ago | 100k views",
    avatar: require("@/assets/week3/profile-2.jpg"),
    cover: require("@/assets/week3/room-1.jpg"),
    title: "Overseas Adventure Travel In Nepal",
    description:
      "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
  },
  {
    id: "3",
    author: "Steve Garrett",
    meta: "5 hours ago | 100k views",
    avatar: require("@/assets/week3/profile-2.jpg"),
    cover: require("@/assets/week3/room-8.jpg"),
    title: "Overseas Adventure Travel In Nepal",
    description:
      "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
  },
];

export default function TestPaper() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <ScrollView style={{ paddingVertical: 25, flex: 1, backgroundColor: "#ffffff" }}>
        {POSTS.map((post, index) => (
          <React.Fragment key={post.id}>
            {index > 0 && <Divider style={{ marginVertical: 10 }} />}
            <Card style={{ marginHorizontal: 12, backgroundColor: "#ffffff" }}>
              <Card.Title
                title={post.author}
                subtitle={post.meta}
                left={() => <Avatar.Image size={40} source={post.avatar} />}
                subtitleStyle={{ color: "grey" }}
              />
              <Card.Cover style={{ borderRadius: 0 }} source={post.cover} />
              <Card.Title
                title={post.title}
                subtitle={post.description}
                subtitleNumberOfLines={2}
                subtitleStyle={{ color: "grey" }}
              />
            </Card>
          </React.Fragment>
        ))}
      </ScrollView>
    </PaperProvider>
  );
}
