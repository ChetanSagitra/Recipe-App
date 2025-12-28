import React, { useEffect, useState } from "react";

export const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const json = await res.json();
        
        // Filter out meals with missing critical data
        if (json?.meals && Array.isArray(json.meals)) {
          const completeMeals = json.meals.filter(
            (meal) => meal && meal.idMeal && meal.strMealThumb && meal.strMeal
          );
          setData({ ...json, meals: completeMeals });
        } else {
          setData(json);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return {data,loading,error};
};
