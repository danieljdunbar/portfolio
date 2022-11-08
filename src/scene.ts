import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CONNECTION_DISTANCE = 150;
const NODE_COUNT = 50;
const SEGMENTS = NODE_COUNT * NODE_COUNT;
const RADIUS = 400;
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let group: THREE.Group;
let nodes: Node[] = [];
let linesMesh: THREE.LineSegments;
let lineVertices = new Float32Array(SEGMENTS * 3);

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
  camera.position.z = 700;
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
  moveNodes();
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

function updateConnections() {
  let numConnected = 0;
  let vertexCoordinate = 0;
  let dx;
  let dy;
  let dz;

  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];

      dx = nodeA.object.position.x - nodeB.object.position.x;
      dy = nodeA.object.position.y - nodeB.object.position.y;
      dz = nodeA.object.position.z - nodeB.object.position.z;

      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist <= CONNECTION_DISTANCE) {
        lineVertices[vertexCoordinate++] = nodeA.object.position.x;
        lineVertices[vertexCoordinate++] = nodeA.object.position.y;
        lineVertices[vertexCoordinate++] = nodeA.object.position.z;

        lineVertices[vertexCoordinate++] = nodeB.object.position.x;
        lineVertices[vertexCoordinate++] = nodeB.object.position.y;
        lineVertices[vertexCoordinate++] = nodeB.object.position.z;

        numConnected++;
      }
    }
  }

  linesMesh.geometry.setDrawRange(0, numConnected * 2);
  linesMesh.geometry.attributes.position.needsUpdate = true;
}

function createMesh() {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });

  geometry.computeBoundingSphere();
  geometry.setDrawRange(0, 0);
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(lineVertices, 3).setUsage(THREE.DynamicDrawUsage)
  );

  linesMesh = new THREE.LineSegments(geometry, material);
  group.add(linesMesh);

  updateConnections();
}

function createNodeCloud() {
  createBox();
  createNodes();
  createMesh();
}

function updatePositions() {
  for (let i = 0; i < nodes.length; i++) {
    let x = nodes[i].object.position.x + nodes[i].velocity.x;
    let y = nodes[i].object.position.y + nodes[i].velocity.y;
    let z = nodes[i].object.position.z + nodes[i].velocity.z;

    nodes[i].object.position.set(x, y, z);

    if (Math.abs(nodes[i].object.position.x) >= RADIUS / 2) {
      nodes[i].velocity.x = -1 * nodes[i].velocity.x;
    }
    if (Math.abs(nodes[i].object.position.y) >= RADIUS / 2) {
      nodes[i].velocity.y = -1 * nodes[i].velocity.y;
    }
    if (Math.abs(nodes[i].object.position.z) >= RADIUS / 2) {
      nodes[i].velocity.z = -1 * nodes[i].velocity.z;
    }
  }
}

function moveNodes() {
  updatePositions();
  updateConnections();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
