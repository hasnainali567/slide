import { INTEGRATION_CARD } from '@/constant/integrations'
import React from 'react'
import IntegrationCard from './_components/integration-card'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-full lg:w-8/12 gap-y-5'>
        {INTEGRATION_CARD.map((card, key ) => {
          return <IntegrationCard key={key} {...card} />
        })}
      </div>
    </div>
  )
}

export default page