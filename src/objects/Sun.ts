import * as THREE from "three";

export default class Sun extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.CircleGeometry(15, 50);
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("/sun.png");
    const material = new THREE.MeshBasicMaterial({ map: sunTexture });
    super(geometry, material);

    this.position.set(0, 58, -100);
  }
}
