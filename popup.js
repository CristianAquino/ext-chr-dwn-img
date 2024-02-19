const btnInit = document.getElementById("btn_image");
const message = document.getElementById("msg");
const sec = document.getElementById("section");

async function run() {
  try {
    const tab = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    const tabData = tab[0];

    if (tabData.status === "complete" && /^(http|https)/gi.test(tabData.url)) {
      await chrome.scripting.executeScript({
        target: { tabId: tabData.id },
        files: ["content.js"],
      });
    } else {
      console.error("tab blocked");
    }
  } catch (error) {
    console.error("error in load popup");
  }
}

function addList(msg) {
  const list = document.createElement("ul");
  list.innerHTML = msg.map((e) => `<li><img src=${e} alt="hola"/></li>`);
  return list;
}
// function addMessage(msg) {
//   const message = document.createElement("p");
//   message.innerText = msg;
//   return message;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const sec = document.getElementById("section");
//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     switch (request.type) {
//       case "not found":
//         const msg = addMessage(request.data);
//         sec.appendChild(msg);
//         break;
//       case "ok":
//         const list = addList(request.data);
//         sec.appendChild(list);
//         break;
//       default:
//         sec.innerText = `<p>None</p>`;
//         break;
//     }
//     console.log(request.data);
//   });
// });

async function checkImages() {
  const arrImg = await chrome.storage.local.get(["status", "images"]);
  const status = arrImg.status || false;
  const datos = arrImg.images || "";
  return [status, datos];
}

async function init() {
  const [status, datos] = await checkImages();

  if (status) {
    if (typeof datos === "string") {
      btnInit.style.display = "none";
      sec.style.display = "none";
      message.innerText = datos;
    } else {
      btnInit.style.display = "none";
      message.style.display = "none";
      const list = addList(datos);
      sec.appendChild(list);
    }
  } else {
    sec.style.display = "none";
    message.style.display = "none";
  }

  async function start() {
    const [status] = await checkImages();
    if (status) {
      chrome.runtime.sendMessage({
        type: "stop",
      });
    } else {
      chrome.runtime.sendMessage({
        type: "start_found_image",
      });
      run();
    }
  }

  btnInit.addEventListener("click", () => {
    start();
  });
}

init();
