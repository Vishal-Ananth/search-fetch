import { useEffect, useRef, useState } from "react";

export default function SearchBar({ setPokemonName }) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current = null;
  }, []);

  function handleChange(e) {
    searchRef.current = e.target.value;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (searchRef.current === null || searchRef.current === "") {
      console.log("null value of search");
      setPokemonName(null);
    } else {
      searchRef.current = searchRef.current.replaceAll(" ", "-");
      console.log(`searchref hav value of : ${searchRef.current}`);

      const url = new URL(
        searchRef.current,
        "https://pokeapi.co/api/v2/pokemon/"
      );

      const req = await fetch(url).then((res) => res.json());
      setPokemonName(req);
      console.log("sent message");
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <label>
          Search :{" "}
          <input
            type="text"
            placeholder="Rhydon"
            onChange={handleChange}
          ></input>
        </label>
        <button type="submit">Search 🔎</button>
      </form>
    </div>
  );
}
