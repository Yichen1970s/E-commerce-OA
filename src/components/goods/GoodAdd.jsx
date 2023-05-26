import { Alert, Steps, Form, Input, Cascader, Tag, Space,Modal, Upload,Button, message} from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import style from "./GoodAdd.module.css";
import { useImmer } from "use-immer";
import {useSelector} from 'react-redux'

import {
  getCategories,
  getCategoriesMany,
  getCategoriesOnly,
  CreateGood
} from "../../api/goods";

const GoodAdd = () => {
  const navigate=useNavigate()
  const [currentFrom, setCurrentFrom] = useState(0); //当前步骤
  const [currentTo, setCurrentTo] = useState(0); //要走的步骤
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  let formData = useRef({
    goods_cat: "",
    goods_introduce: "",
    goods_name: "",
    goods_number: 0,
    goods_price: 0,
    goods_weight: 0,
    pics: [],
    attrs: [],
  });
  
  const [manyAttrs, setManyAttrs] = useImmer([]);
  const [onlyAttrs, setOnlyAttrs] = useImmer([]);
  useEffect(() => {
    getCategories().then((res) => {
      const initList = [...res.data.data];
      initList.map((item) => {
        item.value = item.cat_id;
        item.label = item.cat_name;
        if (item.children) {
          item.children.map((item2) => {
            item2.value = item2.cat_id;
            item2.label = item2.cat_name;
            if (item2.children) {
              item2.children.map((item3) => {
                item3.value = item3.cat_id;
                item3.label = item3.cat_name;
              });
            }
          });
        }
      });
      setOptions(initList);
    });
  }, []);

  //阶段选择器
  const onChange = (value) => {
    //从 0-到任意
    setCurrentTo(value);
    if (currentFrom === 0) {
      form.submit(); //进程0-任何 都要判断表单
    } else {
      setCurrentFrom(value); //1-任何 不需要 直接跳转
    }
    //2阶段请求many 需要分类id  formData.goods_cat是数组转的字符串
    const list = formData.current.goods_cat.split(",");
    const id = list[list.length - 1];
    if (value === 1) {
      getCategoriesMany(id).then((res) => {
        setManyAttrs(res.data.data);
      });
    }
    if (value === 2) {
      getCategoriesOnly(id).then((res) => {
        console.log(res.data.data);
        setOnlyAttrs(res.data.data);
      });
    }
  };
  const onFinish = (value) => {
    value.goods_cat = value.goods_cat.join(","); //分类数据变为字符串
    formData.current = { ...formData.current, ...value };
    console.log(formData.current);
    setCurrentFrom(currentTo);
  };
  const onFinishFailed = (e) => {
    setCurrentTo(currentFrom);
  };

  //商品分类选择器
  const onChangeSelect = (value,selectoptions) => {
    console.log(value,selectoptions);
    formData.current.goods_cat = value.join(",");
  };

  //3阶段 输入框改值
  const inputChange = (num) => {
    return (e) => {
      setOnlyAttrs((clonelist) => {
        clonelist = clonelist.forEach((item, index) => {
          if (index === num) {
            item.attr_vals = e.target.value;
          }
        });
      });
    };
  };

  //2阶段商品参数 点解删除
  const log = (id, content, index1) => {
    return (e) => {
      e.preventDefault();
      //删除后更新manyAttrs
      setManyAttrs((clonelist) => {
        clonelist = clonelist.map((item) => {
          if (item.attr_id === id) {
            const newarr = [];
            item.attr_vals.split(" ").map((item2, index2) => {
              if (item2 !== content) {
                newarr.push(item2);
              }
            });
            item.attr_vals = newarr.join(" ");
          }
        });
      });
    };
  };

  //4阶段上传图片逻辑
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const token=useSelector((state)=>state.user.userInfo.token)
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList)
}
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  //5阶段 提交
  const handleSubmit=()=>{
    formData.current.goods_number=Number(formData.current.goods_number)
    formData.current.goods_price=Number(formData.current.goods_price)
    formData.current.goods_weight=Number(formData.current.goods_weight)
    formData.current.attrs=[...manyAttrs,...onlyAttrs]
    console.log(fileList);
    formData.current.pics=[]
    fileList.forEach(item=>{
      formData.current.pics.push({pic:item.response.data.tmp_path})
    })
    console.log(formData.current);
    CreateGood(formData.current).then(res=>{
      if(res.data.meta.status===201){
        navigate('/good')
        message.success('商品添加成功')
      }else{
        message.error('商品添加失败')
      }
    })
    
  }  

  return (
    <div>
      <div>
        <Alert
          message="添加商品信息"
          banner
          style={{
            textAlign: "center",
            background: "#f4f4f5",
            color: "#909399",
            marginBottom: "20px",
          }}
        />
      </div>

      <div>
        <Steps
          style={{ marginBottom: "20px" }}
          current={currentFrom}
          items={[
            {
              title: "基本信息",
            },
            {
              title: "商品参数",
            },
            {
              title: "商品属性",
            },
            {
              title: "商品图片",
            },
            {
              title: "商品内容",
            },
            {
              title: "完成",
            },
          ]}
        />

      
      <div style={{display:'flex'}}>
        <Steps
            style={{ width: "120px", height: "350px" }}
            progressDot
            current={currentFrom}
            direction="vertical"
            onChange={onChange}
            items={[
              {
                title: "基本信息",
              },
              {
                title: "商品参数",
              },
              {
                title: "商品属性",
              },
              {
                title: "商品图片",
              },
              {
                title: "商品内容",
              },
              {
                title: "完成",
              },
            ]}
          />
        <div style={{flex:1}}>
            {/* ==================进程1*/}
            <Form
              style={{
                display: currentTo == 0 ? "block" : "none",
                maxWidth: 800,
              }}
              form={form}
              validateTrigger={["onBlur", "onChange"]}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                size="large"
                style={{ height: "50px" }}
                label="商品名称"
                name="goods_name"
                rules={[
                  {
                    required: true,
                    message: "请输入商品名称",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ height: "50px" }}
                label="商品价格"
                name="goods_price"
                rules={[
                  {
                    required: true,
                    message: "请输入商品价格",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                style={{ height: "50px" }}
                label="商品重量"
                name="goods_weight"
                rules={[
                  {
                    required: true,
                    message: "请输入商品重量",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                style={{ height: "50px" }}
                label="商品数量"
                name="goods_number"
                rules={[
                  {
                    required: true,
                    message: "请输入商品数量",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                style={{ height: "50px" }}
                label="商品分类"
                name="goods_cat"
                rules={[{ required: true, message: "请选择商品分类" }]}
              >
                <Cascader
                  options={options}
                  onChange={onChangeSelect}
                  placeholder="Please select"
                />
              </Form.Item>
            </Form>
            {/* ======================进程1 */}
            {/* ======================进程2*/}
            <Form
              style={{
                maxWidth: 600,
                display: currentTo == 1 ? "block" : "none",
              }}
              layout="vertical"
              autoComplete="off"
            >
              {manyAttrs
                ? manyAttrs.map((item, index) => (
                    <Form.Item
                      name={item.attr_name}
                      label={item.attr_name}
                      key={item.attr_id}
                    >
                      <Space style={{ width: 500 }}>
                        {item.attr_vals.split(" ").map((item1, index1) => (
                          <Tag
                            closable
                            style={{ padding: "8px" }}
                            onClose={log(item.attr_id, item1, index1)}
                            color="#2db7f5"
                            key={index1}
                          >
                            {item1}
                          </Tag>
                        ))}
                      </Space>
                    </Form.Item>
                  ))
                : ""}
            </Form>
            {/* ======================进程2 */}
            {/* ======================进程3 */}
            <Form
              style={{
                maxWidth: 600,
                display: currentTo == 2 ? "block" : "none",
              }}
              layout="vertical"
              autoComplete="off"
            >
              {onlyAttrs
                ? onlyAttrs.map((item, index) => (
                    <Form.Item
                      name={item.attr_name}
                      label={item.attr_name}
                      key={item.attr_id}
                    >
                      <div></div>
                      <Input
                        value={item.attr_vals}
                        key={index}
                        onChange={inputChange(index)}
                      />
                    </Form.Item>
                  ))
                : ""}
            </Form>
            {/* ======================进程3 */}
            {/* ======================进程4 */}
            <div
              style={{
                maxWidth: 600,
                display: currentTo == 3 ? "block" : "none",
              }}
            >
               <Upload
        action="
        http://www.tangxiaoyang.vip:8888/api/v2/upload"
        headers={{authorization:token}}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
            </div>
            {/* ======================进程4 */}
            {/* ======================进程5 */}
            <div  style={{
                maxWidth: 600,
                display: currentTo == 4 ? "block" : "none",
              }}>
              <Button type='primary' onClick={handleSubmit}>修改商品</Button>
              
            </div>
            {/* ======================进程5 */}
        </div>

      </div>


      </div>

    </div>

  );
};
export default GoodAdd;
