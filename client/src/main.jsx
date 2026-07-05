import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <SearchProvider>

        <App/>

    </SearchProvider>

</BrowserRouter>
);