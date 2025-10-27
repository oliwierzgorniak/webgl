import * as THREE from "three";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";

export default class FloorTile extends THREE.Mesh {
  private lineMaterial: LineMaterial;

  constructor(x: number, z: number) {
    const geometry = new THREE.BoxGeometry(1, 10, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x26157b });
    super(geometry, material);

    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    // const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xf62e97 }); // RED edge color

    const lineGeom = new LineSegmentsGeometry().fromEdgesGeometry(
      edgesGeometry
    );
    this.lineMaterial = new LineMaterial({
      worldUnits: true,
      color: 0xf62e97,
      linewidth: 0.01, // Set your desired width here (in pixels)
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // Must be updated on resize
    });

    const edges = new LineSegments2(lineGeom, this.lineMaterial);
    edges.computeLineDistances(); // Good practice for LineSegments2

    // Add to scene (after your solid cube, if you have one)
    // cube.add(edges);
    this.add(edges);

    // 3. Add the edges as a child of the cube so they move together
    this.add(edges);

    this.position.set(x, -5, z);
  }

  handleWindowResize() {
    window.addEventListener("resize", () => {
      this.lineMaterial.resolution.set(window.innerWidth, window.innerHeight);
    });
  }
}
