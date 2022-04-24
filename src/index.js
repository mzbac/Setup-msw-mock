import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { PokemonCacheProvider } from "./pokemonCache";

if (process.env.NODE_ENV === "development") {
  const { mock } = require("./mocks/browser");
  mock.start();
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <PokemonCacheProvider>
      <App />
    </PokemonCacheProvider>
  </StrictMode>
);
