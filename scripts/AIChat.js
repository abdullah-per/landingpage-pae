const chatOutput = document.querySelector(".chat--output");
const chatInput = document.querySelector("#chat");
const chatForm = document.querySelector(".chat--form");

const baseSystemPrompt = `
Your messages must be short.
Use multi-line format.
Keep sentences under two lines, keeping in mind that the display in which the output will be shown is 60 characters long.
Use lists whenever possible.
You are a knowledgeable AI Chat Assitant for PAE and are here to answer any questions..
Respond in a clear, friendly, professional tone.
If you do not know, say so politely.
Refer users to the contact form.
`;

const businessInfoPrompt = `
PAE provides predictive analytics for:
- Predictive analytics
- Operational optimization
- Business intelligence

Our mission:
- Empower businesses to make data-driven
  decisions

Core offerings:
1. Predictive Analytics Engine
2. Sales Automation Platform
3. Smart ERP Modules
`;


async function chatWithBackend(prompt) {
    const backendURL = "https://pae-chat-975843523063.us-central1.run.app/";

    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend Error: ${errorText}`);
      }

      const data = await response.json();
      console.log(data.reply.candidates[0].content.parts[0].text);
      return data.reply.candidates[0].content.parts[0].text;

    } catch (error) {
      console.error('Fetch error:', error.message);
      throw error; // Re-throw so your UI can handle/display errors if needed
    }
}


chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { submitter } = event;

    if (submitter.id === "delete") {
        chatOutput.innerHTML = "";

    } else {

        if (chatInput.value === "") {
            console.log("Empty field!");
            return;
        }

        //Clear
        chatOutput.innerHTML = "";

        const newHr = document.createElement("hr");
        const newText = document.createElement("p");
        newText.innerText = "Thinking..."

        chatWithBackend(chatInput.value)
            .then(reply => {
                newText.innerText = reply;
            })
            .catch(err => {
                newText.innerText = err;
                newText.style.color = "red";
            })

        chatInput.value = "";

        chatOutput.appendChild(newText);
        chatOutput.appendChild(newHr);
    }
})
