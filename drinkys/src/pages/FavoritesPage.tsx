import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import { DrinkCard } from "../components/DrinkCard";

export const FavoritesPage = () => {
  const favorites = useAppStore((state) => state.favorites);
  const hasFavorites = useMemo(() => favorites.length, [favorites]);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-center">Mis favoritos</h1>

      {hasFavorites ? (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favorites.map((fav) => (
            <DrinkCard key={fav.idDrink} drink={fav} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-lg">No hay favoritos aún.</p>
      )}
    </>
  );
};
