import React, { useEffect, useState } from "react"; 
import { jsPDF } from "jspdf";
import {
  ModalOverlay,
  ModalContent,
  ScrollableSeats,
  CloseButton,
  CheckoutButton
} from "../styles/SeatingChartStyles";
  
const SeatingChart = ({ eventId, onClose }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (!eventId) return;
    let timeout;
    const storageKey = `seats_event_${eventId}`;

    const loadSeats = () => {
      const storedSeats = sessionStorage.getItem(storageKey);
      if (storedSeats) {
        setSeats(JSON.parse(storedSeats));
        return;
      }

      const rows = 4;
      const seatsPerRow = [6, 8, 10, 12];
      let seatNumber = 1;
      const newSeats = [];

      for (let row = 0; row < rows; row++) {
        for (let i = 0; i < seatsPerRow[row]; i++) {
          newSeats.push({ id: seatNumber, status: "available" });
          seatNumber++;
        }
      }

      const bookedCount = Math.floor(newSeats.length * 0.1);
      const inProcessCount = Math.floor(newSeats.length * 0.05);

      const randomizeSeats = (count, status) => {
        const selectedSeats = new Set();
        while (selectedSeats.size < count) {
          const randomIndex = Math.floor(Math.random() * newSeats.length);
          if (newSeats[randomIndex].status === "available") {
            newSeats[randomIndex].status = status;
            selectedSeats.add(randomIndex);
          }
        }
        return [...selectedSeats];
      };

      const inProcessSeats = randomizeSeats(inProcessCount, "in-process");
      randomizeSeats(bookedCount, "booked");

      sessionStorage.setItem(storageKey, JSON.stringify(newSeats));
      setSeats(newSeats);

      timeout = setTimeout(() => {
        setSeats((prevSeats) => {
          const updatedSeats = prevSeats.map((seat, index) =>
            inProcessSeats.includes(index) ? { ...seat, status: "booked" } : seat
          );
          sessionStorage.setItem(storageKey, JSON.stringify(updatedSeats));
          return updatedSeats;
        });
      }, 5000);
    };

    loadSeats();
    return () => clearTimeout(timeout);
  }, [eventId]);

  useEffect(() => {
    if (seats.length === 0) return;

    const timeout = setTimeout(() => {
      setSeats((prevSeats) => {
        const updatedSeats = prevSeats.map((seat) =>
          seat.status === "in-process" ? { ...seat, status: "booked" } : seat
        );
        sessionStorage.setItem(`seats_event_${eventId}`, JSON.stringify(updatedSeats));
        return updatedSeats;
      });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [seats, eventId]);

  const handleSeatClick = (seat) => {
    if (seat.status !== "available") {
      alert("Seat unavailable at the moment. Please select another.");
      return;
    }

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      if (selectedSeats.length >= 5) {
        alert("You can only select up to 5 seats.");
        return;
      }
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before proceeding to checkout.");
      return;
    }
  
    const storedPerformances = localStorage.getItem("performances");
    const performances = storedPerformances ? JSON.parse(storedPerformances) : [];
    const eventDetails = performances.find((p) => p.id === eventId);
  
    if (!eventDetails) {
      alert("Event details not found.");
      return;
    }
  
    const totalPrice =
      eventDetails.price === "Free"
        ? "Free"
        : `$${parseInt(eventDetails.price) * selectedSeats.length}`;
  
    const bookingID = `${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
    setBookingDetails({
      artist: eventDetails.artist,
      event: eventDetails.event,
      venue: eventDetails.venue,
      date: eventDetails.date,
      time: eventDetails.time,
      price: totalPrice,
      seats: selectedSeats.join(", "),
      bookingID,
    });
  
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((seat) =>
        selectedSeats.includes(seat.id) ? { ...seat, status: "booked" } : seat
      );
  
      sessionStorage.setItem(`seats_event_${eventId}`, JSON.stringify(updatedSeats));
  
      return updatedSeats;
    });
  
    setSelectedSeats([]);
  };
  
  const handleDownload = () => {
    if (!bookingDetails) return;
  
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let y = 20;
  
    const storedPerformances = localStorage.getItem("performances");
    const performances = storedPerformances ? JSON.parse(storedPerformances) : [];
    const eventDetails = performances.find((p) => p.id === eventId);
    const imageUrl = eventDetails?.image || ""; 

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SynchroFest | Booking Ticket", pageWidth / 2, y, { align: "center" });
    y += 8;
  
    if (imageUrl) {
      const imgWidth = 77.5;
      const imgHeight = 60;
      const imgX = (pageWidth - imgWidth) / 2; 
      doc.addImage(imageUrl, "JPEG", imgX, y, imgWidth, imgHeight);
      y += imgHeight + 10;
    }
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
    const details = [
      { label: "Booking ID", value: bookingDetails.bookingID },
      { label: "Artist", value: bookingDetails.artist },
      { label: "Event", value: bookingDetails.event },
      { label: "Venue", value: bookingDetails.venue },
      { label: "Date", value: bookingDetails.date },
      { label: "Time", value: bookingDetails.time },
      { label: "Seat number(s)", value: bookingDetails.seats },
      { label: "Price", value: bookingDetails.price },
    ];
  
    details.forEach(({ label, value }) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, pageWidth / 2 - 40, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, pageWidth / 2 + 10, y);
      y += 10;
    });
  
    doc.save(`${bookingDetails.bookingID}.pdf`);
  };
  
  return (
    <ModalOverlay>
      <ModalContent>
      <h2>{bookingDetails ? "Booking Details" : "Select Your Seat"}</h2>
        <CloseButton onClick={onClose}>X</CloseButton>

        {bookingDetails ? (
          <div style={{ textAlign: "left" }}>
            <p><strong>Artist:</strong> {bookingDetails.artist}</p>
            <p><strong>Event:</strong> {bookingDetails.event}</p>
            <p><strong>Venue:</strong> {bookingDetails.venue}</p>
            <p><strong>Date:</strong> {bookingDetails.date}</p>
            <p><strong>Time:</strong> {bookingDetails.time}</p>
            <p><strong>Seat Number(s):</strong> {bookingDetails.seats}</p>
            <p><strong>Price:</strong> {bookingDetails.price}</p>
            <p><strong>Booking ID:</strong> {bookingDetails.bookingID}</p>
           <CheckoutButton onClick={handleDownload}>Download Booking</CheckoutButton>
          </div>
        ) : (
          <ScrollableSeats>
            <svg width="750" height="400">
              <circle cx="375" cy="150" r="80" fill="#444" />
              <text x="350" y="150" fill="white" fontWeight="bold">STAGE</text>

              {seats.map((seat, index) => {
                const row = Math.floor(index / 12);
                const seatIndex = index % 12;
                const radius = 160 + row * 50;
                const angle = ((seatIndex + 0.5) / 12) * Math.PI - Math.PI / 2;
                const x = 375 + radius * Math.sin(angle);
                const y = radius * Math.cos(angle) + 120;

                return (
                  <g key={seat.id} onClick={() => handleSeatClick(seat)} style={{ cursor: "pointer" }}>
                    <circle
                      cx={x}
                      cy={y}
                      r="14"
                      fill={
                        selectedSeats.includes(seat.id) ? "blue" :
                        seat.status === "available" ? "green" :
                        seat.status === "in-process" ? "orange" :
                        "red" 
                      }
                      stroke="black"
                      strokeWidth="2"
                    />
                    <text x={x} y={y} fill="white" fontSize="10" textAnchor="middle" dominantBaseline="middle">
                      {seat.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </ScrollableSeats>
        )}

        {!bookingDetails && <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default SeatingChart;
