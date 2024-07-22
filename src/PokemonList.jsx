import { useEffect, useState } from "react";

export default function PokemonList({ list }) {
	const [filteredUrl, setFilteredUrl] = useState([]);
	const [showCards, setShowCards] = useState([]);
	const [scrollTop, setScrollTop] = useState(0);

	const ITEM_HEIGHT = 200;
	const CONTAINER_HEIGHT = 800;
	const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
	const endIndex = Math.min(
		showCards.length,
		Math.floor((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT)
	);
	const visibleItems = showCards.slice(startIndex, endIndex);
	const invisibleItemsHeight =
		(startIndex + visibleItems.length - endIndex) * ITEM_HEIGHT;

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

	function handleScroll(e) {
		// item height = 200
		// console.log("inner height ->", 4 * 200); // innerHeight = numItems * itemHeight
		console.log("Start index ->", startIndex); // Math.floor(scrollTop / itemHeight)
		console.log("End Index -> ", endIndex);
		console.log(visibleItems);
		console.log("***************");
		setScrollTop(e.target.scrollTop);
	}

	return (
		<div className="display">
			{showCards !== null ? (
				showCards.length !== 0 ? (
					<div
						style={{
							height: `${CONTAINER_HEIGHT}px`,
							overflowY: "scroll",
						}}
						onScroll={handleScroll}
					>
						<div
							style={{
								height: `${showCards.length * ITEM_HEIGHT}px`,
							}}
						>
							<div
								style={{
									position: "relative",
									height: `${
										visibleItems.length * ITEM_HEIGHT
									}px`,
									top: `${startIndex * ITEM_HEIGHT}px`,
								}}
							>
								{visibleItems.map((item) => (
									<div
										className="card"
										key={item.id}
										style={{ height: `${ITEM_HEIGHT}px` }}
									>
										<h2>{item.id}</h2>
										<p>{item.name}</p>
										<img
											src={item.sprites.front_default}
										></img>
										{/* <h1>RENDERED</h1> */}
									</div>
								))}
							</div>
							<div
								style={{ height: `${invisibleItemsHeight}px` }}
							/>
						</div>
					</div>
				) : (
					<h3>Pokemon not found!</h3>
				)
			) : null}
		</div>
	);
}

/*
showCards.map((result, index) => (
						<div key={result.id} className="card">
							<h2>pokedex id : {index}</h2>
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


					*/
