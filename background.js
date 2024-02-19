// chrome.action.onClicked.addListener(async (tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["content.js"],
//   });

//   // console.log("first desde background");

//   // pensar en cambiar icono
//   // black white normal
//   // blue load
//   // green ok
//   // red error
//   await chrome.action.getBadgeText({ tabId: tab.id });

//   chrome.action.setBadgeText({ tabId: tab.id, text: "LOAD" });
//   chrome.action.setBadgeBackgroundColor({
//     tabId: tab.id,
//     color: "#018dd0",
//   });
//   chrome.action.setBadgeTextColor({
//     tabId: tab.id,
//     color: "#fff",
//   });

//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     switch (request.type) {
//       case "not found":
//         chrome.action.setBadgeText({ tabId: tab.id, text: "NOT" });
//         chrome.action.setBadgeBackgroundColor({
//           tabId: tab.id,
//           color: "#f00",
//         });
//         chrome.action.setBadgeTextColor({
//           tabId: tab.id,
//           color: "#fff",
//         });
//         break;
//       case "ok":
//         chrome.action.setBadgeText({ tabId: tab.id, text: "OK" });
//         chrome.action.setPopup({ tabId: tab.id, popup: "popup.html" });
//         break;
//       default:
//         break;
//     }
//     // chrome.action.setBadgeText({ tabId: tab.id, text: "" });
//     // console.log(request.data);
//   });
// });

// ver lo de status tab
// chrome.tabs.onActivated.addListener(async function () {
//   const tab = await chrome.tabs.query({ active: true, currentWindow: true });
//   if (!tab) return;
//   const tabData = tab[0];
//   if (tabData.status === "complete" && /^(http|https)/gi.test(tabData.url)) {
//     await chrome.scripting.executeScript({
//       target: { tabId: tabData.id },
//       files: ["content.js"],
//     });
//   }

//   console.log("first desde background");
// });
async function checkImages() {
  const arrImg = await chrome.storage.local.get(["status", "images"]);
  const status = arrImg.status || false;
  const datos = arrImg.images || "";
  return [status, datos];
}

function Update() {
  chrome.runtime.onMessage.addListener((request, sender) => {
    switch (request.type) {
      case "not_found":
        chrome.storage.local.set({ status: true, images: request.data });
        break;
      case "ok":
        chrome.storage.local.set({ status: true, images: request.data });
        break;
      default:
        break;
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender) => {
  switch (request.type) {
    case "start_found_image":
      Update();
      break;
    default:
      break;
  }
  return true;
});
