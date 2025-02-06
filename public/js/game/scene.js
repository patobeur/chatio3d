"use strict";
import * as THREE from "three";
import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
import { _GLTFLoader, _TextureLoader } from './loaders.js';
import { _physics } from './physics.js';
import { _soleil } from './sun.js';
let _consoleOn = false

let _scene = {
	// SCENE CREATION
	set_scene: function () {
		this.scene = new THREE.Scene();
		this.scene.name = 'lv0';
		this.scene.fog = new THREE.Fog(0x000020, 10, 120);
		this.scene.background = new THREE.Color( 0x000020  );
		if (_consoleOn) console.log('0', this.scene)
	},
	// CAMERA
	set_camera: function () {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.name = 'first'
		this.camera.position.set(0,15,30);
		this.camera.lookAt(new THREE.Vector3(0, 1, 0))
		this.camera2 = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera2.name = 'secour'
	},
	// RENDERER
	set_renderer: function () {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
	
		// Configuration du rendu
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
		this.renderer.autoClear = true
		// this.renderer.toneMapping = THREE.ACESFilmicToneMapping
		// this.renderer.toneMappingExposure = 1
		// this.renderer.setClearColor(0x000010, 1.0);
		this.renderer.shadowMap.enabled = true
		document.body.appendChild(this.renderer.domElement);
		console.log('three canvas added to dom') 
		
	},
	// ROOM (décor)
	set_roomGrid: function () {
		this.room = new THREE.LineSegments(
			new BoxLineGeometry(39, 39, 39, 20, 20, 20),
			new THREE.LineBasicMaterial({ color: 0xEAAAEA })
		);
		this.room.position.y = 19
		this.scene.add(this.room);
	},
	// SUN light
	// set_sun: function (active = false) {
	// 	this.SUN = new THREE.DirectionalLight(0xffffff, 1);
	// 	this.SUN.name = 'SUN';

	// 	this.SUN.userData.initiated = active;
	// 	this.SUN.userData.speed = 0.001;
	// 	this.SUN.userData.radius = 10;

	// 	this.SUN.position.set(0, 10, 0);
	// 	this.SUN.shadow.mapSize.width = 2048; // default
	// 	this.SUN.shadow.mapSize.height = 2048; // default

	// 	this.SUN.shadow.camera.near = 0.5; // default
	// 	this.SUN.shadow.camera.far = 100; // default

	// 	this.SUN.shadow.camera.left = -this.SUN.userData.radius;
	// 	this.SUN.shadow.camera.right = this.SUN.userData.radius;
	// 	this.SUN.shadow.camera.top = this.SUN.userData.radius;
	// 	this.SUN.shadow.camera.bottom = -this.SUN.userData.radius;

	// 	this.SUN.castShadow = true
	// 	this.SUN.receiveShadow = false;

	// 	const SunCubeGeometry = new THREE.BoxGeometry(.3, .3, .3);
	// 	const SunGeometry = new THREE.SphereGeometry(.3, 32, 32);
	// 	const SunMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, transparent: true, opacity: .5 });
	// 	const SunCubeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF00 });
	// 	this.SUNCube = new THREE.Mesh(SunGeometry, SunMaterial);
	// 	this.SUN.add(this.SUNCube)
	// 	// this.SUNhelper = new THREE.DirectionalLightHelper(this.SUN, 20, 0xffff00);
	// 	// this.SUN.add(this.SUNhelper)

	// 	this.SUN.starter = function () {
	// 		return this.SUN
	// 	}
	// 	// -----------------------------
	// 	this.SUN.rotateAroundPoint = (center) => {
	// 		// Augmenter l'angle pour la rotation
	// 		this.SUN.userData.angle = (this.SUN.userData.angle || 0) + this.SUN.userData.speed;
	
	// 		// Calculer les nouvelles coordonnées de l'objet
	// 		const x = center.x + this.SUN.userData.radius * Math.cos(this.SUN.userData.angle);
	// 		const y = center.y + this.SUN.userData.radius * Math.sin(this.SUN.userData.angle);
	// 		const z = center.z + this.SUN.userData.radius * Math.sin(this.SUN.userData.angle)//obj.position.z; // Garder la même hauteur
	
	// 		// Appliquer les nouvelles coordonnées
	// 		this.SUN.position.set(x, y, z);
	// 	},
	
	// 	// Appeler cette fonction dans la boucle de rendu (animation loop)
	// 	this.SUN.animate=function () {
	// 		// Faire tourner la sphère autour du centre (0,0,0)
	// 		this.rotateAroundPoint(new THREE.Vector3(0, 0, 0));
	// 	}
	// },
	// gltf
	set_gltf: function () {

		for (const key in _GLTFLoader.models) {
			console.log(_GLTFLoader.models[key].userData.set)
			if (_GLTFLoader.models[key].userData.set === 'dungeon') {
				// console.log(_GLTFLoader.models[key].userData)
				// if (_GLTFLoader.models[key].children.length === 1) {
				_scene.scene.add(_GLTFLoader.models[key]);

				// }
			}
		}
		// for (let index = 0; index < _GLTFLoader.models.length; index++) {
		// 	const element = _GLTFLoader.models[index];
		// 	console.log(element)
		// 	_scene.scene.add(element)

		// }
	},
	// POINT light
	set_lights: function () {

		var ambientLight = new THREE.AmbientLight('white', 0.6);
		this.scene.add(ambientLight);

		// var topLight = new THREE.DirectionalLight('white', 0.3);
		// topLight.position.set(0, 0, 1);
		// this.scene.add(topLight);

		// var light = new THREE.DirectionalLight('white', 1);
		// this.scene.add(light);

		// const pointLight1 = new THREE.PointLight(0xff0000, 1, 100);
		// pointLight1.position.set(2, 1, 2);
		// const pointLight2 = new THREE.PointLight(0x0000ff, 1, 100);
		// pointLight2.position.set(-2, 1, -2);
		// this.scene.add(pointLight2);
		// this.scene.add(pointLight1);
		// this.ambientLight = new THREE.AmbientLight(0xFFFFFF, .8); // soft white light
		// this.scene.add(this.ambientLight);
	},
	// Initialisation de la Scene et Loire
	init: function () {
		this.set_scene()
		this.set_camera()
		this.set_renderer()

		this.soleil = _soleil;
		this.physics = _physics;
		this.physics._setupPhysicsWorld()
		this.physics._initPhysicsWorld()
		this.set_roomGrid()
		// this.set_sun(true)
		
		this.soleil.init()

		this.set_lights()

		// this.set_gltf()

		this.init_floor('ok')
		this.init_decor('ok')
		this.init_environment('ok')


		// ------------------------
		// Handle window resizing
		// ------------------------
		window.addEventListener('resize', () => {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		});
	},
	init_floor: function (what) {
		console.log('init_floor', what)
		let config = this.physics.modelsPhysics.groundZero
		this.physics.set_MeshAndPhysics(config, this.scene)
		console.log('config.mesh', config.mesh)
		this.scene.add(config.mesh)
	},
	init_environment: function (what) {
		console.log('init_environment', what)
		console.log(_TextureLoader.textures)
		// const textureEquirec = _TextureLoader.textures['sky'].map
		// textureEquirec.mapping = THREE.EquirectangularReflectionMapping
		// textureEquirec.encoding = THREE.sRGBEncoding
		// this.scene.environment = textureEquirec
		// this.scene.background = textureEquirec
	},
	init_decor: function (what) {
		console.log('init_decor', what)
		for (const key in this.physics.modelsPhysicsAuto) {
			if (Object.hasOwnProperty.call(this.physics.modelsPhysicsAuto, key)) {
				let config = this.physics.modelsPhysicsAuto[key]
				this.physics.set_MeshAndPhysics(config, this.scene)
				this.scene.add(config.mesh)
			}
		}
		let config = this.physics.modelsPhysics.groundZero
		this.physics.set_MeshAndPhysics(config, this.scene)
		this.scene.add(config.mesh)
		this.groundZero = this.physics.modelsPhysics.groundZero.mesh
	},
}
export { _scene, }
