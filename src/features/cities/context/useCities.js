import { useContext } from "react";
import { CitiesContext } from "./CitiesContext";

// custom context hook
export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context Was Used Outside The Cities Providers");
  return context;
}
