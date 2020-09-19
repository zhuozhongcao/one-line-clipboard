import Clipboard from "clipboard";

((global, name, factory) => {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = factory();
  } else if (typeof define === "function" && (define.amd || define.cmd)) {
    define(factory);
  } else {
    global[name] = factory.apply(this);
  }
})(
  this,
  "oneLineCopy",
  /**
   * @param {string} text
   */ function copy(text) {
    return new Promise(function (resolve, reject) {
      const fakeBtn = document.createElement("button");
      const clipboard = new Clipboard(fakeBtn, {
        text: () => text,
        action: () => "copy",
        container: document.body,
      });
      clipboard.on("success", function (e) {
        clipboard.destroy();
        resolve(e);
      });
      clipboard.on("error", function (e) {
        clipboard.destroy();
        reject(e);
      });
      document.body.appendChild(fakeBtn);
      fakeBtn.click();
      document.body.removeChild(fakeBtn);
    });
  }
);
