import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Completed from "./Completed";
import Proceeding from "./Proceeding";
import Important from "./Important";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/proceeding" element={<Proceeding />} />
          <Route path="/important" element={<Important />} />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
