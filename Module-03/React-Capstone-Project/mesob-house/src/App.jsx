import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodaysSpecials from "./pages/TodaysSpecials";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodaysSpecials />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
