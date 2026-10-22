import { useSearchParams } from "react-router-dom";
// get the position from url
export function useUrlPosition() {
  // like useState
  // we can share the state with entire app

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
