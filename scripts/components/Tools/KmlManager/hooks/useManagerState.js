import { useReducer } from "react";

const initialState = undefined;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_STATE":
      return payload;
    case "ADD_KML": {
      return [...state, payload];
    }
    case "UPDATE_KML": {
      const { index, ...updatedKml } = payload;
      state[index] = updatedKml;
      return state;
    }
    case "DELETE_KML": {
      state.splice(payload, 1);
      return [...state];
    }
    default:
      throw new Error("Unexpected action type: " + type);
  }
};

const useManagerState = () => useReducer(reducer, initialState);

export default useManagerState;
