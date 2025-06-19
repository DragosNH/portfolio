import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const logoContainer = document.querySelector('.logo');

// ------ Scene ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer({ alpha: true});
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


const controls = new OrbitControls( camera, renderer.domElement );
// ------ Colors ------
// #add8e6 Light blue
// #13333e Dark blue

// ------ Objects ------
// --- Background Circle ---
const circleGeo = new THREE.CircleGeometry(30, 32);
const circleMat = new THREE.MeshBasicMaterial({
	color: 0x13333e,
	side: THREE.DoubleSide,
});
const circle = new THREE.Mesh(circleGeo, circleMat);

// --- Pen bodyr ---
const cilinderGeo = new THREE.CylinderGeometry(3.5, 3.5, 35, 36);
const cilinderMat = new THREE.MeshBasicMaterial({
	color: 0xadd8e6
});
const penBody = new THREE.Mesh(cilinderGeo, cilinderMat);
penBody.position.y += 6.5;
// penBody.rotation.z -= 0.5;

// --- Button ---
const btnGeo = new THREE.BoxGeometry(3, 6, 6);
const btnMat = new THREE.MeshBasicMaterial({
	color: 0x13333e,
});
const penBtn = new THREE.Mesh(btnGeo, btnMat);
penBtn.position.y += 12;
penBtn.position.z += 1;

// --- Circle around pen body ---


scene.add(circle);
scene.add(penBody);
scene.add(penBtn)

function animate() {

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();