// chrome.runtime.onInstalled.addListener(function () {
//     chrome.storage.local.get(["blocked", "enabled"], function (local) {
//         if (!Array.isArray(local.blocked)) {
//             chrome.storage.local.set({blocked: []});
//         }
//         if (typeof local.enabled !== "boolean") {
//             chrome.storage.local.set({enabled: false});
//         }
//     });
// });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    var urlArray = [];
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (!url || !url.startsWith("http")) {
        return;
    }
    chrome.storage.local.get(["blocked", "enabled"], (local) => {
        for (let i = 0; i < local.enabled.length; i++) {
            if (local.enabled[i]) {
                urlArray.push("*://*." + local.blocked[i] + "/*");
            }
        }
        var filter = {urls: urlArray};
        chrome.webRequest.onBeforeRequest.addListener(()=>{return {cancel:true}},filter,["blocking"]);
    });
});

