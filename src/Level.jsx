import { Float, Text, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useState, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Game level

THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({
	color: '#111111',
	metalness: 0,
	roughness: 0,
});
const floor2Material = new THREE.MeshStandardMaterial({
	color: '#222222',
	metalness: 0,
	roughness: 0,
});
const obstacleloor1Material = new THREE.MeshStandardMaterial({
	color: '#ff0000',
	metalness: 0,
	roughness: 1,
});
const wallMaterial = new THREE.MeshStandardMaterial({
	color: '#887777',
	metalness: 0,
	roughness: 0,
});

function BlockStart({ position = [0, 0, 0] }) {
	return (
		<group position={position}>
			<Float floatIntensity={0.5} rotationIntensity={0.5}>
				<Text
					font='./bebas-neue-v9-latin-regular.woff'
					scale={0.5}
					maxWidth={0.25}
					lineHeight={0.75}
					textAlign='right'
					position={[0.75, 0.65, 0]}
					rotation-y={-0.75}
				>
					Ball Run
					<meshBasicMaterial toneMapped={true} />
				</Text>
			</Float>

			<mesh
				geometry={boxGeometry}
				material={floor1Material}
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
		</group>
	);
}

export function BlockSpinner({ position = [0, 0, 0] }) {
	const obstacle = useRef();

	// Speed also allows for the roation to change direction
	const [speed] = useState(
		() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
	);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		// console.log(time);
		const rotation = new THREE.Quaternion();
		rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
		obstacle.current.setNextKinematicRotation(rotation);
	});

	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={floor2Material}
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
			<RigidBody
				ref={obstacle}
				type='kinematicPosition'
				position={[0, 0.3, 0]}
				restitution={0.2}
				friction={0}
			>
				<mesh
					geometry={boxGeometry}
					material={obstacleloor1Material}
					scale={[3.5, 0.3, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	);
}

export function BlockLimbo({ position = [0, 0, 0] }) {
	const obstacle = useRef();

	// Speed also allows for the roation to change direction
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		// console.log(time);

		const y = Math.sin(time + timeOffset) + 1.15;
		// console.log(y);
		obstacle.current.setNextKinematicTranslation({
			x: position[0],
			y: (position[1] = y),
			z: position[2],
		});
	});

	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={floor2Material}
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
			<RigidBody
				ref={obstacle}
				type='kinematicPosition'
				position={[0, 0.3, 0]}
				restitution={0.2}
				friction={0}
			>
				<mesh
					geometry={boxGeometry}
					material={obstacleloor1Material}
					scale={[3.5, 0.3, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	);
}
export function BlockAxe({ position = [0, 0, 0] }) {
	const obstacle = useRef();

	// Speed also allows for the roation to change direction
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		// console.log(time);

		const x = Math.sin(time + timeOffset) * 1.25;
		// console.log(y);
		obstacle.current.setNextKinematicTranslation({
			x: position[0] + x,
			y: position[1] + 0.75,
			z: position[2],
		});
	});

	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={floor2Material}
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
			<RigidBody
				ref={obstacle}
				type='kinematicPosition'
				position={[0, 0.3, 0]}
				restitution={0.2}
				friction={0}
			>
				<mesh
					geometry={boxGeometry}
					material={obstacleloor1Material}
					scale={[1.5, 1.5, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	);
}

function BlockEnd({ position = [0, 0, 0] }) {
	const hamburger = useGLTF('./hamburger.glb');
	hamburger.scene.children.forEach((mesh) => {
		mesh.castShadow = true;
	});

	return (
		<group position={position}>
			<Text
				font='./bebas-neue-v9-latin-regular.woff'
				scale={1}
				position={[0, 1.5, 1]}
			>
				FINISH
				<meshBasicMaterial toneMapped={true} />
			</Text>
			<mesh
				geometry={boxGeometry}
				material={floor1Material}
				position={[0, 0, 0]}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
			<RigidBody
				type='fixed'
				colliders='hull'
				position={[0, 0.25, 0]}
				restitution={0.2}
				friction={0}
			>
				<primitive object={hamburger.scene} scale={0.2} />
			</RigidBody>
		</group>
	);
}

function Bounds({ length = 1 }) {
	// console.log(length);
	return (
		<>
			<RigidBody type='fixed' restitution={0.2} friction={0}>
				<mesh
					geometry={boxGeometry}
					material={wallMaterial}
					position={[2.15, 0.75, -(length * 2) + 2]}
					scale={[0.3, 1.5, length * 4]}
					castShadow
				/>
				<mesh
					geometry={boxGeometry}
					material={wallMaterial}
					position={[-2.15, 0.75, -(length * 2) + 2]}
					scale={[0.3, 1.5, length * 4]}
					receiveShadow
				/>
				<mesh
					geometry={boxGeometry}
					material={wallMaterial}
					position={[0, 0.75, -(length * 4) + 2]}
					scale={[4, 1.5, 0.3]}
					receiveShadow
				/>
				<CuboidCollider
					args={[2, 0.1, 2 * length]}
					position={[0, -0.1, -(length * 2) + 2]}
					restitution={0.2}
					friction={1}
				/>
			</RigidBody>
		</>
	);
}

export function Level({
	count = 5,
	types = [BlockSpinner, BlockLimbo, BlockAxe],
	seed = 0,
}) {
	const blocks = useMemo(() => {
		const blocks = [];

		for (let i = 0; i < count; i++) {
			const type = types[Math.floor(Math.random() * types.length)];
			blocks.push(type);
		}

		return blocks;
	}, [count, types, seed]);
	// console.log(blocks);
	return (
		<>
			<BlockStart position={[0, 0, 0]} />
			{blocks.map((Block, index) => (
				<Block key={index} position={[0, 0, -(index + 1) * 4]} />
			))}
			<BlockEnd position={[0, 0, -(count + 1) * 4]} />

			<Bounds length={count + 2} />
		</>
	);
}
