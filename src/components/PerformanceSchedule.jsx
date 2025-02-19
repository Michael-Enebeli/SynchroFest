import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useSwipe from "../utils/useSwipe";
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
} from "../styles/PerformanceSchedule";

const PerformanceSchedule = () => {
  const [search, setSearch] = useState("");
  const [performances, setPerformances] = useState([]);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [showSeatingChart, setShowSeatingChart] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const inputRef = useRef(null)

  const { containerRef, isTouchDevice, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe();

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

  return (
    <ScheduleContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by artist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
        <SearchIcon className="fas fa-search" title="Search artist" 
          onClick={focusInput} />
      </SearchContainer>

      <PerformancesWrapper
        ref={containerRef}
        onTouchStart={isTouchDevice ? handleTouchStart : null}
        onTouchMove={isTouchDevice ? handleTouchMove : null}
        onTouchEnd={isTouchDevice ? handleTouchEnd : null}
      >
        {performances.filter((p) => p.artist.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
          <p style={{ color: "white", textAlign: "center", marginTop: "20px", fontSize: "1.2rem" }}>
            No artist found
          </p>
        ) : (
          performances
            .filter((p) => p.artist.toLowerCase().includes(search.toLowerCase()))
            .map((performance) => (
              <PerformanceCard key={performance.id}>
                <ArtistImage src={performance.image} alt={performance.artist} />
                <ArtistName>{performance.artist}</ArtistName>
                <DescriptionText>{performance.description}</DescriptionText>
                <ButtonContainer>
                  <Button variant="details" onClick={() => setSelectedPerformance(performance)}>
                    View Details
                  </Button>
                 <Button variant="book" onClick={() => { setShowSeatingChart(true); 
                 setSelectedEventId(performance.id); }}> 
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
            <p>
              <strong>Genre: </strong>
              {selectedPerformance.genre}
            </p>
            <p>
              <strong>Event Title: </strong>
              {selectedPerformance.event}
            </p>
            <p>
              <strong>Venue: </strong>
              {selectedPerformance.venue}
            </p>
            <p>
              <strong>Date: </strong>
              {selectedPerformance.date}
            </p>
            <p>
              <strong>Time: </strong>
              {selectedPerformance.time}
            </p>
            <p>
              <strong>Price: </strong>
              {selectedPerformance.price === "Free" ? "Free" : `$${selectedPerformance.price}`}
            </p>
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
