const generateButton = document.getElementById('generate-button');
const promptInput = document.getElementById('prompt-input');
const generatedImage = document.getElementById('generated-image');

generateButton.addEventListener('click', () => {
    const prompt = promptInput.value;
    if (prompt) {
        //  Placeholder for AI code (Step 3)
        generatedImage.src = "https://placehold.co/512x512?text=" + encodeURIComponent(prompt); //Show a placeholder
        generatedImage.style.display = 'block';
        console.log(`Generating image for prompt: ${prompt}`);
        alert("Image generation is a placeholder. We will add the AI code in the next step!");
    } else {
        alert('Please enter a prompt!');
    }
});
const hf_token = import.meta.env.VITE_HF_TOKEN;
// Load the token from a secure location or environment variable

generateButton.addEventListener('click', async () => { // Add async
    const prompt = promptInput.value;
    if (prompt) {
        generatedImage.src = "https://placehold.co/512x512?text=" + encodeURIComponent(prompt);
        generatedImage.style.display = 'block';
        console.log(`Generating image for prompt: ${prompt}`);

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1", // Use stable diffusion
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${hf_token}`, // Use the token
                    },
                    body: JSON.stringify({
                        inputs: prompt,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                generatedImage.src = reader.result;
            };
            reader.readAsDataURL(blob);

        } catch (error) {
            console.error("Error generating image:", error);
            alert("Sorry, there was an error generating the image.  Check the console for details.  " + error);
            generatedImage.style.display='none'; // hide the image.
        }
    } else {
        alert('Please enter a prompt!');
    }
});
