import React from "react";
import PerformanceSchedule from "../components/PerformanceSchedule";
import CountdownTimer from "../components/CountdownTimer";
import TicketGuarantee from "../components/TicketGuarantee";
import PriceFilter from "../components/PriceFilter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <CountdownTimer />
      <h1>SynchroFest Festival</h1>
      <PerformanceSchedule />
      <TicketGuarantee />
      <PriceFilter />
      <Footer />
    </div>
  );
};

export default Home;
