import { subDays } from "date-fns";

// Generate fake bookings data for realistic dashboard stats & charts
function generateFakeBookings(numDays = 30) {
  const bookings = [];
  const today = new Date();

  for (let i = numDays; i >= 0; i--) {
    const date = subDays(today, i);
    // 0-3 bookings per day, weighted towards having at least 1
    const numBookingsToday =
      Math.floor(Math.random() * 3) + (i % 3 === 0 ? 1 : 0);

    for (let j = 0; j < numBookingsToday; j++) {
      const cabinPrice = Math.floor(Math.random() * 400 + 150);
      const extraPrice =
        Math.random() > 0.4 ? Math.floor(Math.random() * 80 + 15) : 0;
      bookings.push({
        id: i * 10 + j,
        created_at: date.toISOString(),
        totalPrice: cabinPrice + extraPrice,
        extraPrice,
        cabinPrice,
        numNights: Math.floor(Math.random() * 7) + 1,
        numGuests: Math.floor(Math.random() * 6) + 1,
        status: i === 0 ? "unconfirmed" : i < 5 ? "checked-in" : "checked-out",
        hasBreakfast: Math.random() > 0.4,
        isPaid: Math.random() > 0.3,
      });
    }
  }

  return bookings;
}

// Fake confirmed stays for duration chart & occupancy
// Total nights ~36 → ~65% occupancy for 7 days × 8 cabins
export const fakeConfirmedStays = [
  { id: 1, numNights: 1 },
  { id: 2, numNights: 2 },
  { id: 3, numNights: 2 },
  { id: 4, numNights: 3 },
  { id: 5, numNights: 3 },
  { id: 6, numNights: 5 },
  { id: 7, numNights: 4 },
  { id: 8, numNights: 7 },
  { id: 9, numNights: 6 },
  { id: 10, numNights: 3 },
];

// Fake today's activities
export const fakeTodayActivities = [
  {
    id: 101,
    status: "unconfirmed",
    numNights: 5,
    guests: {
      fullName: "Sarah Johnson",
      countryFlag: "https://flagcdn.com/us.svg",
      country: "United States",
    },
  },
  {
    id: 102,
    status: "unconfirmed",
    numNights: 3,
    guests: {
      fullName: "Marco Rossi",
      countryFlag: "https://flagcdn.com/it.svg",
      country: "Italy",
    },
  },
  {
    id: 103,
    status: "checked-in",
    numNights: 7,
    guests: {
      fullName: "Emma Müller",
      countryFlag: "https://flagcdn.com/de.svg",
      country: "Germany",
    },
  },
  {
    id: 104,
    status: "unconfirmed",
    numNights: 2,
    guests: {
      fullName: "Yuki Tanaka",
      countryFlag: "https://flagcdn.com/jp.svg",
      country: "Japan",
    },
  },
  {
    id: 105,
    status: "checked-in",
    numNights: 4,
    guests: {
      fullName: "Lucas Silva",
      countryFlag: "https://flagcdn.com/br.svg",
      country: "Brazil",
    },
  },
];

// Generate and cache bookings (so they stay consistent during session)
let _cachedBookings = null;
export function getFakeBookings(numDays = 30) {
  if (!_cachedBookings || _cachedBookings._numDays !== numDays) {
    _cachedBookings = generateFakeBookings(numDays);
    _cachedBookings._numDays = numDays;
  }
  return _cachedBookings;
}
