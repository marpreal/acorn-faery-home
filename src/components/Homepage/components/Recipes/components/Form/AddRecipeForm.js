import React, { useState, useEffect } from "react";
import "./AddRecipeForm.css";

const AddRecipeForm = ({
  onAddRecipe,
  onClose,
  isMultiple: initialIsMultiple,
  initialRecipe,
  recipes,
  setRecipes,
}) => {
  const [errors, setErrors] = useState({});
  const [isMultiple, setIsMultiple] = useState(initialIsMultiple);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => setIsMultiple(initialIsMultiple), [initialIsMultiple]);

  useEffect(() => {
    if (initialRecipe) {
      setRecipes([initialRecipe]);
      if (initialRecipe.image && !initialRecipe.image.startsWith("data:")) {
        setImagePreviews([initialRecipe.image]);
      } else if (initialRecipe.image) {
        setImagePreviews([URL.createObjectURL(initialRecipe.image)]);
      }
    } else {
      setImagePreviews([]);
    }
  }, [initialRecipe]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setRecipes((prevRecipes) => {
      const updatedRecipes = [...prevRecipes];
      updatedRecipes[index][name] = value;
      return updatedRecipes;
    });
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    setRecipes((prevRecipes) => {
      const updatedRecipes = [...prevRecipes];
      updatedRecipes[index].image = file;
      return updatedRecipes;
    });

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prevPreviews) => {
        const updatedPreviews = [...prevPreviews];
        updatedPreviews[index] = previewUrl;
        return updatedPreviews;
      });
    }
  };

  const handleAddRecipeField = () =>
    setRecipes((prevRecipes) => [
      ...prevRecipes,
      { title: "", ingredients: "", instructions: "", image: null },
    ]);

  const handleRemoveRecipeField = (index) =>
    setRecipes((prevRecipes) => prevRecipes.filter((_, i) => i !== index));

  const validateRecipes = (recipes) =>
    recipes.reduce((acc, recipe, index) => {
      const errors = {};
      if (!recipe.title) {
        errors[`title-${index}`] = "Title is required.";
      }
      if (!recipe.ingredients) {
        errors[`ingredients-${index}`] = "Ingredients are required.";
      }
      if (!recipe.instructions) {
        errors[`instructions-${index}`] = "Instructions are required.";
      }
      return { ...acc, ...errors };
    }, {});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateRecipes(recipes);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await Promise.all(
        recipes.map((recipe) => {
          const formData = new FormData();
          formData.append("title", recipe.title);
          formData.append("ingredients", recipe.ingredients);
          formData.append("instructions", recipe.instructions);
          if (recipe.image) {
            formData.append("image", recipe.image);
          }
          return onAddRecipe(formData);
        })
      );
      setRecipes([
        { title: "", ingredients: "", instructions: "", image: null },
      ]);
      setErrors({});
      setImagePreviews([]);
      onClose();
    } catch (error) {
      console.error("Error adding recipes:", error);
      alert("Failed to add recipes. Please try again.");
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>{initialRecipe ? "Edit Recipe" : "Add New Recipes"}</h2>
        <form onSubmit={handleSubmit}>
          {recipes.map((recipe, index) => (
            <div key={index} className="mb-4">
              <div className="form-group">
                <label htmlFor={`title-${index}`}>Title:</label>
                <input
                  type="text"
                  id={`title-${index}`}
                  name="title"
                  value={recipe.title}
                  onChange={(e) => handleInputChange(index, e)}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${
                    errors[`title-${index}`] ? "border-red-500" : ""
                  }`}
                />
                {errors[`title-${index}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`title-${index}`]}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor={`ingredients-${index}`}>Ingredients:</label>
                <textarea
                  id={`ingredients-${index}`}
                  name="ingredients"
                  value={recipe.ingredients}
                  onChange={(e) => handleInputChange(index, e)}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${
                    errors[`ingredients-${index}`] ? "border-red-500" : ""
                  }`}
                />
                {errors[`ingredients-${index}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`ingredients-${index}`]}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor={`instructions-${index}`}>Instructions:</label>
                <textarea
                  id={`instructions-${index}`}
                  name="instructions"
                  value={recipe.instructions}
                  onChange={(e) => handleInputChange(index, e)}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${
                    errors[`instructions-${index}`] ? "border-red-500" : ""
                  }`}
                />
                {errors[`instructions-${index}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`instructions-${index}`]}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor={`image-${index}`}>Upload Image:</label>
                <input
                  type="file"
                  id={`image-${index}`}
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e)}
                />
                {imagePreviews[index] && (
                  <img
                    src={imagePreviews[index]}
                    alt="Preview"
                    className="image-preview"
                  />
                )}
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRecipeField(index)}
                  className="mt-2 bg-red-500 text-white py-1 px-2 rounded-full"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {isMultiple && !initialRecipe && (
            <button
              type="button"
              onClick={handleAddRecipeField}
              className="mb-4 bg-blue-500 text-white py-1 px-2 rounded-full"
            >
              Add Another Recipe
            </button>
          )}

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              {initialRecipe ? "Update Recipe" : "Add Recipes"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
