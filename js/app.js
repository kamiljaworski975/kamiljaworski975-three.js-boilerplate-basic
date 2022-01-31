import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import fragment from "./shaders/fragment.glsl";

import vertex from "./shaders/vertex.glsl";

export default class Sketch {
  constructor(options) {
    this.time = 0;
    // Create Scene
    this.scene = new THREE.Scene();
    // Select container
    this.container = options.dom;

    // Screen resolution
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    // Create Camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      10
    );

    // Set camera distance
    this.camera.position.z = 1;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: 1 });

    // Add renderer to dom
    this.container.appendChild(this.renderer.domElement);

    // Create controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Init functions
    this.resize();
    this.setupResize();
    this.addObjects();
    this.render();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    // Create different geometry plane/sphere(size.x, size.y, vectors)
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);

    let uniforms = {
      colorB: { type: "vec3", value: new THREE.Color(0xacb6e5) },
      colorA: { type: "vec3", value: new THREE.Color(0x74ebd5) },
      time: { value: 0 },
    };

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      fragmentShader: fragment,
      vertexShader: vertex,
      // wireframe: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render() {
    this.time += 0.05;

    this.material.uniforms.time.value = this.time;

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  dom: document.getElementById("container"),
});
