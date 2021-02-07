import Poke from './Container/Poke/poke.js'
import NavBar from './Container/NavBar/navbar.js'
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
    console.log(toArray[0]);
  };
  
  
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter pokemon name"
          />
        </label>
      </form>

      {pokemonData.map((data) => {
        console.log("Name: " + data.forms[0].name);
        return (
          <div>
            <Poke data={data}></Poke>
          </div>
        );
      })}
    </div>
  );
};
export default App;