import Greeting from "@/components/Greeting";
import { useTravelApp } from "@/context/TravelAppContext";
import { BRAND_CORAL, BRAND_TEAL } from "@/data/travelData";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, HelperText, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const { user, signUp, signOut, bookings, favorites, reviewsByHotel } = useTravelApp();
  const [inputId, setInputId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const totalReviewsWritten = Object.values(reviewsByHotel)
    .flat()
    .filter((r) => r.id.startsWith("rev-")).length;

  const handleSignUp = () => {
    if (!inputId.trim() || !email.trim()) {
      setError("Please enter at least your ID and email.");
      return;
    }
    setError("");
    signUp({
      id: inputId.trim(),
      name: name.trim() || inputId.trim(),
      email: email.trim(),
      address: address.trim() || "218 Austen Mountain",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text variant="headlineSmall" style={styles.title}>
          Account
        </Text>

        {user ? (
          <>
            <Card style={styles.card}>
              <Card.Content style={styles.profileHeader}>
                <Avatar.Image size={68} source={require("@/assets/week3/profile-2.jpg")} />
                <View style={{ marginTop: 10, alignItems: "center" }}>
                  <Greeting name={user.name} />
                  <Text variant="bodySmall" style={{ color: "#66707c", marginTop: 2 }}>
                    Member ID: {user.id}
                  </Text>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text variant="headlineSmall" style={{ color: BRAND_CORAL, fontWeight: "700" }}>
                    {bookings.length}
                  </Text>
                  <Text variant="bodySmall" style={{ color: "#66707c" }}>
                    Bookings
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text variant="headlineSmall" style={{ color: BRAND_TEAL, fontWeight: "700" }}>
                    {favorites.length}
                  </Text>
                  <Text variant="bodySmall" style={{ color: "#66707c" }}>
                    Saved
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text variant="headlineSmall" style={{ color: "#1e242c", fontWeight: "700" }}>
                    {totalReviewsWritten}
                  </Text>
                  <Text variant="bodySmall" style={{ color: "#66707c" }}>
                    Reviews
                  </Text>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content style={{ gap: 10 }}>
                <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                  Profile Details
                </Text>
                <Divider />
                <Text variant="bodyMedium">Email: {user.email}</Text>
                <Text variant="bodyMedium">Address: {user.address}</Text>
                <Button mode="outlined" onPress={signOut} style={{ marginTop: 6 }}>
                  Sign out
                </Button>
              </Card.Content>
            </Card>
          </>
        ) : (
          <Card style={styles.card}>
            <Card.Content style={{ gap: 10 }}>
              <Text variant="titleLarge" style={{ fontWeight: "700" }}>
                Sign up Form
              </Text>
              <Text variant="bodySmall" style={{ color: "#66707c" }}>
                Create a traveler profile to pre-fill bookings and reviews.
              </Text>
              <TextInput
                mode="outlined"
                label="Input ID"
                value={inputId}
                onChangeText={setInputId}
                autoCapitalize="none"
              />
              <TextInput
                mode="outlined"
                label="Display Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                mode="outlined"
                label="Input Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                mode="outlined"
                label="Input Address"
                value={address}
                onChangeText={setAddress}
              />
              {error ? <HelperText type="error">{error}</HelperText> : null}
              <Button mode="contained" onPress={handleSignUp} style={{ marginTop: 4 }}>
                Sign up
              </Button>
              <Button
                mode="outlined"
                onPress={() =>
                  signUp({
                    id: "steve2026",
                    name: "Steve Garrett",
                    email: "steve@wanderstay.app",
                    address: "218 Austen Mountain, San Francisco",
                  })
                }
              >
                Quick Demo Sign In (Steve Garrett)
              </Button>
            </Card.Content>
          </Card>
        )}

        <Button mode="text" onPress={() => router.replace("/")}>
          Back to Class Exercises Menu
        </Button>
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
    gap: 14,
  },
  title: {
    fontWeight: "800",
    color: "#1e242c",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statBox: {
    alignItems: "center",
  },
});
