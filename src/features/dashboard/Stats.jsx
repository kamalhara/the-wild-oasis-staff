import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // Defensive: default to empty arrays and numbers
  const bookingsArr = Array.isArray(bookings) ? bookings : [];
  const staysArr = Array.isArray(confirmedStays) ? confirmedStays : [];
  const nDays = typeof numDays === "number" && numDays > 0 ? numDays : 1;
  const nCabins =
    typeof cabinCount === "number" && cabinCount > 0 ? cabinCount : 1;

  // 1.
  const numBookings = bookingsArr.length;

  // 2.
  const sales = bookingsArr.reduce(
    (acc, cur) =>
      acc + (typeof cur.totalPrice === "number" ? cur.totalPrice : 0),
    0
  );

  // 3.
  const checkins = staysArr.length;

  // 4.
  const totalNights = staysArr.reduce(
    (acc, cur) => acc + (typeof cur.numNights === "number" ? cur.numNights : 0),
    0
  );
  const occupation = nDays * nCabins > 0 ? totalNights / (nDays * nCabins) : 0;
  // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={
          isFinite(occupation) && occupation >= 0
            ? Math.round(occupation * 100) + "%"
            : "0%"
        }
      />
    </>
  );
}

export default Stats;
