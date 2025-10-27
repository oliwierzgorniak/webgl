import { shaderPlane } from "../main";

const getVecFromStyle = (style: string) => {
  return [
    parseInt(style.substring(0, 2), 16) / 255,
    parseInt(style.substring(2, 4), 16) / 255,
    parseInt(style.substring(4, 6), 16) / 255,
    1.0,
  ] as [number, number, number, number];
};

const handleUniformChange = (
  buttonsQuerySelector: string,
  uniformKey: "iBarColor" | "iEllipseColor"
) => {
  const buttons = document.querySelectorAll(
    buttonsQuerySelector
  ) as NodeListOf<HTMLButtonElement>;
  buttons.forEach(($button) =>
    $button.addEventListener("click", () => {
      const color = $button.dataset.color as string;
      shaderPlane.uniforms[uniformKey] = { value: getVecFromStyle(color) };
    })
  );
};

const handleSettings = () => {
  handleUniformChange(".settings__bar-color", "iBarColor");
  handleUniformChange(".settings__ellipse-color", "iEllipseColor");

  const $settingsButton = document.querySelector(
    ".settings-button"
  ) as HTMLButtonElement;
  const $settings = document.querySelector(".settings") as HTMLDivElement;

  $settingsButton.addEventListener("click", () => {
    $settings.classList.toggle("hidden");
  });

  const $settingsCloseButton = document.querySelector(
    ".settings__close"
  ) as HTMLButtonElement;
  $settingsCloseButton.addEventListener("click", () =>
    $settings.classList.add("hidden")
  );
};

export default handleSettings;
