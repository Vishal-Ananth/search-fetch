import { useEffect } from "react";

export default function RepositoryItem({ item, style, isScrolling, index }) {
	return (
		<div className="item" style={style}>
			{isScrolling ? (
				<div>Loading...</div>
			) : item === undefined ? (
				<div>Nothing</div>
			) : (
				<>
					<h1>Index : {index + 1}</h1>
					<div>{item.name}</div>
					<div>Repsoitory Name : {item.full_name}</div>
					<div>Owner : {item.owner.login}</div>
					<div>Language : {item.language}</div>
					<div>
						Watchers : {item.watchers} &emsp;&emsp; Forks : {item.forks_count}
					</div>
				</>
			)}
		</div>
	);
}
