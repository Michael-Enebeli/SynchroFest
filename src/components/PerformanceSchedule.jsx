import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SeatingChart from "../components/SeatingChart";
import {
  ScheduleContainer,
  SearchContainer,
  SearchInput,
  SearchIcon,
  PerformancesWrapper,
  PerformanceCard,
  ArtistName,
  ArtistImage,
  ButtonContainer,
  Button,
  ModalOverlay,
  ModalContent,
  CloseButton,
  DescriptionText,
  TimeFrameContainer,
  TimeFrameButton,
  SearchWrapper
} from "../styles/PerformanceSchedule";

const formatDate = (date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const PerformanceSchedule = () => {
  const [search, setSearch] = useState("");
  const [performances, setPerformances] = useState([]);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [showSeatingChart, setShowSeatingChart] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [timeFrame, setTimeFrame] = useState("all");
  const inputRef = useRef(null);

  const updatePerformances = () => {
    const storedData = localStorage.getItem("performances");
    if (storedData) {
      setPerformances(JSON.parse(storedData));
    }
  };

  useEffect(() => {
    window.updatePerformances = updatePerformances;
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (performances.length > 0) {
      window.dispatchEvent(new CustomEvent("contentReady"));
    }
  }, [performances]);

  const filterByTimeFrame = (performances) => {
    const today = new Date(formatDate(new Date()));
    today.setHours(0, 0, 0, 0);

    return performances.filter((performance) => {
      const eventDate = new Date(performance.date);
      eventDate.setHours(0, 0, 0, 0);
      if (isNaN(eventDate)) return false;

      if (timeFrame === "next3days") {
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 3);
        return eventDate >= today && eventDate <= endDate;
      } else if (timeFrame === "thisweek") {
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 7);
        return eventDate >= today && eventDate <= endDate;
      } else if (timeFrame === "thismonth") {
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 30);
        return eventDate >= today && eventDate <= endDate;
      } else {
        return true;
      }
    });
  };

  return (
    <ScheduleContainer>
      <SearchWrapper>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search by artist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ref={inputRef}
          />
          <SearchIcon className="fas fa-search" title="Search artist" onClick={focusInput} />
        </SearchContainer>

        <TimeFrameContainer>
          <TimeFrameButton
            className={timeFrame === "all" ? "active" : ""}
            onClick={() => setTimeFrame("all")}
          >
            All Events
          </TimeFrameButton>
          <TimeFrameButton
            className={timeFrame === "next3days" ? "active" : ""}
            onClick={() => setTimeFrame("next3days")}
          >
            Next 3 Days
          </TimeFrameButton>
          <TimeFrameButton
            className={timeFrame === "thisweek" ? "active" : ""}
            onClick={() => setTimeFrame("thisweek")}
          >
            Next 7 Days
          </TimeFrameButton>
          <TimeFrameButton
            className={timeFrame === "thismonth" ? "active" : ""}
            onClick={() => setTimeFrame("thismonth")}
          >
            Next 30 Days
          </TimeFrameButton>
        </TimeFrameContainer>
      </SearchWrapper>

      <PerformancesWrapper>
        {filterByTimeFrame(performances)
          .filter((p) => p.artist.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
          <p style={{ color: "white", textAlign: "center", minWidth: "130px", marginTop: "20px", fontSize: "1.2rem" }}>
            No artist found
          </p>
        ) : (
          filterByTimeFrame(performances)
            .filter((p) => p.artist.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 10)
            .map((performance) => (
              <PerformanceCard key={performance.id}>
                <ArtistImage src={performance.image} alt={performance.artist} />
                <ArtistName>{performance.artist}</ArtistName>
                <p>{performance.date}</p>
                <DescriptionText>{performance.description}</DescriptionText>
                <ButtonContainer>
                  <Button variant="details" onClick={() => setSelectedPerformance(performance)}>
                    View Details
                  </Button>
                  <Button
                    variant="book"
                    onClick={() => {
                      setShowSeatingChart(true);
                      setSelectedEventId(performance.id);
                    }}
                  >
                    Book Now
                  </Button>
                </ButtonContainer>
              </PerformanceCard>
            ))
        )}
      </PerformancesWrapper>

      {selectedPerformance && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setSelectedPerformance(null)}>&times;</CloseButton>
            <h2>{selectedPerformance.artist}</h2>
            <p><strong>Genre:</strong> {selectedPerformance.genre}</p>
            <p><strong>Event Title:</strong> {selectedPerformance.event}</p>
            <p><strong>Venue:</strong> {selectedPerformance.venue}</p>
            <p><strong>Date:</strong> {selectedPerformance.date}</p>
            <p><strong>Time:</strong> {selectedPerformance.time}</p>
            <p><strong>Price:</strong> {selectedPerformance.price === "Free" ? "Free" : `$${selectedPerformance.price}`}</p>
          </ModalContent>
        </ModalOverlay>
      )}
      {showSeatingChart && selectedEventId && (
        <SeatingChart eventId={selectedEventId} onClose={() => setShowSeatingChart(false)} />
      )}
    </ScheduleContainer>
  );
};

export default PerformanceSchedule;
