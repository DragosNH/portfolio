import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const logoContainer = document.querySelector('.logo');

// ------ Scene ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 80);

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer(/*{ alpha: true}*/);
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


const controls = new OrbitControls(camera, renderer.domElement);

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
const cilinderMat = new THREE.MeshBasicMaterial({
	color: 0xadd8e6
});
const penBody = new THREE.Mesh(cilinderGeo, cilinderMat);
penBody.position.y += 7.5;


// --- Button ---
const btnGeo = new THREE.BoxGeometry(4.5, 12, 7);
const btnMat = new THREE.MeshBasicMaterial({
	color: 0x13333e,
});
const penBtn = new THREE.Mesh(btnGeo, btnMat);
penBtn.position.y += 20;
penBtn.position.z += 3.5;


// --- Torus around pen body ---
const torusGeo = new THREE.TorusGeometry(7, 1, 15, 40);
const torusMat = new THREE.MeshBasicMaterial({
	color: 0x13333e,
});
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.rotation.x = 4.7;
torus.position.y -= 19;


// --- Pen head ---
const penHeadGeo = new THREE.CylinderGeometry(5.5, 1.8, 15, 36);
const penHeadMat = new THREE.MeshBasicMaterial({
	color: 0xadd8e6,
});
const penHead = new THREE.Mesh(penHeadGeo, penHeadMat);
penHead.position.y -= 35;

// --- Pointer ---
const pointerGeo = new THREE.CylinderGeometry(1.6, 0.5, 5, 36);
const pointer = new THREE.Mesh(pointerGeo, penHeadMat);
pointer.position.y -= 45;


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


// ------ Objects added in the scene ------
scene.add(circle);
scene.add(penGroup);

function animate() {

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();