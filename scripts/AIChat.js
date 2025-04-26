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

async function chatWithOpenRouter(userPrompt) {
    const apiKey = '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';
    const endpoint = 'https://openrouter.ai/api/v1/chat/completions';
    const model = 'mistralai/mistral-7b-instruct'; // or another low-cost option

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost', // Replace in production
            'X-Title': 'Minimal Chat'
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: baseSystemPrompt.trim() },
                { role: 'system', content: businessInfoPrompt.trim() },
                { role: 'user', content: userPrompt.trim() }
            ]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${error}`);
    }

    const data = await response.json();
    console.log(data.choices[0].message.content);
    return data.choices[0].message.content;
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

        chatWithOpenRouter(chatInput.value)
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
