import './style.css';

/**
 * CONFIGURATION
 * Using VITE environment variables with a fallback to DEMO_KEY
 */
const CONFIG = {
  API_KEY: import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY',
  BASE_URL: 'https://api.nasa.gov/planetary/apod',
};

// Global references to DOM elements
const elements = {
  app: document.querySelector("#app"),
  content: null,
  dateInput: null,
  todayBtn: null,
  randomBtn: null,
  launchBtn: null,
  rocket: null
};

/**
 * HELPERS
 */
const getFormattedDate = (dateObj) => dateObj.toISOString().split('T')[0];

const getRandomDate = () => {
  const start = new Date(1995, 5, 16).getTime(); // NASA APOD started June 16, 1995
  const end = new Date().getTime();
  return getFormattedDate(new Date(start + Math.random() * (end - start)));
};

/**
 * DATA FETCHING
 * Includes logic to fallback to yesterday if NASA's "today" isn't ready.
 */
const fetchSpaceData = async (date = "") => {
  const url = `${CONFIG.BASE_URL}?api_key=${CONFIG.API_KEY}${date ? `&date=${date}` : ""}`;
  const response = await fetch(url);

  if (!response.ok) {
    // If today (500) fails, try yesterday automatically
    if (response.status === 500 && !date) {
      console.warn("NASA Today not ready. Falling back to yesterday...");
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return fetchSpaceData(getFormattedDate(yesterday));
    }
    const errorBody = await response.json().catch(() => ({ msg: "Satellite Link Down" }));
    throw new Error(errorBody.msg || "NASA Error");
  }
  return await response.json();
};

/**
 * UI UPDATER
 */
const updateGallery = async (dateValue = "") => {
  elements.content.innerHTML = `
    <div class="loader-container">
      <div class="orbit-spinner"></div>
      <p>Synchronizing Orbit...</p>
    </div>`;

  try {
    const data = await fetchSpaceData(dateValue);

    // Update the date picker to match the data being shown
    elements.dateInput.value = data.date;

    const isVideo = data.media_type === "video";
    let mediaUrl = isVideo ? data.url : (data.hdurl || data.url);

    // FIXED: Corrected the broken video check logic
    if (isVideo && mediaUrl.includes("youtube.com/watch?v=")) {
      mediaUrl = mediaUrl.replace("watch?v=", "embed/");
    }

    elements.content.innerHTML = `
      <article class="card">
        <div class="media-viewport">
          ${isVideo
        ? `<iframe src="${mediaUrl}" allowfullscreen></iframe>`
        : `<img src="${mediaUrl}" alt="${data.title}" id="space-image">`}
        </div>
        <div class="card-info">
          <div class="meta">
            <span class="badge">${data.date}</span>
            ${data.copyright ? `<span class="copyright">© ${data.copyright}</span>` : ''}
          </div>
          <h2>${data.title}</h2>
          <p class="description">${data.explanation}</p>
        </div>
      </article>
    `;
  } catch (err) {
    elements.content.innerHTML = `
      <div class="error-state">
        <h3>🛰️ Signal Lost</h3>
        <p>${err.message}</p>
        <button class="btn-primary" style="margin-top:1rem" onclick="location.reload()">Reset Connection</button>
      </div>`;
  }
};

/**
 * APP INITIALIZATION
 */
const startApp = () => {
  // 1. Inject UI Structure
  // PATH FIX: src="./rocket.png" ensures it works in the /nasaweb/ folder
  elements.app.innerHTML = `
    <header>
      <div class="logo">Inspired by NASA</div>
      <h1>THE Astronomy Explorer</h1>
      <p>Journey through the cosmos, one step or DAY at a time.</p>
    </header>

    <nav class="controls">
      <div class="input-wrapper">
        <label>SELECT DATE</label>
        <input type="date" id="datePicker">
      </div>
      <div class="button-group">
        <button id="todayBtn" class="btn-primary">LATEST</button>
        <button id="randomBtn" class="btn-outline">RANDOM 🎲</button>
        <button id="launchBtn" class="btn-launch">LAUNCH 🚀</button>
      </div>
    </nav>

    <main id="content-area"></main>
    <footer>Data via NASA Open APIs</footer>

    <img src="./rocket.png" id="rocket" alt="Rocket">
  `;

  // 2. Assign Dynamic Elements to the elements object
  elements.content = document.querySelector("#content-area");
  elements.dateInput = document.querySelector("#datePicker");
  elements.todayBtn = document.querySelector("#todayBtn");
  elements.randomBtn = document.querySelector("#randomBtn");
  elements.launchBtn = document.querySelector("#launchBtn");
  elements.rocket = document.querySelector("#rocket");

  // 3. Set Input Constraints
  elements.dateInput.max = getFormattedDate(new Date());

  // 4. ATTACH EVENT LISTENERS

  // Change date via picker
  elements.dateInput.addEventListener("change", (e) => {
    if (e.target.value) updateGallery(e.target.value);
  });

  // Fetch latest photo
  elements.todayBtn.addEventListener("click", () => {
    elements.dateInput.value = "";
    updateGallery("");
  });

  // Fetch random photo
  elements.randomBtn.addEventListener("click", () => {
    updateGallery(getRandomDate());
  });

  // ROCKET LAUNCH ANIMATION
  elements.launchBtn.addEventListener("click", () => {
    // Reset animation if it's already running
    elements.rocket.classList.remove("rocket-fly");
    // Trigger reflow to restart animation
    void elements.rocket.offsetWidth;

    elements.rocket.classList.add("rocket-fly");

    // Clean up class after animation ends (3 seconds)
    setTimeout(() => {
      elements.rocket.classList.remove("rocket-fly");
    }, 3000);
  });

  // 5. Run initial load
  updateGallery("");
};

// Start the application
startApp();