export default function ShowList({ arr }) {
	return (
		<>
			{arr.map((val, ind) => (
				<p key={ind}>Index : {val}</p>
			))}
		</>
	);
}
