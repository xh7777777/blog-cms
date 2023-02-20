import React,{useRef, useState} from 'react'
import { Card, Space, Input, Button , List ,Spin, Popconfirm ,Modal} from 'antd'
import classes from './EditCate.module.scss'
import { getCoverAPI,deleteCoverAPI, createCoverAPI } from '@/API'
import { useRequest } from 'ahooks'
import Image from 'next/image'

function Covers({message}) {
    const [fresh, setFresh] = useState(false)
    const [uploadOpen,setUploadOpen] = useState(false)
    const {data,loading} = useRequest(getCoverAPI,{cacheKey:'CoverCache', refreshDeps: [fresh]})
    const [currentId, setCurrentId] = useState('')
    const formUploadRef = useRef(null)
    if(!data && loading) return <Spin />
    async function onDeleteCover(id) {
        const {data:res} = await deleteCoverAPI(id)
        if(res.errorCode === 1) {
            message.info('删除成功')
            setFresh(!fresh)
        } else {
            message.info(res.msg)
        }
    }
    async function uploadCoverFn(e) {
        e.preventDefault();
        let data = new FormData(formUploadRef.current);
        const {data:res} = await createCoverAPI(data);
        if(res.code === 200) {
          message.info('上传成功')
          setUploadOpen(false);
        } else {
          message.info('上传失败，请重新上传')
        }
      }
  return (
    <Card className={classes.cate} title='封面图' extra = {<Button type="primary" onClick={() => setUploadOpen(true)}>
    新建
  </Button>}>
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={data.data.data}
      renderItem={(item) => (
        <List.Item
          actions={[
          <Popconfirm key={item.img_id}
                title="确定删除吗"
                onConfirm={() => onDeleteCover(item.img_id)}
              >
                <a className={classes.action}>删除</a>
            </Popconfirm>
           ]}
        >
            <Image src={item.imgURL} width={140} height={80} alt='封面图' />
        </List.Item>
      )}
    />
    <Modal 
        title="上传封面"
        open={uploadOpen}
        closable
        onCancel={() => setUploadOpen(false)}
        footer=''>
        <form ref={formUploadRef} onSubmit = {(e) => uploadCoverFn(e)}>
               <input type="file" name="file" accept="image/*" />
               <input type="submit" />
        </form>
      </Modal>
    </Card>
  )
}

export default Covers