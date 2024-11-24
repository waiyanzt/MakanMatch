import { Preference, FoodItem, FoodRecommendation } from "../types";
import { foodDatabase } from "../data/foodData";

interface WeightedScores {
  flavorWeight: number;
  foodTypeWeight: number;
  vibeWeight: number;
}

const DEFAULT_WEIGHTS: WeightedScores = {
  flavorWeight: 0.5, // 50% importance
  foodTypeWeight: 0.3, // 30% importance
  vibeWeight: 0.2, // 20% importance
};

export function getRecommendations(
  preferences: Preference,
  foodItems: FoodItem[] = foodDatabase,
  weights: WeightedScores = DEFAULT_WEIGHTS,
): FoodRecommendation[] {
  // If no preferences selected, return empty array
  if (!isAnyPreferenceSelected(preferences)) {
    return [];
  }

  // First, strictly filter by cuisine if selected
  let filteredItems = foodItems;
  if (preferences.cuisine) {
    filteredItems = filteredItems.filter(
      (item) => item.cuisine === preferences.cuisine,
    );
  }

  // If no items match the cuisine, return empty array
  if (filteredItems.length === 0) {
    return [];
  }

  // Then strictly filter by dietary restrictions
  filteredItems = filterByDietaryRestrictions(filteredItems, preferences);

  // If no items match after dietary filtering, return empty array
  if (filteredItems.length === 0) {
    return [];
  }

  // Calculate scores for remaining items
  const scoredItems = filteredItems.map((item) => ({
    name: item.name,
    score: calculateMatchScore(item, preferences, weights),
  }));

  // Sort by score descending and filter out low scores
  const recommendations = scoredItems
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 40); // Only include items with >40% match

  // Return all matching items (no artificial limit)
  return recommendations;
}

function isAnyPreferenceSelected(preferences: Preference): boolean {
  return Object.values(preferences).some((value) => value !== "");
}

function filterByDietaryRestrictions(
  foodItems: FoodItem[],
  preferences: Preference,
): FoodItem[] {
  return foodItems.filter((item) => {
    // Strict Vegetarian check
    if (
      preferences.foodType1 === "Vegetarian" ||
      preferences.foodType2 === "Vegetarian"
    ) {
      if (
        item.foodTypes.includes("Meat") ||
        item.foodTypes.includes("Seafood") ||
        item.foodTypes.includes("Non-Veg") ||
        item.foodTypes.includes("Non-Halal")
      ) {
        return false;
      }
    }

    // Strict Halal check
    if (
      preferences.foodType1 === "Halal" ||
      preferences.foodType2 === "Halal"
    ) {
      if (item.foodTypes.includes("Non-Halal")) {
        return false;
      }
    }

    // Strict Seafood preference
    if (
      preferences.foodType1 === "Seafood" ||
      preferences.foodType2 === "Seafood"
    ) {
      if (!item.foodTypes.includes("Seafood")) {
        return false;
      }
    }

    // Strict Meat preference
    if (preferences.foodType1 === "Meat" || preferences.foodType2 === "Meat") {
      if (!item.foodTypes.includes("Meat")) {
        return false;
      }
    }

    return true;
  });
}

function calculateMatchScore(
  item: FoodItem,
  preferences: Preference,
  weights: WeightedScores,
): number {
  const flavorScore = calculateFlavorScore(item, preferences);
  const foodTypeScore = calculateFoodTypeScore(item, preferences);
  const vibeScore = calculateVibeScore(item, preferences);

  const weightedScore =
    flavorScore * weights.flavorWeight +
    foodTypeScore * weights.foodTypeWeight +
    vibeScore * weights.vibeWeight;

  // Convert to percentage and round to nearest integer
  return Math.round(weightedScore * 100);
}

function calculateFlavorScore(item: FoodItem, preferences: Preference): number {
  const preferredFlavors = [preferences.flavor1, preferences.flavor2].filter(
    (f) => f !== "",
  );

  if (preferredFlavors.length === 0) return 1;

  const matchingFlavors = preferredFlavors.filter((flavor) =>
    item.flavors.includes(flavor),
  );

  return matchingFlavors.length / preferredFlavors.length;
}

function calculateFoodTypeScore(
  item: FoodItem,
  preferences: Preference,
): number {
  const preferredTypes = [preferences.foodType1, preferences.foodType2].filter(
    (t) => t !== "",
  );

  if (preferredTypes.length === 0) return 1;

  const matchingTypes = preferredTypes.filter((type) =>
    item.foodTypes.includes(type),
  );

  return matchingTypes.length / preferredTypes.length;
}

function calculateVibeScore(item: FoodItem, preferences: Preference): number {
  if (!preferences.vibe) return 1;
  return item.vibe === preferences.vibe ? 1 : 0;
}
