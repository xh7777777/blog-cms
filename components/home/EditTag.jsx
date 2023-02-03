import React, { useRef, useState, useEffect,useCallback } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Card,Input, Tag, TweenOneGroup, Spin } from 'antd'
import classes from './EditTag.module.scss'
import { deleteTagAPI, getTagAPI, createTagAPI, editTagAPI } from '@/API'
import { useRequest } from 'ahooks'
function EditTag({message}) {
    const [fresh,setFresh] = useState(false)
    const [inputValue,setInputValue] = useState('')
    const [inputVisible, setInputVisible] = useState(false);
    const inputRef = useRef('')
    const {data, loading} = useRequest(getTagAPI, {cacheKey:'tagsCache', refreshDeps: [fresh]})
    useEffect(() => {
        if (inputVisible) {
          inputRef.current?.focus();
        }
      }, [inputVisible]);
    const getRanColor = useCallback( ()=> {
        const color = ['megenta','red','blue','volcano','orange','gold',
    'lime','green','cyan','geekblue','purple']
        return color[Math.floor(Math.random()*color.length)]
    })
    if(!data && loading) return <Spin />
    const tags = data.data.data
    const showInput = () => {
        setInputVisible(true);
      };
    async function handleInputConfirm() {
        if(inputValue === '') {
            message.info('输入不能为空')
            setInputVisible(false)
            return 
        }
        const {data:res} = await createTagAPI(inputValue)
        if(res.errorCode === 1) {
            message.info('创建成功')
            setFresh(!fresh)
            setInputValue('')
            setInputVisible(false)
        } else {
            message.info(res.msg)
        }
    }
    async function handleClose(id) {
        const {data:res} = await deleteTagAPI(id)
        if(res.errorCode === 1) {
            message.info('删除成功')
            setFresh(!fresh)
        } else {
            message.info(res.msg)
        }
    }
    const forMap = (tag) => {
        const tagElem = (

          <Tag
            closable
            color = {getRanColor}
            onClose={(e) => {
              e.preventDefault();
              handleClose(tag.tag_id);
            }}
          >
            {tag.tag_name}
          </Tag>
        );
        return (
          <span
            key={tag.tag_id}
            style={{
              display: 'inline-block',
            }}
          >
            {tagElem}
          </span>
        );
      };
      const tagChild = tags.map(forMap);
  return (
    <Card  className={classes.tag} title='标签'> 
        <div style={{marginBottom: 16,}}>
          {tagChild}
      </div>
        {inputVisible ? (
        <Input
         ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput}>
          <PlusOutlined /> 新增
        </Tag>
      )}
    
    </Card>
  )
}

export default EditTag