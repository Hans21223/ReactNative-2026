import { HOTELS, type ReviewItem } from "@/data/travelData";
import React, { createContext, useContext, useState, type ReactNode } from "react";

export type BookingItem = {
  id: string;
  hotelId: string;
  hotelName: string;
  roomType: string;
  nights: number;
  guests: number;
  guestName: string;
  totalPrice: number;
  createdAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  address: string;
};

type TravelAppContextValue = {
  favorites: string[];
  toggleFavorite: (hotelId: string) => void;
  isFavorite: (hotelId: string) => boolean;
  bookings: BookingItem[];
  addBooking: (booking: Omit<BookingItem, "id" | "createdAt">) => void;
  cancelBooking: (bookingId: string) => void;
  reviewsByHotel: Record<string, ReviewItem[]>;
  addReview: (hotelId: string, review: Omit<ReviewItem, "id" | "date" | "avatar">) => void;
  likedPosts: string[];
  toggleLikePost: (postId: string) => void;
  user: UserProfile | null;
  signUp: (profile: UserProfile) => void;
  signOut: () => void;
};

const TravelAppContext = createContext<TravelAppContextValue | null>(null);

const initialReviewsMap: Record<string, ReviewItem[]> = Object.fromEntries(
  HOTELS.map((h) => [h.id, h.initialReviews])
);

export function TravelAppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(["hilton-sf"]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [reviewsByHotel, setReviewsByHotel] = useState<Record<string, ReviewItem[]>>(initialReviewsMap);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  const toggleFavorite = (hotelId: string) => {
    setFavorites((prev) =>
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  const isFavorite = (hotelId: string) => favorites.includes(hotelId);

  const addBooking = (booking: Omit<BookingItem, "id" | "createdAt">) => {
    setBookings((prev) => [
      {
        ...booking,
        id: `bk-${Date.now()}`,
        createdAt: "Confirmed · Today",
      },
      ...prev,
    ]);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const addReview = (
    hotelId: string,
    review: Omit<ReviewItem, "id" | "date" | "avatar">
  ) => {
    const newItem: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`,
      date: "Nov 2026",
      avatar: require("@/assets/week3/profile-2.jpg"),
    };
    setReviewsByHotel((prev) => ({
      ...prev,
      [hotelId]: [newItem, ...(prev[hotelId] ?? [])],
    }));
  };

  const toggleLikePost = (postId: string) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const signUp = (profile: UserProfile) => setUser(profile);
  const signOut = () => setUser(null);

  return (
    <TravelAppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        bookings,
        addBooking,
        cancelBooking,
        reviewsByHotel,
        addReview,
        likedPosts,
        toggleLikePost,
        user,
        signUp,
        signOut,
      }}
    >
      {children}
    </TravelAppContext.Provider>
  );
}

export function useTravelApp() {
  const ctx = useContext(TravelAppContext);
  if (!ctx) {
    throw new Error("useTravelApp must be used inside TravelAppProvider");
  }
  return ctx;
}
