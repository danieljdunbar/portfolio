import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const NODE_COUNT = 50;
const RADIUS = 400;
const CAMERA_POSITION = 700;
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let group: THREE.Group;
let nodes: Node[] = [];

interface Node {
  object: THREE.Mesh;
  velocity: THREE.Vector3;
}

export function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')!,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = CAMERA_POSITION;
  camera.position.y = -50;
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 1000;

  group = new THREE.Group();
  scene = new THREE.Scene();
  scene.add(group);

  createNodeCloud();

  window.addEventListener('resize', onWindowResize);
}

export function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function createBox() {
  const geometry = new THREE.BoxGeometry(RADIUS, RADIUS, RADIUS);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  const helper = new THREE.BoxHelper(mesh);

  group.add(helper);
}

function createNodes() {
  const material = new THREE.MeshBasicMaterial({
    color: 0xff6347,
  });

  for (let i = 0; i < NODE_COUNT; i++) {
    const geometry = new THREE.SphereGeometry(5);

    const x = Math.random() * RADIUS - RADIUS / 2;
    const y = Math.random() * RADIUS - RADIUS / 2;
    const z = Math.random() * RADIUS - RADIUS / 2;

    const velocity = new THREE.Vector3(
      -1 + Math.random() * 2,
      -1 + Math.random() * 2,
      -1 + Math.random() * 2
    );

    const object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);

    nodes.push({ object, velocity });

    group.add(object);
  }
}

function createNodeCloud() {
  createBox();
  createNodes();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
