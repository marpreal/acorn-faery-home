import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bgImage from "../../../../assets/images/bg.jpg";
import frameImage from "../../../../assets/images/container07.png";
import AddRecipeForm from "./components/Form/AddRecipeForm";
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

  const handleAction = async (action, data) => {
    const url =
      action === "delete"
        ? `${BASE_URL}/${data._id}`
        : action === "update"
        ? `${BASE_URL}/${editingRecipe._id}`
        : BASE_URL;
    const method =
      action === "delete" ? "delete" : action === "update" ? "put" : "post";
    try {
      const response = await axios({
        method,
        url,
        data,
        headers: { "Content-Type": "multipart/form-data" },
      });
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
    } else {
      showPasswordPrompt(() => {
        setEditingRecipe(null);
        setIsFormVisible(true);
      });
    }
  };

  useEffect(() => {
    fetchRecipesData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredRecipes = selectedCategory
    ? recipesData.filter((recipe) => recipe.category === selectedCategory)
    : recipesData;

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
          className="w-full max-w-screen-xl max-h-screen object-contain"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center w-4/5 max-w-lg z-10 mt-24">
        <div className="relative w-full h-[35vh] p-4 xs:border-0 border-4 border-yellow-800 rounded-lg bg-opacity-30 bg-white xs:bg-transparent overflow-auto scroll-container">
          <div className="flex justify-center items-center mb-6 relative">
            <h1 className="text-2xl font-bold text-center">Recipes</h1>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 rounded-lg shadow-md ml-8"
              style={{ backgroundColor: "#8A9A5B", marginLeft: '180px' }}
            >
              <option value="">All Categories</option>
              <option value="desserts">Desserts</option>
              <option value="snacks">Snacks</option>
              <option value="main">Main</option>
              <option value="side">Side</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center">
              <img src={loadingGif} alt="Loading" className="w-16 h-16" />
              <p className="mt-2">
                Loading data (IT CAN BE A WHOLE MINUTE, I'M SORRY....)
              </p>
            </div>
          ) : filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe._id} className="mb-4">
                <Link
                  to={`/recipes/${recipe._id}`}
                  className="text-lg font-semibold mb-2"
                >
                  {recipe.title}
                </Link>
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
