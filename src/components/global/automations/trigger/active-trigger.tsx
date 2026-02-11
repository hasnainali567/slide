import { Instagram, SendHorizonal } from 'lucide-react'
import React from 'react'

type Props = {
    type : string,
    keywords? : {
        id: string,
        word: string
        automationId: string | null
    }[]
}

const ActiveTrigger = ({type, keywords}: Props) => {
  return (
    <div className='bg-[#28292e] p-3 rounded-xl w-full '>
        <div className='flex gap-2 items-center'>
            {type === 'COMMENT' ? <Instagram color='#F0534D' /> : <SendHorizonal fill='#ED4C79' stroke='#28292E' size={32} />}
            <p className='text-lg'>
                {type === 'COMMENT' ? 'User comments on my post' : 'User sends me a DM'}
            </p>
        </div>
        <p className='text-[#9b9ca0]'>
            {
                type === 'COMMENT' ? 
                'If the user comments on a video that is setup to listen for keywords, this automation will fire.'
                : 
                'If the user sends you a DM that contains a keyword this automation will fire.'
            }
        </p>
        <div className='flex gap-2 mt-5 flex-wrap '>
            {keywords && keywords.map((keyword) => (
                <div key={keyword.id} className=' flex items-center gap-x-2 py-1 px-4 rounded-full capitalize text-white font-light gradient-bg'>
                    {keyword.word}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ActiveTrigger