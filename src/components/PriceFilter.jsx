import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SeatingChart from "../components/SeatingChart";
import {
    FilterWrapper,
    FilterHeading,
    FilterContainer,
    FilterLabel,
    FilterSelect,
  } from "../styles/FilterStyles";
import {
  ScheduleContainer,
  SearchContainer,
  PerformancesWrapper,
  PerformanceCard,
  ArtistImage,
  ArtistName,
  ButtonContainer,
  Button,
  ModalOverlay,
  ModalContent,
  CloseButton,
  DescriptionText,
  SearchWrapper,
} from "../styles/PerformanceSchedule";


const PriceFilter = () => {
  const [priceFilter, setPriceFilter] = useState(100); // Default: $100
  const [performances, setPerformances] = useState([]);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [showSeatingChart, setShowSeatingChart] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchPerformances = () => {
    const data = localStorage.getItem("performances");
    if (data) {
      setPerformances(JSON.parse(data));
    }
  };
  
  useEffect(() => {
    window.fetchPerformances = fetchPerformances;
  }, []);
  
  
  const filteredPerformances = performances.filter(
    (performance) => parseInt(performance.price) <= priceFilter
  );

  return (
    <ScheduleContainer>
<FilterWrapper>
  <FilterHeading>Choose an Event Within Your Budget.</FilterHeading>
  <FilterContainer>
    <FilterLabel htmlFor="priceFilter">Events</FilterLabel>
    <FilterSelect
      id="priceFilter"
      value={priceFilter}
      onChange={(e) => setPriceFilter(parseInt(e.target.value))}
    >
      <option value={100}>$100 and Below</option>
      <option value={70}>$70 and Below</option>
      <option value={50}>$50 and Below</option>
    </FilterSelect>
  </FilterContainer>
</FilterWrapper>

      <PerformancesWrapper>
        {filteredPerformances.length === 0 ? (
          <p style={{ color: "white", textAlign: "center", marginTop: "20px", fontSize: "1.2rem" }}>
            No events found
          </p>
        ) : (
          filteredPerformances.map((performance) => (
            <PerformanceCard key={performance.id}>
              <ArtistImage src={performance.image} alt={performance.artist} />
              <ArtistName>{performance.artist}</ArtistName>
              <p> ${performance.price} </p>
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

export default PriceFilter;
