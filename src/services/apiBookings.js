import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { parseISO, isValid } from "date-fns";

// Defensive helper to parse dates safely
function safeParseDate(date) {
  if (!date) return null;
  try {
    const d = typeof date === "string" ? parseISO(date) : new Date(date);
    return isValid(d) ? d : null;
  } catch {
    return null;
  }
}

export async function getBooking(id) {
  if (!id) return null;
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter && filter.field && filter.value !== undefined)
    query = query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy && sortBy.field)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      error: error.message || "Bookings could not be loaded",
    };
  }

  return { data: Array.isArray(data) ? data : [], count: count ?? 0 };
}

// Returns all BOOKINGS that were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
  const today = getToday({ end: true });
  const validDate = safeParseDate(date);
  if (!validDate) return [];
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", validDate.toISOString())
    .lte("created_at", today);

  if (error) {
    console.error(error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

// Returns all STAYS that were created after the given date
export async function getStaysAfterDate(date) {
  const today = getToday();
  const validDate = safeParseDate(date);
  if (!validDate) return [];
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", validDate.toISOString())
    .lte("startDate", today);

  if (error) {
    console.error(error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const today = getToday();
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${today}),and(status.eq.checked-in,endDate.eq.${today})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function updateBooking(id, obj) {
  if (!id || typeof obj !== "object") return null;
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

export async function deleteBooking(id) {
  if (!id) return null;
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  // if (error) {
  //   console.error(error);
  //   return null;
  // }
  // return data;
}
