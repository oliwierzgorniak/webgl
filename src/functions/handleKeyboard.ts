import type { Group } from "three";
import handleResetGround from "./handleResetGround";
import { ground } from "../main";

const keysDown: { [key: string]: boolean } = {};

const handleKeyboard = (car: Group<any>) => {
  addEventListener("keydown", (e) => {
    keysDown[e.code] = true;
  });

  addEventListener("keyup", (e) => {
    delete keysDown[e.code];
  });

  const X_MAX = 2.5;
  setInterval(() => {
    handleResetGround();

    if (keysDown["KeyW"]) {
      const SPEED = 0.5;
      ground.position.z += SPEED;
    }

    const X_SPEED = 0.3;
    if (keysDown["KeyA"]) {
      if (car.position.x - X_SPEED < -X_MAX) return;
      car.position.x -= X_SPEED;
    }
    if (keysDown["KeyD"]) {
      if (car.position.x + X_SPEED > X_MAX) return;
      car.position.x += X_SPEED;
    }
  }, 30);
};

export default handleKeyboard;
