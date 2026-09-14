import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Mesob House!</h1>}></Route>
        <Route path="menu" element={<p>List of Menu...</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
