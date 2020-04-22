import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let container, scene, camera, renderer;
let geometry, material, mesh, controls;

function init() {
	container = document.querySelector('#scene-container');
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 
		75, // fov
		window.innerWidth/window.innerHeight, // aspect ratio
		0.1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 5;

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(container.clientWidth, container.clientHeight);
	container.appendChild( renderer.domElement);

	controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render);

	geometry = new THREE.BoxGeometry(2, 2, 2);
	material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh(geometry, material);
	scene.add( mesh );

	animate();
}

function render() {
	renderer.render( scene, camera );
}

// animation loop
const animate = function () {
	requestAnimationFrame(animate);

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;

	render();
};

const onWindowResize = function() {
  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize( container.clientWidth, container.clientHeight );
}

// Event listeners
window.addEventListener('resize', onWindowResize);

init();