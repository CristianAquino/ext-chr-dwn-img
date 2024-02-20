//   // pensar en cambiar icono
//   // black white normal
//   // blue load
//   // green ok
//   // red error
//   await chrome.action.getBadgeText({ tabId: tab.id });

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

// async function checkImages() {
//   const arrImg = await chrome.storage.local.get(["status", "images"]);
//   const status = arrImg.status || false;
//   const datos = arrImg.images || "";
//   return [status, datos];
// }

// function Update() {
//   chrome.runtime.onMessage.addListener((request, sender) => {
//     switch (request.type) {
//       case "not_found":
//         chrome.storage.local.set({ status: true, images: request.data });
//         break;
//       case "ok":
//         chrome.storage.local.set({ status: true, images: request.data });
//         break;
//       default:
//         break;
//     }
//   });
// }

// chrome.runtime.onMessage.addListener((request, sender) => {
//   switch (request.type) {
//     case "start_found_image":
//       Update();
//       break;
//     default:
//       break;
//   }
//   return true;
// });
