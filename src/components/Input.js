export default function Input(props) {
	const { type, onChange, placeholder, ...others } = props || {};
	return (
		<input
			className={`w-full border border-gray-500 rounded focus:outline-none my-1 p-2 text-black ${others.className}`}
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			value={others?.value}
			name={others?.name}
		/>
	);
}
