"use strict";
let GameCom = {
    user: undefined,
    users: undefined,
    map: undefined,
    socket: undefined,
	// loadAssets
	// ------------------------
	init: function (datas,socket) {
		 this.socket = socket
		 this.user = datas.user
		 this.users = datas.users
		 this.map = datas.map
		console.log('this.Feun',this.user,this.users,this.map)
		console.log('jesuispret !')
		this.socket.emit('jesuispret', 1)
	},
}
export { GameCom }
