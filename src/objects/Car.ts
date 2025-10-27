// Used chat to remember myself how to work with classes and how to set up things in THREE.js https://g.co/gemini/share/fc62672e55de

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default class Car extends THREE.Mesh {
  static async load() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync("/low-poly-car.glb");

    const mesh = gltf.scene;
    mesh.rotateY(-Math.PI * 0.5);

    return gltf.scene;
  }
}
