import { useTravelApp } from "@/context/TravelAppContext";
import { BRAND_CORAL, BRAND_TEAL, HOTELS, getHotelById } from "@/data/travelData";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Chip, SegmentedButtons, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripsScreen() {
  const { bookings, cancelBooking, favorites, toggleFavorite } = useTravelApp();
  const [tab, setTab] = useState("bookings");

  const savedHotels = HOTELS.filter((h) => favorites.includes(h.id));

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Text variant="headlineSmall" style={styles.title}>
            Trips & Saved
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            Manage your reservations and wishlist
          </Text>
        </View>

        <SegmentedButtons
          value={tab}
          onValueChange={setTab}
          buttons={[
            { value: "bookings", label: `Bookings (${bookings.length})` },
            { value: "saved", label: `Saved (${savedHotels.length})` },
          ]}
        />

        {tab === "bookings" ? (
          bookings.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <FontAwesome name="suitcase" size={36} color="#b0b7c3" />
                <Text variant="titleMedium">No bookings yet</Text>
                <Text variant="bodySmall" style={styles.emptySub}>
                  Pick a hotel in Explore and tap Book Now to create a reservation.
                </Text>
                <Button mode="contained" onPress={() => router.push("/travel-app")}>
                  Explore Hotels
                </Button>
              </Card.Content>
            </Card>
          ) : (
            bookings.map((booking) => {
              const hotel = getHotelById(booking.hotelId);
              return (
                <Card key={booking.id} style={styles.itemCard}>
                  <Card.Content style={{ gap: 10 }}>
                    <View style={styles.rowTop}>
                      <Image source={hotel.roomImage} style={styles.thumb} />
                      <View style={{ flex: 1, gap: 2 }}>
                        <Chip compact style={styles.confirmedChip} textStyle={styles.confirmedText}>
                          {booking.createdAt}
                        </Chip>
                        <Text variant="titleMedium" style={{ fontWeight: "700", marginTop: 4 }}>
                          {booking.hotelName}
                        </Text>
                        <Text variant="bodySmall" style={{ color: "#555d68" }}>
                          {booking.roomType}
                        </Text>
                        <Text variant="bodySmall" style={{ color: "#555d68" }}>
                          {booking.nights} {booking.nights === 1 ? "night" : "nights"} ·{" "}
                          {booking.guests} {booking.guests === 1 ? "guest" : "guests"} ·{" "}
                          {booking.guestName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.bookingFooter}>
                      <Text variant="titleMedium" style={{ color: BRAND_CORAL, fontWeight: "700" }}>
                        Total: ${booking.totalPrice.toFixed(2)}
                      </Text>
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <Button
                          mode="text"
                          compact
                          textColor="#777777"
                          onPress={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          mode="outlined"
                          compact
                          onPress={() => router.push(`/travel-app/hotel/${booking.hotelId}`)}
                        >
                          View Stay
                        </Button>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              );
            })
          )
        ) : savedHotels.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <FontAwesome name="heart-o" size={36} color="#b0b7c3" />
              <Text variant="titleMedium">No saved stays</Text>
              <Text variant="bodySmall" style={styles.emptySub}>
                Tap the heart icon on any hotel card to save it for later.
              </Text>
              <Button mode="contained" onPress={() => router.push("/travel-app")}>
                Browse Stays
              </Button>
            </Card.Content>
          </Card>
        ) : (
          savedHotels.map((hotel) => (
            <Card
              key={hotel.id}
              style={styles.itemCard}
              onPress={() => router.push(`/travel-app/hotel/${hotel.id}`)}
            >
              <Card.Content style={styles.rowTop}>
                <Image source={hotel.heroImage} style={styles.thumb} />
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <View>
                    <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                      {hotel.name}
                    </Text>
                    <Text variant="bodySmall" style={{ color: "#66707c" }}>
                      {hotel.address}
                    </Text>
                  </View>
                  <View style={styles.savedFooter}>
                    <Text variant="titleMedium" style={{ color: BRAND_CORAL, fontWeight: "700" }}>
                      ${hotel.price.toFixed(hotel.price % 1 === 0 ? 0 : 2)} / night
                    </Text>
                    <Button
                      mode="text"
                      compact
                      textColor={BRAND_TEAL}
                      onPress={() => toggleFavorite(hotel.id)}
                    >
                      Remove
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
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
  subtitle: {
    color: "#66707c",
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 16,
  },
  emptyContent: {
    alignItems: "center",
    gap: 8,
  },
  emptySub: {
    color: "#66707c",
    textAlign: "center",
  },
  itemCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
  rowTop: {
    flexDirection: "row",
    gap: 12,
  },
  thumb: {
    width: 88,
    height: 88,
    borderRadius: 12,
  },
  confirmedChip: {
    alignSelf: "flex-start",
    backgroundColor: "#e6f4ea",
  },
  confirmedText: {
    color: "#1e7e34",
    fontSize: 11,
  },
  bookingFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eef0f4",
    paddingTop: 8,
  },
  savedFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
});
