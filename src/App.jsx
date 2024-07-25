import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";
import useDebounce from "./utils/useDebounce";
import useSearch from "./utils/useSearch";
import RepositoryList from "./RepositoryList";

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
			{repos.length !== 0 && (
				<div className="display">
					{repos.map((val, index) =>
						repos.length === index + 1 ? (
							<RepositoryList
								key={val.id}
								item={val}
								index={index}
								lastItemOnPage={lastItemOnPage}
							></RepositoryList>
						) : (
							<RepositoryList
								key={val.id}
								item={val}
								index={index}
								lastItemOnPage={null}
							></RepositoryList>
						)
					)}
				</div>
			)}

			{/* {loading && <h2 className="loading">loading...</h2>} */}
			{error && <h2 className="error">Oops Error !</h2>}
		</>
	);
}

export default App;
