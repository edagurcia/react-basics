import { useAppStore } from "../stores/useAppStore";
import type { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};

export const DrinkCard = ({ drink }: DrinkCardProps) => {
  const fetchRecipeById = useAppStore((state) => state.fetchRecipeById);

  return (
    <div className="border shadow-lg rounded-lg">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className="hover:scale-125 transition transform duration-200 ease-in-out"
        />
      </div>

      <div className="p-5 ">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          type="button"
          onClick={() => fetchRecipeById(drink.idDrink)}
          className="p-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white w-full rounded-lg duration-200 ease-in-out mt-5"
        >
          Ver receta
        </button>
      </div>
    </div>
  );
};
