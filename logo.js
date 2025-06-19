import * as THREE from 'three';

const logoContainer = document.querySelector('.logo');

// ------ Scene ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

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

// ------ Colors ------
// #add8e6 Light blue
// #13333e Dark blue


const circleGeo = new THREE.CircleGeometry(5, 32);
const circleMat = new THREE.MeshBasicMaterial({color: 0x13333e});
const circle = new THREE.Mesh(circleGeo, circleMat);


scene.add(circle);


function animate() {

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();