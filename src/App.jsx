import { useEffect, useState } from "react";
import "./App.css";
import PokemonList from "./PokemonList";
import useDebounce from "./utils/useDebounce";
import useSearch from "./utils/useSearch";

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 1000);
	const [page, setPage] = useState(1);

	const { repos, hasNext, loading, error } = useSearch(debouncedQuery, page);

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
				<input type="text" placeholder="Search ..." onChange={handleChange}></input>
			</form>
			{debouncedQuery !== ""
				? repos.map((val) => (
						<div key={val.id} className="item">
							<div>Repsoitory Name : {val.full_name}</div>
							<div>Owner : {val.owner.login}</div>
							<div>Language : {val.language}</div>
							<div>Watchers : {val.watchers}</div>
						</div>
				  ))
				: null}
			<div>{loading && "loading...."}</div>
			<div>{error && "Error!!!"}</div>
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
