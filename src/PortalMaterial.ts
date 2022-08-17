import { Color3, Observer, Scene, ShaderMaterial } from "@babylonjs/core";

const COLOR_1 = Color3.FromHexString("#4dd25b");
const COLOR_2 = Color3.FromHexString("#007500");

export default class PortalMaterial extends ShaderMaterial {
  #lastTime: number = 0;
  #lastDeltaTime: number = 0;
  #renderSub?: Observer<Scene> | null;

  #color1!: Color3;
  #color2!: Color3;

  set color1(v: Color3) {
    this.#color1 = v;
    this.setColor3("color1", v);
  }

  get color1() {
    return this.#color1;
  }

  set color2(v: Color3) {
    this.#color2 = v;
    this.setColor3("color2", v);
  }

  get color2() {
    return this.#color2;
  }

  constructor(name, scene) {
    super(
      name,
      scene,
      {
        vertex: "portal",
        fragment: "portal",
      },
      {
        attributes: ["position", "normal", "uv"],
        uniforms: [
          "world",
          "worldView",
          "worldViewProjection",
          "view",
          "projection",
        ],
      }
    );

    this.backFaceCulling = false;

    this.setInt("started", 0);
    this.setFloat("time", 0);

    this.color1 = COLOR_1;
    this.color2 = COLOR_2;
  }

  start() {
    if (this.#renderSub) {
      return;
    }
    let scene = this.getScene();
    this.#renderSub = scene.onBeforeRenderObservable.add(() => {
      let deltaTime = scene.getEngine().getDeltaTime();
      if (deltaTime !== this.#lastDeltaTime) {
        this.#lastDeltaTime = deltaTime;
        this.#lastTime += this.#lastDeltaTime;
        this.setFloat("time", this.#lastTime / 1000);
      }
    });

    this.setInt("started", 1);
    (this.getScene() as any)._markAsUpdated();
  }

  stop() {
    if (this.#renderSub) {
      this.getScene().onBeforeRenderObservable.remove(this.#renderSub);
      this.#renderSub = null;
      this.setInt("started", 0);
      (this.getScene() as any)._markAsUpdated();
    }
  }

  dispose(...rest) {
    super.dispose(...rest);
    this.stop();
  }
}
