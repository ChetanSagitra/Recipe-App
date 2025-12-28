import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ meal }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle missing meal data
  if (!meal || !meal.idMeal) {
    return null;
  }

  const hasImage = meal?.strMealThumb;
  const hasName = meal?.strMeal;

  // Don't render card if both image and name are missing
  if (!hasImage && !hasName) {
    return null;
  }

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <Link to={`/recipe/${meal.idMeal}`}>
    <div
      className="relative bg-gray-900 rounded-xl shadow-xl shadow-black/50 overflow-hidden group transform transition duration-500 cursor-pointer border border-gray-800 hover:shadow-blue-600/50"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/80 transition duration-500"></div>

      <div className="flex justify-center items-center p-5 min-h-[280px] bg-gray-800">
        {hasImage && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute h-60 w-60 rounded-xl bg-gray-700 animate-pulse"></div>
            )}
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal || "Recipe"}
              className="h-60 w-60 rounded-xl border border-yellow-400 transition duration-500 group-hover:scale-105 object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : (
          <div className="h-60 w-60 rounded-xl border border-yellow-400 bg-gray-700 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-2 text-center">
        <h3 className="text-xl pb-3 font-bold text-gray-100 mb-1 group-hover:text-blue-400 transition duration-300 line-clamp-2">
          {hasName ? meal.strMeal : "Untitled Recipe"}
        </h3>
      </div>
    </div>
    </Link>
  );
};

export default RecipeCard;
