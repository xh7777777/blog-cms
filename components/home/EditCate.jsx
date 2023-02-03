import React,{useState} from 'react'
import { Card, Space, Input, Button , List ,Spin, Popconfirm ,Modal} from 'antd'
import classes from './EditCate.module.scss'
import { editCateAPI,deleteCateAPI,createCateAPI,getCateAPI } from '@/API'
import { useRequest } from 'ahooks'

function EditCate({message}) {
    const [fresh, setFresh] = useState(false)
    const [open,setOpen] = useState(false)
    const {data,loading} = useRequest(getCateAPI,{cacheKey:'categoryCache', refreshDeps: [fresh]})
    const [input, setInput] = useState('')
    const [edit,setEdit] = useState('')
    const [currentId, setCurrentId] = useState('')
    if(!data && loading) return <Spin />
    async function onCreateCate() {
        if(input === '') {
            message.info('输入不能为空')
            return 
        }
        const {data:res} = await createCateAPI({name:input})
        if(res.errorCode === 1) {
            message.info('创建成功')
            setFresh(!fresh)
            setInput('')
        } else {
            message.info(res.msg)
        }
    }
    async function onEditCate() {
        if(edit === '') {
            message.info('输入不能为空')
            return 
        }
        const {data:res} = await editCateAPI({name:edit, id:currentId})
        if(res.errorCode === 1) {
            message.info('修改成功')
            setOpen(false)
            setFresh(!fresh)
        } else {
            message.info(res.msg)
        }
    }
    async function onDeleteCate(id) {
        const {data:res} = await deleteCateAPI(id)
        if(res.errorCode === 1) {
            message.info('删除成功')
            setFresh(!fresh)
        } else {
            message.info(res.msg)
        }
    }
  return (
    <Card className={classes.cate} title='分类'>
    <Space.Compact block>
      <Input
        type="text"
        allowClear
        placeholder="新建一个分类"
        className={classes.input}
        value={input}
        onChange = {(e) => {setInput(e.target.value)}}
      />
      <Button type="primary" onClick={onCreateCate}>
        新建
      </Button>
    </Space.Compact>
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={data.data.data}
      renderItem={(item) => (
        <List.Item
          actions={[<a className={classes.action} key={item.cate_id} 
            onClick={() => {setOpen(true); setEdit(item.cate_name); setCurrentId(item.cate_id)}}>修改</a>,
          <Popconfirm key={item.cate_id}
                title="确定删除吗"
                onConfirm={() => onDeleteCate(item.cate_id)}
              >
                <a className={classes.action}>删除</a>
            </Popconfirm>
           ]}
        >
            {/* <List.Item.Meta
            /> */}
            <div>{item.cate_name}</div>
        </List.Item>
      )}
    />
     <Modal
        title="修改分类"
        open={open}
        onCancel={() => setOpen(false)}
        className={classes.modal}
        onOk ={onEditCate}
      >
        <Input className={classes.enter} value={edit} onChange = {(e) => {setEdit(e.target.value)}}/>
      </Modal>
    </Card>
  )
}

export default EditCate