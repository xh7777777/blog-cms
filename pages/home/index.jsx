import React, { Fragment, useEffect } from 'react'
import {Row, Col, Card, Input ,Button,Space,message} from 'antd'
import Covers from '@/components/home/Covers'
import Wisdoms from '@/components/home/Wisdoms'
import classes from './index.module.scss'
import EditCate from '@/components/home/EditCate'
import EditTag from '@/components/home/EditTag'
function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <Fragment>
      {contextHolder}
      <Row gutter={[16, 24]} justify='space-between' className={classes.row1}>
        <Col lg={{span:4}} md={{span:6}} sm = {{span:12}} xs={{span:12}}  className={classes.info}>
          <p>文章数</p>
          <div>22</div>
        </Col>
        <Col lg={{span:4}} md={{span:6}} sm = {{span:12}} xs={{span:12}}  className={classes.info}>
          <p>分类数</p>
          <div>22</div>
        </Col>
        <Col lg={{span:4}} md={{span:6}} sm = {{span:12}} xs={{span:12}}  className={classes.info}>
          <p>标签数</p>
          <div>22</div>
        </Col>
        <Col lg={{span:4}} md={{span:6}} sm = {{span:12}} xs={{span:12}}  className={classes.info}>
          <p>评论数</p>
          <div>22</div>
        </Col>
      </Row>
      <Row gutter={24} justify='space-between' className={classes.row2}>
          <Col lg={{span:15}} sm = {{span:24}} xs={{span:24}}>
            <EditCate message={messageApi}/>
          </Col>
          <Col lg={{span:8}}  sm = {{span:24}} xs={{span:24}}>
              <EditTag message={messageApi}/>
          </Col>
      </Row>
      {/* <Row gutter={24} justify='space-between' className={classes.row2}>
          <Col lg={{span:15}} sm = {{span:24}} xs={{span:24}}>
            <Wisdoms message={messageApi}/>
          </Col>
          <Col lg={{span:8}}  sm = {{span:24}} xs={{span:24}}>
              <Covers message={messageApi}/>
          </Col>
      </Row> */}
    </Fragment>
  )
}

export default Home