import { getSupabase } from "../../../services/supabase";

const TABLE = "cities";
const COLUMNS = "id, city_name, country, emoji, date, notes, lat, lng";

/*
 * Mapping layer: the database uses Postgres conventions (snake_case, flat
 * lat/lng columns) while the UI keeps the original domain shape
 * ({ cityName, position: { lat, lng } }). Components never see raw rows,
 * so the persistence layer can evolve without touching the UI.
 */
function toCity(row) {
  return {
    id: row.id,
    cityName: row.city_name,
    country: row.country,
    emoji: row.emoji,
    date: row.date,
    notes: row.notes ?? "",
    position: { lat: row.lat, lng: row.lng },
  };
}

function toRow(city) {
  return {
    city_name: city.cityName,
    country: city.country,
    emoji: city.emoji,
    date: new Date(city.date).toISOString(),
    notes: city.notes ?? "",
    lat: Number(city.position.lat),
    lng: Number(city.position.lng),
  };
}

function fail(error, message) {
  console.error(error);
  throw new Error(message);
}

export async function getCities({ signal } = {}) {
  let query = getSupabase()
    .from(TABLE)
    .select(COLUMNS)
    .order("date", { ascending: true });
  if (signal) query = query.abortSignal(signal);

  const { data, error } = await query;
  if (error) {
    if (signal?.aborted) throw error; // let callers ignore aborts
    fail(error, "There Was An Error Loading Cities! ❌");
  }
  return data.map(toCity);
}

export async function getCity(id) {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select(COLUMNS)
    .eq("id", id)
    .single();
  if (error) fail(error, "There Was An Error Loading The City! ❌");
  return toCity(data);
}

export async function createCity(newCity) {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .insert(toRow(newCity))
    .select(COLUMNS)
    .single();
  if (error) fail(error, "There Was An Error Creating New City! ❌");
  return toCity(data);
}

export async function deleteCity(id) {
  const { error } = await getSupabase().from(TABLE).delete().eq("id", id);
  if (error) fail(error, "There Was An Error Deleting The City! ❌");
}
