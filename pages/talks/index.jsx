import React ,{useState}from 'react'
import { Button, Spin ,Card , Table, Space, Modal, Form, Input, message ,Popconfirm} from 'antd'
import classes from './styles.module.scss'
import { getTalkAPI, editTalkAPI, createTalkAPI, deleteTalkAPI } from '@/API'
import { useRequest } from 'ahooks'
import moment from 'moment/moment'
function Talk() {
    const [fresh, setFresh] = useState(false)
    const {data,loading} = useRequest(getTalkAPI,{cacheKey:'TalkCache', refreshDeps: [fresh]})
    const [open, setOpen] = useState(false)
    const [currentRecord, setCurrentRecord] = useState(null)
    const [action,setAction] = useState('edit')
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    if(!data && loading) return <Spin/>
    const columns = [
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          className: classes.content,
          width:'40%',
          render: (text) => <p>{text}</p>
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          width:'35%'
        },
        {
          title: '操作',
          key: 'action',
          width:'25%',
          render: (_,record) => (
            <Space size="middle">
              <a onClick={() => onEdit(record)}>编辑</a>
              <Popconfirm
                title="确定删除吗"
                onConfirm={() => onDelete(record)}
              >
                <a>删除</a>
            </Popconfirm>
            </Space>
          ),
        },
      ];
    const listItem= data.data.data.forEach(item => {
        item.key=item.talk_id
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
    })
    function onCreate() {
        setAction('create')
        form.setFieldValue('edit','')
        setOpen(true)
    }
    function onEdit(record){
        setAction('edit')
        setCurrentRecord(record)
        form.setFieldValue('edit',record.content)
        setOpen(true)
    }
    async function onDelete(record) {
        const {data:res} = await deleteTalkAPI({id:record.talk_id})
        if(res.errorCode === 1) {
            messageApi.info('删除成功')
            setFresh(!fresh)
          } else {
            messageApi.info('出错了')
          }
    }
    function onCancel() {
        setOpen(false)
    }
    async function editSubmit(formData) {
        if(action === 'edit')
        {
          const {data:res} = await editTalkAPI({content:formData.edit, id:currentRecord.talk_id})
          if(res.errorCode === 1) {
            messageApi.info('更改成功')
            setFresh(!fresh)
            setOpen(false)
          } else {
            messageApi.info('出错了')
          }
        } else if(action === 'create') {
          const {data:res} = await createTalkAPI({content:formData.edit})
          if(res.errorCode === 1) {
            messageApi.info('创建成功')
            setFresh(!fresh)
            setOpen(false)
          } else {
            messageApi.info('出错了')
          }
        }
    }
  return (
    <Card title="日志管理" bordered={false}
    extra={<Button type='primary' onClick={onCreate}>+ 新建</Button>}>
      {contextHolder}
      <Table columns={columns} dataSource={data.data.data} />
      <Modal
        title="日志操作"
        open={open}
        onCancel={onCancel}
        footer = {null}
      >
        <Form onFinish={editSubmit} form={form}>
            <Form.Item name='edit' initialValue={currentRecord?.content} >
                <Input.TextArea rows={5}/>
            </Form.Item>
            <Form.Item>
                <Button
                htmlType="submit"
                type='primary'
                block={true}
                >
                提交
                </Button>
            </Form.Item>
        </Form> 
      </Modal>
    </Card>
    
  )
}

export default Talk
