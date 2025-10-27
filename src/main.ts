import * as THREE from "three";
import "./style.css";
import Car from "./objects/Car";
import handleKeyboard from "./functions/handleKeyboard";
import handleInitailMenu from "./functions/handleInitialMenu";
import handleTrack from "./functions/handleTrack";
import handleMusicContinuation from "./functions/handleMusicContinuation";
import Sun from "./objects/Sun";
import handleSettings from "./functions/handleSettings";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import BadTvShader from "./shaders/BadTvShader";
import NoiseShader from "./shaders/NoiseShader";
import ShaderPlane from "./objects/ShaderPlane";
import Ground from "./objects/Ground";

const clock = new THREE.Clock();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const sun = new Sun();
scene.add(sun);

const car = await Car.load();
scene.add(car);

export const ground = new Ground();
scene.add(ground);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;
camera.position.y = 1.5;
camera.lookAt(0, 0, -ground.LENGTH);
export const shaderPlane = new ShaderPlane(camera);
scene.add(shaderPlane);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// used AI and this website: https://github.com/felixturner/bad-tv-shader to set up composer an
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const badTVPass = new ShaderPass(BadTvShader);
const noisePass = new ShaderPass(NoiseShader);
composer.addPass(badTVPass);
composer.addPass(noisePass);
badTVPass.renderToScreen = false;
noisePass.renderToScreen = true;

handleKeyboard(car);
handleInitailMenu();
handleTrack();
handleMusicContinuation();
handleSettings();

window.addEventListener("resize", () =>
  renderer.setSize(window.innerWidth, window.innerHeight)
);

function animate() {
  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  shaderPlane.updateAudio();

  shaderPlane.uniforms.iTime.value = elapsed;
  shaderPlane.uniforms.iTimeDelta.value = delta;
  badTVPass.uniforms.time.value = elapsed;
  noisePass.uniforms.time.value = elapsed;
  composer.render();
}
