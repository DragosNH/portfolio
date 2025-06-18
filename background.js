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
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

//------ Objects ------ 
const mainGeo = new THREE.SphereGeometry(5,32,16);
const mainMat = new THREE.MeshPhysicalMaterial();
const mainSphere = new THREE.Mesh(mainGeo, mainMat);

scene.add(mainSphere);

// ------ Animations ------
function animate(){


    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();