import { useCallback, useEffect, useMemo, useReducer } from "react";
import { CitiesContext } from "./CitiesContext";
import * as apiCities from "../services/apiCities";

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};
function reducer(state, action) {
  // we need  this reducer as a pure function which means we can not make an API request
  switch (action.type) {
    // follow the meaningful naming conventions when it comes to action types
    // the naming like this it is the similar in Redux Community
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown Action Type");
  }
}

export function CitiesProvider({ children }) {
  // refactoring useState with useReducer
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    const controller = new AbortController();
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const data = await apiCities.getCities({ signal: controller.signal });
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        // StrictMode mounts effects twice; the first request is aborted on purpose
        if (controller.signal.aborted) return;
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    fetchCities();
    return function () {
      controller.abort();
    };
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (id === String(currentCity.id)) return;
      try {
        dispatch({ type: "loading" });
        const data = await apiCities.getCity(id);
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    },
    [currentCity.id],
  );

  // when they post request the frontend talk to the backend to sent the data that operation called post request
  // update server state || remote state
  // we use this in small apps in the biggest one we need to use React Query for managing the states in remote servers
  const createNewCity = useCallback(async function createNewCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const data = await apiCities.createCity(newCity);
      dispatch({ type: "city/created", payload: data });
      return data;
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
      return null;
    }
  }, []);

  const deleteCity = useCallback(async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await apiCities.deleteCity(id);
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }, []);

  // note that if we deal with the async data it is better to write code like that it write in this context but if it sync data write the functions inside it is component and pass the dispatch function into the context then update it from these function in these components
  const value = useMemo(
    () => ({
      cities,
      isLoading,
      currentCity,
      error,
      getCity,
      createNewCity,
      deleteCity,
    }),
    [cities, isLoading, currentCity, error, getCity, createNewCity, deleteCity],
  );

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}
