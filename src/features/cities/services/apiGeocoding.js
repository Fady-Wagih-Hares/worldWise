// reverse geocoding: getting city info about a GPS position
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
const GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

export async function reverseGeocode({ lat, lng, signal }) {
  const res = await fetch(`${GEOCODING_URL}?latitude=${lat}&longitude=${lng}`, {
    signal,
  });
  if (!res.ok) throw new Error("Could not reach the geocoding service ❌");

  const data = await res.json();
  if (!data.countryCode)
    throw new Error("That Does Not Seem To Be A City. Click Somewhere Else ❌");

  return {
    cityName: data.city || data.locality || "",
    country: data.countryName,
    countryCode: data.countryCode,
  };
}
