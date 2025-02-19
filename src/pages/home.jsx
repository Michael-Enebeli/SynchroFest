import React from "react";
import PerformanceSchedule from "../components/PerformanceSchedule";
import CountdownTimer from "../components/CountdownTimer";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <h1>SynchroFest Festival</h1>
      <CountdownTimer />
      <PerformanceSchedule />
      <Footer />
    </div>
  );
};

export default Home;
