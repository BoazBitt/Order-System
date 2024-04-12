import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/user.slice";
import { User } from "./slice/user.slice";

type SliceStateTypes = User;

export const saveSliceToLocalStorage = (
  sliceName: string,
  sliceState: SliceStateTypes
) => {
  try {
    const serialisedState = JSON.stringify(sliceState);
    localStorage.setItem(`${sliceName}`, serialisedState);
  } catch (e) {
    console.log("Error saving state to Local");
  }
};

export const loadSliceFromLocalStorage = (sliceName: string) => {
  try {
    const serialisedState = localStorage.getItem(`${sliceName}`);
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    return undefined;
  }
};

const userStorage = loadSliceFromLocalStorage("user");

const store = configureStore({
  reducer: {
    user: UserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: {
    user: userStorage,
  },
});

store.subscribe(() => {
  const { user } = store.getState();
  saveSliceToLocalStorage("user", user);
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
