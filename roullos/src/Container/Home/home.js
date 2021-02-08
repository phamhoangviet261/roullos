import Poke from '../Poke/poke.js'
import PokeDetail from '../PokeDetail/pokedetail.js'
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import "./home.css";
import axios from "axios";

const Home = () => {
  const [pokemon, setPokemon] = useState("1");//neu cho nay khong de la 1 thi khi an Load More se bi tra ve full poke in database
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pokemon);
    let toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      //toArray = toArray.concat(pokemonData);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };
  const getPokemon = async () => {
    console.log(pokemon);
    let toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      console.log(url)
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      toArray = toArray.concat(pokemonData);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
    console.log(toArray[0]);
  };
  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  const handleLoading = (e) => {
      setPokemon(getRndInteger(1, 898));
      console.log(pokemon)
      getPokemon();
  }

  return (
    <div className="Home">
            <div className="search__container">
                <p className="search__title">
                    Go ahead, hover over search Píkà
                </p>
              <div className="searchBar">
                <form onSubmit={handleSubmit}>
                  <label>
                    <input className="search__input" style={{width: "50rem"}}
                      type="text"
                      onChange={handleChange}
                      placeholder="Enter pokemon name or id"
                    />
                  </label>
                </form>
              </div>
            </div>
            <div className="listPoke" id="listPoke">
              {pokemonData.map((data) => {
                  return (          
                      <Poke 
                      key={data.id}
                      data={data}></Poke>
                  );
                })}
            </div>
            <button className="learn-more" onClick={handleLoading}>Load More</button>
          </div>
  );
};
export default Home;