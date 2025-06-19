import * as THREE from 'three';

const container = document.querySelector(".background");

// ------ Scene ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-50, 30, 80);

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

scene.background = new THREE.Color(0xadd8e6);

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);


// ------ Responsive Background ------
window.addEventListener('resize', () => {
	const width = container.clientWidth;
	const height = container.clientHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);
});

// ------ Lighting ------
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
pointLight.position.set( 25, 35, 40 );
scene.add( pointLight );

//------ Objects ------ 
// --- Main sphere ---
const mainGeo = new THREE.SphereGeometry(10, 32, 16);
const mainMat = new THREE.MeshPhysicalMaterial({
	color: 0xf0f0f0,
	transparent: true,
	transmission: 1,
	opacity: 0.5,
	metalness: 0,
	roughness: 0,
	ior: 1.5,
	thickness: 0.01,
	specularIntensity: 1,
	specularColor: 0x13333e,
	envMapIntensity: 1,
});
const mainSphere = new THREE.Mesh(mainGeo, mainMat);

// --- Cube inside the sphere ---
const secGeo = new THREE.BoxGeometry(8, 8, 8);
const secMat = new THREE.MeshPhysicalMaterial({
	alphaHash: true,
	color: 0x13333e,
	transparent: true,
	emissive: 0x000000,
	transmission: 1,
	opacity: 1,
	metalness: 1,
	roughness: 0,
	ior: 2.33,
	thickness: 0,
	specularIntensity: 1,
	specularColor: 0xadd8e6,
	envMapIntensity: 1,
	reflectivity: 1.0,
})
const mainBox = new THREE.Mesh(secGeo, secMat);

// --- Octahedron that orbits around the sphere ---

const octGeo = new THREE.OctahedronGeometry(5, 1);
const octMat = new THREE.MeshStandardMaterial({
	transparent: false,
	opacity: 1,
	color: 0xadd8e6,
	roughness: 0,
	metalness: 0.8,
})

const geoWireframe = new THREE.WireframeGeometry(octGeo);
const geoLine = new THREE.LineSegments(geoWireframe);
geoLine.material.depthTest = false;
geoLine.material.opacity = 0.25;
geoLine.material.transparent = true;
geoLine.material.color = new THREE.Color(0xadd8e6);

const oct = new THREE.Mesh(octGeo, octMat);
const octPivot = new THREE.Object3D();

// ------ Object added to the scene ------
scene.add(mainSphere);
scene.add(mainBox);
scene.add(octPivot);

const octGroup = new THREE.Group();
octGroup.add(oct);
octGroup.add(geoLine);
octGroup.position.set(15, 0, 0);
octPivot.add(octGroup);

mainSphere.renderOrder = 1;


// ------ object rotation on scroll ------
window.addEventListener('scroll', (e) => {
	if (e.deltaY > 0) {
		mainBox.rotation.y += 0.5;
		oct.rotation.x += 0.5;
		octPivot.rotation.x += 0.05;
	} else {
		mainBox.rotation.y -= 0.5;
		oct.rotation.x -= 0.5;
		octPivot.rotation.x -= 0.05;
	}
});


// ------ Animations ------
function animate() {

	mainBox.rotation.x += 0.015;

	oct.rotation.y += 0.005;
	octPivot.rotation.y += 0.005;

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();