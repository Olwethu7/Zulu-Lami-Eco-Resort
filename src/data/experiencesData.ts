export interface ExperienceItem {
  id: string;
  title: string;
  price: number | string;
  duration?: string;
  maxParticipants?: number;
  location?: string;
  description: string;
  included: string[];
  image: string;
  category: string;
  subcategory: string;
}

export const activitiesData: ExperienceItem[] = [
  // Cultural Experiences
  {
    id: "cultural-1",
    title: "Traditional Zulu Dance Performances",
    price: 250,
    duration: "1.5 hours",
    maxParticipants: 50,
    location: "Cultural Village",
    description: "Experience the vibrant energy of traditional Zulu dance performances featuring authentic costumes, rhythmic drumming, and powerful storytelling through movement.",
    included: [
      "Professional Zulu dance troupe performance",
      "Traditional music and drumming",
      "Cultural explanation and history",
      "Photo opportunities with performers",
      "Light refreshments"
    ],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    category: "activities",
    subcategory: "Cultural Experiences"
  },
  {
    id: "cultural-2",
    title: "Zulu Beadwork Workshop",
    price: 180,
    duration: "2 hours",
    maxParticipants: 15,
    location: "Artisan Studio",
    description: "Learn the ancient art of Zulu beadwork from local artisans. Create your own traditional beaded bracelet while understanding the cultural significance of colors and patterns.",
    included: [
      "Expert instruction from local artisans",
      "All materials and tools provided",
      "Take home your handmade beadwork",
      "Cultural history lesson",
      "Certificate of participation"
    ],
    image: "https://images.unsplash.com/photo-1611344518340-fe1e4e8e7638?w=800&q=80",
    category: "activities",
    subcategory: "Cultural Experiences"
  },
  {
    id: "cultural-3",
    title: "Cultural Village Tour",
    price: 200,
    duration: "2.5 hours",
    maxParticipants: 20,
    location: "Traditional Zulu Village",
    description: "Immerse yourself in authentic Zulu culture with a guided tour of a traditional village. Experience daily life, customs, and traditions passed down through generations.",
    included: [
      "Guided tour with cultural expert",
      "Visit traditional homesteads",
      "Meet community members",
      "Traditional welcome ceremony",
      "Souvenir gift"
    ],
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    category: "activities",
    subcategory: "Cultural Experiences"
  },
  {
    id: "cultural-4",
    title: "Traditional Zulu Cooking Class",
    price: 220,
    duration: "3 hours",
    maxParticipants: 12,
    location: "Resort Kitchen",
    description: "Learn to prepare authentic Zulu dishes using traditional methods and local ingredients. Enjoy the fruits of your labor in a communal dining experience.",
    included: [
      "Hands-on cooking instruction",
      "All ingredients and equipment",
      "Recipe booklet to take home",
      "Full meal prepared and enjoyed together",
      "Traditional cooking utensils demonstration"
    ],
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    category: "activities",
    subcategory: "Cultural Experiences"
  },
  // Nature & Adventure Activities
  {
    id: "nature-1",
    title: "Wildlife Safari Tours",
    price: 450,
    duration: "4 hours",
    maxParticipants: 8,
    location: "Jozini Game Reserve",
    description: "Embark on an unforgettable safari adventure through the stunning landscapes of KwaZulu-Natal. Spot the Big Five and learn about conservation efforts.",
    included: [
      "Professional safari guide",
      "4x4 safari vehicle",
      "Binoculars and field guide",
      "Refreshments and snacks",
      "Game viewing photography tips"
    ],
    image: "/src/assets/experiences/zebra.jpg",
    category: "activities",
    subcategory: "Nature & Adventure Activities"
  },
  {
    id: "nature-2",
    title: "Tiger Fishing",
    price: 450,
    duration: "5 hours",
    maxParticipants: 4,
    location: "Jozini Dam",
    description: "Test your skills against the legendary tiger fish in the pristine waters of Jozini Dam. An angler's dream adventure with expert guides.",
    included: [
      "Experienced fishing guide",
      "All fishing equipment",
      "Boat and fuel",
      "Fishing license",
      "Catch and release photos"
    ],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    category: "activities",
    subcategory: "Nature & Adventure Activities"
  },
  {
    id: "nature-3",
    title: "Nature Hiking Trails",
    price: 180,
    duration: "3 hours",
    maxParticipants: 15,
    location: "Resort Trails",
    description: "Explore the breathtaking natural beauty of KwaZulu-Natal on guided hiking trails. Discover local flora, fauna, and stunning viewpoints.",
    included: [
      "Expert trail guide",
      "Trail map and information",
      "Water and energy snacks",
      "First aid support",
      "Bird watching guide"
    ],
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    category: "activities",
    subcategory: "Nature & Adventure Activities"
  },
  {
    id: "nature-4",
    title: "Jozini Dam Boating",
    price: 300,
    duration: "2 hours",
    maxParticipants: 10,
    location: "Jozini Dam",
    description: "Cruise the serene waters of Jozini Dam, taking in spectacular views and watching wildlife along the shores. Perfect for families and nature lovers.",
    included: [
      "Luxury boat cruise",
      "Licensed boat captain",
      "Life jackets and safety equipment",
      "Soft drinks and snacks",
      "Sunset viewing (evening tours)"
    ],
    image: "/src/assets/experiences/kayaking.jpg",
    category: "activities",
    subcategory: "Nature & Adventure Activities"
  },
  {
    id: "nature-5",
    title: "Bird Watching Tours",
    price: 150,
    duration: "2.5 hours",
    maxParticipants: 12,
    location: "Wetland Reserve",
    description: "Discover the incredible diversity of bird species in the region with expert ornithologists. Perfect for beginners and enthusiasts alike.",
    included: [
      "Expert bird guide",
      "Binoculars provided",
      "Bird identification booklet",
      "Morning refreshments",
      "Species checklist"
    ],
    image: "/src/assets/experiences/birds.jpg",
    category: "activities",
    subcategory: "Nature & Adventure Activities"
  },
  // Relaxation & Resort Activities
  {
    id: "relax-1",
    title: "Open-Air Bath Swimming Pool",
    price: "Free",
    duration: "All day",
    location: "Main Resort",
    description: "Enjoy our stunning open-air swimming pool surrounded by natural beauty. Perfect for relaxation and family fun with spectacular views.",
    included: [
      "Pool access all day",
      "Lounge chairs and umbrellas",
      "Pool towels provided",
      "Lifeguard on duty",
      "Poolside service available"
    ],
    image: "/src/assets/experiences/pool.jpg",
    category: "activities",
    subcategory: "Relaxation & Resort Activities"
  },
  {
    id: "relax-2",
    title: "Sunset Viewing",
    price: "Free",
    duration: "1 hour",
    location: "Sunset Point",
    description: "Experience breathtaking African sunsets from our specially designed viewing area. A magical way to end your day at Zulu Lami.",
    included: [
      "Prime viewing location",
      "Seating provided",
      "Photography tips available",
      "Complimentary beverage",
      "Tranquil atmosphere"
    ],
    image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80",
    category: "activities",
    subcategory: "Relaxation & Resort Activities"
  },
  {
    id: "relax-3",
    title: "Stargazing Sessions",
    price: "Free",
    duration: "1.5 hours",
    location: "Observatory Deck",
    description: "Discover the southern hemisphere's night sky away from city lights. Learn about constellations and African astronomy traditions.",
    included: [
      "Telescope access",
      "Astronomy guide",
      "Star maps provided",
      "Hot chocolate",
      "Blankets for comfort"
    ],
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    category: "activities",
    subcategory: "Relaxation & Resort Activities"
  }
];

export const foodData: ExperienceItem[] = [
  // Meals & Main Dishes
  {
    id: "meal-1",
    title: "Traditional Zulu Feast",
    price: 280,
    duration: "2 hours",
    location: "Main Restaurant",
    description: "Indulge in an authentic Zulu feast featuring traditional dishes prepared with locally sourced ingredients and time-honored recipes.",
    included: [
      "Multi-course traditional meal",
      "Cultural dining experience",
      "Live traditional music",
      "Chef's welcome",
      "Recipe cards"
    ],
    image: "/src/assets/experiences/restaurant-view.jpg",
    category: "food",
    subcategory: "Meals & Main Dishes"
  },
  {
    id: "meal-2",
    title: "Bread Platter",
    price: 95,
    location: "All Dining Areas",
    description: "Artisan bread platter featuring freshly baked traditional breads with local honey, butter, and preserves.",
    included: [
      "Assorted fresh breads",
      "Local honey and preserves",
      "Butter selection",
      "Olive oil and balsamic",
      "Perfect for sharing"
    ],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    category: "food",
    subcategory: "Meals & Main Dishes"
  },
  {
    id: "meal-3",
    title: "Braai Experience",
    price: 195,
    duration: "3 hours",
    location: "Braai Area",
    description: "Traditional South African BBQ experience with premium meats, sides, and the authentic braai atmosphere.",
    included: [
      "Selection of premium meats",
      "Traditional sides and salads",
      "Braai master assistance",
      "Wood fire setup",
      "Outdoor seating"
    ],
    image: "/src/assets/experiences/braai-platter.jpg",
    category: "food",
    subcategory: "Meals & Main Dishes"
  },
  // Beverages & Drinks
  {
    id: "beverage-1",
    title: "Cocktails",
    price: 40,
    location: "Bar & Pool Area",
    description: "Handcrafted cocktails made with premium spirits and fresh local ingredients.",
    included: [
      "Premium spirits",
      "Fresh ingredients",
      "Expert mixology",
      "Beautiful presentation",
      "Various flavors available"
    ],
    image: "/src/assets/experiences/bar-setup.jpg",
    category: "food",
    subcategory: "Beverages & Drinks"
  },
  {
    id: "beverage-2",
    title: "Mocktails",
    price: 35,
    location: "Bar & Pool Area",
    description: "Refreshing non-alcoholic cocktails perfect for all ages, crafted with fresh fruits and herbs.",
    included: [
      "Fresh fruit juices",
      "Herbal infusions",
      "Creative presentation",
      "Zero alcohol",
      "Family-friendly"
    ],
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&q=80",
    category: "food",
    subcategory: "Beverages & Drinks"
  },
  {
    id: "beverage-3",
    title: "Milkshakes",
    price: 30,
    location: "Café & Pool Bar",
    description: "Thick, creamy milkshakes in classic and exotic flavors.",
    included: [
      "Premium ice cream",
      "Fresh milk",
      "Various flavors",
      "Whipped cream topping",
      "Large portions"
    ],
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80",
    category: "food",
    subcategory: "Beverages & Drinks"
  },
  {
    id: "beverage-4",
    title: "Smoothies",
    price: 30,
    location: "Health Bar",
    description: "Nutritious fruit and vegetable smoothies made with fresh local produce.",
    included: [
      "Fresh fruits and vegetables",
      "Natural sweeteners",
      "Protein options available",
      "Vitamin-rich",
      "Customizable"
    ],
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80",
    category: "food",
    subcategory: "Beverages & Drinks"
  },
  {
    id: "beverage-5",
    title: "Fruit Juice",
    price: 25,
    location: "All Dining Areas",
    description: "Freshly squeezed juices from locally sourced fruits.",
    included: [
      "100% fresh fruit",
      "No added sugar",
      "Seasonal varieties",
      "Large servings",
      "Nutrient-rich"
    ],
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80",
    category: "food",
    subcategory: "Beverages & Drinks"
  },
  // Breakfast & Light Meals
  {
    id: "breakfast-1",
    title: "Continental Breakfast",
    price: 120,
    location: "Main Restaurant",
    description: "Light and fresh breakfast featuring pastries, fruits, cereals, and beverages.",
    included: [
      "Fresh pastries and breads",
      "Seasonal fruit platter",
      "Cereals and yogurt",
      "Juice and coffee/tea",
      "Preserves and spreads"
    ],
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
    category: "food",
    subcategory: "Breakfast & Light Meals"
  },
  {
    id: "breakfast-2",
    title: "Full English Breakfast",
    price: 180,
    location: "Main Restaurant",
    description: "Hearty breakfast with eggs, bacon, sausages, tomatoes, mushrooms, and toast.",
    included: [
      "Eggs cooked to order",
      "Bacon and sausages",
      "Grilled tomatoes and mushrooms",
      "Toast and butter",
      "Coffee or tea"
    ],
    image: "/src/assets/experiences/breakfast-plate.jpg",
    category: "food",
    subcategory: "Breakfast & Light Meals"
  },
  // Traditional Zulu Specialties
  {
    id: "traditional-1",
    title: "Umqombothi Traditional Beer",
    price: 50,
    location: "Cultural Bar",
    description: "Traditional Zulu beer brewed using time-honored methods with maize, sorghum, and yeast.",
    included: [
      "Authentic brewing method",
      "Traditional serving vessel",
      "Cultural explanation",
      "Moderate alcohol content",
      "Sharing experience"
    ],
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80",
    category: "food",
    subcategory: "Traditional Zulu Specialties"
  },
  {
    id: "traditional-2",
    title: "Amasi Traditional Milk",
    price: 30,
    location: "Cultural Bar",
    description: "Traditional fermented milk, a staple in Zulu culture, served fresh and authentic.",
    included: [
      "Freshly fermented milk",
      "Traditional preparation",
      "Cultural significance story",
      "Probiotic-rich",
      "Authentic taste"
    ],
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80",
    category: "food",
    subcategory: "Traditional Zulu Specialties"
  }
];

export const allExperiences = [...activitiesData, ...foodData];
