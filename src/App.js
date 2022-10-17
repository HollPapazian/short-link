import "./App.css";
import { Routes, Route } from "react-router-dom";
import { CreateShortLinkComponent, RedirectComponent } from "./components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateShortLinkComponent />} />
        <Route path=":shortLink" element={<RedirectComponent />} />
      </Routes>
    </div>
  );
}

export default App;
