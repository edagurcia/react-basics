import { create } from "zustand";
import { createRecipesSlice, type RecipesSliceType } from "./recipeSlice";
import {
  createFavoritesSlice,
  type FavoritesSliceType,
} from "./favoritesSlice";
import {
  createNotificationsSlice,
  type NotificationSliceType,
} from "./notificationsSlice";

export const useAppStore = create<
  RecipesSliceType & FavoritesSliceType & NotificationSliceType
>((...a) => ({
  ...createRecipesSlice(...a),
  ...createFavoritesSlice(...a),
  ...createNotificationsSlice(...a),
}));
