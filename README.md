# 🎶 SynchroFest  | Music Festival App

SynchroFest is a futuristic music festival app featuring an interactive performance schedule, real-time seat selection, and vibrant UI inspired by neon and cosmic themes.

## 🚀 Live Demo  
🔗 [SynchroFest is Live on Vercel!](https://synchrofest.vercel.app)

## ⚠️ Note  
This project will not function properly in a local environment because it relies on **environment variables for API keys**, which are only available in the deployed version.  

Viewers are advised to use the **live demo** link above or [click here](https://synchrofest.vercel.app) for the best experience.
# Project Overview
## 🎶 Event Listing
* Each event card includes an artist's image, a brief description, and buttons to View Details or Book Now.
* Event details (artist name, image and genre) is fetched from Spotify API once every hour while others (date, time, venue, event title, and price) were predefined and stored in local storage
* Clicking "View Details" opens a popup with event information, including the artist, genre, and ticket price, while clicking "Book Now" opens a seating chart for users to select their seats.
* Users can view upcoming events in the next 3, 7 or 30 days and also filter based on selected price range.
## 🎟️ Seat Selection
* Users can select up to 5 seats per booking to prevent bulk reservations.
* Available seats are green, while selected seats turn blue.
* Clicking a selected seat deselects it, freeing up the slot.
* If a user tries to select more than 5 seats, an alert notifies them immediately of the limit.
* Unavailable seats (booked or in-process) cannot be selected.
##  🔄  Real-time Seat Updates
* Seats marked as "in-process" (orange) indicate they are being booked by another user.
* After 5 seconds, these seats automatically change to "booked" (red) simulating the seat in process has been taken
* The update is stored in session storage, ensuring data consistency.
* Users get an alert to select another seat when trying to select an unavailable seat.
## 📜 Booking Confirmation & PDF Ticket Generation
 * When users checkout, selected seats become booked and stored in session storage.
 * A PDF ticket is generated using jsPDF, including:
 booking ID, Artist Name, Event Name, Venue, Date & Time,Seat Number(s) and Total Price
* The user can download the ticket as a PDF file.
## ⏳ Event Countdown Timer
* The timer retrieves event details from localStorage. It calculates the time remaining until the next event and updates every second.
* A toast notification appears every 75 seconds, cycling through event descriptions
## 🔹 Technologies Used
* React (with Vite)
* Styled Components
* LocalStorage (for state management)
* API Integration (Spotify)
## ✨ Design Inspirations
* **Color Theme:** Neon, futuristic, cosmic (inspired by music festivals).
* **Fonts:** Futuristic fonts like Verdana, Exo, and Audiowide.
* **Background:** Dark mode with glowing text elements.

## 🚀 Challenges & Solutions
### 1️⃣ Handling Environment Variables on Vercel
* **Problem:** Using `import.meta.env` for environment variables (API keys) were not accessible in the public folder in production stage despite it being accessible in development stage.
* **Solution:** Used `window.ENV` instead to load environment variables globally on the window so it can be accessed.

### 2️⃣ Performance Optimization
* **Problem:** Delayed initial render due to Spotify API data being fetched for the UI
* **Solution:** Used **async** for the`<script>`fetching the data and added a spinner to prevent a blank UI (Flash of Unstyled Content)

# 📧 Developed by [Michael Enebeli](https://www.michaelenebeli.com.ng/)