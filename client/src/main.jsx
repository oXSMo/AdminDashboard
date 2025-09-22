import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "preline/preline";
import { BrowserRouter } from "react-router-dom";
import 'react-quill/dist/quill.snow.css'; 
import ErrorBoundary from "./Components/common/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <ErrorBoundary>
     <App />
   </ErrorBoundary>
  </BrowserRouter>
);
