const btnInit = document.getElementById("btn_image");
const message = document.getElementById("msg");
const sec = document.getElementById("section");

async function inject() {
  try {
    // inject content in current tab
    const tab = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    const tabData = tab[0];

    if (tabData.status === "complete" && /^(http|https)/gi.test(tabData.url)) {
      await chrome.scripting.executeScript({
        target: { tabId: tabData.id },
        // file that will be inject
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
  fig.unshift(`<h3 id="msg_found">all image found</h3>`);
  fig.push(`<button id="btn_download">download all</button>`);
  sec.innerHTML = fig.join("");
}

btnInit.addEventListener("click", async () => {
  inject();
  const ja = await chrome.storage.local.get("data");
  const pa = await chrome.storage.onChanged.addListener(
    (changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );
      }
    }
  );
  console.log(pa);
  if (typeof ja.data === "string") {
    btnInit.style.display = "none";
    sec.style.display = "none";
    message.innerText = ja.data;
  } else {
    btnInit.style.display = "none";
    message.style.display = "none";
    const list = addList(ja.data);
  }
});
