import type { StateCreator } from "zustand";
import {
  getCategories,
  getRecipes,
  getDrinkById,
} from "../services/RecipeService";
import type { Categories, Drinks, Drink, SearchFilter, Recipe } from "../types";

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  recipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  fetchDrinks: (searchFilter: SearchFilter) => Promise<void>;
  fetchRecipeById: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  recipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();

    set({ categories });
  },
  fetchDrinks: async (searchFilter) => {
    const drinks = await getRecipes(searchFilter);
    set({ drinks });
  },
  fetchRecipeById: async (id) => {
    const recipe = await getDrinkById(id);
    set({ recipe, modal: true });
  },
  closeModal: () => set({ recipe: {} as Recipe, modal: false }),
});
