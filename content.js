// {document} - currentSrc

async function run() {
  const urls = [];
  const exts = ["jpg", "jpeg", "png", "gif", "avif", "webp"];
  // iteramos el document.images
  for (const iterator of window.document.images) {
    // validamos su extension
    const rgx = /^(http|https)/gi;
    // obtenemos el ultimo string
    let ext = iterator.currentSrc.split(".").pop();
    // verificamos su valor
    if (exts.includes(ext) || rgx.test(iterator.currentSrc)) {
      if (!urls.includes(iterator.currentSrc)) {
        urls.push(iterator.currentSrc);
      }
    }
  }

  const msg = dataMessage(urls);
  // realizamos el almacenamiento de datos
  // al session storage y
  // al local storage de chrome
  // sessionStorage.setItem("data", JSON.stringify(msg));
  await chrome.storage.local.set({ data: msg });
}
// funcion de retorno en base al
// contenido de el array
function dataMessage(urls) {
  if (urls.length === 0) {
    return "not found image in current page";
  }
  return urls;
}

run();
