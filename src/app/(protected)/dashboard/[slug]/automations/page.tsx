import AutomationList from '@/components/global/automation-list' 
import CreateAutomation from '@/components/global/create-aotumation'
import { Check } from 'lucide-react'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    
  return (
    <div className='flex flex-col lg:flex-row gap-5'>
        <div className='flex-1'>
            <AutomationList />
        </div>
        <div className='w-1/3'>
            <div className='flex flex-col rounded-xl bg-[#15171D] gap-y-6 p-5 border overflow-hidden border-[#484B4F]'>
                <div className='mb-3'>
                    <h2 className='text-xl font-semibold'>Automations</h2>
                    <p className='text-white/70 m-0'>
                    Your live automations will show here.
                    </p>
                </div>
                <div className='flex flex-col gap-y-3 mb-5'>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className='flex items-start justify-between'>
                            <div className='flex flex-col'>
                                <h3 className='font-medium'>
                                    Direct traffic towards website
                                </h3>
                                <p className='text-white/70 text-sm'>
                                    February 6th, 2026
                                </p>
                            </div>
                            <Check className='text-[#BF3D71]' color='#BF3D71' />

                        </div>
                    ))}
                </div>
                <CreateAutomation />
            </div>
        </div>
    </div>
  )
}

export default Page