import React, { useEffect } from 'react'
import { signIn } from 'next-auth/react';
import { Card, Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import classes from './styles.module.scss'
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
function LoginPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter()
    useEffect( ()=> {
      (async function check() {
          const session = await getSession()
          if(session) {
            router.replace('/home')
          }
      })()
    })
    async function loginFn(formData) {
        const res = await signIn('credentials', 
        {redirect: false, username:formData.username,
        password:formData.password},)
        if(!res.error){
            router.push('/home')
        } else {
            messageApi.info('登录失败')
        }
    }
  return (
    <div className='login'>
        {contextHolder}
         <Card
        bordered={false}
        style={{ width: 360, textAlign: "center" }}
      >
        <h1 className={classes.title}>777博客后台管理</h1>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish = {loginFn}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!"},
            {pattern:/^[a-zA-Z0-9]{1,10}$/,message:'用户名必须是1-10的大小写字母数字'}]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" },
            {
              pattern: /^\S{6,15}$/,
              message: '密码必须是6-15的非空字符',
            }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className={classes.loginbtn}
              block={true}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
LoginPage.isLogin = true
export default LoginPage