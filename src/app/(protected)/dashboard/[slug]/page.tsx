"use client";

import ai from "@/lib/gemini";

const Page = () => {
  const main = async () => {
    const smart_ai_message = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `You are a helpful assistant for responding to Instagram messages. Always keep responses under 2 sentences. If you don't know the answer to a question, say you don't know. Always be concise and to the point. bussiness owner prompt : "You are a assistant for a user who owns a sneaker reselling business. You respond to customers who message the user's Instagram account. Your responses should be helpful, concise, and relevant to the user's sneaker reselling business."`,
        temperature: 0.7,
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: 'user comment or dm : "hello"', // The actual message to respond to
            },
          ],
        },
      ],
    });

      console.log(smart_ai_message.text);
  };
  return <div>
    <button onClick={main}>Generate Response</button>
  </div>;
};

export default Page;
