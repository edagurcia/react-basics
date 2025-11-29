import type { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activeId";
      payload: { id: Activity["id"] };
    }
  | {
      type: "delete-activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "reset-app";
    };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const sessionStorageActivities = (): Activity[] => {
  const activities = sessionStorage.getItem("activities");

  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: sessionStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];

    if (state.activeId) {
      updatedActivities = state.activities.map((stateActivity) =>
        stateActivity.id === state.activeId
          ? action.payload.newActivity
          : stateActivity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (stateActivity) => stateActivity.id !== action.payload.id
      ),
    };
  }

  if (action.type === "reset-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
