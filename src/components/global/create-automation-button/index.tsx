import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { Workflow } from 'lucide-react'

type Props = {}

const CreateAutomationButton = (props: Props) => {
  return <Button className='lg:px-10 py-6 gradient-bg hover:opacity-80 text-white rounded-full font-medium'>
    <Loader state={false} >
        <Workflow />
        <p className='lg:inline hidden'>Create an Automation</p>
    </Loader>
  </Button>
}

export default CreateAutomationButton