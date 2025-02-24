import React, { useEffect, useRef, useState } from "react";
import { TimerContainer } from "../styles/TimerStyles"; 

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef(null);

  const updateCountdown = () => {
    const performances = JSON.parse(localStorage.getItem("performances"));
    if (!performances || performances.length === 0) return;

    const firstEvent = performances[0]; 
    const eventDateTime = new Date(`${firstEvent.date} ${firstEvent.time}`);
    const now = new Date();
    const diff = eventDateTime - now;

    if (diff <= 0) {
      setCountdown("Event has started!");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    let timeString = "";
    if (days > 0) {
      timeString += `${days}day `;
    }
    if (hours > 0) {
      timeString += `${hours}hrs `;
    }
    if (minutes > 0) { 
      timeString += `${minutes}mins`;
    }
    
    setCountdown(
      `${firstEvent.event} by ${firstEvent.artist} begins in ${timeString}`
    );
  };

  useEffect(() => {
    updateCountdown();
    window.updateCountdown = updateCountdown;
    const countdownInterval = setInterval(updateCountdown, 1000); 
    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    const performances = JSON.parse(localStorage.getItem("performances")) || [];
    const descriptions = performances.slice(0, 20).map(event => event.description);
    if (descriptions.length === 0) return;

    const showToastRecursively = (index) => {
      setToastMessage(descriptions[index]);

      toastTimeoutRef.current = setTimeout(() => {
         setToastMessage("");
         const nextIndex = (index + 1) % descriptions.length;
         toastTimeoutRef.current = setTimeout(() => {
            showToastRecursively(nextIndex);
         }, 75000);
      }, 4000);
    };

    const initialTimeout = setTimeout(() => {
      showToastRecursively(0);
    }, 25000);

    return () => {
      clearTimeout(initialTimeout);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <TimerContainer className="animated-timer">{countdown}</TimerContainer>
      <div className={`toast ${toastMessage ? "show" : ""}`}>{toastMessage}</div>
    </>
  );
};

export default CountdownTimer;
