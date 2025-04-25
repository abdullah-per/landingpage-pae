const switchbuttons = [
    document.querySelector("#one"),
    document.querySelector("#two"),
    document.querySelector("#three"),
    document.querySelector("#four")
]

const text_content = {
    one : ["Turns Overload Into Clarity", "PAE surfaces what matters most—so your team stops drowning in big data."],
    two : ["Strategically Ahead of the Curve", "Predictive models flag trends early. Pivot before the market forces you to."],
    three : ["Scales Without Complication", "Start small or go all in—PAE integrates smoothly and adapts as you grow."],
    four : ["Modernizes Without Disruption", "No ripping out what works. PAE layers AI into your existing systems—fast."]
}

const switcher_text = document.querySelector(".switcher--text");
let current = "one";


function switchText(which) {
    switcher_text.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.innerHTML = text_content[which][0];
    const p = document.createElement("p");
    p.innerHTML = text_content[which][1];

    switcher_text.appendChild(h2);
    switcher_text.appendChild(p);

    switchbuttons.forEach((button) => {
        if (button.id === which) {
            button.classList = "current option";
        } else {
            button.classList = "option";
        }
    })
}

async function autoSwitch(ms) {
    while (true) {
        await sleep(ms);

        if (current === "one") {
            switchText("two");
            current = "two";
        } else if (current === "two") {
            switchText("three");
            current = "three";
        } else if (current === "three") {
            switchText("four");
            current = "four";
        } else if (current === "four") {
            switchText("one");
            current = "one";
        }
    }
}

autoSwitch(3000);

switchbuttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        switchText(button.id);
        current = button.id;
    })
})
