import React,{useEffect} from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
function Index() {
  const router = useRouter()
  useEffect( ()=> {
    (async function check() {
        const session = await getSession()
        if(session) {
          router.replace('/home')
        } else {
          router.replace('/login')
        }
    })()
  })
  return (
    <div>Home</div>
  )
}

export default Index