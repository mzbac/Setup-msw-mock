import { rest } from "msw";
import { pokemons } from "./response/pokemonList";
import { bulbasaur } from "./response/bulbasaur";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    return res(ctx.json(pokemons));
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/1", (req, res, ctx) => {
    return res(ctx.json(bulbasaur));
  }),
];
