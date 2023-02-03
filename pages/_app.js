import '@/styles/globals.scss'
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/router'
import LayoutProvider from '@/components/LayoutProvider'
import { ConfigProvider } from 'antd'
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ConfigProvider theme={{
      token: {
        colorPrimary: '#8fceff',
      },
    }}>
      {Component.isLogin ? <Component {...pageProps} /> :
              <Auth auth={Component.auth}>
                <LayoutProvider>  
                  <Component {...pageProps} />
                </LayoutProvider>
              </Auth>
          }
      </ConfigProvider>
    </SessionProvider>
  )
}

function Auth({ children , auth}) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const router = useRouter()
  const { data:session,status } = useSession({ required: true ,
    onUnauthenticated() {
      router.push(auth?.unauthorized?auth.unauthorized:'/login')
    },})
  const isUser = !!session?.user 
  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (isUser) {
    return children
  }
  return <div>Loading...</div>
}

