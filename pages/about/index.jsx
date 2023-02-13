import React, { useState } from 'react'
import MdRender from '@/components/MdRender'
import { Card, Spin, Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { getAboutAPI , updateAboutAPI} from '@/API'
import WriteArticle from '@/components/posts/WriteArticle'
function About() {
  const [fresh, setFresh] = useState(false)
  const {data,loading} = useRequest(getAboutAPI, {cacheKey:'aboutCatch', refreshDeps:[fresh]})
  const [edit,setEdit] = useState(false)
  const [vd,setVd] = useState(null)
  const [messageApi, ContextHolder] = message.useMessage()
  if(!data && loading) return <Spin/>
  const content = data.data.data.content
  async function handleChange() {
    const value = vd.getValue()
    const {data:res} = await updateAboutAPI(value) 
    if(res.errorCode === 1) {
      messageApi.info('修改成功')
      setEdit(false)
      setFresh(!fresh)
    } else {
      messageApi.error(res.msg)
    }
  }
  return (
    <Card title='关于我' extra = {<a onClick={() => setEdit(!edit)}>编辑</a>}>
      {ContextHolder}
      {edit ?  <div>
         <WriteArticle vd={vd} setVd= {setVd} value={content}/>
         <Button style={{float:'right', marginTop: '25px', width: '10vw'}} onClick={handleChange}>保存</Button>
      </div>:<MdRender content={content}/>}

    </Card>
  )
}

export default About