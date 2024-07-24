import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";
import useDebounce from "./utils/useDebounce";
import useSearch from "./utils/useSearch";

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 1000);
	const [page, setPage] = useState(1);
	const { repos, hasNext, loading, error, totalItems } = useSearch(debouncedQuery, page);

	const observerRef = useRef();

	const lastItemOnPage = useCallback((last) => {
		if (loading) return;
		if (observerRef.current) observerRef.current.disconnect();
		observerRef.current = new IntersectionObserver((value) => {
			if (value[0].isIntersecting && hasNext) {
				setPage((prevPage) => prevPage + 1);
			}
		});
		if (last) observerRef.current.observe(last);
	});

	useEffect(() => {
		console.log(hasNext);
		console.log(page);
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
			{debouncedQuery != "" ? <h1>Total results : {totalItems}</h1> : null}
			<div style={{ position: "absolute", overflow: scroll }}>
				<div style={{ position: "relative" }}>
					{repos.map((val, index) =>
						repos.length === index + 1 ? (
							<div key={val.id} className="item-last" ref={lastItemOnPage}>
								<h1>Last {index + 1}</h1>
								<div>Repsoitory Name : {val.full_name}</div>
								<div>Owner : {val.owner.login}</div>
								<div>Language : {val.language}</div>
								<div>Watchers : {val.watchers}</div>
							</div>
						) : (
							<div key={val.id} className="item">
								<h1> Index : {index + 1}</h1>
								<div>Repsoitory Name : {val.full_name}</div>
								<div>Owner : {val.owner.login}</div>
								<div>Language : {val.language}</div>
								<div>Watchers : {val.watchers}</div>
							</div>
						)
					)}
				</div>
			</div>
			<div className="loading">{loading && "loading...."}</div>
			<div className="error">{error && "Search result does not exist"}</div>
		</>
	);
}

export default App;

/*

fetch algorithm 

fetch(`https://api.github.com/search/repositories?q=${examplify}&per_page=10&page=${page}`)
			.then((res) => {
				setApiHeader([...res.headers][3]);
				return res.json();
			})
			.then((data) => setApiResponse(data.items));
*/
