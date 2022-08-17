export default {
  title: "Button",
};

class PortalMaterial {
  #color1!: any; // It works if the explanation point is removed

  set color1(v: any) {
    this.#color1 = v;
  }
}

export const Button: React.FC = () => <button>Test</button>;
