import { ground } from "../main";

const handleResetGround = () => {
  if (ground.position.z > -(ground.LENGTH / 2) + ground.CAR_ADDITION + 40)
    ground.position.z = -(ground.LENGTH / 2) + ground.CAR_ADDITION;
};

export default handleResetGround;
