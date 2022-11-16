import { useContext } from "react";
import 'antd/dist/antd.css'
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {  Button, Checkbox, Form, Input  } from 'antd';


function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const { signin } = useContext(AuthContext);

  const onFinish = async(values:any) => {
    const data = await signin(values)
    if(data.token){
      navigate('/game',{replace:true})
    }
  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  

  return (
    <div className="login">
      <img src="https://q22b2ctemplates.blob.core.windows.net/dev/images/q22.svg" className="img-logo-login" alt="" />
      <div className="form-login">
        <h1>Ingresa con tu documento de identidad</h1>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          size="large"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Usuario"
            name="document"
            rules={[
              {
                required: true,
                message: 'Introduzca un usuario',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'Introduzca una contraseña',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
  );
}
export default LoginPage;