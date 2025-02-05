"use strict";
import { _client } from './client.js'
window.addEventListener("load", () => {
	if (io) {
		const SOCKET = io(`ws://${location.host}`);
		if (SOCKET) {
			// if (THREE) {
				// if (Ammo) {
					Ammo().then(() => {
						_client.init({ socket: SOCKET, Ammo: Ammo})
					});
				// }
			// }
		};

	}
});