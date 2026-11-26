import { useTravelApp } from "@/context/TravelAppContext";
import { BRAND_CORAL, BRAND_GOLD, BRAND_TEAL, getHotelById } from "@/data/travelData";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const hotel = getHotelById(id);
  const { isFavorite, toggleFavorite, addBooking, reviewsByHotel, user } = useTravelApp();

  const [bookingVisible, setBookingVisible] = useState(false);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState(user?.name ?? "");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const fav = isFavorite(hotel.id);
  const hotelReviews = reviewsByHotel[hotel.id] ?? hotel.initialReviews;
  const totalReviews =
    hotel.baseReviewCount + (hotelReviews.length - hotel.initialReviews.length);
  const totalPrice = hotel.price * nights;

  const handleConfirmBooking = () => {
    addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomType: hotel.roomType,
      nights,
      guests,
      guestName: guestName.trim() || user?.name || "Guest Traveler",
      totalPrice,
    });
    setBookingVisible(false);
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Section 1: Hero Photo with floating Back & Favorite buttons */}
        <View style={styles.heroWrapper}>
          <Image source={hotel.heroImage} style={styles.heroImage} />
          <SafeAreaView style={styles.heroOverlay} edges={["top"]}>
            <Pressable
              onPress={() => (router.canGoBack() ? router.back() : router.replace("/travel-app"))}
              style={styles.circleAction}
              hitSlop={8}
            >
              <FontAwesome name="arrow-left" size={18} color="#ffffff" />
            </Pressable>
            <Pressable
              onPress={() => toggleFavorite(hotel.id)}
              style={styles.circleAction}
              hitSlop={8}
            >
              <FontAwesome
                name={fav ? "heart" : "heart-o"}
                size={18}
                color={fav ? BRAND_CORAL : "#ffffff"}
              />
            </Pressable>
          </SafeAreaView>
        </View>

        {/* Section 2: Overlapping Hotel Title Card */}
        <Card style={styles.overlapCard}>
          <Card.Content style={{ alignItems: "center" }}>
            <Text variant="titleLarge" style={styles.hotelTitle}>
              {hotel.name}
            </Text>
            <View style={styles.starsRow}>
              {Array.from({ length: 4 }, (_, i) => (
                <FontAwesome key={i} name="star" size={15} color={BRAND_GOLD} />
              ))}
              <FontAwesome name="star-half-o" size={15} color={BRAND_GOLD} />
            </View>
            <Text variant="bodySmall" style={styles.tagline}>
              {hotel.tagline}
            </Text>
          </Card.Content>
        </Card>

        {/* Section 3: Rating Row -> Tappable to open Reviews */}
        <Pressable
          onPress={() => router.push(`/travel-app/reviews/${hotel.id}`)}
          style={styles.ratingRow}
        >
          <Avatar.Text
            size={48}
            label={hotel.score.toFixed(1)}
            style={{ backgroundColor: BRAND_CORAL }}
            color="#ffffff"
          />
          <View style={{ flex: 1, paddingLeft: 12 }}>
            <Text variant="titleMedium" style={{ color: BRAND_CORAL, fontWeight: "700" }}>
              {hotel.scoreLabel}
            </Text>
            <Text variant="bodySmall" style={{ color: "#66707c" }}>
              See {totalReviews} reviews
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#9aa3af" />
        </Pressable>

        <Divider style={styles.divider} />

        {/* Section 4: Hotel Description */}
        <View style={styles.sectionBlock}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Hotel Description
          </Text>
          <Text variant="bodySmall" style={styles.bodyText}>
            {hotel.description}
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Section 5: Amenities */}
        <View style={styles.amenitiesRow}>
          {hotel.amenities.map((amenity) => (
            <View key={amenity.label} style={styles.amenityItem}>
              <Icon source={amenity.icon} size={24} color={BRAND_TEAL} />
              <Text variant="bodySmall" style={styles.amenityLabel}>
                {amenity.label}
              </Text>
            </View>
          ))}
        </View>

        <Divider style={styles.divider} />

        {/* Section 6: Location + Map */}
        <View style={styles.sectionBlock}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Location
          </Text>
          <Text variant="bodySmall" style={[styles.bodyText, { marginBottom: 10 }]}>
            {hotel.shortAddress}
          </Text>
          <Image source={hotel.mapImage} style={styles.mapImage} />
        </View>

        <Divider style={styles.divider} />

        {/* Section 7: Room Type */}
        <View style={styles.sectionBlock}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { marginBottom: 10 }]}>
            Room Type
          </Text>
          <View style={styles.roomRow}>
            <Image source={hotel.roomImage} style={styles.roomThumb} />
            <View style={styles.roomDetails}>
              <Text variant="titleSmall" style={{ fontWeight: "700" }}>
                {hotel.roomType}
              </Text>
              <View>
                <Text variant="titleLarge" style={{ color: BRAND_CORAL, fontWeight: "700" }}>
                  ${hotel.price.toFixed(hotel.price % 1 === 0 ? 0 : 2)}
                </Text>
                <Text variant="bodySmall" style={{ color: BRAND_TEAL }}>
                  {hotel.roomNote}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Section 8: Sticky Bottom Booking Bar */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomBarSafe}>
        <View style={styles.bottomBar}>
          <View>
            <Text variant="bodySmall" style={{ color: "#66707c" }}>
              Price
            </Text>
            <Text variant="titleLarge" style={{ color: BRAND_CORAL, fontWeight: "700" }}>
              ${hotel.price.toFixed(hotel.price % 1 === 0 ? 0 : 2)}
            </Text>
            <Text variant="bodySmall" style={{ color: "#66707c" }}>
              AVG/Night
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              if (!guestName && user?.name) setGuestName(user.name);
              setBookingVisible(true);
            }}
            contentStyle={{ paddingHorizontal: 14, paddingVertical: 4 }}
          >
            Book Now
          </Button>
        </View>
      </SafeAreaView>

      {/* Interactive Booking Modal */}
      <Portal>
        <Modal
          visible={bookingVisible}
          onDismiss={() => setBookingVisible(false)}
          contentContainerStyle={styles.modalCard}
        >
          <Text variant="titleLarge" style={{ fontWeight: "700" }}>
            Complete Booking
          </Text>
          <Text variant="bodySmall" style={{ color: "#66707c" }}>
            {hotel.name} · {hotel.roomType}
          </Text>

          <TextInput
            mode="outlined"
            label="Guest Name"
            value={guestName}
            onChangeText={setGuestName}
            placeholder={user?.name ?? "Enter your name"}
          />

          <View style={styles.stepperRow}>
            <Text variant="bodyMedium" style={{ fontWeight: "600" }}>
              Nights
            </Text>
            <View style={styles.stepperControls}>
              <Button mode="outlined" compact onPress={() => setNights((n) => Math.max(1, n - 1))}>
                −
              </Button>
              <Text variant="titleMedium" style={styles.stepperValue}>
                {nights}
              </Text>
              <Button mode="outlined" compact onPress={() => setNights((n) => Math.min(14, n + 1))}>
                +
              </Button>
            </View>
          </View>

          <View style={styles.stepperRow}>
            <Text variant="bodyMedium" style={{ fontWeight: "600" }}>
              Guests
            </Text>
            <View style={styles.stepperControls}>
              <Button mode="outlined" compact onPress={() => setGuests((g) => Math.max(1, g - 1))}>
                −
              </Button>
              <Text variant="titleMedium" style={styles.stepperValue}>
                {guests}
              </Text>
              <Button mode="outlined" compact onPress={() => setGuests((g) => Math.min(6, g + 1))}>
                +
              </Button>
            </View>
          </View>

          <Divider />

          <View style={styles.totalRow}>
            <Text variant="titleMedium">Total ({nights} nights)</Text>
            <Text variant="titleLarge" style={{ color: BRAND_CORAL, fontWeight: "700" }}>
              ${totalPrice.toFixed(2)}
            </Text>
          </View>

          <View style={styles.modalActions}>
            <Button mode="text" onPress={() => setBookingVisible(false)}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </View>
        </Modal>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        action={{
          label: "View Trips",
          onPress: () => router.push("/travel-app/(tabs)/trips"),
        }}
      >
        Booking confirmed for {hotel.name}!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scroll: {
    flex: 1,
  },
  heroWrapper: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 230,
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  circleAction: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlapCard: {
    marginHorizontal: 20,
    marginTop: -28,
    backgroundColor: "#ffffff",
    borderRadius: 14,
  },
  hotelTitle: {
    fontWeight: "700",
    textAlign: "center",
  },
  starsRow: {
    flexDirection: "row",
    marginTop: 6,
    gap: 3,
  },
  tagline: {
    textAlign: "center",
    color: "#66707c",
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  divider: {
    marginHorizontal: 20,
  },
  sectionBlock: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  sectionTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  bodyText: {
    color: "#4b5563",
    lineHeight: 19,
  },
  amenitiesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  amenityItem: {
    alignItems: "center",
  },
  amenityLabel: {
    color: "#66707c",
    marginTop: 4,
  },
  mapImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  roomRow: {
    flexDirection: "row",
  },
  roomThumb: {
    width: 86,
    height: 86,
    borderRadius: 12,
  },
  roomDetails: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "space-between",
  },
  bottomBarSafe: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#eceef2",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 18,
    gap: 14,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepperControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  stepperValue: {
    minWidth: 24,
    textAlign: "center",
    fontWeight: "700",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});
