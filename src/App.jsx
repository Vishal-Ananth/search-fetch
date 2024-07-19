import { useEffect, useState, memo, useDeferredValue, Suspense } from "react";
import "./App.css";
import PokemonList from "./PokemonList";
import useDebounce from "./useDebounce";

function App() {
  const [apiResult, setApiResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const defferedSearchValue = useDebounce(searchItem, 500);

  useEffect(() => {
    if (localStorage.length === 0) {
      fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
        .then((response) => response.json())
        .then((data) => {
          setApiResult(data.results);
          setFilteredResult(data.results);
          localStorage.setItem("results", JSON.stringify(data.results));
        })
        .catch((err) => {
          console.log(err);
        });

      console.log("first");
    } else {
      setApiResult(JSON.parse(localStorage.getItem("results")));
      setFilteredResult(JSON.parse(localStorage.getItem("results")));

      console.log("second");
    }
  }, []);

  useEffect(() => {
    if (searchItem !== null) {
      const filteredValue = apiResult.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(defferedSearchValue.toLowerCase())
      );
      setFilteredResult(filteredValue);
    }
  }, [defferedSearchValue]);

  function handleChange(e) {
    setSearchItem(e.target.value);
  }

  return (
    <>
      <form>
        <input
          type="text"
          value={searchItem}
          placeholder="Search ..."
          onChange={handleChange}
        ></input>
      </form>
      {defferedSearchValue === "" ? (
        <p>Search ...</p>
      ) : (
        <PokemonList list={filteredResult}></PokemonList>
      )}
    </>
  );
}

export default App;
