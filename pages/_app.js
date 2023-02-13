import '@/styles/globals.scss'
import React from 'react'
import { useRouter } from 'next/router'
import LayoutProvider from '@/components/LayoutProvider'
import { ConfigProvider } from 'antd'
import ContextProvider from '@/components/ContextProvider'
import Auth from '@/components/Auth'
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ContextProvider>
            <ConfigProvider theme={{
      token: {
        colorPrimary: '#8fceff',
      },
    }}>
      {Component.isLogin ? <Component {...pageProps} /> :
              <Auth>
                <LayoutProvider>  
                  <Component {...pageProps} />
                </LayoutProvider>
              </Auth>
          }
      </ConfigProvider>
    </ContextProvider>

  )
}