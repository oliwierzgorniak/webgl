import * as THREE from "three";

export default class Ground extends THREE.Mesh {
  public CAR_ADDITION: number;
  public LENGTH: number;

  constructor() {
    const CAR_ADDITION = 5;
    const LENGTH = 150 + CAR_ADDITION;
    const WIDTH = 300;
    const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/ground.jpg");
    texture.repeat.set(WIDTH, LENGTH);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    super(geometry, material);
    this.position.z = -(LENGTH / 2) + CAR_ADDITION;
    this.rotateX(-Math.PI * 0.5);

    this.CAR_ADDITION = CAR_ADDITION;
    this.LENGTH = LENGTH;
  }
}
