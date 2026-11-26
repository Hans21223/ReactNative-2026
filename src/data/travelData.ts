import type { ImageSourcePropType } from "react-native";

export type CategoryKey =
  | "All"
  | "Hotel"
  | "Tour"
  | "Car"
  | "Flight"
  | "Cruise"
  | "Bus"
  | "Event"
  | "More";

export type CategoryItem = {
  key: Exclude<CategoryKey, "All">;
  title: string;
  icon: "building" | "map-marker" | "car" | "plane" | "ship" | "bus" | "star" | "ellipsis-h";
};

export type AmenityItem = {
  label: string;
  icon: string;
};

export type ReviewItem = {
  id: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  avatar: ImageSourcePropType;
};

export type HotelItem = {
  id: string;
  name: string;
  category: Exclude<CategoryKey, "All">;
  address: string;
  shortAddress: string;
  tagline: string;
  description: string;
  price: number;
  score: number;
  scoreLabel: string;
  baseReviewCount: number;
  stars: number;
  heroImage: ImageSourcePropType;
  roomImage: ImageSourcePropType;
  mapImage: ImageSourcePropType;
  roomType: string;
  roomNote: string;
  amenities: AmenityItem[];
  initialReviews: ReviewItem[];
};

export type FeedPost = {
  id: string;
  author: string;
  meta: string;
  avatar: ImageSourcePropType;
  cover: ImageSourcePropType;
  title: string;
  description: string;
  hotelId: string;
  category: Exclude<CategoryKey, "All">;
};

export type DealItem = {
  id: string;
  category: Exclude<CategoryKey, "All">;
  title: string;
  subtitle: string;
  price: string;
  badge: string;
  hotelId: string;
};

export const BRAND_CORAL = "#E5634D";
export const BRAND_TEAL = "#4F8A9E";
export const BRAND_GOLD = "#F5A623";

export const TRAVEL_CATEGORIES: CategoryItem[] = [
  { key: "Hotel", title: "Hotel", icon: "building" },
  { key: "Tour", title: "Tour", icon: "map-marker" },
  { key: "Car", title: "Car", icon: "car" },
  { key: "Flight", title: "Flight", icon: "plane" },
  { key: "Cruise", title: "Cruise", icon: "ship" },
  { key: "Bus", title: "Bus", icon: "bus" },
  { key: "Event", title: "Event", icon: "star" },
  { key: "More", title: "More", icon: "ellipsis-h" },
];

export const HOTELS: HotelItem[] = [
  {
    id: "hilton-sf",
    name: "Hilton San Francisco",
    category: "Hotel",
    address: "218 Austen Mountain, San Francisco",
    shortAddress: "218 Austen Mountain, consectetur adipiscing, sed do eiusmod tempor incididunt ut labore et...",
    tagline:
      "Facilities provided may range from a modest quality mattress in a small room to large suites",
    description:
      "218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor incididunt ut labore et dolore",
    price: 399.99,
    score: 9.5,
    scoreLabel: "Excellent",
    baseReviewCount: 801,
    stars: 4.5,
    heroImage: require("@/assets/week3/room-6.jpg"),
    roomImage: require("@/assets/week3/room-8.jpg"),
    mapImage: require("@/assets/week3/map.jpg"),
    roomType: "Standard Twin Room",
    roomNote: "Hurry Up! This is your last room!",
    amenities: [
      { label: "wifi", icon: "wifi" },
      { label: "coffee", icon: "coffee" },
      { label: "shower", icon: "shower" },
      { label: "car", icon: "car" },
      { label: "paw", icon: "paw" },
    ],
    initialReviews: [
      {
        id: "r1",
        name: "Grigory Kozhukhov",
        date: "Jun 2018",
        rating: 4,
        title: "Nice Place",
        body: "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
        avatar: require("@/assets/week3/profile-3.jpg"),
      },
      {
        id: "r2",
        name: "Ea Tipene",
        date: "Jun 2018",
        rating: 4,
        title: "Great for families",
        body: "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
        avatar: require("@/assets/week3/profile-4.jpg"),
      },
    ],
  },
  {
    id: "boston-hotel",
    name: "Boston Hotel",
    category: "Hotel",
    address: "553 Cislason Radial, Boston",
    shortAddress: "553 Cislason Radial, Back Bay District, Boston MA",
    tagline: "Warm brick-loft boutique rooms steps away from riverside parks and coffee bars",
    description:
      "Stylish urban suites featuring sunny loft windows, artisan espresso bar, and rapid express check-in.",
    price: 125,
    score: 8.8,
    scoreLabel: "Very Good",
    baseReviewCount: 100,
    stars: 4.5,
    heroImage: require("@/assets/week3/room-1.jpg"),
    roomImage: require("@/assets/week3/room-6.jpg"),
    mapImage: require("@/assets/week3/map.jpg"),
    roomType: "Boutique Loft Queen",
    roomNote: "Free cancellation before check-in",
    amenities: [
      { label: "wifi", icon: "wifi" },
      { label: "coffee", icon: "coffee" },
      { label: "shower", icon: "shower" },
      { label: "car", icon: "car" },
    ],
    initialReviews: [
      {
        id: "r3",
        name: "Steve Garrett",
        date: "May 2026",
        rating: 5,
        title: "Best value loft in Boston",
        body: "Super walkable location near 553 Cislason Radial with great morning light and quiet rooms.",
        avatar: require("@/assets/week3/profile-2.jpg"),
      },
      {
        id: "r4",
        name: "Ea Tipene",
        date: "Apr 2026",
        rating: 4,
        title: "Cozy and spotless",
        body: "Comfortable bed, fast wifi for remote work, and friendly front desk staff.",
        avatar: require("@/assets/week3/profile-4.jpg"),
      },
    ],
  },
  {
    id: "andaz-tokyo",
    name: "Andaz Tokyo Toranomon Hills",
    category: "Tour",
    address: "1-23-4 Toranomon, Minato, Tokyo",
    shortAddress: "Located in one of the uprising areas of Tokyo with skyline views",
    tagline: "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.",
    description:
      "Experience panoramic skyline lounges, bespoke city tours, and serene timber-lined rooms in Minato.",
    price: 289,
    score: 9.2,
    scoreLabel: "Superb",
    baseReviewCount: 25,
    stars: 4.7,
    heroImage: require("@/assets/week3/trip-2.jpg"),
    roomImage: require("@/assets/week3/room-8.jpg"),
    mapImage: require("@/assets/week3/map.jpg"),
    roomType: "Skyline King Suite",
    roomNote: "Includes guided city walking tour",
    amenities: [
      { label: "wifi", icon: "wifi" },
      { label: "coffee", icon: "coffee" },
      { label: "shower", icon: "shower" },
      { label: "paw", icon: "paw" },
    ],
    initialReviews: [
      {
        id: "r5",
        name: "Grigory Kozhukhov",
        date: "Jun 2018",
        rating: 5,
        title: "Unforgettable skyline view",
        body: "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
        avatar: require("@/assets/week3/profile-3.jpg"),
      },
      {
        id: "r6",
        name: "Steve Garrett",
        date: "Jun 2018",
        rating: 4,
        title: "Seamless tour package",
        body: "Booked the mountain & city escape package and every transfer ran right on time.",
        avatar: require("@/assets/week3/profile-2.jpg"),
      },
    ],
  },
];

export const FEED_POSTS: FeedPost[] = [
  {
    id: "post-nepal",
    author: "Steve Garrett",
    meta: "5 hours ago | 100k views",
    avatar: require("@/assets/week3/profile-2.jpg"),
    cover: require("@/assets/week3/trip-2.jpg"),
    title: "Overseas Adventure Travel In Nepal",
    description:
      "Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo",
    hotelId: "andaz-tokyo",
    category: "Tour",
  },
  {
    id: "post-sf",
    author: "Steve Garrett",
    meta: "1 day ago | 48k views",
    avatar: require("@/assets/week3/profile-2.jpg"),
    cover: require("@/assets/week3/room-6.jpg"),
    title: "Inside Hilton San Francisco Suites",
    description:
      "From modest boutique corners to large family suites on Austen Mountain, here is what to expect when booking.",
    hotelId: "hilton-sf",
    category: "Hotel",
  },
  {
    id: "post-boston",
    author: "Grigory Kozhukhov",
    meta: "3 days ago | 32k views",
    avatar: require("@/assets/week3/profile-3.jpg"),
    cover: require("@/assets/week3/room-1.jpg"),
    title: "Boston Loft Stay Guide: 553 Cislason Radial",
    description:
      "Warm brick interiors, morning coffee within walking distance, and rates starting from $125 per night.",
    hotelId: "boston-hotel",
    category: "Hotel",
  },
];

export const CATEGORY_DEALS: DealItem[] = [
  {
    id: "deal-flight",
    category: "Flight",
    title: "Round-Trip Saver to San Francisco",
    subtitle: "Pair flight + Hilton San Francisco stay and save 15%",
    price: "From $249",
    badge: "Flight Deal",
    hotelId: "hilton-sf",
  },
  {
    id: "deal-car",
    category: "Car",
    title: "Airport Compact & SUV Rentals",
    subtitle: "Free hotel parking at Hilton SF & Boston Hotel",
    price: "$39 / day",
    badge: "Car Rental",
    hotelId: "boston-hotel",
  },
  {
    id: "deal-cruise",
    category: "Cruise",
    title: "Bay & Harbor Sunset Cruise",
    subtitle: "2-hour scenic cruise departing near Austen Mountain pier",
    price: "$65 / guest",
    badge: "Cruise",
    hotelId: "hilton-sf",
  },
  {
    id: "deal-bus",
    category: "Bus",
    title: "Express City Shuttle Pass",
    subtitle: "Direct airport-to-hotel shuttle every 20 minutes",
    price: "$18 / pass",
    badge: "Bus Pass",
    hotelId: "boston-hotel",
  },
  {
    id: "deal-event",
    category: "Event",
    title: "Night Market & Rooftop Jazz",
    subtitle: "VIP entry included with weekend hotel bookings",
    price: "Included",
    badge: "Event",
    hotelId: "andaz-tokyo",
  },
  {
    id: "deal-more",
    category: "More",
    title: "Travel Insurance & Lounge Access",
    subtitle: "Flexible date changes + global airport lounge entry",
    price: "$24 / trip",
    badge: "Add-on",
    hotelId: "andaz-tokyo",
  },
];

export const getHotelById = (id?: string): HotelItem =>
  HOTELS.find((h) => h.id === id) ?? HOTELS[0];
