// src/main.js
import React from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(App, null)
  )
);
