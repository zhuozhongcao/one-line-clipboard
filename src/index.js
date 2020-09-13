import Clipboard from "clipboard";

/**
 * @param {string} text
 */
function copy(text) {
  return new Promise(function (resolve, reject) {
    var fakeBtn = document.createElement("button");
    var clipboard = new Clipboard(fakeBtn, {
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

if (typeof define === "function" && define.amd) {
  define([], copy);
} else if (typeof exports === "object") {
  module.exports = copy;
} else {
  root.copy = copy;
}
