import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import loadingGif from "../../../../../../assets/images/image29.gif";
import foodBackground from "../../../../../../assets/images/food-background.jpg";

const BASE_URL = "https://my-backend-1-y6yu.onrender.com/recipes";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      console.log(`Fetching recipe with ID: ${id}`);
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      console.log("Recipe data:", data);
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading" className="w-16 h-16" />
        <p className="mt-2">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Recipe not found.</p>
      </div>
    );
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${foodBackground})`,
        fontFamily: "'Playball', cursive",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative flex flex-col items-center justify-center w-full bg-white max-w-md z-10 mt-12 p-4 rounded-lg shadow-lg border border-yellow-800 bg-opacity-50 h-[80vh] overflow-auto">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <p>{recipe.ingredients}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <p>{recipe.instructions}</p>
        </div>
        {recipe.image && (
          <div className="w-full flex justify-center mt-4">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="max-w-full h-auto object-cover"
            />
          </div>
        )}
        <div className="mt-4">
          <Link
            to="/recipes"
            className="px-4 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
