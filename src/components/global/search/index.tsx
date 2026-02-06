import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
  return (
    <div className='flex overflow-hidden gap-x-2 border-2 border-[#ED4C79] rounded-full px-4 py-1 items-center flex-1 bg-primary/10'>
        <SearchIcon color='#ED4C79' />
        <Input placeholder='Search by name, email or status'
        className='border-none outline-none ring-0 focus:ring-0! focus:ring-offset-0 flex-1 bg-transparent!' />
    </div>
  )
}

export default Search