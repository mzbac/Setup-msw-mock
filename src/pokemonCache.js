import { createContext, useReducer, useContext } from "react";

const PokemonCacheContext = createContext();

function pokemonCacheReducer(state, action) {
  switch (action.type) {
    case "ADD_POKEMON": {
      return { ...state, [action.pokemonUrl]: action.pokemonData };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function PokemonCacheProvider(props) {
  const [cache, dispatch] = useReducer(pokemonCacheReducer, {});
  return <PokemonCacheContext.Provider value={[cache, dispatch]} {...props} />;
}

export function usePokemonCache() {
  const context = useContext(PokemonCacheContext);
  if (!context) {
    throw new Error(
      "usePokemonCache must be used within a PokemonCacheProvider"
    );
  }
  return context;
}
