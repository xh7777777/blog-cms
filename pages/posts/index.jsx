import React, { use, useEffect, useRef, useState} from 'react'
import { Card,Form, Select, Button ,Spin, Modal, Input,message,Tag, Space, Typography, Table, Popconfirm, Upload} from 'antd'
import { getCateAPI, getTagAPI } from '@/API'
import classes from './styles.module.scss'
import { useRequest } from 'ahooks'
import WriteArticle from '@/components/posts/WriteArticle'
import { createArticleAPI, getArticleTableAPI, getArticleDetailAPI,deleteArticleAPI,uploadArticleCover, updateArticleAPI} from '@/API'
import MdRender from '@/components/MdRender'
import Image from 'next/image'

function Posts() {
  const [edit,setEdit] = useState(false)
  const [vd,setVd] = useState('')
  const [open,setOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [loading,setLoading] = useState(false)
  const [tableData,setTableData] = useState([])
  const [watch,setWatch] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null);
  const [artDetail,setArtDetail] = useState('')
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 4,
    },
  });
  const submitRef = useRef(null)
  const [messageApi, contextHolder] = message.useMessage();
  const {data:cates, loading:load1} = useRequest(getCateAPI,{cacheKey:'categoryCache'})
  const {data:tags, loading:load3} = useRequest(getTagAPI,{cacheKey:'tagsCache'})
  const formSearchRef = useRef(null)
  const formCreateRef = useRef(null)
  const formUploadRef = useRef(null)
  useEffect(() => {
    (async function() {
      if(!loading) setLoading(true)
      const {data:res} = await getArticleTableAPI(tableParams.pagination.current,tableParams.pagination.pageSize);
      const {data:artInfos,length:totalLength} = res.data
      if(!tableParams.pagination.total){
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: totalLength,
          },
        });
      }
      if(artInfos && !artInfos[0]?.key){
        artInfos.forEach(item => 
          {
            item.key = item.art_id
            item.tag_names = item.tag_names.split(',')
          })
          setTableData(artInfos)
          setLoading(false)
      }
    })()
  }, [JSON.stringify(tableParams)], vd, currentRecord)
  if(!cates || !tags  || load1 ||load3) return <Spin/>
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Typography.Text ellipsis>{text}</Typography.Text>,
    },
    {
      title: '文章分类',
      dataIndex: 'cate_name',
      key: 'cate_name',
    },
    {
      title: '文章标签',
      key: 'tag_names',
      dataIndex: 'tag_names',
      render: (_, { tag_names }) => (
        <>
          {tag_names.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '文章封面',
      key: 'cover',
      dataIndex: 'cover',
      render: (_,{cover}) => (<Image src={cover} width={80} height={80} alt='文章封面'/>)
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick = {() => showArt(record.art_id)}>查看</a>
          <a onClick = {() => handleUpload(record)}>上传封面</a>
          <a onClick = {() => editArt(record)}>编辑</a>
          <Popconfirm
            title="删除文章"
            description="你确定要删除吗？"
            onConfirm={() => handleDelete(record.art_id)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
          <a onClick = {() => handleDownload(record)}>下载markdown</a>
        </Space>
      ),
    },
  ];
  async function handleDownload(record) {
    console.log('待开发')
  }
  function handleUpload(record) {
    setCurrentRecord(record);
    setUploadOpen(true);
  }
  async function handleDelete(id) {
    const {data:res} = await deleteArticleAPI(id) 
    if(res.errorCode === 1) {
      messageApi.info('删除成功')
    }
  }
  async function showArt(art_id) {cate
    const {data:res} = await getArticleDetailAPI(art_id)
    setArtDetail(res.data[0].content)
    setWatch(true)
  }
  function handleCancel() {
    setOpen(false)
    setEdit(false)
  }
  function onReset() {
    formSearchRef.current?.resetFields();
  }
  const cateOption = cates.data.data.map(cate => {
    return {value:cate.cate_id+'',label:cate.cate_name}
  })
  const tagsOption = tags.data.data.map(tag => {
    return {value:tag.tag_id+'',label:tag.tag_name}
  })
  async function onFinish(formData) {
    if(edit) {
      const article = {
        title: formData.title,
        tag_ids : formData.tag.join(' '),
        category_id: formData.cate,
        content: vd.getValue(),
        description:formData.description
      }
      const {data:res} = await updateArticleAPI(article,currentRecord.art_id)
      if(res.errorCode === 1) {
        messageApi.info('创建成功')
        setOpen(false)
      } else {
        messageApi.info('出错了')
      }
    } else {
      const article = {
        title: formData.title,
        tag_ids : formData.tag.join(' '),
        category_id: formData.cate,
        content: vd.getValue(),
        description:formData.description
      }
      const {data:res} = await createArticleAPI(article)
      if(res.errorCode === 1) {
        messageApi.info('创建成功')
        setOpen(false)
      } else {
        messageApi.info('出错了')
      }
    }
  }
  function handleNew() {
    setEdit(false);
    setOpen(true)
  }
  function editArt(record) {
    setEdit(true)
    setCurrentRecord(record)
    setOpen(true)
    if(vd)
      vd.setValue(record.content)
  }
  async function handleOk() {
    submitRef.current.click()
  }
  async function uploadCoverFn(e) {
    e.preventDefault();
    let data = new FormData(formUploadRef.current);
    const {data:res} = await uploadArticleCover(data);
    if(res.code === 200) {
      messageApi.info('上传成功')
      setUploadOpen(false);
    } else {
      messageApi.info('上传失败，请重新上传')
    }
  }
  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <>
      <Card className={classes.formCard}>
        {contextHolder}
        {/* 查询表单 */}
      <Form layout='inline' ref={formSearchRef} onFinish={onFinish}>
        <Form.Item label='分类：' name='cate' rules={[{required:true, message:'不能为空'}]}>
        <Select
          style={{ width: '20vw' }}
          options={cateOption}
        />
        </Form.Item>
        <Form.Item label='标签：' name='tag' rules={[{required:true, message:'不能为空'}]} >
            <Select
            mode="tags"
            style={{ width: '20vw' }}
            options={tagsOption}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={onReset} style={{marginRight:12}}>
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
    </Card>
    <Card className={classes.artTable}> 
      <div className={classes.title}>
        <h1>文章管理</h1>
          <Button type='primary' onClick = {handleNew}>+ 新建</Button>
      </div>
      <Table columns={columns} dataSource={tableData} pagination={tableParams.pagination}  onChange={handleTableChange} loading={loading}/>
    </Card>
    {/* 编辑文章 */}
    <Modal
        title={edit? '编辑文章' : '创建文章'}
        open={open}
        closable
        onCancel={handleCancel}
        onOk={handleOk}
        width='80vw'
        style={{top:0}}
      >
        <Card>
          <Form ref={formCreateRef} onFinish={onFinish}> 
          <Form.Item label='标题：' name='title' rules={[{required:true, message:'不能为空'}]} style={{ width: '50vw' }} initialValue={edit?currentRecord?.title:''}>
            <Input/>
          </Form.Item>
          <Form.Item label='关键字：' name='keyword' rules={[{required:true, message:'不能为空'}]} style={{ width: '50vw' }} initialValue={edit?currentRecord?.keyword:''}>
            <Input />
          </Form.Item>
          <Form.Item label='文章描述：' name='description' rules={[{required:true, message:'不能为空'}]} style={{ width: '50vw' }} initialValue={edit?currentRecord?.description:''}>
            <Input.TextArea/>
          </Form.Item>
          <Form.Item label='分类：' name='cate' rules={[{required:true, message:'不能为空'}]} style={{ width: '50vw' }}>
          <Select
            options={cateOption}
          />
          </Form.Item>
          <Form.Item label='标签：' name='tag' rules={[{required:true, message:'不能为空'}]} style={{ width: '50vw' }}>
              <Select
              mode="tags"
              options={tagsOption}
            />
          </Form.Item>
           <Form.Item name='content'>
            <WriteArticle setVd={setVd} value = {edit?currentRecord.content : ''}/>
           </Form.Item>
           <Form.Item>
            <Button
              htmlType="submit"
              ref={submitRef}
              style={{display:'none'}}
            >
              提交
            </Button>

          </Form.Item>
          </Form>
        </Card>
      </Modal>
      <Modal
        title="查看文章"
        open={watch}
        closable
        onCancel={() => setWatch(false)}
        width='80vw'
        style={{top:0}}
      >
        <MdRender content={artDetail}/>
      </Modal>
      {/* 上传文章封面图 */}
      <Modal 
        title="上传封面"
        open={uploadOpen}
        closable
        onCancel={() => setUploadOpen(false)}
        footer=''>
        <form ref={formUploadRef} onSubmit = {(e) => uploadCoverFn(e)}>
               <input type="file" name="file" accept="image/*" />
               <input type="text" name='id'  defaultValue={currentRecord?.art_id} style={{display:'none'}}/>
               <input type="submit" />
        </form>
      </Modal>
    </>
  
  )
}

export default Posts