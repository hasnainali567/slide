import { onBoard } from '@/actions/user'
import { redirect } from 'next/navigation'


const Page = async () => {

  const user = await onBoard()
  if(user?.status === 200 || user?.status ===  201) { 
    return redirect(`/dashboard/${user.data?.firstname?.toLocaleLowerCase()}${user.data?.lastname?.toLocaleLowerCase()}`)
  }
return redirect('/sign-in')
}

export default Page