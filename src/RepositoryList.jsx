export default function RepositoryList({ item, index, lastItemOnPage }) {
	return (
		<div
			className={lastItemOnPage === null ? "item" : "item-last"}
			ref={lastItemOnPage}
		>
			<h1>Index : {index + 1}</h1>
			<div>Repsoitory Name : {item.full_name}</div>
			<div>Owner : {item.owner.login}</div>
			<div>Language : {item.language}</div>
			<h3>Description</h3>
			<p style={{ textOverflow: "ellipsis" }}>{item.description}</p>
			<div>
				Watchers : {item.watchers} &emsp;&emsp; Forks : {item.forks_count}
			</div>
		</div>
	);
}
