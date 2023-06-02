import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    // organization: "org-fzcWoVVemrdR8Gmg1r3qtWfQ",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const enhancedPrompt = async (p) => await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Create a short one paragraph story based on ${p} with less than 50 words.`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });


  export const createImage = async (p) => await openai.createImage({
    // prompt: enhancedPrompt.data.choices[0].text,
    prompt: p,
    n: 1,
    size: "1024x1024",
})



