// {document} - currentSrc

const urls = [];
const exts = ["jpg", "jpeg", "png", "gif", "avif", "webp"];
console.log("first desde content");
// sessionStorage.getItem("hola");
// const mensaje = "hola desde content";
// sessionStorage.setItem("hola", JSON.stringify(mensaje));
// console.log(sessionStorage.getItem("hola"));

// if (sessionStorage.getItem("data")) {
//   console.log("hola desde content");
// } else {
//   console.log("gaaaaaa");
// }

for (const iterator of window.document.images) {
  let ext = iterator.currentSrc.split(".").pop();
  if (exts.includes(ext)) {
    urls.push(iterator.currentSrc);
  }
}

if (urls.length === 0) {
  chrome.runtime.sendMessage({
    type: "not_found",
    data: "not found image in current page",
  });
} else {
  chrome.runtime.sendMessage({
    type: "ok",
    data: urls,
  });
}
