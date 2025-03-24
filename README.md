# 🎵 Spotify Lookup Application

This project is a **Node.js terminal-based application** that interacts with the **Spotify Web API** to retrieve song information based on user input. It demonstrates the use of third-party APIs, asynchronous programming, and file-based command execution.

## 🔍 Key Features

- 🔑 **Spotify API Integration** – Authenticates and fetches data directly from Spotify.
- 🧑‍🎤 **Search Songs** – Get details like:
  - Artist(s)
  - Song title
  - Preview link
  - Album name
- 📂 **Read Commands from File** – Supports reading actions from a text file to trigger specific lookups.
- 📦 **Command-line Tool** – Run searches by passing input via the terminal.

## 💻 Technologies Used

- **Node.js** – Runtime environment.
- **JavaScript** – Core programming logic.
- **Spotify Web API** – For retrieving music data.
- **NPM Modules:**
  - `axios` – For HTTP requests.
  - `dotenv` – To manage API keys securely.
  - `fs` – File system operations.
  - `express` (optional, if used for web fallback).

## 📁 File Structure Highlights

- `app.js` – Entry point and core logic.
- `API.js` – Handles API requests to Spotify.
- `SongSearch.html` – (If applicable) A basic frontend view.
- `views/` – Contains Pug templates.
- `routes/` – Express routes (if used).
- `public/stylesheets/` – CSS styling.

---

