import React from 'react'

type Props = {
  children : React.ReactNode
}

const ReduxProvider = ({children}: Props) => {
  return (
    <div>ReduxProvider</div>
  )
}

export default ReduxProvider