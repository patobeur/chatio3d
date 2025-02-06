import * as THREE from "three";
import { _scene, } from './scene.js'
export let _soleil = {
	sun: null,
	groupe: null,
	config: {
        grp_name: 'grp_sun',
        name: 'soleil',
        color: 0xffffff,
        power: 5,
        radius: 10,
        distance:10,
        rotationSpeed: 0.0001,
        position: new THREE.Vector3(0, 0, 0),
        size: { x: .5, y: .5, z: .5 },
        mat: {
            color: 0xFFFFFF00,
            emissive: 0xFF00FF,
            emissiveIntensity: 2,
        }
	},
	init: function () {
		this.config.position.y = this.config.radius
		// this.floorSize = _dataz.floorsByName.main.floorSizes
		this.add();
	},
	add: function () {
		// this.config.position = new THREE.Vector3(
		// 	this.floorSize.x / 2,
		// 	this.floorSize.y / 2,
		// 	this.floorSize.x / 2
		// )
		this.groupe = new THREE.Group()
		this.groupe.name = this.config.grp_name
		this.groupe.position.set(this.config.radius,this.config.radius,0);

		// -------------------------------------------------
		// une sphere là ou est le soleil
		const sphereGeometry = new THREE.SphereGeometry(this.config.size.x, 32, 32);
		const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, transparent: true, opacity: .5 });
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphere.castShadow = false;
		sphere.receiveShadow = false;
		this.groupe.add(sphere);

		// une autre sphere pour le soleil
		const soleilGeometry = new THREE.SphereGeometry(this.config.size.x * .6, 16, 16);
		const soleilMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xffff00 });
		const soleilAvatar = new THREE.Mesh(soleilGeometry, soleilMaterial);
		soleilAvatar.castShadow = false;
		soleilAvatar.receiveShadow = false;
		this.groupe.add(soleilAvatar);

		// -------------------------------------------------
		// le vrai soleil
		this.sun = new THREE.DirectionalLight(
			this.config.color,
			this.config.power
		);
		this.sun.shadow.mapSize.width = 2048; // default
		this.sun.shadow.mapSize.height = 2048; // default

		this.sun.shadow.camera.near = 0.5; // default
		this.sun.shadow.camera.far = 100; // default

		this.sun.name = 'sun'
		this.sun.shadow.camera.left = -this.config.distance;
		this.sun.shadow.camera.right = this.config.distance;
		this.sun.shadow.camera.top = this.config.distance;
		this.sun.shadow.camera.bottom = -this.config.distance;

		this.sun.castShadow = true;
		this.sun.receiveShadow = false;

		// this.sun.direction = { x: 0, y: 0, z: 0 }
		this.groupe.add(this.sun);


		// // Add helper for the shadow camera
		// const helper = new THREE.CameraHelper(this.sun.shadow.camera);
		// _scene.scene.add(helper);

		_scene.scene.add(this.groupe);
        console.log(this.groupe)

	},
	// Appeler cette fonction dans la boucle de rendu (animation loop)
	animate: function (delta) {
		// Faire tourner la sphère autour du centre (0,0,0) 
		this.rotationB((0, 0, 0),delta);
		// this.rotateAroundPoint(this.groupe,new THREE.Vector3(0, 0, 0),delta,this.config);
	},
	// -----------------------------
	rotateAroundPoint: (obj, center, delta, config) => {
        // console.log('obj', obj)
        // console.log('center', center)
        // console.log('delta', delta)
        console.log('config', config)
		// Augmenter l'angle pour la rotation
		obj.userData.angle = (obj.userData.angle || 0) + (config.rotationSpeed * delta);

		// Calculer les nouvelles coordonnées de l'objet
		const x = center.x + config.radius * Math.cos(obj.userData.angle);
		const y = center.y + config.radius * Math.sin(obj.userData.angle);
		const z = center.z + config.radius * Math.cos(obj.userData.angle)//obj.position.z; // Garder la même hauteur

		// // Appliquer les nouvelles coordonnées
		obj.position.set(x, y, z);
        // // console.log(obj.position.x, obj.position.y, obj.position.z)
	},











    
	rotation(centerV3 = [0, 0, 0],delta) {
        console.log('this.groupe.position (avant rotation):', this.groupe.position);
    
        var rotationSpeed = 0.01; // Un angle visible
    
        // Créer un vecteur représentant le centre de rotation
        var center = new THREE.Vector3(centerV3[0], centerV3[1], centerV3[2]);
    
        // Calcul du vecteur relatif
        var relative = new THREE.Vector3().subVectors(this.groupe.position, center);
    
        // Vérification si l’objet est sur l'axe Y (évite la rotation inutile)
        if (relative.x === 0 && relative.z === 0) {
            console.warn("L'objet est aligné sur l'axe Y, rotation autour de Y inefficace.");
            return;
        }
    
        // Calcul de la rotation autour de l'axe Y
        var newX = relative.x * Math.cos(rotationSpeed) - relative.z * Math.sin(rotationSpeed);
        var newZ = relative.x * Math.sin(rotationSpeed) + relative.z * Math.cos(rotationSpeed);
        var newY = relative.y; // Pas de rotation sur Y
    
        // Appliquer la nouvelle position
        this.groupe.position.set(newX + center.x, newY + center.y, newZ + center.z);
    
        console.log('this.groupe.position (après rotation):', this.groupe.position);
    },
	rotationB(centerV3 = [0, 0, 0],delta) {    
        var rotationSpeed = 0.01; // Un angle visible
        var speed = delta * rotationSpeed * 3

        // Créer un vecteur représentant le centre de rotation
        var center = new THREE.Vector3(centerV3[0], centerV3[1], centerV3[2]);
    
        // Calcul du vecteur relatif
        var relative = new THREE.Vector3().subVectors(this.groupe.position, center);
    
        // Vérification si l’objet est sur l'axe Y (évite la rotation inutile)
        if (relative.x === 0 && relative.z === 0) {
            console.warn("L'objet est aligné sur l'axe Y, rotation autour de Y inefficace.");
            return;
        }
    
        // Calcul de la rotation autour de l'axe Y
        var newX = relative.x * Math.cos(speed) - relative.z * Math.sin(speed);
        var newZ = relative.x * Math.sin(speed) + relative.z * Math.cos(speed);
        var newY = relative.y;
    
        // Appliquer la nouvelle position
        this.groupe.position.set(newX + center.x, newY + center.y, newZ + center.z);
    },
    // rotation2(centerV3 = [0, 0, 0],delta) {
    //     var speed = delta * this.config.rotationSpeed
    
    //     var center = new THREE.Vector3(centerV3[0], centerV3[1], centerV3[2]);
    //     var relative = new THREE.Vector3().subVectors(this.groupe.position, center);
    
    //     // Créer une matrice de rotation autour de Y
    //     var matrix = new THREE.Matrix4().makeRotationY(speed);
    
    //     // Appliquer la rotation
    //     relative.applyMatrix4(matrix);
    
    //     // Mise à jour de la position
    //     this.groupe.position.copy(relative.add(center));
    
    //     console.log('this.groupe.position (après rotation):', this.groupe.position);
    // },
    // rotateOnAxis(centerV3 = [0, 1, 0], delta) {
    //     var speed = delta * this.config.rotationSpeed
    //     var axis = new THREE.Vector3(centerV3[0], centerV3[1], centerV3[2]);
    //     this.groupe.rotateOnWorldAxis(axis, speed);
    //     console.log('this.groupe.position (après rotation):', this.groupe.position);
    // },
    // rotation4(centerV3 = [0, 1, 0], delta) {
    //     console.log("centerV3:", centerV3);
    //     var rotationSpeed = 0.01;
    //     var axis = new THREE.Vector3(centerV3[0], centerV3[1], centerV3[2]); // Axe Y
    //     console.log("axis:", axis);
    
    //     this.groupe.rotateOnWorldAxis(axis, rotationSpeed );
        
    //     console.log('this.groupe.position (après rotation):', this.groupe.position);
    // },    
	// // -----------------------------
	// rotateAroundPoint: (obj, center, delta, config) => {
	// 	// Augmenter l'angle pour la rotation
	// 	obj.userData.angle = (obj.userData.angle || 0) + (config.rotationSpeed * delta);

	// 	// Calculer les nouvelles coordonnées de l'objet
	// 	const x = center.x + config.radius * Math.cos(obj.userData.angle);
	// 	const y = center.y + config.radius * Math.sin(obj.userData.angle);
	// 	const z = center.z + config.radius * Math.cos(obj.userData.angle)//obj.position.z; // Garder la même hauteur

	// 	// // Appliquer les nouvelles coordonnées
	// 	obj.position.set(x, y, z);
    //     // // console.log(obj.position.x, obj.position.y, obj.position.z)
	// },
};

