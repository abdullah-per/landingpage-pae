const chatOutput = document.querySelector(".chat--output");
const chatInput = document.querySelector("#chat");
const chatForm = document.querySelector(".chat--form");

deepseek/deepseek-r1:free



chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { submitter } = event;

    if (submitter.id === "delete") {
        chatOutput.innerHTML = "";

    } else {
        const newText = document.createElement("p");
        newText.innerHTML = chatInput.value;
        chatInput.value = "";

        chatOutput.appendChild(newText);
    }
})
