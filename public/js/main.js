import { _client } from './client.js'
window.addEventListener("load", () => {
	if (io) {
		const SOCKET = io(`ws://${location.host}`);
		if (SOCKET) _client.init({ socket: SOCKET });
	}
});