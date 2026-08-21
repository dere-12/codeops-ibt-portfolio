# Addis Eats — Food Ordering Web Application

A responsive, single-page food ordering app built with vanilla JavaScript and Tailwind CSS. **Addis Eats** allows users to browse traditional and modern Ethiopian dishes, filter by category, search live, manage a persistent shopping cart in ETB, and place orders through a validated TeleBirr checkout form.

---

## Features

* **Dynamic Menu Rendering:** Fetches dish data asynchronously from `menu.json` with dedicated loading and error states.
* **Live Search & Category Filter:** Filter dishes by name or category.
* **Persistent Shopping Cart:** Cart state is synchronized with `localStorage`, preserving items across browser refreshes.
* **TeleBirr Checkout Form:** Validates user inputs with custom regex matching Ethiopian phone number formats (`09xxxxxxxx` or `+2519xxxxxxxx`).
* **State-Driven UI Architecture:** Uses a single state object as the source of truth, triggering predictable UI updates.

---

## Tech Stack & Design Tools

* **Frontend:** HTML5, Tailwind CSS
* **Logic:** Vanilla JavaScript (ES6+ Async/Await, Array Methods, DOM Manipulation)
* **Design Tool:** [Google Stitch](https://stitch.google.com) (Used to design mobile and desktop UI prototypes)
* **Data Storage:** Local `menu.json` & Browser `localStorage` API

---

## Acknowledgments & Credits
This project was developed as part of the Full Stack Software Development Curriculum at IBT College under Module 2 (Frontend: HTML, CSS & JavaScript).