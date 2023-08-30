import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./feature/CounterSlice";

export const store = configureStore({
  reducer: {counter:CounterSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
