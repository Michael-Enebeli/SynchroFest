window.useFallbackData = function () {
    const fallbackArtists = [
        { id: "1", artist: "Taylor Swift", genre: "Pop", image: "/images/taylor_swift.jpeg" },
        { id: "2", artist: "Kendrick Lamar", genre: "Hip-hop", image: "/images/kendrick_lamar.jpeg"},
        { id: "3", artist: "Drake", genre: "Rap", image: "/images/drake.jpeg" },
        { id: "4", artist: "Burna Boy", genre: "Afrobeat", image: "/images/burna_boy.jpeg" },
        { id: "5", artist: "Calvin Harris", genre: "Electronic", image: "/images/calvin_harris.jpeg" },
        { id: "6", artist: "John Coltrane", genre: "Jazz", image: "/images/john_coltrane.jpeg" },
        { id: "7", artist: "The Weeknd", genre: "R&B", image: "/images/the_weeknd.jpeg" },
        { id: "8", artist: "Bob Marley", genre: "Reggae", image: "/images/bob_marley.jpeg" },
        { id: "9", artist: "Ariana Grande", genre: "Pop", image: "/images/ariana_grande.jpeg" },
        { id: "10", artist: "J. Cole", genre: "Hip-hop", image: "/images/j_cole.jpeg" },
        { id: "11", artist: "Lil Wayne", genre: "Rap", image: "/images/lil_wayne.jpeg" },
        { id: "12", artist: "Wizkid", genre: "Afrobeat", image: "/images/wizkid.jpeg" },
        { id: "13", artist: "Harry Styles", genre: "Pop", image: "/images/harry_styles.jpeg" },
        { id: "14", artist: "Travis Scott", genre: "Hip-hop", image: "/images/travis_scott.jpeg" },
        { id: "15", artist: "Nicki Minaj", genre: "Rap", image: "/images/nicki_minaj.jpg" },
        { id: "16", artist: "Davido", genre: "Afrobeat", image: "/images/davido.jpeg" },
        { id: "17", artist: "Daft Punk", genre: "Electronic", image: "/images/daft_punk.jpg" },
        { id: "18", artist: "Miles Davis", genre: "Jazz", image: "/images/miles_davis.jpeg" },
        { id: "19", artist: "Chris Brown", genre: "R&B", image: "/images/chris_brown.jpeg" },
        { id: "20", artist: "Peter Tosh", genre: "Reggae", image: "/images/peter_tosh.jpg" },
    ];

      const today = new Date();
      const addDays = (date, days) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);
      return newDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
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
  
    const performances = fallbackArtists.map((artist, index) => {
      const { date, time, venue, event, description, price } = predefinedSchedule[index % predefinedSchedule.length];
  
      return {
        ...artist,
        date,
        time,
        venue,
        event,
        price,
        description: description.replace("{artist}", artist.artist).replace("{genre}", artist.genre).replace("{venue}", venue),
      };
    });
  
    localStorage.setItem("performances", JSON.stringify(performances));
    localStorage.setItem("lastFetch", Date.now().toString());
    waitForUpdatePerformances();
  };
  
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
  