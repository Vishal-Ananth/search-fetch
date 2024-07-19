import { useEffect, useState } from "react";

export default function PokemonList({ list }) {
  const [response, setResponse] = useState([]);

  useState(() => {});

  return (
    <>
      {list !== null
        ? list.map((result, index) => (
            <div key={index}>
              <h1>{result.name.replaceAll("-", " ")}</h1>
            </div>
          ))
        : null}
    </>
  );
}
