import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
  RecipeAPIResponseSchema,
} from "../schemas/recipes-schema";
import type { Drink, SearchFilter } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios.get(url);

  const res = CategoriesAPIResponseSchema.safeParse(data);

  if (res.success) {
    return res.data;
  }
}

export async function getRecipes(searchFilter: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFilter.ingredient}&c=${searchFilter.category}`;
  const { data } = await axios.get(url);

  const res = DrinksAPIResponse.safeParse(data);

  if (res.success) {
    return res.data;
  }
}

export async function getDrinkById(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios.get(url);

  if (!data.drinks) {
    return;
  }

  const res = RecipeAPIResponseSchema.safeParse(data.drinks[0]);

  if (res.success) {
    return res.data;
  }
}
