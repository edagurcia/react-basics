import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ChangeEvent, Dispatch, FormEvent } from "react";
import { categories } from "../data";
import type { Activity } from "../types";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState = {
  id: uuidv4(),
  category: 1,
  description: "",
  calories: 0,
};

export const Form = ({ state, dispatch }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];

      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { description, calories } = activity;
    return description.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-semibold">
          Categoría:
        </label>
        <select
          name="category"
          id="category"
          value={activity.category}
          onChange={handleChange}
          className="border border-slate-200 p-2 rounded-lg w-full bg-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="description" className="font-semibold">
          Actividad:
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={activity.description}
          onChange={handleChange}
          placeholder="Ej: Correr 5km, comer ensalada, tomar jugo"
          className="border border-slate-200 p-2 rounded-lg w-full bg-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-semibold">
          Calorías:
        </label>
        <input
          type="number"
          name="calories"
          id="calories"
          value={activity.calories}
          onChange={handleChange}
          placeholder="Ej: 200 o 300"
          className="border border-slate-200 p-2 rounded-lg w-full bg-white"
        />
      </div>

      <input
        type="submit"
        value={`Guardar ${activity.category === 1 ? "Comida" : "Ejercicio"}`}
        disabled={!isValidActivity()}
        className="bg-gray-700 hover:bg-gray-900 w-full p-2 font-semibold uppercase text-white rounded-lg cursor-pointer disabled:opacity-10"
      />
    </form>
  );
};
