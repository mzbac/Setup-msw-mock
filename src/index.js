import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { PokemonCacheProvider } from "./pokemonCache";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <PokemonCacheProvider>
      <App />
    </PokemonCacheProvider>
  </StrictMode>,
  rootElement
);
