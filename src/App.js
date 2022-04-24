import { useEffect, useState } from "react";
import "./styles.scss";
import { usePokemonCache } from "./pokemonCache";

export default function App() {
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState("1");
  const [pokemon, setPokemon] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [cache, dispatch] = usePokemonCache();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(async (res) => {
      const pokemonList = await res.json();
      setPokemonList(pokemonList.results);
      setSelectedPokemonUrl(pokemonList.results[0].url);
    });
  }, []);

  useEffect(() => {
    if (!selectedPokemonUrl) {
      return;
    } else if (cache[selectedPokemonUrl]) {
      setPokemon(cache[selectedPokemonUrl]);
    } else {
      fetch(selectedPokemonUrl).then(async (res) => {
        const pokemon = await res.json();
        setPokemon(pokemon);
        dispatch({
          type: "ADD_POKEMON",
          pokemonUrl: selectedPokemonUrl,
          pokemonData: pokemon,
        });
      });
    }
  }, [selectedPokemonUrl, dispatch, cache]);

  return (
    <div className="pokemon-info-app">
      <div className="container">
        <select
          className="select"
          name="select-pokemon"
          onChange={(e) => {
            setSelectedPokemonUrl(e.target.value);
            const idxOfSeletedPokemon = pokemonList.findIndex(
              (p) => p.url === e.target.value
            );
            setCurrentIdx(idxOfSeletedPokemon);
          }}
          value={selectedPokemonUrl}
        >
          {pokemonList.map((p) => {
            return (
              <option key={p.url} value={p.url}>
                {p.name}
              </option>
            );
          })}
        </select>
        <div className="info">
          {pokemon && (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )}
          {pokemon && <h1>{pokemon.name}</h1>}
          {pokemon && <p>Some placeholder descriptions</p>}
        </div>
        <div className="nav-actions">
          <button
            onClick={() => {
              if (currentIdx === 0) {
                setCurrentIdx(pokemonList.length - 1);
                setSelectedPokemonUrl(pokemonList[pokemonList.length - 1].url);
              } else {
                setCurrentIdx((prev) => {
                  setSelectedPokemonUrl(pokemonList[prev - 1].url);
                  return prev - 1;
                });
              }
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentIdx === pokemonList.length - 1) {
                setCurrentIdx(0);
                setSelectedPokemonUrl(pokemonList[0].url);
              } else {
                setCurrentIdx((prev) => {
                  setSelectedPokemonUrl(pokemonList[prev + 1].url);
                  return prev + 1;
                });
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
