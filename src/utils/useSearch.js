import { useEffect, useState } from "react";

export default function useSearch(query, page) {
	const [repos, setRepos] = useState([]);
	const [hasNext, setHasNext] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		setRepos([]);
		setTotalItems(0);
	}, [query]);

	useEffect(() => {
		if (query !== "") {
			setLoading(true);
			setError(false);
			const url = new URL("https://api.github.com/search/repositories");
			url.searchParams.set("q", query);
			url.searchParams.set("per_page", 10);
			url.searchParams.set("page", page);

			fetch(url)
				.then((res) => {
					console.log();
					const check = res.headers.get("link").includes('rel="next"');
					setHasNext(check);
					setLoading(false);
					return res.json();
				})
				.then((data) => {
					setRepos((prev) => [...prev, ...data.items]);
					setTotalItems(data.total_count);
				})
				.catch((err) => {
					setError(true);
					setLoading(false);
				});
		}
	}, [query, page]);

	return { repos, hasNext, loading, error, totalItems };
}
