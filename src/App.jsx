import { useEffect, useId, useState, memo } from "react";
import "./App.css";

function App() {
  const [apiResult, setApiResult] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const ITEM_HEIGHT = 20;
  const VISIBLE_ITEMS = 10;
  const TOTAL_ITEMS = 1302;
  const BUFFER_SIZE = 5;

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1302")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results.length);
        setApiResult(data.results);
        setFilteredResult(data.results);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredValue = apiResult.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredResult(filteredValue);
  }, [searchItem]);

  function handleChange(e) {
    const searchValue = e.target.value;
    setSearchItem(searchValue);
  }
  function handleClick(e) {
    // console.log(e.target.innerText);
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${e.target.innerText.replaceAll(
        " ",
        "-"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageURL(data.sprites.front_default);
      })
      .catch((err) => {
        console.log("not found");
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target[0].value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchItem}
          placeholder="Search ..."
          onChange={handleChange}
        ></input>
      </form>

      {loading && <p>Loading data...</p>}
      {error && <p>Data not found</p>}
      <img src={imageURL}></img>
      <ul
        onScroll={(e) => {
          setScrollPosition(e.currentTarget.scrollTop);
        }}
      >
        {!loading && !error && filteredResult.length === 0 ? (
          <p>No results found sorry</p>
        ) : (
          filteredResult.map((val, index) => (
            <li key={index} onClick={handleClick}>
              {val.name.replaceAll("-", " ")}
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default App;
