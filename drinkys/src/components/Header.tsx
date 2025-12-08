import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export const Header = () => {
  const [searchFilter, setSearchFilter] = useState({
    ingredient: "",
    category: "",
  });

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const categories = useAppStore((state) => state.categories);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const fetchDrinks = useAppStore((state) => state.fetchDrinks);
  const showNotification = useAppStore((state) => state.showNotification);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilter).includes("")) {
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    fetchDrinks(searchFilter);
  };

  return (
    <header className={isHome ? "background-image-header" : "bg-slate-800"}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" alt="Logo Drinkys" className="w-32" />
          </div>
          <nav className="flex gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingredientes
              </label>

              <input
                type="text"
                name="ingredient"
                id="ingredient"
                value={searchFilter.ingredient}
                onChange={handleChange}
                placeholder="Nombre o ingrediente. Eje: Vodka"
                className="p-3 w-full rounded-lg focus:outline-none bg-white"
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>

              <select
                name="category"
                id="category"
                value={searchFilter.category}
                onChange={handleChange}
                className="p-3 w-full rounded-lg focus:outline-none bg-white"
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              value="Buscar recetas"
              className="p-2 cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full rounded-lg uppercase duration-200 ease-in-out"
            />
          </form>
        )}
      </div>
    </header>
  );
};
