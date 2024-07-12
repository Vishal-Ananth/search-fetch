import { useEffect } from "react";

export default function ResultCard({ pokemon }) {
  // useEffect(() => {
  //   console.log(pokemon);
  // });

  return (
    <div className="result-card">
      {pokemon.sprites.front_default ? (
        <img src={pokemon.sprites.front_default}></img>
      ) : null}
      <div className="pokemon-details">
        <h2>
          {pokemon.name} &nbsp;&nbsp;:&nbsp;&nbsp; {pokemon.id}
        </h2>

        {pokemon.types.map((val, index) => (
          <div className="types" key={index}>
            {val.type.name}
          </div>
        ))}

        <div>
          <h3>Abilities</h3>
          {pokemon.abilities.map((val, index) => (
            <p id="abilities" key={index}>
              {val.ability.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
