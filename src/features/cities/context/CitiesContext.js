import { createContext } from "react";

// Kept in its own module so CitiesProvider.jsx only exports a component
// (required for React Fast Refresh to preserve state on edit).
export const CitiesContext = createContext();
