let _keyboard = {
	moves : { x: 0, y: 0 },
	tchatActive: false,
	actions:{},
	keyMap:{},
	onDocumentKey: function (e, tchatActive) {
		// console.log('onDocumentKey tchatActive', tchatActive)
		if (tchatActive === false) {
			// console.log('keydown')
			if (e.type === "keydown" || e.type === "keyup") {
				_keyboard.keyMap[e.code] = e.type === "keydown";
			}
			_keyboard.actions.moveForward = (_keyboard.keyMap["KeyW"] || _keyboard.keyMap["ArrowUp"]);
			_keyboard.actions.moveBackward = (_keyboard.keyMap["KeyS"] || _keyboard.keyMap["ArrowDown"]);
			_keyboard.actions.moveLeft = (_keyboard.keyMap["KeyA"] || _keyboard.keyMap["ArrowLeft"]);
			_keyboard.actions.moveRight = (_keyboard.keyMap["KeyD"] || _keyboard.keyMap["ArrowRight"]);

			// console.log('this.actions', e.code)
			_keyboard.checkMooves()
		}
	},
	checkMooves: function () {
		_keyboard.moves = { x: 0, y: 0 }
		_keyboard.actions.ismoving = false
		if (_keyboard.actions.moveForward) { _keyboard.moves.y = - 1; _keyboard.actions.ismoving = true; console.log('moveForward')}
		if (_keyboard.actions.moveBackward) { _keyboard.moves.y = 1; _keyboard.actions.ismoving = true; console.log('moveForward')}
		if (_keyboard.actions.moveLeft) { _keyboard.moves.x = - 1; _keyboard.actions.ismoving = true; console.log('moveRight')}
		if (_keyboard.actions.moveRight) { _keyboard.moves.x = 1; _keyboard.actions.ismoving = true; console.log('moveRight')}
	},
	initMoves: function () {
		this.moves = { x: 0, y: 0 }
	},
	initActions: function () {
		this.actions = { moveForward: false, moveBackward: false, moveLeft: false, moveRight: false, turnLeft: false, turnRight: false, jump: false, isjumping: false, ismooving: false, rotating: false }
	},
	initKeyMap: function () {
		this.keyMap = { KeyW: false, KeyS: false, KeyA: false, KeyD: false, KeyQ: false, KeyE: false, Space: false, ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false };
	},
	init: function () {
		this.initActions()
		this.initKeyMap()
		this.initMoves()
		document.addEventListener("keydown", (e) => { this.onDocumentKey(e, this.tchatActive) }, true);
		document.addEventListener("keyup", (e) => { this.onDocumentKey(e, this.tchatActive) }, true);
		console.log('_keyboard activated');
	},
}

export { _keyboard }
