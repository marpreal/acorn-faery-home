import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bgImage from "../../../../assets/images/bg.jpg";
import frameImage from "../../../../assets/images/container07.png";
import AddRecipeForm from "./components/AddRecipeForm";
import { usePassword } from "../../../Password/PasswordContext";
import PasswordPrompt from "../../../Password/PasswordPrompt";
import loadingGif from "../../../../assets/images/image29.gif";
import "./Recipes.css";

const BASE_URL = "https://my-backend-1-y6yu.onrender.com/recipes";

const Recipes = () => {
  const [recipesData, setRecipesData] = useState([]);
  const [recipes, setRecipes] = useState([
    { title: "", ingredients: "", instructions: "", image: null },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const {
    isAuthenticated,
    showPasswordPrompt,
    isPasswordPromptVisible,
    hidePasswordPrompt,
  } = usePassword();

  const fetchRecipesData = async () => {
    try {
      const { data } = await axios.get(BASE_URL);
      setRecipesData(data);
    } catch (error) {
      console.error("Error fetching recipes data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, data, image) => {
    const url = action === "delete" ? `${BASE_URL}/${data._id}` : BASE_URL;
    const method =
      action === "delete" ? "delete" : action === "update" ? "put" : "post";

    try {
      const response = await axios({ method, url, data });
      if (action === "delete") {
        setRecipesData((prevData) =>
          prevData.filter((recipe) => recipe._id !== data._id)
        );
      } else {
        setRecipesData((prevData) => {
          if (action === "add") {
            return [...prevData, response.data];
          } else if (action === "update") {
            return prevData.map((recipe) =>
              recipe._id === response.data._id ? response.data : recipe
            );
          }
          return prevData;
        });
      }
      setIsFormVisible(false);
      setEditingRecipe(null);
    } catch (error) {
      console.error(
        `${action.charAt(0).toUpperCase() + action.slice(1)} error:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmit = async (recipeData) => {
    if (isAuthenticated) {
      await handleAction(editingRecipe ? "update" : "add", recipeData);
      setRecipes([
        { title: "", ingredients: "", instructions: "", image: null },
      ]);
      hidePasswordPrompt();
    } else {
      showPasswordPrompt(() =>
        handleAction(editingRecipe ? "update" : "add", recipeData)
      );
    }
  };

  const handleDelete = (recipeId) => {
    if (isAuthenticated) {
      handleAction("delete", { _id: recipeId });
    } else {
      showPasswordPrompt(() => handleAction("delete", { _id: recipeId }));
    }
  };

  const openAddForm = () => {
    if (isAuthenticated) {
      setEditingRecipe(null);
      setIsFormVisible(true);
      setRecipes(recipes);
    } else {
      showPasswordPrompt(() => {
        setEditingRecipe(null);
        setIsFormVisible(true);
        setRecipes(recipes);
      });
    }
  };

  useEffect(() => {
    fetchRecipesData();
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        fontFamily: "'Playball', cursive",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-0 flex justify-center items-center hidden lg:flex">
        <img
          src={frameImage}
          alt="Decorative Frame"
          className="w-11/12 max-w-screen-xl max-h-screen object-contain"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center w-4/5 max-w-lg z-10 mt-24">
        <div className="relative w-full h-[35vh] p-4 xs:border-0 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white xs:bg-transparent overflow-auto scroll-container">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-center">Recipes</h1>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-full">
              <img src={loadingGif} alt="Loading" className="w-16 h-16" />
              <p className="mt-2">
                Loading data (IT CAN BE A WHOLE MINUTE, I'M SORRY....)
              </p>
            </div>
          ) : recipesData.length > 0 ? (
            recipesData.map((recipe) => (
              <div key={recipe._id} className="mb-4">
                <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-32 h-32 object-cover mt-2"
                  />
                )}
                <div className="flex items-center mt-4">
                  <button
                    onClick={() => {
                      setEditingRecipe(recipe);
                      setIsFormVisible(true);
                    }}
                    className="mr-2 p-1 rounded-full hover:bg-yellow-500 transition-transform transform hover:scale-105"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="p-1 rounded-full hover:bg-red-500 transition-transform transform hover:scale-105"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No recipes available.</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-8 flex flex-col gap-4">
        <button
          onClick={openAddForm}
          className="px-4 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
        >
          Add Recipe
        </button>
      </div>

      <Link
        to="/"
        className="absolute bottom-8 right-8 px-5 py-2 bg-green-600 text-white rounded-full border border-green-800 shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105"
      >
        Back to Homepage
      </Link>

      {isFormVisible && (
        <AddRecipeForm
          onAddRecipe={handleSubmit}
          onClose={() => setIsFormVisible(false)}
          initialRecipe={editingRecipe}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      )}
      {isPasswordPromptVisible && <PasswordPrompt />}
    </div>
  );
};

export default Recipes;
