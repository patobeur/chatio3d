"use strict";
import * as THREE from "three";
import { _scene, } from './scene.js'
import { _physics } from './physics.js';
import { _player } from './player.js';
import { _GLTFLoader, _TextureLoader } from './loaders.js';
import { ModelsManager } from './ModelsManager.js';
import { _OrbitControls } from './OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GameCom} from './gameCom.js'

let Game = {
	// ------------
    gameCom:GameCom,
    Ammo:null,
    clock:null,
    stats:null,
	// loadAssets
	// ------------------------
	// init called from client.js
	init: function (Ammo) {

		// this.user = gdatas.user
		// this.users = gdatas.users
		// this.map = gdatas.map

        this.Ammo = Ammo
        this.THREE = THREE
        this.THREEx = THREEx
		this.clock = new THREE.Clock()
		
		this.stats = new Stats();
		this.stats.dom.style.top = 'initial'
		this.stats.dom.style.bottom = '0'

		this._scene = _scene
        this._physics = _physics
        this._player = _player

        console.log('Game init')

		// console.log('Ammo',this.Ammo)
		// console.log('THREE',this.THREE)
		// console.log('THREEx',this.THREEx)
		// console.log('THREEx.Linkify',this.THREEx.Linkify)
;
		this.loadAssets();
	},
	// ------------------------
	loadAssets: function () {
		let root = '';
		// _AnimatedLoader.init(root, () => {
		_GLTFLoader.init(root, (what) => {
			this._GLTFLoader = _GLTFLoader
			console.log('--------------------------',what)
			_TextureLoader.init(root, (what) => {
				this._TextureLoader = _TextureLoader
				console.log('--------------------------',what)
					this.ModelsManager = new ModelsManager({fonctionretour:(what)=>{
						console.log('--------------------------',what)
						Game.starter()
					}})
			})
		})

	},
	// ------------------------
	callbackKeyBoard: function (what) {
		console.log('callbackKeyBoard',what);
	},
	// ------------------------
	starter: function () {
		this._scene.init();
		document.body.appendChild(this.stats.dom);
		this.animate(0)
		console.log('----------GameCom----------------')
		console.log(GameCom)
		_player.init(this._physics, this._GLTFLoader, this.ModelsManager, this.callbackKeyBoard)
		_OrbitControls.init (this._scene, _player)
		// GameCom.init('feun')
	},
	// ------------------------
	// ANIMATION
	// ------------------------
	animate: function (time) {
		requestAnimationFrame(Game.animate);
		let delta = Game.clock.getDelta();
		Game._scene.soleil.animate(delta)
		// if (Game._scene.SUN.userData.initiated) Game._scene.SUN.animate();

		// if (_player.initiated) {
		// 	_ModelsManagerClass.allMeshsAndDatas.character['Kimono_Female'].MegaMixer.update(delta);
		// }
		if (_player && _player.initiated) {
			_player.checkActions(delta); // Vérifier si le joueur bouge
			if (_player._ModelsManager && _player._ModelsManager.allMeshsAndDatas.character['Kimono_Female']) {
				_player._ModelsManager.allMeshsAndDatas.character['Kimono_Female'].MegaMixer.update(delta);
			}
		}


		if (typeof _OrbitControls === 'object') _OrbitControls.update();
		Game._physics.updateWorldPhysics(delta, time);
		Game._scene.renderer.render(Game._scene.scene, Game._scene.camera);
		Game.stats.update();



	},
}


// 3d end

export { Game }
