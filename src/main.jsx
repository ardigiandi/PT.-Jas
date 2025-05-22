import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Corrected import
import { ThemeProvider } from "./components/fragments/theme-provider";
import App from "./app";
import axios from "axios"; // Import axios

// Set default base URL for axios
// Set default base URL for axios
// axios.defaults.baseURL = "http://127.0.0.1:8000"; // Comment out or remove base URL

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
