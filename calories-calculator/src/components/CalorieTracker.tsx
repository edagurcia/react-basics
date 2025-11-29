import { useMemo } from "react";
import { CalorieItem } from "./CalorieItem";
import type { Activity } from "../types";

type CalorieTrackerProps = {
  activities: Activity[];
};

export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

  return (
    <>
      <h2 className="text-3xl font-black text-white text-center">Resumen</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieItem value={caloriesConsumed} text="Consumidas" />
        <CalorieItem value={caloriesBurned} text="Quemadas" />
        <CalorieItem value={totalCalories} text="Total" />
      </div>
    </>
  );
};
