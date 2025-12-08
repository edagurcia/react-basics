import type { StateCreator } from "zustand";
import type { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFavoritesFromLocal: () => void;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  toggleFavorite: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        ),
      }));
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
    }
    sessionStorage.setItem("my-drinks", JSON.stringify(get().favorites));
  },
  favoriteExist: (id) => {
    return get().favorites.some((fav) => fav.idDrink === id);
  },
  loadFavoritesFromLocal: () => {
    const localFavorites = sessionStorage.getItem("my-drinks");
    if (localFavorites) {
      set({
        favorites: JSON.parse(localFavorites),
      });
    }
  },
});
