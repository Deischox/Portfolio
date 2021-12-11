import * as THREE from 'https://cdn.skypack.dev/three';
import {OrbitControls} from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/OBJLoader.js";

function main() {
	const canvas = document.querySelector('#c');
	canvas.wi
	const renderer = new THREE.WebGLRenderer({canvas});
  
	const fov = 15;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(10, 20, 20);
  
	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 5, 0);
	controls.update();
  
	const scene = new THREE.Scene();
	scene.background = new THREE.Color('black');
  
	
	
	  const sphereRadius = 3;
	  const sphereWidthDivisions = 32;
	  const sphereHeightDivisions = 16;
	  const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
	  const sphereMat = new THREE.MeshPhongMaterial({color: '#0000', wireframe:true});
	  const mesh = new THREE.Mesh(sphereGeo, sphereMat);
	  mesh.position.set(0, 5, 0);
	  //scene.add(mesh);
	
  
	
	  const intensity = 1;
	  const light = new THREE.AmbientLight( 0xffffff);

  	  light.position.set(10, 10, 10);
	  
	  scene.add(light);
	
	// instantiate a loader
	const loader = new OBJLoader();
	var frog = null
	// load a resource
	loader.load(
		// resource URL
		'frog2.obj',
		// called when resource is loaded
		function ( object ) {
			frog = object
			object.traverse(function(child) {
				if (child.isMesh) {

					child.material.wireframe = true;
	
				 }
			})
			scene.add(object)
			object.position.set(0, 4, 0);
		},
		// called when loading is in progresses
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened', error );

		}
	);

	function resizeCanvasToDisplaySize() {
		renderer.setSize(innerWidth*0.9,innerHeight*0.6,false); 
        camera.aspect = (innerWidth*0.9) / (innerHeight*0.6);
        camera.updateProjectionMatrix();
	  }

	function animate() {
		requestAnimationFrame(animate);
	  
		resizeCanvasToDisplaySize()

		mesh.rotation.y += 0.01;
		frog.rotation.y += 0.01
	  
		// controls.update();
	  
		renderer.render(scene, camera);
	  }



  
	animate()
  }
  
  main();