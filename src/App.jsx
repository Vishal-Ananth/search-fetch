import { useEffect, useRef, useState, useLayoutEffect } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import ResultCard from "./ResultCard";

function App() {
  const [pokemonName, setPokemonName] = useState(null);
  const [render, setRender] = useState(0);
  const [results, setResults] = useState([]);
  const dispRef = useRef([]);

  useEffect(() => {
    setRender(render + 1);
    console.log(pokemonName);
    if (pokemonName !== null) {
      dispRef.current.unshift(pokemonName);
      localStorage.setItem("pokes", JSON.stringify(dispRef.current));
      setResults(dispRef.current);
    } else {
      if (localStorage.length !== 0) {
        dispRef.current = JSON.parse(localStorage.getItem("pokes"));
        setResults(dispRef.current);
      }

      //   console.log(localStorage.length);
    }
  }, [pokemonName]);

  return (
    <div className="app-container">
      <SearchBar setPokemonName={setPokemonName}></SearchBar>

      <div className="display-region">
        {pokemonName === null && results.length === 0 ? (
          render === 1 ? (
            <div></div>
          ) : (
            <h2>No results, invalid Pokemon</h2>
          )
        ) : (
          results.map((pokemon, index) => (
            <ResultCard key={index} pokemon={pokemon}></ResultCard>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
