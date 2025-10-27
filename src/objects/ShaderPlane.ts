import * as THREE from "three";
import ViusalizerShader from "../shaders/VisualizerShader";

type UniformsType = {
  iTime: { value: number };
  iTimeDelta: { value: number };
  iChannel0: { value: THREE.Texture };
  iEllipseColor: { value: [number, number, number, number] };
  iBarColor: { value: [number, number, number, number] };
};

export default class ShaderPlane extends THREE.Mesh {
  public uniforms: UniformsType;
  private analyser: THREE.AudioAnalyser;
  private audioData: Uint8Array<ArrayBuffer>;
  private audioTexture: THREE.Texture;
  private sound: THREE.Audio;
  private listener: THREE.AudioListener;

  constructor(camera: THREE.Camera) {
    const PLANE_HEIGHT = 105;
    const geometry = new THREE.PlaneGeometry(
      window.innerWidth / 4,
      PLANE_HEIGHT
    );
    super(geometry);

    // AUDIO
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);
    this.sound = new THREE.Audio(this.listener);
    const fftSize = 128;
    this.analyser = new THREE.AudioAnalyser(this.sound, fftSize);
    const bufferLength = this.analyser.getFrequencyData().length;
    this.audioData = new Uint8Array(bufferLength);
    this.audioTexture = new THREE.DataTexture(
      this.audioData,
      bufferLength,
      1,
      THREE.RedFormat
    );

    this.uniforms = {
      iTime: { value: 0 },
      iTimeDelta: { value: 0 },
      iChannel0: { value: this.audioTexture },
      iEllipseColor: { value: [0.5804, 0.0863, 0.498, 1.0] },
      iBarColor: { value: [0.9765, 0.6784, 0.3255, 1.0] },
    };
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: ViusalizerShader.vertex,
      fragmentShader: ViusalizerShader.fragment,
    });
    this.material = shaderMaterial;
    this.position.z = -101;
    this.position.y = PLANE_HEIGHT / 2 - PLANE_HEIGHT * 0.01;
  }

  updateAudio() {
    this.audioData.set(this.analyser.getFrequencyData());
    this.audioTexture.needsUpdate = true;
  }

  initAudio() {
    const $audio = document.querySelector(".track__audio") as HTMLAudioElement;
    this.sound.setMediaElementSource($audio);
    this.listener.context.resume();
  }
}
