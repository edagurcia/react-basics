import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import { Form } from "./components/Form";
import { ActivityList } from "./components/ActivityList";
import { CalorieTracker } from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    sessionStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const noActivities = useMemo(() => {
    return state.activities.length === 0;
  }, [state.activities]);

  return (
    <>
      <header className="bg-cyan-400 py-2 px-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-semibold uppercase text-white">
            Contador de calorías
          </h1>
          <button
            type="button"
            onClick={() => dispatch({ type: "reset-app" })}
            disabled={noActivities}
            className="bg-red-600 text-white uppercase cursor-pointer text-sm p-2 rounded-lg disabled:opacity-40"
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-cyan-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form state={state} dispatch={dispatch} />
        </div>
      </section>

      <section className="bg-gray-900 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
