import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ------ Scene ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 45);

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

// const controls = new OrbitControls( camera, renderer.domElement );

// ------ Responsive Background ------
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

// ------ Lighting ------
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );

// #add8e6 Light blue
// #13333e Dark blue

//------ Objects ------ 
// --- Main sphere ---
const mainGeo = new THREE.SphereGeometry(10,32,16);
const mainMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
	transparent: true,
	transmission: 1,
	opacity: 0.5,
	metalness: 0,
	roughness: 0,
	ior: 1.5,
	thickness: 0.01,
	specularIntensity: 1,
	specularColor: 0xffffff,
	envMapIntensity: 1,
});
const mainSphere = new THREE.Mesh(mainGeo, mainMat);

// --- Bube inside the sphere ---
const secGeo = new THREE.BoxGeometry(8,8,8);
const secMat = new THREE.MeshPhysicalMaterial({
	alphaHash: true,
	color: 0xadd8e6,
	transparent: true,
	emissive: 0x000000,
	transmission:1,
	opacity: 1,
	transparent: true,
	metalness: 1,
	roughness: 0,
	ior: 2.33,
	thickness: 0,
	specularIntensity: 1,
	specularColor: 0xffffff,
	envMapIntensity: 1,
	reflectivity: 1.0,
})
const box = new THREE.Mesh(secGeo, secMat);

// ------ Object added to the scene ------
scene.add(mainSphere);
scene.add(box);
mainSphere.renderOrder = 1;


// ------ object rotation on scroll ------
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        box.rotation.y += 0.5;
    } else {
        box.rotation.y -= 0.5;
    }
});


// ------ Animations ------
function animate(){

    // controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();