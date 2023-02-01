import { Physics, Debug } from '@react-three/rapier';
import Lights from './Lights.jsx';
import { Level } from './Level.jsx';
import Player from './player.jsx';
import useGame from './stores/useGame.jsx';
import Effects from './Effects.jsx';

// This will hold the entire application.
// We probably wont use physics or effects but I will remove them at the end.

export default function Experience() {
	const blocksCount = useGame((state) => {
		return state.blocksCount;
	});
	const blocksSeed = useGame((state) => {
		return state.blocksSeed;
	});
	// console.log(blocksCount);
	return (
		<>
			<color args={['#252731']} attach='background' />

			<Physics>
				{/* <Debug /> */}
				<Level count={blocksCount} seed={blocksSeed} />
				<Player />
			</Physics>
			<Lights />
			{/* <Effects /> */}
		</>
	);
}
