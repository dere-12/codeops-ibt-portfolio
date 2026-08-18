# Birr Watch — Live ETB Currency Converter & Tracker

A responsive, data-driven web application designed to track real-time Ethiopian Birr (ETB) exchange rates, convert currencies, and persist a personalized watchlist across browser sessions.

---

## Project Overview

**Birr Watch** provides users with up-to-date foreign exchange rates using the ETB as the base currency. Built with plain HTML5, modern CSS3, and Vanilla JavaScript (ES6+), the application follows a single-source-of-truth state architecture and offers a mobile-first responsive design.

---

## Features

- **Live Exchange Rates**: Dynamically fetches the latest exchange rate data from a public API (`open.er-api.com`).
- **Real-Time Currency Conversion**: Instant conversion from ETB to target foreign currencies with numeric and decimal validation.
- **Dynamic Watchlist**: Automatically tracks target currencies and allows users to remove them with a single click.
- **Local Persistence**: Automatically saves user selections and watchlist state using `localStorage`.
- **Error & Loading UI**: Gracefully handles network failures, offline fallback states, and invalid input entries.
- **Mobile-First Responsive UI**: Styled for optimal usability across mobile, tablet, and desktop screens.
- **Light/Dark Theme**: Toggle between light and dark theme.

---

## Tech Stack & Design Tools

- **Markup & Layout**: HTML5
- **Styling**: CSS3
- **Scripting**: Vanilla JavaScript (ES6+, Async/Await, Fetch API, DOM Delegation, `localStorage`)
- **Design Tool**: [Google Stitch](https://stitch.google.com) (Used to design mobile and desktop UI prototypes)
- **API**: Open Exchange Rates API (`https://open.er-api.com/v6/latest/ETB`)

---

## Acknowledgments & Credits
This project was developed as part of the Full Stack Software Development Curriculum at IBT College under Module 2 (Frontend: HTML, CSS & JavaScript).
