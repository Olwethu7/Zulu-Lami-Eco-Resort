// Stripe Price IDs for Zulu Lami Room Types
// These correspond to the per-night rates for each room type

export const STRIPE_PRICE_IDS = {
  single: "price_1SNYmeJt7tSDnBRMQZ967Jka", // R750/night
  double: "price_1SNYn6Jt7tSDnBRMRNEbUbsd", // R1200/night
  family: "price_1SNYnPJt7tSDnBRMPaNMBs4A", // R2400/night
  event: "price_1SNYo2Jt7tSDnBRMgp5UrQqd", // R2000/night
} as const;

export type RoomType = keyof typeof STRIPE_PRICE_IDS;

export const getPriceIdForRoomType = (roomType: string): string | null => {
  const normalizedType = roomType.toLowerCase() as RoomType;
  return STRIPE_PRICE_IDS[normalizedType] || null;
};

