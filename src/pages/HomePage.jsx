
import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import "../assets/css/style.css";

const HomePage = ({ searchQuery }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((response) => {
        console.log("API Response:", response.data.results);
        setPokemonList(response.data.results);
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Search Query:", searchQuery);
  console.log("Filtered Pokemon:", filteredPokemon);

  return (
    <div className="pokemon-list">
      {filteredPokemon.length === 0 ? (
        <p>No Pokemon found</p>
      ) : (
        filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))
      )}
    </div>
  );
};

export default HomePage;

