/* eslint-disable react/no-unknown-property */

export default function Lights() {
	return (
		<>
			<ambientLight intensity={1.2} />
			<directionalLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow shadow-mapSize={[2024, 2024]} />
			<pointLight position={[10, 0, 0]} />
		</>
	);
}
