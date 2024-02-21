const btnInit = document.getElementById("btn_image");
const btnDownload = document.getElementById("btn_download");
const message = document.getElementById("msg");
const sec = document.getElementById("section");
const downloads = [];

async function inject() {
  try {
    // injectamos el script de content en la
    // pestaña actual
    const tab = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    const tabData = tab[0];

    if (tabData.status === "complete" && /^(http|https)/gi.test(tabData.url)) {
      await chrome.scripting.executeScript({
        target: { tabId: tabData.id },
        // archivo que sera injectado
        files: ["content.js"],
      });
      console.log("inject to content");
    } else {
      console.error("tab blocked");
    }
  } catch (error) {
    console.error("error in load popup");
  }
}
// agregamos las img encontradas
function addList(msg) {
  const fig = msg.map(
    (e) => `
    <figure id="cnt_image">
  <a href=${e} download>download</a>
        <label>
          <img
            src=${e}
            data-original=${e}
            alt="cat"
            lazy
          />
          <input type="checkbox" name="slt_image" />
        </label>
        </figure>
  `
  );
  fig.unshift(`<h3 id="msg_found">${msg.length} image found</h3>`);
  fig.push(`<button id="btn_download">download all</button>`);
  sec.innerHTML = fig.join("");
}

btnInit.addEventListener("click", async () => {
  // esperamos a que se inject el script de content
  await inject();
  // obtenemos la data del storage
  const ja = await chrome.storage.local.get("data");
  // verificamos el tipo de dato que nos devuelve el storage
  if (typeof ja.data === "string") {
    btnInit.style.display = "none";
    sec.style.display = "none";
    message.innerText = ja.data;
  } else {
    btnInit.style.display = "none";
    message.style.display = "none";
    addList(ja.data);
  }
});
// evento para seleccionar varios imgs
sec.addEventListener("click", (e) => {
  // propagacion de evento en section
  // para cada img
  if (e.target && e.target.tagName === "IMG") {
    downloads.push({ url: e.target.src });
  }
  console.log(downloads);
});
