import { useMemo } from "react";
import type { Dispatch } from "react";
import type { Activity } from "../types";
import type { ActivityActions } from "../reducers/activity-reducer";
import { categories } from "../data";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  return (
    <>
      <h2 className="text-xl font-semibold tracking-tight text-cyan-500 text-center">
        Comida y actividades
      </h2>

      {activities.length === 0 && (
        <p className="text-center text-gray-400 text-sm uppercase">
          No hay actividades aún...
        </p>
      )}

      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 mt-5 bg-white flex justify-between shadow-lg"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                activity.category === 1 ? "bg-cyan-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-lg font-semibold pt-5">{activity.description}</p>
            <p className="font-black text-2xl text-cyan-500">
              {activity.calories}{" "}
              <span className="text-sm text-gray-400">Calorías</span>
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "set-activeId", payload: { id: activity.id } })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 w-8 h-8 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "delete-activity",
                  payload: { id: activity.id },
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 w-8 h-8 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
