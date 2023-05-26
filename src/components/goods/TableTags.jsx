import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Tag, Tooltip, message, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { upDateGoodMany } from '../../api/goods';
const TableTags = (props) => {
  console.log(props.tagDataList);
    const data=props.tagDataList.split(' ')
    const { token } = theme.useToken();
    const [tags, setTags] = useState(data);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    useEffect(() => {
      if (inputVisible) {
        inputRef.current?.focus();
      }
    }, [inputVisible]);
    useEffect(() => {
      editInputRef.current?.focus();
    }, [inputValue]);
    const handleClose = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      const data={
        attr_name:props.attr_name,
        attr_sel:props.attr_sel,
        attr_vals:newTags.join(' ')
      }
      upDateGoodMany(props.lastid,props.tableDataId,data).then(res=>{
        if(res.data.meta.status===200){
          message.success('更新成功')
        }else{
          message.error('更新失败')
        }
      })
      console.log(newTags);//删除后的数组
      console.log(props.tableDataId);//attr_id
      console.log(props.lastid);
      setTags(newTags);
    };
    const showInput = () => {
      setInputVisible(true);
    };
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        //此时回车触发添加完成事件
        const data={
          attr_name:props.attr_name,
          attr_sel:props.attr_sel,
          attr_vals:[...tags, inputValue].join(' ')
        }
        upDateGoodMany(props.lastid,props.tableDataId,data).then(res=>{
          if(res.data.meta.status===200){
            message.success('更新成功')
          }else{
            message.error('更新失败')
          }
        })
        setTags([...tags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
    };
    const handleEditInputChange = (e) => {
      setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        console.log(1);
      const newTags = [...tags];
      console.log(newTags);
      newTags[editInputIndex] = editInputValue;
      setTags(newTags);
      setEditInputIndex(-1);
      setInputValue('');
    };
    const tagInputStyle = {
      width: 78,
      verticalAlign: 'top',
    };
    const tagPlusStyle = {
      background: token.colorBgContainer,
      borderStyle: 'dashed',
      padding:'5px'
    };
    return (
      <Space size={[0, 8]} wrap>
        <Space size={[0, 8]} wrap>
          {tags.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag

                key={tag}
                closable
                style={{
                  userSelect: 'none',
                  padding:'5px'
                }}
                color="#2db7f5"
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
        </Space>
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag style={tagPlusStyle} onClick={showInput} >
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </Space>
    );
};
export default TableTags;