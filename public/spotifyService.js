const CLIENT_ID = window.ENV.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = window.ENV.VITE_SPOTIFY_CLIENT_SECRET;
const lastFetch = localStorage.getItem("lastFetch");
const now = Date.now();

if (lastFetch && now - lastFetch < 3600000) {
      waitForUpdatePerformances();
} else {
  const getSpotifyToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`, 
      },
      body: "grant_type=client_credentials", 
    });

    const data = await response.json();
    return data.access_token;
  };

  const fetchUniqueArtists = async (token) => {
    const genres = ["Pop", "Hip-hop", "Rap", "Afrobeat", "Electronic", "Jazz", "Hip-hop", "R&B", "Rap", "Raggae", "Pop", "Rap"];
    let artistPool = [];

    for (let genre of genres) {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=genre:${genre}&type=artist&limit=5`, 
        { headers: { Authorization: `Bearer ${token}` } } 
      );

      const data = await response.json();
      
      data.artists.items.forEach((artist) => {
        if (
          artist.images.length > 0 && 
          !artistPool.some((a) => a.artist === artist.name)
        ) {
          artistPool.push({
            id: artist.id,
            artist: artist.name,
            genre: genre,
            image: artist.images[1].url, 
          });
        }
      });
    }

    return artistPool.sort(() => 0.5 - Math.random()).slice(0, 20);
  };

  const today = new Date();
  const addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
 } );
};

const predefinedSchedule = [
  { date: addDays(today, 1), time: "18:00", venue: "Main Stage", price: 50, event: "Energy", description: "Experience the magic of {artist} live at {venue}." },
  { date: addDays(today, 21), time: "19:00", venue: "Neon Arena", price: "Free", event: "Sound Wave", description: "The beats drop as {artist} rocks {venue}!" },
  { date: addDays(today, 13), time: "20:00", venue: "Skyline Hall", price: 95, event: "Pulse Festival", description: "Step into the world of {artist} at {venue}!" },
  { date: addDays(today, 11), time: "21:00", venue: "The Underground", price: 160, event: "RhythmFest", description: "{artist} is taking over {venue} with electrifying energy!" },
  { date: addDays(today, 5), time: "22:00", venue: "Electro Dome", price: "Free", event: "Vibe Village", description: "A high-energy {genre} set from {artist} at {venue}!" },
  { date: addDays(today, 8), time: "23:00", venue: "Sunset Pavilion", price: 35, event: "Live Wire Music", description: "An iconic {genre} performance by {artist} at {venue}." },
  { date: addDays(today, 4), time: "18:00", venue: "Galaxy Stage", price: 100, event: "SuperSonic SHOT", description: "Feel the rhythm as {artist} performs at {venue}!" },
  { date: addDays(today, 2), time: "19:00", venue: "Cosmic Arena", price: "Free", event: "Rave Night", description: "{artist} turns {venue} into a {genre} paradise!" },
  { date: addDays(today, 19), time: "20:00", venue: "Golden Hall", price: 30, event: "Music Mania", description: "Pure artistry by {artist} at {venue}!" },
  { date: addDays(today, 20), time: "21:00", venue: "Starlight Theater", price: "Free", event: "Synergy", description: "A magical evening with {artist} at {venue}." },
  { date: addDays(today, 11), time: "22:00", venue: "Infinity Lounge", price: 40, event: "Next Big Thing", description: "Smooth beats and rhythms by {artist} at {venue}!" },
  { date: addDays(today, 2), time: "23:00", venue: "Finale Stage", price: 190, event: "Night of Electricity", description: "{artist} closes the night at {venue}!" },
  { date: addDays(today, 13), time: "17:30", venue: "Lunar Pavilion", price: 55, event: "Echo Vibes", description: "{artist} brings the house down at {venue}!" },
  { date: addDays(today, 14), time: "19:30", venue: "Neon Arena", price: "Free", event: "Bass Drop", description: "Feel the bass with {artist} at {venue}!" },
  { date: addDays(today, 2), time: "20:45", venue: "Skyline Hall", price: 145, event: "Groove Night", description: "Let loose as {artist} takes over {venue}!" },
  { date: addDays(today, 6), time: "21:30", venue: "The Underground", price: 75, event: "Deep Frequencies", description: "{artist} delivers raw energy at {venue}!" },
  { date: addDays(today, 17), time: "22:15", venue: "Electro Dome", price: "Free", event: "Neon Pulse", description: "A night of pulsating {genre} with {artist} at {venue}!" },
  { date: addDays(today, 8), time: "23:45", venue: "Sunset Pavilion", price: 100, event: "Eclipse Beats", description: "{artist} takes {venue} to new heights!" },
  { date: addDays(today, 19), time: "18:15", venue: "Celestial Stage", price: 40, event: "AstroGroove", description: "Vibes from another dimension by {artist} at {venue}!" },
  { date: addDays(today, 1), time: "19:45", venue: "Cosmic Arena", price: "Free", event: "Neon Night", description: "{artist} lights up {venue} with {genre} sounds!" },
];
 
  const generatePerformanceSchedule = async () => {
    const token = await getSpotifyToken();
    const artists = await fetchUniqueArtists(token); 
    const performances = artists.map((artist, index) => {
    const { date, time, venue, event, description, price } = predefinedSchedule[index];

      return {
        ...artist,
        date,
        time,
        venue,
        event,
        price, 
        description: description.replace("{artist}", artist.artist).replace("{genre}", artist.genre).replace("{venue}", venue), // Replace placeholders
      };
    });

    localStorage.setItem("performances", JSON.stringify(performances));
    localStorage.setItem("lastFetch", now.toString()); 
    waitForUpdatePerformances();
  };
  generatePerformanceSchedule();
}

function waitForUpdatePerformances() {
  if (
    typeof window.updatePerformances === "function" &&
    typeof window.updateCountdown === "function" &&
    typeof window.fetchPerformances === "function"
  ) {
    window.updatePerformances();
    window.updateCountdown();
    window.fetchPerformances();
  } else {
    setTimeout(waitForUpdatePerformances, 100);
  }
}
