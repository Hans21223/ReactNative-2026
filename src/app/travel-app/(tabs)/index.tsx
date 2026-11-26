import MyIcon from "@/components/week3/MyIcon";
import { useTravelApp } from "@/context/TravelAppContext";
import {
  BRAND_CORAL,
  BRAND_GOLD,
  BRAND_TEAL,
  CATEGORY_DEALS,
  HOTELS,
  TRAVEL_CATEGORIES,
  type CategoryKey,
} from "@/data/travelData";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Chip, Searchbar, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const { favorites, toggleFavorite, reviewsByHotel, user } = useTravelApp();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("All");

  const filteredHotels = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HOTELS.filter((hotel) => {
      const matchesCategory =
        selectedCategory === "All" ||
        selectedCategory === "Hotel" ||
        hotel.category === selectedCategory;
      const matchesQuery =
        q.length === 0 ||
        hotel.name.toLowerCase().includes(q) ||
        hotel.address.toLowerCase().includes(q) ||
        hotel.roomType.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const matchingDeals = useMemo(() => {
    if (selectedCategory === "All") return [];
    return CATEGORY_DEALS.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryPress = (key: Exclude<CategoryKey, "All">) => {
    setSelectedCategory((prev) => (prev === key ? "All" : key));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Top App Bar */}
        <View style={styles.topBar}>
          <View>
            <Text variant="headlineSmall" style={styles.brandTitle}>
              WanderStay
            </Text>
            <Text variant="bodySmall" style={styles.brandSub}>
              {user ? `Hello ${user.name}! Ready for your next trip?` : "Hotels, resorts & curated stays"}
            </Text>
          </View>
          <Button
            mode="outlined"
            compact
            onPress={() => router.replace("/")}
            style={styles.menuButton}
          >
            Class Menu
          </Button>
        </View>

        {/* Search & 8-Icon Category Menu (from Menu.tsx + Paper Searchbar) */}
        <Surface style={styles.menuCard} elevation={2}>
          <Searchbar
            placeholder="What're you looking for?"
            value={query}
            onChangeText={setQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
          />
          <View style={styles.iconRow}>
            {TRAVEL_CATEGORIES.slice(0, 4).map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <MyIcon
                  key={cat.key}
                  title={cat.title}
                  name={cat.icon}
                  size={26}
                  color={active ? BRAND_CORAL : BRAND_GOLD}
                  onPress={() => handleCategoryPress(cat.key)}
                  titleStyle={[styles.iconLabel, active && styles.iconLabelActive]}
                />
              );
            })}
          </View>
          <View style={styles.iconRow}>
            {TRAVEL_CATEGORIES.slice(4, 8).map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <MyIcon
                  key={cat.key}
                  title={cat.title}
                  name={cat.icon}
                  size={26}
                  color={active ? BRAND_CORAL : BRAND_GOLD}
                  onPress={() => handleCategoryPress(cat.key)}
                  titleStyle={[styles.iconLabel, active && styles.iconLabelActive]}
                />
              );
            })}
          </View>
          {selectedCategory !== "All" && (
            <View style={styles.activeFilterRow}>
              <Chip
                icon="close"
                onPress={() => setSelectedCategory("All")}
                style={styles.filterChip}
              >
                Category: {selectedCategory}
              </Chip>
            </View>
          )}
        </Surface>

        {/* Category Deals when selecting Flight / Car / Cruise / Bus / Event / More */}
        {matchingDeals.length > 0 && (
          <View style={styles.sectionBlock}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {selectedCategory} Deals
            </Text>
            {matchingDeals.map((deal) => (
              <Card
                key={deal.id}
                style={styles.dealCard}
                onPress={() => router.push(`/travel-app/hotel/${deal.hotelId}`)}
              >
                <Card.Content style={styles.dealRow}>
                  <View style={{ flex: 1 }}>
                    <Chip compact style={styles.dealBadge} textStyle={styles.dealBadgeText}>
                      {deal.badge}
                    </Chip>
                    <Text variant="titleMedium" style={{ marginTop: 6 }}>
                      {deal.title}
                    </Text>
                    <Text variant="bodySmall" style={{ color: "#666666", marginTop: 2 }}>
                      {deal.subtitle}
                    </Text>
                  </View>
                  <Text variant="titleMedium" style={styles.dealPrice}>
                    {deal.price}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}

        {/* Featured Stays List (Uniting Hotel.tsx + Section1-8 + Paper Card) */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {query.trim() ? "Search Results" : "Featured Stays"}
            </Text>
            <Text variant="bodySmall" style={{ color: "#666666" }}>
              {filteredHotels.length} {filteredHotels.length === 1 ? "property" : "properties"}
            </Text>
          </View>

          {filteredHotels.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content style={{ alignItems: "center", gap: 8 }}>
                <Text variant="titleMedium">No matching stays found</Text>
                <Text variant="bodySmall" style={{ color: "#666666", textAlign: "center" }}>
                  Try clearing your search or switching back to all categories.
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    setQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Reset Filters
                </Button>
              </Card.Content>
            </Card>
          ) : (
            filteredHotels.map((hotel) => {
              const fav = favorites.includes(hotel.id);
              const extraCount =
                (reviewsByHotel[hotel.id]?.length ?? hotel.initialReviews.length) -
                hotel.initialReviews.length;
              const totalReviews = hotel.baseReviewCount + extraCount;

              return (
                <Card
                  key={hotel.id}
                  style={styles.hotelCard}
                  onPress={() => router.push(`/travel-app/hotel/${hotel.id}`)}
                >
                  <View style={styles.heroWrapper}>
                    <Image source={hotel.heroImage} style={styles.heroImage} />
                    <View style={styles.scoreBadge}>
                      <Text style={styles.scoreBadgeText}>{hotel.score.toFixed(1)}</Text>
                    </View>
                    <Pressable
                      onPress={() => toggleFavorite(hotel.id)}
                      style={styles.heartButton}
                      hitSlop={8}
                    >
                      <FontAwesome
                        name={fav ? "heart" : "heart-o"}
                        size={18}
                        color={fav ? BRAND_CORAL : "#ffffff"}
                      />
                    </Pressable>
                  </View>

                  <Card.Content style={{ paddingTop: 12 }}>
                    <View style={styles.addressRow}>
                      <FontAwesome name="map-marker" size={14} color={BRAND_CORAL} />
                      <Text variant="bodySmall" style={styles.addressText}>
                        {hotel.address}
                      </Text>
                    </View>

                    <View style={styles.hotelTitleRow}>
                      <Text variant="titleLarge" style={styles.hotelName}>
                        {hotel.name}
                      </Text>
                    </View>

                    <View style={styles.ratingFooter}>
                      <View style={styles.starsRow}>
                        {Array.from({ length: 4 }, (_, i) => (
                          <FontAwesome key={i} name="star" size={15} color={BRAND_GOLD} />
                        ))}
                        <FontAwesome name="star-half-o" size={15} color={BRAND_GOLD} />
                        <Text variant="bodySmall" style={styles.reviewsText}>
                          {totalReviews} Reviews
                        </Text>
                      </View>
                      <View style={styles.priceCol}>
                        <Text variant="titleLarge" style={styles.priceText}>
                          ${hotel.price.toFixed(hotel.price % 1 === 0 ? 0 : 2)}
                        </Text>
                        <Text variant="labelSmall" style={{ color: "#777777" }}>
                          / night
                        </Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              );
            })
          )}
        </View>

        {/* Quick Editorial Highlight Linking to Feed */}
        <Card style={styles.promoCard} onPress={() => router.push("/travel-app/(tabs)/feed")}>
          <Card.Content style={styles.promoContent}>
            <View style={{ flex: 1 }}>
              <Text variant="labelMedium" style={{ color: BRAND_TEAL, fontWeight: "700" }}>
                TRAVEL STORIES
              </Text>
              <Text variant="titleMedium" style={{ marginTop: 2 }}>
                Overseas Adventure Travel In Nepal
              </Text>
              <Text variant="bodySmall" style={{ color: "#666666", marginTop: 2 }}>
                Read Steve Garrett’s latest field notes and hotel picks.
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color={BRAND_TEAL} />
          </Card.Content>
        </Card>
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
    gap: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandTitle: {
    fontWeight: "800",
    color: "#1e242c",
  },
  brandSub: {
    color: "#66707c",
  },
  menuButton: {
    borderColor: "#d6dbe3",
  },
  menuCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    gap: 12,
  },
  searchBar: {
    backgroundColor: "#f2f4f7",
    borderRadius: 12,
    elevation: 0,
    height: 46,
  },
  searchInput: {
    fontSize: 15,
    minHeight: 46,
  },
  iconRow: {
    flexDirection: "row",
    paddingTop: 2,
  },
  iconLabel: {
    fontSize: 12,
    color: "#444c57",
    marginTop: 4,
  },
  iconLabelActive: {
    color: BRAND_CORAL,
    fontWeight: "700",
  },
  activeFilterRow: {
    flexDirection: "row",
  },
  filterChip: {
    backgroundColor: "#fdecea",
  },
  sectionBlock: {
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#1e242c",
  },
  dealCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
  },
  dealRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dealBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#e6f2f5",
  },
  dealBadgeText: {
    color: BRAND_TEAL,
    fontSize: 11,
  },
  dealPrice: {
    color: BRAND_CORAL,
    fontWeight: "700",
  },
  hotelCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
  },
  heroWrapper: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 175,
    resizeMode: "cover",
  },
  scoreBadge: {
    position: "absolute",
    bottom: 10,
    left: 12,
    backgroundColor: BRAND_CORAL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  scoreBadgeText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.42)",
    alignItems: "center",
    justifyContent: "center",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  addressText: {
    color: "#6b7280",
  },
  hotelTitleRow: {
    marginTop: 4,
  },
  hotelName: {
    fontWeight: "700",
    color: "#1e242c",
  },
  ratingFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  reviewsText: {
    color: "#6b7280",
    marginLeft: 6,
  },
  priceCol: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 3,
  },
  priceText: {
    color: BRAND_CORAL,
    fontWeight: "700",
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 12,
  },
  promoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
  promoContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
