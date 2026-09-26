# Mesob House

Mesob House is a responsive Ethiopian dining and food-ordering website built with React and Vite.

The project is based on the provided Figma designs and uses the provided Addis Eats menu API as the source of truth for food data.

---

## Features

Mesob House allows users to:

- Explore Today's Specials.
- Browse the full menu by category.
- Search dishes by English or Amharic name.
- View individual dish details.
- Add dishes to a shared shopping cart.
- Update quantities and remove cart items.
- Create a local account.
- Sign in with the local account.
- Continue browsing as a guest.
- Proceed through a protected checkout flow.
- Submit delivery and payment selections through client-side validation.
- Receive a checkout confirmation.
- Navigate through responsive mobile and desktop layouts.
- Receive a dedicated 404 page for unknown routes.
- Recover from rendering errors through a React Error Boundary.

---

## Tech Stack

- React
- Vite
- React Router
- Zustand
- React Hook Form
- Zod
- React Icons
- CSS Modules
- JavaScript (ES Modules)

---

## React Concepts Used

The project applies the React concepts covered throughout the course, including:

### Core React

- Components
- JSX
- Props
- Conditional rendering
- Lists and keys
- `useState`
- `useEffect`
- `useRef`
- Custom component composition

### Routing

- React Router
- Nested layouts
- Dynamic dish routes
- Catch-all 404 route
- Protected routes
- Redirecting unauthenticated users
- Returning users to their intended destination after authentication

### Forms

- Controlled form workflows
- React Hook Form
- Zod schemas
- Client-side validation
- Validation messages
- Form submission states

### State Management

Zustand is used for shared application state.

The project currently uses Zustand for:

- Shopping cart state
- Authentication/session state

The shopping cart remains available across different pages because it is maintained in a shared store.

### Error Handling

The project includes React Error Boundaries for rendering failures.

A fallback interface is displayed when a React component tree crashes instead of leaving the page unusable.

### Code Splitting

Page-level components are loaded with `React.lazy()`.

`Suspense` provides a loading state while the requested page chunk is loading.

This creates route-level code splitting instead of loading every page component into the initial JavaScript bundle.

---

## Acknowledgments & Credits

This project was developed as part of the Full Stack Software Development Curriculum at IBT College under Module 3 (Frontend: React and Next.js).
