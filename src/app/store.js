import { configureStore } from "@reduxjs/toolkit";
import translateReducer from "../app/translateState";

//export default configureStore({ reducer: translateState });
export const store = configureStore({
  reducer: {
    translate: translateReducer,
  },
});
