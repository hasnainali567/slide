import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { Activity } from 'lucide-react'

type Props = {}

const ActivateAutomationButton = (props: Props) => {
  return <Button className='lg:px-10 gradient-bg hover:opacity-80 text-white rounded-full font-medium ml-4'>
    <Loader state={false}>
        <Activity />
        <p className='lg:inline hidden'>Activate</p>
    </Loader>
  </Button>
}

export default ActivateAutomationButton;