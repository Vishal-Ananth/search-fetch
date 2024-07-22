/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function PokemonList({ list }) {
	const [filteredUrl, setFilteredUrl] = useState([]);
	const [showCards, setShowCards] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setFilteredUrl([]);
	}, [showCards]);

	useEffect(() => {
		setLoading(true);
		filteredUrl.map((val) =>
			fetch(val)
				.then((response) => response.json())
				.then((data) => setShowCards((prevVal) => [data, ...prevVal]))
				.finally(setLoading(false))
		);
	}, [filteredUrl]);

	useEffect(() => {
		list.map((val) => setFilteredUrl((preVal) => [val.url, ...preVal]));
		setShowCards([]);
	}, [list]);

	useState(() => {});

	return (
		<>
			{loading && "loading..."}
			{showCards !== null ? (
				showCards.length !== 0 ? (
					showCards.map((result, index) => (
						<div key={index} className="card">
							<h1>{result.id}</h1>
							<p>{result.name}</p>
							<img src={result.sprites.front_default}></img>
						</div>
					))
				) : (
					<h3>Pokemon not found!</h3>
				)
			) : null}
		</>
	);
}
