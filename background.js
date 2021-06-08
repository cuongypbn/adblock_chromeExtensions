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
// chrome.webRequest.onBeforeRequest.addListener(function () {
//     alert("cccc");
// })
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
        if(filter.urls.length >0){
            chrome.webRequest.onBeforeRequest.addListener(myfunction,filter,["blocking"]);
        }else{
            chrome.webRequest.onBeforeRequest.removeListener(myfunction);
        }
    });
});

var myfunction= function (info) {
    return {cancel: true};
};