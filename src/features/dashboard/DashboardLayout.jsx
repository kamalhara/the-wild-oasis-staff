import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import {
  getFakeBookings,
  fakeConfirmedStays,
} from "../../data/fakeDashboardData";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  // Use fake data if no real data exists
  const hasRealBookings = Array.isArray(bookings) && bookings.length > 0;
  const hasRealStays =
    Array.isArray(confirmedStays) && confirmedStays.length > 0;

  const displayBookings = hasRealBookings
    ? bookings
    : getFakeBookings(numDays || 30);
  const displayStays = hasRealStays ? confirmedStays : fakeConfirmedStays;
  const displayNumDays = numDays || 30;
  const displayCabinCount = cabins?.length ?? 8;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={displayBookings}
        confirmedStays={displayStays}
        numDays={displayNumDays}
        cabinCount={displayCabinCount}
      />
      <TodayActivity />
      <DurationChart confirmedStays={displayStays} />
      <SalesChart bookings={displayBookings} numDays={displayNumDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
