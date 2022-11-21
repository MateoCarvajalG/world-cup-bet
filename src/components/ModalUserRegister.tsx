import { useContext, useState } from "react";
import 'antd/dist/antd.css'
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {  Button, Checkbox, Form, Input, notification, Spin  } from 'antd';
import { showError } from "../alerts";


function ModalUserRegister(props:any) {
  const { signUp } = useContext(AuthContext);
  const [registeredUser,setRegisterUser] = useState(false)
  const onFinish = (values:any) => {
    setRegisterUser(true)
    signUp(values).then((res:any)=>{
      props.setIsModalOpen(false)
      setRegisterUser(false)
      notification.success({
        message: 'Creado',
        description:"El usuario se ha creado correctamente",
      });
    }).catch((err:any)=>{
      setRegisterUser(false)
      notification.error({
        message: 'Error',
        description:
          showError(err.response),
      });
    })

  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="">
      <Spin tip="Estamos generando los partidos para tu usuario...." spinning={registeredUser}>
        
        <Form
          name="basic"
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Nombres"
            name="names"
            rules={[
                {
                required: true,
                message: 'Introduzca su nombre',
                },
                { type: 'string', min: 3,message:"El nombre debe tener como minimo 3 caracteres alfabeticos"}, 
                { type: 'string', max: 20,message:"El nombre debe tener como maximo 20 caracteres alfabeticos"}, 
                { pattern:/^[a-zA-ZÀ-ÿ \\u00f1 \\u00d1 \\s]+$/,message:"El nombre debe estar compuesto solo de caracteres alfabeticos"}

            ]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellidos"
            name="surnames"
            rules={[
              {
              required: true,
              message: 'Introduzca sus apellidos',
              },
              { type: 'string', min: 3,message:"El apellido debe tener como minimo 3 caracteres alfabeticos"}, 
              { type: 'string', max: 30,message:"El apellido debe tener como maximo 30 caracteres alfabeticos"}, 
              { pattern:/^[a-zA-ZÀ-ÿ \\u00f1 \\u00d1 \\s]+$/,message:"El apellido debe estar compuesto solo de caracteres alfabeticos"}

          ]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="Documento"
            name="document"
            rules={[
              {
              required: true,
              message: 'Introduzca su documento de identificacion',
              },
              { type: 'string', min: 3,message:"Debe tener como minimo 3 caracteres numericos"}, 
              { type: 'string', max: 10,message:"Debe tener como maximo 10 caracteres numericos"}, 
              { pattern:/^[1-9]{1}[0-9]{5,9}$/,message:"Debe estar compuesto solo de caracteres numericos"}

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
              message: 'Introduzca una contraseña segura',
              },
              { type: 'string', min: 8,message:" La contraseña debe tener como minimo 8 caracteres"}, 
              { type: 'string', max: 30,message:"La contraseña debe tener como maximo 30 caracteres "}, 
              { pattern:/^[a-zA-ZÀ-ÿ \\u00f1 \\u00d1 \\s 0-9]+$/,message:"La contraseña no puede tener caracteres especiales"}

          ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registrar Usuario
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      </div>
  );
}
export default ModalUserRegister;