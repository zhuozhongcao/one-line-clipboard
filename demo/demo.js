import copy from "../dist/index";

document.querySelector("#btn").addEventListener("click", () => {
  copy("我是被复制的数据😊").then(() => alert("复制成功"));
});
