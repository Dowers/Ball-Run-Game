import { Physics, Debug } from '@react-three/rapier';

import Lights from './Lights.jsx';
import { Level } from './Level.jsx';
import Player from './player.jsx';

export default function Experience() {
	return (
		<>
			www
			<Physics>
				{/* <Debug />w */}
				<Lights />
				<Level />
				<Player />
			</Physics>
		</>
	);
}
