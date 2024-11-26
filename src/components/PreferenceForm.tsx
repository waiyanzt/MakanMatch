import { useState } from "react";
import { getRecommendations } from "../utils/recommendationAlgorithm";
import { Preference, FoodRecommendation } from "../types";

const INITIAL_PREFERENCES: Preference = {
  cuisine: "",
  flavor1: "",
  flavor2: "",
  foodType1: "",
  foodType2: "",
  vibe: "",
};

const cuisines = [
  "Peranakan",
  "Indian",
  "Malay",
  "Western",
  "Chinese",
  "Thai",
  "Indonesian",
];
const flavors = ["Sweet", "Spicy", "Sour", "Umami", "Salty"];
const foodTypes = [
  "Non-Veg",
  "Non-Halal",
  "Seafood",
  "Meat",
  "Vegetarian",
  "Halal",
];
const vibeTypes = ["Casual", "Fancy", "Street Food & Snacks", "Comfort Food"];

const selectStyles = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  backgroundColor: "#dc4f9c",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
};

export function PreferenceForm() {
  const [preferences, setPreferences] =
    useState<Preference>(INITIAL_PREFERENCES);
  const [recommendations, setRecommendations] = useState<FoodRecommendation[]>(
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const recs = getRecommendations(preferences);
    setRecommendations(recs);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Cuisine Select */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Preferred Cuisine 🌍
            </label>
            <select
              name="cuisine"
              value={preferences.cuisine}
              onChange={handleChange}
              style={selectStyles}
            >
              <option value="">Select Cuisine</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {/* Flavor 1 Select */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Preferred flavour palate one
            </label>
            <select
              name="flavor1"
              value={preferences.flavor1}
              onChange={handleChange}
              style={selectStyles}
            >
              <option value="">Select Flavor</option>
              {flavors.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>

          {/* Flavor 2 Select */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Preferred flavour palette two
            </label>
            <select
              name="flavor2"
              value={preferences.flavor2}
              onChange={handleChange}
              style={selectStyles}
            >
              <option value="">Select Flavor</option>
              {flavors.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>

          {/* Food Type 1 Select */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Food preference one
            </label>
            <select
              name="foodType1"
              value={preferences.foodType1}
              onChange={handleChange}
              style={selectStyles}
            >
              <option value="">Select Food Type</option>
              {foodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Food Type 2 Select */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Food preference two
            </label>
            <select
              name="foodType2"
              value={preferences.foodType2}
              onChange={handleChange}
              style={selectStyles}
            >
              <option value="">Select Food Type</option>
              {foodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Vibe Select */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Vibe for the day 🍸✨
            </label>
            <select
              name="vibe"
              value={preferences.vibe}
              onChange={handleChange}
              style={selectStyles}
            >
              <option value="">Select Vibe</option>
              {vibeTypes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            backgroundColor: "#442F91",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Get Recommendations
        </button>
      </form>

      {recommendations.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#333" }}>Recommended Dishes</h2>
          </div>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
            {recommendations.map((dish, index) => (
              <li
                key={index}
                style={{
                  padding: "15px",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {dish.name} - Match Score: {dish.score}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
