import { useEffect, useState } from "react";

export default function useSearch(query, page) {
	const [repos, setRepos] = useState([]);
	const [hasNext, setHasNext] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setRepos([]);
	}, [query]);

	useEffect(() => {
		if (query !== "") {
			setLoading(true);
			setError(false);
			fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}`)
				.then((res) => {
					const check = res.headers.get("link").includes('rel="next"');
					setHasNext(check);
					setLoading(false);
					return res.json();
				})
				.then((data) => setRepos((prev) => [...prev, ...data.items]))
				.catch((err) => setError(true));
		}
	}, [query, page]);

	return { repos, hasNext, loading, error };
}
