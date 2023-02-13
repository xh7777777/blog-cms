import React,{useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { getUserInfoAPI } from '@/API'
import { Spin } from 'antd'
import { tokenContext,tokenDispatchContext } from '../ContextProvider'
function Auth({children}) {
  const router = useRouter()
  const token = useContext(tokenContext)
  const tokenDispatch = useContext(tokenDispatchContext)
  const [check, setCheck] = useState(false)
  useEffect( ()=> {
    if(!token) {
        (async function check() {
            const token = localStorage.getItem('token')
            try{
              const {data:res} = await getUserInfoAPI(token)
              setCheck(true)
              if(res.errorCode === 1) {
                tokenDispatch(token)
                router.replace(router.asPath)
              }
            } catch(error) {
              router.replace('/login')
            }
        })()
    } else {
        setCheck(true)
    }
  }, [check,router,token,tokenDispatch])
  if(!check) return <Spin/>
  return (
    <>
        {children}
    </>
  )
}

export default Auth