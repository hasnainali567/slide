import { Button } from '@base-ui/react'
import { Bell } from 'lucide-react'
import React from 'react'

type Props = {}

const Notifications = (props: Props) => {
  return (
    <Button className={'bg-white rounded-full! py-3 px-3 hover:bg-gray-100 border border-[#C1424D] min-h-0 h-auto cursor-pointer'}>
        <Bell className='text-[#C1424D]' />
    </Button>
  )
}

export default Notifications