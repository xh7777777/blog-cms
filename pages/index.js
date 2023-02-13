import React,{useEffect} from 'react'
import { useRouter } from 'next/router'
import { getUserInfoAPI } from '@/API'
function Index() {
  const router = useRouter()
  useEffect( ()=> {
    (async function check() {
        const token = localStorage.getItem('token')
        try{
          const {data:res} = await getUserInfoAPI(token)
          console.log(res.errorCode)
          if(res.errorCode === 1) {
            router.replace('/home')
          }
        } catch(error) {
          router.replace('/login')
        }
    })()
  })
  return (
    <div></div>
  )
}

export default Index