import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import UserSlice from "./feature/UserSlice";
import NotesSlice from "./feature/NotesSlice";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        user: UserSlice,
        notes: NotesSlice,
    })
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
