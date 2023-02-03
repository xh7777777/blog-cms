import classes from './styles.module.scss'
import { signOut } from 'next-auth/react';
import {
    UserOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
    HomeOutlined,
    FileTextOutlined,
    EllipsisOutlined,
    BarsOutlined,
    CommentOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';
  import React, { useRef, useState } from 'react';
  import Link from 'next/link';
  import Image from 'next/image';
import { useRouter } from 'next/router';
  const { Header, Sider, Content } = Layout;
  function getItem(label, key, icon,) {
    return {
      key,
      icon,
      label,
    };
  }
  const items = [
    getItem('主页', 'home', <HomeOutlined />),
    getItem('文章', 'posts', <FileTextOutlined />),
    getItem('说说', 'talks', <EllipsisOutlined />),
    getItem('日志', 'logger', <BarsOutlined />),
    getItem('关于', 'about', <UserOutlined />),
    getItem('评论', 'comment', <CommentOutlined />),
  ];
  const LayoutProvider = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [select,setSelect] = useState('home')
    const router = useRouter()
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    function handleClick() {
        signOut({redirect: false, callbackUrl: "/login"})
    }
    function onChooseMenu({key}) {
        setSelect(key)
        router.push('/'+key)
    }
    return (
      <Layout className={classes.layout}>
        <Sider trigger={null} collapsible collapsed={collapsed} className={classes.sider}>
            <a onClick={() => onChooseMenu({key:'home'})}>
                <Image className={classes.img} src='/icons/blogger-blog-svgrepo-com.svg' alt="logo" width={40} height={40}></Image>
                <h1 className={classes.logo}>777の博客后台</h1>
            </a>
          <Menu
            mode="inline"
            items={items}
            onSelect={onChooseMenu}
            selectedKeys={select}
          />
        </Sider>
        <Layout>
          <Header className={classes.header}
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <UnorderedListOutlined  className={classes.show}/>
            <div className={classes.temp}>1</div>
            <div className={classes.logout} onClick={handleClick}>
                <LogoutOutlined/>
                退出
            </div>
          </Header>
          <Content
            style={{
              margin: '40px 40px',
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default LayoutProvider;