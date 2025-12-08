import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type JSX } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { Recipe } from "../types";

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const recipe = useAppStore((state) => state.recipe);
  const closeModal = useAppStore((state) => state.closeModal);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const favoriteExist = useAppStore((state) => state.favoriteExist);
  const showNotification = useAppStore((state) => state.showNotification);

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="text-sm tracking-tight font-normal">
            {ingredient} - {measure}
          </li>
        );
      }
    }

    return ingredients;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-50 scale-80"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {recipe.strDrink}
                  </Dialog.Title>
                  <img
                    src={recipe.strDrinkThumb}
                    alt={`Imagen de ${recipe.strDrink}`}
                    className="mx-auto w-72 rounded-lg shadow-lg"
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Ingredientes y Cantidades
                  </Dialog.Title>
                  <div className="px-4">{renderIngredients()}</div>
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Instrucciones
                  </Dialog.Title>
                  <p className="text-sm">{recipe.strInstructions}</p>

                  <div className="mt-5 flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-2 cursor-pointer bg-gray-800 hover:bg-gray-900 text-white shadow font-extrabold w-full rounded-lg uppercase duration-200 ease-in-out"
                    >
                      Cerrar
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        toggleFavorite(recipe);
                        if (!favoriteExist(recipe.idDrink)) {
                          showNotification({
                            text: "Se elimino de favoritos",
                            error: false,
                          });
                        } else {
                          showNotification({
                            text: "Se agrego a favoritos",
                            error: false,
                          });
                        }
                        closeModal();
                      }}
                      className="p-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white shadow font-extrabold w-full rounded-lg uppercase duration-200 ease-in-out"
                    >
                      {favoriteExist(recipe.idDrink)
                        ? "Eliminar de "
                        : "Agregar a "}{" "}
                      favoritos
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
