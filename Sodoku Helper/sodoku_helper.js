// ==UserScript==
// @name         50 Plus Sodoku Helper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Helper for https://www.50plus.de/spiele/sudoku.html
// @author       Bababoiiiii
// @match        https://www.50plus.de/spiele/sudoku.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=50plus.de
// @grant        none
// ==/UserScript==

(function() {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const wait = setInterval(() => {
        let blocks = document.querySelector("#dsgame > sudoku > div > div.sd-sudoku-block");
        if (blocks !== undefined) {
            console.log("[Helper] Preparing");
            clearInterval(wait);

            jQuery("iblock").bind("mousedown", async (event) => {
                if (event.which !== 2) { // only middle click
                    return
                }
                const difficulty = document.querySelector("#dsgame > kblevel > key.active").dataset.value

                const elem = blocks.querySelector("block.selected.active");

                if (elem.dataset[difficulty+"Hint"] === "0") {
                    elem.dataset[difficulty+"Value"] = elem.dataset[difficulty+"Default"];
                    elem.dataset[difficulty+"Check"] = "1";
                }

            });

            const btn = document.createElement("button");
            btn.textContent = "Solve All";
            btn.onclick = () => {
                const difficulty = document.querySelector("#dsgame > kblevel > key.active").dataset.value;
                (async () => {
                    let elem;
                    for (let i = 0; i < blocks.children.length; i++) {
                        elem = blocks.children[i];
                        if (elem.dataset[difficulty+"Hint"] === "0") {
                            elem.dataset[difficulty+"Value"] = elem.dataset[difficulty+"Default"];
                            elem.dataset[difficulty+"Check"] = "1";
                            await sleep(50);
                        }
                    }
                })();
            }
            document.querySelector("#dsgame").appendChild(btn);
            console.log("[Helper] Done");

        }
    }, 1000)
    })();
