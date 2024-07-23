import { useEffect, useState } from "react";

export default function PokemonList({ list }) {
	const [filteredUrl, setFilteredUrl] = useState([]); // list of urls extracted from the list
	const [showCards, setShowCards] = useState([]); // list of pokemon objects fetched from the list of urls
	const [scrollTop, setScrollTop] = useState(0);

	const ITEM_HEIGHT = 200; // height per card
	const CONTAINER_HEIGHT = 1000; // height of the overall lists in the dom

	const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
	const endIndex = Math.min(
		showCards.length,
		Math.floor((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT)
	);
	const visibleItems = showCards.slice(startIndex, endIndex);

	useEffect(() => {
		setFilteredUrl([]);
		// console.log(showCards);
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

	function handleScroll(e) {
		// item height = 200
		// console.log("inner height ->", 4 * 200); // innerHeight = numItems * itemHeight
		// console.log("Start index ->", startIndex); // Math.floor(scrollTop / itemHeight)
		// console.log("End Index -> ", endIndex);
		console.log(e.target.offsetHeight);
		setScrollTop(e.target.scrollTop);
	}

	return (
		<>
			{showCards !== null ? (
				showCards.length !== 0 ? (
					<div className="display" onScroll={handleScroll}>
						<div
							className="list-container"
							style={{
								height: `${showCards.length * ITEM_HEIGHT}px`,
							}}
						>
							<div
								className="item-container"
								style={{
									position: "relative",
									height: `${
										visibleItems.length * ITEM_HEIGHT
									}px`,
									top: `${startIndex * ITEM_HEIGHT}px`,
									// bottom: `${endIndex * ITEM_HEIGHT}px`
								}}
							>
								{visibleItems.map((item) => (
									<div className="card" key={item.id}>
										<h2>{item.id}</h2>
										<p>{item.name}</p>
										<img
											src={item.sprites.front_default}
										></img>
									</div>
								))}
							</div>
						</div>
					</div>
				) : (
					<h3>Pokemon not found!</h3>
				)
			) : null}
		</>
	);
}
