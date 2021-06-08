// const textarea = document.getElementById("textarea");
const add = document.getElementById("add");
const save = document.getElementById("save");
let div = document.getElementById("dataForm");
// const checkbox = document.getElementById("checkbox");
// save.addEventListener("click", () => {
//     const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
//     chrome.storage.local.set({blocked: blocked});
// });
//
// checkbox.addEventListener("change", (event) => {
//     const enabled = [];
//     enabled.push(event.target.checked);
//     alert(enabled)
//     chrome.storage.local.set({enabled: enabled});
// });
//
window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["blocked", "enabled"], function (local) {
        // const {blocked, enabled} = local;
        if (Array.isArray(local.blocked)) {
            for(let i=0;i<local.blocked.length;i++){
                createElementHtml({text_value:local.blocked[i],checked:local.enabled[i]})
            }
        }
    });
});


save.addEventListener("click", () => {
    let inputs = div.getElementsByTagName("input");
    if (inputs.length > 0) {
        let blocked = [];
        let enabled = [];
        for (let i = 0;i< inputs.length; i++) {
            if (inputs[i].getAttribute("type") === "checkbox") {
                let url = inputs[i - 1].value;
                blocked.push(url);
                enabled.push(inputs[i].checked);
            }
        }
        chrome.storage.local.set({blocked: blocked});
        chrome.storage.local.set({enabled: enabled});
    }
})
add.addEventListener("click", () => {
    createElementHtml({text_value:"",checked: false});
})

function createElementHtml({text_value,checked}){
    let input = document.createElement("input");
    let checkbox = document.createElement("input");
    let strong = document.createElement("strong").appendChild(document.createTextNode("Enabled?"));
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "url block");
    input.setAttribute("value",text_value);
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = checked;
    div.appendChild(input)
    div.appendChild(strong)
    div.appendChild(checkbox)
}