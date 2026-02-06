import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const PaymentButton = (props: Props) => {
  return (
    <Button className='text-white rounded-full gradient-bg font-bold'>
        Upgrade
    </Button>
  )
}

export default PaymentButton