import OpenAI from 'openai';

const openai = new OpenAI({
     apiKey: "sk-proj-NU9i3yAi1UyEgkwFH00FT3BlbkFJgMF4V2jwvpiMwURNC6Hy"// This is also the default, can be omitted
});

const runPrompt = async () => {
    const prompt = "Tell me a joke about a developer not knowing how to use git";
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "give me a joke about a developer that doesnt know about git"}],
        max_tokens: 512,
        top_p: 1,
        temperature: 0.5,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    console.log(response.choices[0].message.content);
}

runPrompt();
  