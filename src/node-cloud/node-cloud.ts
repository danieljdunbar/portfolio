import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import * as TWEEN from '@tweenjs/tween.js';

import { BIO_INFO } from '../info';

interface Node {
  object: THREE.Mesh;
  velocity: THREE.Vector3;
  label: CSS2DObject;
}

const CONNECTION_DISTANCE = 150;
const NODE_COUNT = BIO_INFO.length;
const SEGMENTS = NODE_COUNT * NODE_COUNT;
const RADIUS = 400;
const LINE_VERTICES = new Float32Array(SEGMENTS * 3);
const INITIAL_CAMERA_POSITION = { x: 0, y: -100, z: 800 };

export class NodeCloud {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  labelRenderer: CSS2DRenderer;
  group: THREE.Group;
  linesMesh: THREE.LineSegments;
  nodes: Node[];
  paused = false;

  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.labelRenderer = new CSS2DRenderer();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.group = new THREE.Group();
    this.scene = new THREE.Scene();
    this.nodes = [];

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    geometry.computeBoundingSphere();
    geometry.setDrawRange(0, 0);
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(LINE_VERTICES, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    this.linesMesh = new THREE.LineSegments(geometry, material);

    this.init();
  }

  private init() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('bg')!.appendChild(this.renderer.domElement);

    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.left = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById('bg')!.appendChild(this.labelRenderer.domElement);

    this.camera.position.z = INITIAL_CAMERA_POSITION.z;
    this.camera.position.y = INITIAL_CAMERA_POSITION.y;
    this.controls.maxDistance = 1000;

    this.scene.add(this.group);
    this.group.add(this.linesMesh);

    this.createNodeCloud();

    window.addEventListener('resize', () => {
      this.onWindowResize();
    });
  }

  private createNodeCloud() {
    this.createBox();
    this.createNodes();
  }

  private createBox() {
    const geometry = new THREE.BoxGeometry(RADIUS, RADIUS, RADIUS);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const helper = new THREE.BoxHelper(mesh, 0xffffff);

    this.group.add(helper);
  }

  private createNodes() {
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

      // Attach label
      const labelDiv = document.createElement('div');
      labelDiv.className = 'label';
      labelDiv.textContent = BIO_INFO[i];
      labelDiv.style.marginTop = '-1em';
      const label = new CSS2DObject(labelDiv);
      label.position.copy(object.position);
      object.add(label);

      this.nodes.push({ object, velocity, label });

      this.group.add(object);
      this.group.add(label);
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  moveNodes() {
    if (!this.paused) {
      this.updatePositions();
      this.updateConnections();
    }
  }

  private updatePositions() {
    for (let i = 0; i < this.nodes.length; i++) {
      let x = this.nodes[i].object.position.x + this.nodes[i].velocity.x;
      let y = this.nodes[i].object.position.y + this.nodes[i].velocity.y;
      let z = this.nodes[i].object.position.z + this.nodes[i].velocity.z;

      this.nodes[i].object.position.set(x, y, z);
      this.nodes[i].label.position.set(x, y, z);

      if (Math.abs(this.nodes[i].object.position.x) >= RADIUS / 2) {
        this.nodes[i].velocity.x = -1 * this.nodes[i].velocity.x;
      }
      if (Math.abs(this.nodes[i].object.position.y) >= RADIUS / 2) {
        this.nodes[i].velocity.y = -1 * this.nodes[i].velocity.y;
      }
      if (Math.abs(this.nodes[i].object.position.z) >= RADIUS / 2) {
        this.nodes[i].velocity.z = -1 * this.nodes[i].velocity.z;
      }
    }
  }

  private updateConnections() {
    let numConnected = 0;
    let vertexCoordinate = 0;
    let dx;
    let dy;
    let dz;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const nodeA = this.nodes[i];
        const nodeB = this.nodes[j];

        dx = nodeA.object.position.x - nodeB.object.position.x;
        dy = nodeA.object.position.y - nodeB.object.position.y;
        dz = nodeA.object.position.z - nodeB.object.position.z;

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist <= CONNECTION_DISTANCE) {
          LINE_VERTICES[vertexCoordinate++] = nodeA.object.position.x;
          LINE_VERTICES[vertexCoordinate++] = nodeA.object.position.y;
          LINE_VERTICES[vertexCoordinate++] = nodeA.object.position.z;

          LINE_VERTICES[vertexCoordinate++] = nodeB.object.position.x;
          LINE_VERTICES[vertexCoordinate++] = nodeB.object.position.y;
          LINE_VERTICES[vertexCoordinate++] = nodeB.object.position.z;

          numConnected++;
        }
      }
    }

    this.linesMesh.geometry.setDrawRange(0, numConnected * 2);
    this.linesMesh.geometry.attributes.position.needsUpdate = true;
  }

  focusNode(text: string) {
    this.paused = true;
    this.controls.saveState();

    const nodeIndex = BIO_INFO.indexOf(text);
    const node = this.nodes[nodeIndex];
    const nodePosition = node.object.position;

    new TWEEN.Tween(this.controls.target)
      .to(nodePosition, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
      .onUpdate(() => {
        this.controls.update();
      })
      .onComplete(() => {
        new TWEEN.Tween(this.camera.position)
          .to(
            { x: nodePosition.x, y: nodePosition.y, z: nodePosition.z - 100 },
            2000
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(() => {
            this.camera.lookAt(nodePosition);
          })
          .start();
      })
      .start();
  }

  resume() {
    if (this.paused) {
      new TWEEN.Tween(this.controls.target)
        .to({ x: 0, y: 0, z: 0 }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
        .onUpdate(() => {
          this.controls.update();
        })
        .onComplete(() => {
          new TWEEN.Tween(this.camera.position)
            .to(INITIAL_CAMERA_POSITION, 2000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => {
              this.camera.lookAt(0, 0, 0);
            })
            .start();
        })
        .start();

      this.paused = false;
    }
  }
}
