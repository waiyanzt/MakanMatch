export interface Preference {
  cuisine: string;
  flavor1: string;
  flavor2: string;
  foodType1: string;
  foodType2: string;
  vibe: string;
}

export interface FoodItem {
  name: string;
  cuisine: string;
  flavors: string[];
  foodTypes: string[];
  vibe: string;
}

export interface FoodRecommendation {
  name: string;
  score: number;
}
