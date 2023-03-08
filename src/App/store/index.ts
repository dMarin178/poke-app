import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import pokemonsReducer from "../../redux/pokemonSlice";
import { useDispatch } from "react-redux";
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";  
import { AsyncThunkAction } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    pokemons: pokemonsReducer,
})

const middleware = (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) =>
  getDefaultMiddleware({
    serializableCheck: false,
  })

const store = configureStore({
    reducer: pokemonsReducer,
    middleware: middleware,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;