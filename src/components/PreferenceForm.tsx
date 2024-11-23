import { useState } from "react";

interface Preference {
  cuisine: string;
  flavor1: string;
  flavor2: string;
  foodType1: string;
  foodType2: string;
  vibe: string;
}

interface FoodRecommendation {
  name: string;
  score: number;
}

const INITIAL_PREFERENCES: Preference = {
  cuisine: "",
  flavor1: "",
  flavor2: "",
  foodType1: "",
  foodType2: "",
  vibe: "",
};

const cuisines = [
  "Italian",
  "Indian",
  "Japanese",
  "Mexican",
  "Chinese",
  "Thai",
];
const flavors = ["Sweet", "Spicy", "Sour", "Umami", "Salty"];
const foodTypes = ["Vegan", "Seafood", "Meat", "Vegetarian", "Halal"];
const vibes = ["Casual", "Fancy", "Street Food", "Fine Dining"];

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
    // TODO: Replace with actual API call
    const mockRecommendations: FoodRecommendation[] = [
      { name: "Sushi Platter", score: 95 },
      { name: "Pad Thai", score: 88 },
      { name: "Pizza Margherita", score: 82 },
    ];
    setRecommendations(mockRecommendations);
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
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Cuisine
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

          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Flavor 1
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

          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Flavor 2
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

          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Food Type 1
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

          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Food Type 2
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

          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Vibe
            </label>
            <select
              name="vibe"
              value={preferences.vibe}
              onChange={handleChange}
              style={selectStyles}
            >
              <option value="">Select Vibe</option>
              {vibes.map((vibe) => (
                <option key={vibe} value={vibe}>
                  {vibe}
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
          <h2 style={{ marginBottom: "20px", color: "#333" }}>
            Recommended Dishes
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
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
