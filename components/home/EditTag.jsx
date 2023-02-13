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
    const [inputChosen, setInputChosen] = useState('')
    const inputRef = useRef('')
    const {data, loading} = useRequest(getTagAPI, {cacheKey:'tagsCache', refreshDeps: [fresh]})
    useEffect(() => {
        if (inputVisible) {
          inputRef.current?.focus();
        }
      }, [inputVisible]);
    if(!data && loading) return <Spin />
    const tags = data.data.data
    const showInput = (val) => {
        if(val !== 'add') {
          setInputValue(val)
        }
        setInputVisible(true);
        setInputChosen(val)
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
    async function handleInputEditConfirm(id) {
      if(inputValue === '') {
          message.info('输入不能为空')
          setInputVisible(false)
          return 
      }
      const {data:res} = await editTagAPI({tag_name:inputValue, id})
      if(res.errorCode === 1) {
          message.info('修改成功')
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
        (inputVisible && inputChosen === tag.tag_name) ?
        <Input
         ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => handleInputEditConfirm(tag.tag_id)}
          onPressEnter={() => handleInputEditConfirm(tag.tag_id)}
        />: 
          <Tag
          className={classes.tagItem}
          closable
          color = {tag.color}
          onClose={(e) => {
            e.preventDefault();
            handleClose(tag.tag_id);
          }}
          onClick = {()=> {showInput(tag.tag_name)}}
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
        {(inputVisible && inputChosen === 'add') ? (
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
        <Tag onClick={() => showInput('add')}>
          <PlusOutlined /> 新增
        </Tag>
      )}
    
    </Card>
  )
}

export default EditTag