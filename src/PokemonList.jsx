/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export default function PokemonList({ list }) {
	const [filteredUrl, setFilteredUrl] = useState([]);
	const [showCards, setShowCards] = useState([]);

	useEffect(() => {
		setFilteredUrl([]);
	}, [showCards]);

	useEffect(() => {
		filteredUrl.map((val) =>
			fetch(val)
				.then((response) => response.json())
				.then((data) => setShowCards((prevVal) => [data, ...prevVal]))
		);
	}, [filteredUrl]);

	useEffect(() => {
		list.map((val) => setFilteredUrl((preVal) => [val.url, ...preVal]));
		setShowCards([]);
	}, [list]);

	useState(() => {});

	return (
		<div className="display">
			{showCards !== null ? (
				showCards.length !== 0 ? (
					showCards.map((result) => (
						<div key={result.id} className="card">
							<h2>pokedex id : {result.id}</h2>
							<p>{result.name.replaceAll("-", " ")}</p>
							<img
								src={result.sprites.front_default}
								alt={`${result.name.replaceAll(
									"-",
									" "
								)} pokemon image`}
							></img>
						</div>
					))
				) : (
					<h3>Pokemon not found!</h3>
				)
			) : null}
		</div>
	);
}
