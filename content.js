// {document} - currentSrc

async function run() {
  // let se = JSON.parse(sessionStorage.getItem("data"));

  // console.log("grettings from content");
  // console.log(se);

  // if (se) {
  //   chrome.storage.local.set({ data: se });
  // } else {
  const urls = [];
  const exts = ["jpg", "jpeg", "png", "gif", "avif", "webp"];

  for (const iterator of window.document.images) {
    let ext = iterator.currentSrc.split(".").pop();
    if (exts.includes(ext)) {
      urls.push(iterator.currentSrc);
    }
  }
  const msg = dataMessage(urls);

  sessionStorage.setItem("data", JSON.stringify(msg));
  await chrome.storage.local.set({ data: msg });
}

function dataMessage(urls) {
  if (urls.length === 0) {
    return "not found image in current page";
  }
  return urls;
  // }
}

run();
