import * as THREE from 'three';
import { rotate } from 'three/tsl';

// ------ Query serlector ------
const logoContainer = document.querySelector('.logo');

// ------ Scene ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 80);

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(logoContainer.clientWidth, logoContainer.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
logoContainer.appendChild(renderer.domElement);

requestAnimationFrame(() => {
	const width = logoContainer.clientWidth;
	const height = logoContainer.clientHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);
});


// ------ Colors ------
// #add8e6 Light blue
// #13333e Dark blue

// ------ Objects ------
// --- Background Circle ---
const circleGeo = new THREE.CircleGeometry(50, 32);
const circleMat = new THREE.MeshBasicMaterial({
	color: 0x13333e,
	side: THREE.DoubleSide,
});
const circle = new THREE.Mesh(circleGeo, circleMat);

// --- Pen body ---
const cilinderGeo = new THREE.CylinderGeometry(5.5, 5.5, 65, 36);
const lightMat = new THREE.MeshBasicMaterial({
	color: 0xadd8e6
});
const penBody = new THREE.Mesh(cilinderGeo, lightMat);
penBody.position.y += 7.5;


// --- Button ---
const btnGeo = new THREE.BoxGeometry(4.5, 12, 7);
const darkermat = new THREE.MeshBasicMaterial({
	color: 0x13333e,
});
const penBtn = new THREE.Mesh(btnGeo, darkermat);
penBtn.position.y += 20;
penBtn.position.z += 3.5;


// --- Torus around pen body ---
const torusGeo = new THREE.TorusGeometry(7, 1, 15, 40);
const torus = new THREE.Mesh(torusGeo, darkermat);
torus.rotation.x = 4.7;
torus.position.y -= 19;


// --- Pen head ---
const penHeadGeo = new THREE.CylinderGeometry(5.5, 1.8, 15, 36);
const penHead = new THREE.Mesh(penHeadGeo, lightMat);
penHead.position.y -= 35;

// --- Pointer ---
const pointerGeo = new THREE.CylinderGeometry(1.6, 0.5, 5, 36);
const pointer = new THREE.Mesh(pointerGeo, lightMat);
pointer.position.y -= 45;

// --- Grater sign using Cilinders ---
const superiorGraterGeo = new THREE.CylinderGeometry(4, 4, 40, 36);
const superiorGrater = new THREE.Mesh(superiorGraterGeo, lightMat);
superiorGrater.position.x += 45;
superiorGrater.rotation.z += 45;
const inferiourGrater = new THREE.Mesh(superiorGraterGeo, lightMat);
inferiourGrater.position.x += 45;
inferiourGrater.position.y -= 20;
inferiourGrater.rotation.z -= 45;

// --- Less sign using cilinders ---
const superiorLesser = new THREE.Mesh(superiorGraterGeo, lightMat);
superiorLesser.position.x -= 45;
superiorLesser.rotation.z -= 45;
const inferiourLesser = new THREE.Mesh(superiorGraterGeo, lightMat);
inferiourLesser.position.x -= 45;
inferiourLesser.position.y -= 20;
inferiourLesser.rotation.z += 45;

// ------ Groups ------
// --- Body group ---
const penBodyGroup = new THREE.Group();
penBodyGroup.add(penBody);
penBodyGroup.add(penBtn);
penBodyGroup.add(torus);
// --- Head Group ---
const headGroup = new THREE.Group();
headGroup.add(penHead);
headGroup.add(pointer);
// --- Pen Group ---
const penGroup = new THREE.Group();
penGroup.add(penBodyGroup);
penGroup.add(headGroup);
penGroup.rotation.z -= 0.5;
// --- Grater than ---
const graterThan = new THREE.Group();
graterThan.add(superiorGrater);
graterThan.add(inferiourGrater);
graterThan.position.y += 5;
// --- Lesser than ---
const lesserThan = new THREE.Group();
lesserThan.add(superiorLesser);
lesserThan.add(inferiourLesser);
lesserThan.position.y += 5;

const logo = new THREE.Group();
logo.add(circle);
logo.add(penGroup);
logo.add(graterThan);
logo.add(lesserThan);

// ------ Objects added in the scene ------
scene.add(logo);

// ------ Rotation on click ------
let isRotating = false;
let targetRotation = 0;

logoContainer.addEventListener("click", function () {
	if (!isRotating) {
		targetRotation += 2 * Math.PI; 
		isRotating = true;
	}
	setTimeout(() => {window.location.href = "index.html";}, 1000);
});


function animate() {

	// --- Rotation animation ---
	if (isRotating) {
		const rotationSpeed = 0.05; 
		const delta = targetRotation - logo.rotation.y;

		if (Math.abs(delta) < 0.01) {
			logo.rotation.y = targetRotation;
			isRotating = false;
		} else {
			logo.rotation.y += delta * rotationSpeed;
		}
	}

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();