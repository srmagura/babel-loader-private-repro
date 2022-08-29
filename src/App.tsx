import ReactDOM from "react-dom";

class PortalMaterial {
  #color1!: any; // It works if the exclamation point is removed

  set color1(v: any) {
    this.#color1 = v;
  }
}

ReactDOM.render(<button>Test</button>, document.getElementById("root")!);
