import { DataTexture } from 'three';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// This is used to control the actions of the functions when state changes.
// Unsure if we will make different store or have a big one.

// This will be used to control the portfolio text
// and to keep track of where the user is on the adventure

export default create(
	subscribeWithSelector((set) => {
		// This is the default values of global functions
		return {
			// Blocks - probably be reused at the end of the adventure
			blocksCount: 10,
			blocksSeed: 0,

			// Time - same as above but changed to blockStartTime etc
			startTime: 0,
			endTime: 0,

			// Phases - same as above but changed to blockPhases
			// Although we will make new "phases" to display the different information
			phase: 'ready',

			// These will need to be changed to blockStart

			// We will probably also make Home|Welcome|Projects|Experience|Contact|Game

			start: () => {
				set((state) => {
					if (state.phase === 'ready')
						return { phase: 'playing', startTime: Date.now() };
					return {};
				});
			},
			restart: () => {
				set((state) => {
					if (state.phase === 'playing' || state.phase === 'ended')
						return { phase: 'ready', blocksSeed: Math.random() };
					return {};
				});
			},
			end: () => {
				set((state) => {
					if (state.phase === 'playing')
						return { phase: 'ended', endTime: Date.now() };
					return {};
				});
			},
		};
	})
);
