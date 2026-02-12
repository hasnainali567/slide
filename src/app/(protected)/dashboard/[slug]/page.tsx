'use client'
import ai from '@/lib/gemini'

type Props = {}

const Page = (props: Props) => {
  const generateResponse = async() => {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: {
        text: 'Write a short story about a robot learning to love.'
      },
    })
    console.log(response);
  }
  return (
    <div><button onClick={generateResponse}>Generate</button></div>
  )
}

export default Page