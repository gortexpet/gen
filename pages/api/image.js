import { Configuration, OpenAIApi } from "openai";
import { supabase } from '../../app/lib/supabaseClient';

const configuration = new Configuration({
    // organization: "org-fzcWoVVemrdR8Gmg1r3qtWfQ",
    apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {
    // return res.status(200).json({ imageURL: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-fzcWoVVemrdR8Gmg1r3qtWfQ/user-WLcbrI2GOkoWhYsx1EqRaQT8/img-QB5zfJf8GMAtkod82PI8AmdL.png?st=2022-11-05T02%3A16%3A01Z&se=2022-11-05T04%3A16%3A01Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-05T03%3A16%3A01Z&ske=2022-11-06T03%3A16%3A01Z&sks=b&skv=2021-08-06&sig=FhPm3nfAKHtrAKSO45Kzcd6CpFfxFvl3E/xCVAKzVYE%3D'})
    if (!req.body.prompt) return res.status(400).json({message: 'Pass in prompt field for image generation'});
    const openai = new OpenAIApi(configuration);


    const enhancedPrompt = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create a short one paragraph story based on ${req.body.prompt} with less than 50 words.`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

    //   console.log(enhancedPrompt.data.choices[0].text)

    if (!enhancedPrompt.data) throw new Error('Unable to get Text');

    const response = await openai.createImage({
        prompt: enhancedPrompt.data.choices[0].text,
        n: 1,
        size: "1024x1024",
    });

    if (!response.data) throw new Error('Unable to get image');


let blob = await fetch(response.data.data[0].url)
.then(function(response) {
  return response.blob()
}).then(function(b) {
    return b
  });

    console.log('received url ' + response.data.data[0].url);
    console.log('received blob ' + blob);

    // return response.data.data[0].url;
    res.status(200).json({ imgBlob: blob, imageURL: response.data.data[0].url, prompt:`Summarize: ${req.body.prompt}`, enhancedPrompt: enhancedPrompt.data.choices[0].text })
}