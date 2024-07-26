import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";
import useSearch from "./utils/useSearch";
import { FixedSizeList } from "react-window";
import RepositoryItem from "./RepositoryItem";

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);
	const { repos, hasNext, loading, error, totalItems } = useSearch(searchQuery, page);
	const observerRef = useRef();

	const lastItemOnPage = useCallback((last) => {
		if (loading) return;
		if (observerRef.current) observerRef.current.disconnect();
		observerRef.current = new IntersectionObserver((value) => {
			if (value[0].isIntersecting && hasNext) {
				if (!error) {
					setPage((prevPage) => prevPage + 1);
				} else {
					return;
				}
			}
		});
		if (last) observerRef.current.observe(last);
	});

	useEffect(() => {
		console.log("has next page", hasNext);
		console.log("page number : ", page);
	}, [page]);

	function handleChange(e) {
		setSearchQuery(e.target.value);
		setPage(1);
	}
	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={searchQuery}
					placeholder={"search repositories"}
					onChange={handleChange}
				></input>
			</form>

			<h1>Total results : {totalItems}</h1>
			<h2>Current : {repos.length}</h2>
			{repos.length !== 0 && (
				<FixedSizeList
					itemCount={totalItems}
					itemSize={200}
					height={600}
					width={1000}
					useIsScrolling
				>
					{({ index, style, isScrolling }) => (
						<RepositoryItem
							item={repos[index]}
							style={style}
							isScrolling={isScrolling}
							index={index}
						></RepositoryItem>
					)}
				</FixedSizeList>
			)}

			{error && <h2 className="error">Oops Error !</h2>}
		</>
	);
}

export default App;
