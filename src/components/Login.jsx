import style from "./Login.module.css";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
    const navigate=useNavigate()
    const [form] = Form.useForm();
    const dispatch=useDispatch()

  const onFinish = (values) => {
    console.log("Success:", values);
    login(values).then(res=>{
        console.log(res.data);
        // const userinfo=JSON.parse(res.data.data)
        console.log(res.data.data);
        if(res.data.meta.status===200){
          dispatch({
            type:'user/userInfoUpdate',
            payload:res.data.data
          })
            message.success('登陆成功')
            navigate('/')
        }else{
            form.resetFields();
            message.error(res.data.meta.msg)
        }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    
    <div className={style.box}>
      <div className={style.loginImg}>
        <img src="./src/assets/imgs/login_img.png" alt="" />
      </div>
      <div className={style.loginFormBox}>
        <div className={style.avater}>
            <img src="./src/assets/imgs/login_logo.png" alt="" />
        </div>
        <Form
        form={form}
          className={style.loginForm}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        <div className={style.text}>电商后台管理系统</div>
          <Form.Item
          style={{marginTop:'50px'}}
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 14,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
