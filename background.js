import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ------ Scene ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 35);

// ------ Background ------
scene.environment = new THREE.CubeTextureLoader()
    .setPath('textures/cubemap/')
    .load([
        'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
    ]);

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

// ------ Responsive Background ------
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

// ------ Lighting ------
const directionalLight = new THREE.DirectionalLight( 0x00ffff, 1 );
scene.add( directionalLight );

//------ Objects ------ 
const mainGeo = new THREE.SphereGeometry(10,32,16);
const mainMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
	transmission: 1,
	opacity: 0.5,
	metalness: 0,
	roughness: 0,
	ior: 1.5,
	thickness: 0.01,
	specularIntensity: 1,
	specularColor: 0xffffff,
	envMapIntensity: 1,
	lightIntensity: 1,
	exposure: 1,
	transmissionResolutionScale: 1
});
const mainSphere = new THREE.Mesh(mainGeo, mainMat);

const secGeo = new THREE.BoxGeometry(5,5,5);
const secMat = new THREE.MeshPhysicalMaterial({
	color: 0x00ffff,
	transmission:1,
	opacity: 1,
	metalness: 1.5,
	roughness: 0,
	ior: 1,
	thickness: 0.5,
	specularIntensity: 1,
	specularColor: 0x00ffff,
	envMapIntensity: 1,
	lightIntensity: 1,
	exposure: 1,
	transmissionResolutionScale: 1
})
const box = new THREE.Mesh(secGeo, secMat);

scene.add(mainSphere);
scene.add(box);

box.position.x += 20; 
// ------ Animations ------
function animate(){


    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();